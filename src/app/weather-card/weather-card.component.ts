import { Component, HostListener } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LocationService } from '../shared/services/location-service.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,MatTooltipModule],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent {

  constructor(
    private locationService:LocationService,
  ){}
  
  private isAnimating = false;
  indexofHoulyData:number = 0;
  browserDate = new Date().toUTCString();
  hourlyData: any

  ngOnInit() {
    this.getWeatherData()
  }

  getWeatherData() {
    this.locationService.location$.subscribe(location => {
      if (location){
        this.locationService.getWeatherData(location).subscribe({ 
          next: (res: any) => {

            this.getHourlyData(res)
            this.findCurrentTimeIndex(res)
            
          },
          error: () => {
          }
        }) 
      }
    })
  }

  getHourlyData(res: any) {
    const { time, temperature_2m, apparent_temperature, cloud_cover, precipitation_probability, relative_humidity_2m, surface_pressure, uv_index, visibility, weather_code } = res.hourly;
  
    this.hourlyData = time.map((timestamp: string, index: number) => {
     
      const date = new Date(timestamp);
  
      const year = date.getUTCFullYear();
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const day = date.getUTCDate().toString().padStart(2, '0'); 
      const hours = date.getUTCHours().toString().padStart(2, '0'); 
      const minutes = date.getUTCMinutes().toString().padStart(2, '0'); 

      const formattedDate = `${day}-${month}-${year}`;

      const formattedHour = `${hours}:${minutes}`;

      const utcDifferenceInHours = (res.utc_offset_seconds / 60) /60

      return {
        date: formattedDate, 
        formattedHour, 
        utcDifferenceInHours,
        temperature: temperature_2m[index],
        apparent_temperature: apparent_temperature[index],
        cloud_cover: cloud_cover[index],
        precipitation_probability: precipitation_probability[index],
        relative_humidity_2m: relative_humidity_2m[index],
        surface_pressure: surface_pressure[index],
        uv_index: uv_index[index],
        visibility: visibility[index],
        weather_code: weather_code[index]
      };
    });
  
  }
  

  findCurrentTimeIndex(response:any) {
    const { time } = response.hourly;
    const offsetSeconds = response.utc_offset_seconds;
    const offsetMilliseconds = offsetSeconds * 1000;
    
    const currentUtcDate = this.convertDateToUTC(new Date())

    const targetTimezoneDate = new Date(currentUtcDate.getTime() + offsetMilliseconds);

    const targetTimezoneDateRounded = new Date(Math.round(targetTimezoneDate.getTime() / 3600000) * 3600000);
    
    const roundedTimeISO = `${targetTimezoneDateRounded.getFullYear()}-${String(targetTimezoneDateRounded.getMonth() + 1).padStart(2, '0')}-${String(targetTimezoneDateRounded.getDate()).padStart(2, '0')}T${String(targetTimezoneDateRounded.getHours()).padStart(2, '0')}:00`;

    this.indexofHoulyData =  time.findIndex((t: string) => t === roundedTimeISO);
  }

  convertDateToUTC(date: any) 
  {
     return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isAnimating) {
      this.isAnimating = true;
      requestAnimationFrame(() => {
        this.updateCardStyles(event);
        this.isAnimating = false;
      });
    }
  }

  private updateCardStyles(event: MouseEvent) {
    const card = document.querySelector('.weather-card') as HTMLElement;
    const { clientX: mouseX, clientY: mouseY } = event;
    const { innerWidth: width, innerHeight: height } = window;

    const xRotation = (mouseY - height / 2) / height * 45;
    const yRotation = (width / 2 - mouseX) / width * 45;

    card.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;

    const shadowX = (width / 2 - mouseX) / width * 50;
    const shadowY = (mouseY - height / 2) / height * 50;

    card.style.boxShadow = `${shadowX}px ${-shadowY}px 20px rgba(0, 0, 0, 0.2)`;
  }

}
