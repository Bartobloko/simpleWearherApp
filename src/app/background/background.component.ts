import { Component } from '@angular/core';
import {MatButtonModule, } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WeatherCardComponent } from "../weather-card/weather-card.component";

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, WeatherCardComponent],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent {

}
