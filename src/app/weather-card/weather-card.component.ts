import { Component, HostListener } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LocationService } from '../shared/services/location-service.service';
import { MatButtonModule } from '@angular/material/button';
import { log } from 'console';

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

            const { time, temperature_2m, apparent_temperature, cloud_cover, precipitation_probability, relative_humidity_2m, surface_pressure, uv_index, visibility, weather_code } = res.hourly;
    
            this.hourlyData = time.map((timestamp: string, index: number) => ({
                time: timestamp,
                hour: timestamp,
                date: timestamp,
                temperature: temperature_2m[index],
                apparent_temperature: apparent_temperature[index],
                cloud_cover: cloud_cover[index],
                precipitation_probability: precipitation_probability[index],
                relative_humidity_2m: relative_humidity_2m[index],
                surface_pressure: surface_pressure[index],
                uv_index: uv_index[index],
                visibility: visibility[index],
                weather_code: weather_code[index]
            }));
            this.findCurrentTimeIndex(res)
            console.log(res,'res')
            console.log(this.hourlyData[this.indexofHoulyData],'hourlyData');
            
          },
          error: () => {
          }
        }) 
      }
    })
  }

  findCurrentTimeIndex(response:any) {

    const { time } = response.hourly;
    const offsetSeconds = response.utc_offset_seconds;
    const offsetMilliseconds = offsetSeconds * 1000;
    
    const currentUtcDate = new Date();
    
    const targetTimezoneDate = new Date(currentUtcDate.getTime() + offsetMilliseconds);
    
    const targetTimezoneDateRounded = new Date(Math.round(targetTimezoneDate.getTime() / 3600000) * 3600000);
    
    const roundedTimeISO = targetTimezoneDateRounded.toISOString().slice(0, 13) + ":00";
    
    console.log("Current UTC Date:", currentUtcDate.toISOString());
    console.log("Target Timezone Date:", targetTimezoneDate.toISOString());
    console.log("Rounded Time:", roundedTimeISO);

    this.indexofHoulyData =  time.findIndex((t: string) => t === roundedTimeISO);
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
