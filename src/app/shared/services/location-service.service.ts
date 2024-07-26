import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  private locationSubject = new BehaviorSubject<Location | null>(null);
  location$ = this.locationSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  setLocation(location: Location): void {
    this.locationSubject.next(location);
  }

  fetchWeather(location: Location): Observable<Weather> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,surface_pressure,cloud_cover,visibility,uv_index&timezone=Europe%2FBerlin&past_days=7`;
    return this.http.get<Weather>(url);
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