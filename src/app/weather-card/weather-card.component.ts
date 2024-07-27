import { Component, HostListener } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LocationService } from '../shared/services/location-service.service';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent {

  constructor(
    private locationService:LocationService,
  ){}

  ngOnInit() {
    this.locationService.getWeatherData()
  }




  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
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
