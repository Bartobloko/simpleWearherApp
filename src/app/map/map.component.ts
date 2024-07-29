import { Component } from '@angular/core';
import * as L from 'leaflet'

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  map: any;
  popup: any

  constructor() { }

  ngOnInit(): void {
     import('leaflet').then(L => {
        this.initMap(L);
      }).catch(err => {
        console.error('Error loading Leaflet', err);
      });
  }

  private initMap(L: any): void {
    this.map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 13
    });

    this.popup = L.popup();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.on('click', (e: any) => {
      const { lat, lng } = e.latlng;
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      this.popup
        .setLatLng(e.latlng)
        .setContent(`Got It`)
        .openOn(this.map);
    });
  }

}
