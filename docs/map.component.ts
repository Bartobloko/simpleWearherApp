import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as L from 'leaflet'



@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  constructor() { }

  @Output() coordinatesSelected = new EventEmitter<{ lat: number, lng: number }>();
  @Input() coordinates: { lat: number, lng: number } | null = null;

  map: any;
  popup: any

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      import('leaflet').then(L => {
          this.initMap(L);     
          if (this.map && this.coordinates) {
            this.updateMapView(this.coordinates.lat, this.coordinates.lng);
            this.popup.setLatLng([this.coordinates.lat, this.coordinates.lng]).addTo(this.map);
          }
        }).catch(err => {
          console.error('Error loading Leaflet', err);
        });
    }
  }

  ngOnChanges(changes: any): void {
    if (changes.coordinates && this.map && this.coordinates) {
      this.updateMapView(this.coordinates.lat, this.coordinates.lng);
      this.popup.setLatLng([this.coordinates.lat, this.coordinates.lng]).addTo(this.map);
    }
  }

  private initMap(L: any): void {
    this.map = L.map('map', {
      center: [51, 19],
      zoom: 4
    });

    this.popup = L.marker([0, 0], {
      icon: L.icon({
        iconUrl: '/media/marker-icon.png',  // Ensure this path is correct
        iconSize: [25, 41],                        // Adjust these values if needed
        iconAnchor: [12, 41]                       // Adjust these values if needed
        // No shadowUrl specified
      })
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);
    
    this.map.on('click', (e: any) => {
      const { lat, lng } = e.latlng;
      this.coordinatesSelected.emit({ lat, lng }); 
    });
  }

  private updateMapView(lat: number, lng: number): void {
    this.map.setView([lat, lng], 10); 
  }
}
