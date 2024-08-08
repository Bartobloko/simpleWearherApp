import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MapService } from '../shared/services/map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  constructor(
    private mapService: MapService,
  ) { }

  @Output() coordinatesSelected = new EventEmitter<{ lat: number, lng: number }>();
  @Input() coordinates: { lat: number, lng: number } | null = null;

  map: any;
  popup: any;

  async ngAfterViewInit(): Promise<void> {
    if (globalThis.window !== undefined) {
      await this.mapService.loadLeaflet();  // Ensure Leaflet is loaded

      if (this.mapService.L) {
        this.initMap();
        if (this.map && this.coordinates) {
          this.updateMapView(this.coordinates.lat, this.coordinates.lng);
          this.popup.setLatLng([this.coordinates.lat, this.coordinates.lng]).addTo(this.map);
        }
      } else {
        console.error('Leaflet library failed to load');
      }
    }
  }

  ngOnChanges(changes: any): void {
    if (changes.coordinates && this.map && this.coordinates) {
      this.updateMapView(this.coordinates.lat, this.coordinates.lng);
      this.popup.setLatLng([this.coordinates.lat, this.coordinates.lng]).addTo(this.map);
    }
  }

  private initMap(): void {
    //@ts-ignore
    this.map = this.mapService.L.map('map', {
      center: [51, 19],
      zoom: 4
    });

    //@ts-ignore
    this.popup = this.mapService.L.marker([0, 0], {
      //@ts-ignore
      icon: this.mapService.L.icon({
        iconUrl: 'assets/media/geoMarker.png',
        iconSize: [16, 16],
        iconAnchor: [8, 0]
      })
    });

    //@ts-ignore
    this.mapService.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);

    this.map.on('click', (e: any) => {
      const { lat, lng } = e.latlng;
      this.coordinatesSelected.emit({ lat, lng });
    });
  }

  private updateMapView(lat: number, lng: number): void {
    this.map.setView([lat, lng], 10);
  }
}
