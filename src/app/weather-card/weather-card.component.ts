import { Component, HostListener } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LocationService } from '../shared/services/location-service.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent {

  constructor(
    private locationService:LocationService,
  ){}
  
  private isAnimating = false;

  ngOnInit() {
    this.getWeatherData()
  }

  getWeatherData() {
    this.locationService.location$.subscribe(location => {
      if (location){
        this.locationService.getWeatherData(location).subscribe({ 
          next: (value) => {
            console.log(value)
          },
          error: () => {
          }
        }) 
      }
    })
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
