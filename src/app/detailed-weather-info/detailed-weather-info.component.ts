import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HourlyWeatherDataConverted } from '../shared/interfaces/hourly-weather-data';
import { Units } from '../shared/interfaces/units';
import { LocationInterface } from '../shared/services/location-service.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detailed-weather-info',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './detailed-weather-info.component.html',
  styleUrl: './detailed-weather-info.component.scss'
})
export class DetailedWeatherInfoComponent {

  constructor(
  ) {}

  @Input() popupData!: HourlyWeatherDataConverted;
  @Input() units!: Units
  @Input() location!: LocationInterface | null
  @Output() closePopup  = new EventEmitter();



}
