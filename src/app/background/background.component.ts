import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WeatherCardComponent } from "../weather-card/weather-card.component";
import { LocationInterface, LocationService } from '../shared/services/location-service.service';
import { LocalizationPopupComponent } from "../localization-popup/localization-popup.component";

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, WeatherCardComponent, LocalizationPopupComponent],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent {

  constructor(
    private locationService:LocationService,
  ){}

  location: LocationInterface | null = null;
  locationPopup:boolean = false

  ngOnInit() {
    this.detectLocation()
    this.locationService.location$.subscribe(location => {
      this.location = location;
    })
  }

  detectLocation(): void {
    if (typeof navigator !== 'undefined') { 
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.locationService.setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            this.locationPopup = true;
            console.error('Error occurred while getting location:', error);
          }
        );
      } else {
        this.locationPopup = true;
        console.error('Geolocation is not supported by this browser.');
      }
    }
  }
}
