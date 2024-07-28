
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  constructor(
    private httpClient:HttpClient
  ) {}

  private locationSubject = new BehaviorSubject<LocationInterface | null>(null);
  location$ = this.locationSubject.asObservable();

  setLocation(location: LocationInterface): void {
    this.locationSubject.next(location);
  }

  getWeatherData(location: LocationInterface) {
    return this.httpClient.get(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,surface_pressure,cloud_cover,visibility,uv_index&timezone=auto&past_days=7&forecast_days=16&models=best_match`)
  }
  
}

export interface LocationInterface {
  latitude: number;
  longitude: number;
}
