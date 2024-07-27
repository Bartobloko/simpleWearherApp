
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  constructor(
    private httpClient:HttpClient
  ) {}

  getWeatherData(): any {
    this.httpClient.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,surface_pressure,cloud_cover,visibility,uv_index&timezone=auto&past_days=7&forecast_days=16&models=best_match')
    .subscribe({
      next(res) {
        console.log(res)
      },error () {
        console.log("wywalam")
      }

    })
  }
}

interface Location {
  latitude: number;
  longitude: number;
}

interface Weather {
  temperature: number;
  condition: string;
}