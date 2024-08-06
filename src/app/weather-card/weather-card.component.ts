import { Component, HostListener } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LocationInterface, LocationService } from '../shared/services/location-service.service';
import { MatButtonModule } from '@angular/material/button';
import { Units } from '../shared/interfaces/units'
import { HourlyWeatherDataConverted, HourlyWeatherData } from '../shared/interfaces/hourly-weather-data'
import { WholeWeatherData } from '../shared/interfaces/whole-weather-data'
import { CommonModule } from '@angular/common';
import { WeatherCardDataService } from './weather-card-data.service'
import { DetailedWeatherInfoComponent } from "../detailed-weather-info/detailed-weather-info.component";
import { ToastDataService } from '../shared/services/toast-data.service';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatTooltipModule, CommonModule, DetailedWeatherInfoComponent],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent {

  constructor(
    private locationService: LocationService,
    private toastDataService: ToastDataService
  ){}
  
  isAnimating: boolean = false;
  units!: Units
  indexofHoulyData:number = 0;
  hourlyData!: HourlyWeatherDataConverted[]
  detailedInfoPopup:boolean = false;
  icon:string = 'brightness-high.svg'
  apiLocation!: LocationInterface | null

  ngOnInit() {
    this.getWeatherData()
  }

  getWeatherData() {
    this.locationService.location$.subscribe(location => {
      if (location) {
        this.locationService.getWeatherData(location).subscribe({
          next: (res: WholeWeatherData) => {
            this.units = res.hourly_units;
            this.hourlyData = WeatherCardDataService.getHourlyData(res)
            this.indexofHoulyData = WeatherCardDataService.findCurrentTimeIndex(res)
            this.apiLocation = {latitude:res.latitude,longitude:res.longitude}
          },
          error: () => {
            this.toastDataService.addToast('Błąd podczas pobierania danych lokalizacji', 'error');
          }
        });
      }
    });
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
