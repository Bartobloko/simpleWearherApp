import { Component, EventEmitter, Output } from '@angular/core';
import { MapComponent } from "../map/map.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LocationInterface, LocationService } from '../shared/services/location-service.service';

@Component({
  selector: 'app-localization-popup',
  standalone: true,
  imports: [
    MapComponent,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './localization-popup.component.html',
  styleUrl: './localization-popup.component.scss'
})
export class LocalizationPopupComponent {

  constructor(
    private locationService:LocationService,
  ){}

  @Output() closePopup  = new EventEmitter();

  localizationForm = new FormGroup({
    latitude: new FormControl(0,[Validators.required]),
    longitude: new FormControl(0,[Validators.required]),
  })

  coordinates: { lat: number, lng: number } | null = null;
  
  ngOnInit(): void {
    this.locationService.location$.subscribe(location => {
      if(location) {
        this.localizationForm.setValue ({
          latitude: location.latitude,
          longitude: location.longitude,
        }) 
        this.coordinates = {
          lat:location.latitude,
          lng:location.longitude
        }
      }
    })

    this.localizationForm.valueChanges.subscribe(values => {
      const lat = values.latitude !== null && values.latitude !== undefined
      ? parseFloat(values.latitude.toString())
      : NaN;

      const lng = values.longitude !== null && values.longitude !== undefined
      ? parseFloat(values.longitude.toString())
      : NaN

      if (!isNaN(lat) && !isNaN(lng)) {
        this.coordinates = { lat, lng };
      }
    });
  }

  onCoordinatesSelected(event: { lat: number, lng: number }) {
    this.localizationForm.setValue({
      latitude: event.lat,
      longitude: event.lng
    });
  }

  saveForm() {
    if(this.localizationForm.valid) {
      this.locationService.setLocation({
        latitude: this.localizationForm.get('latitude')?.value ?? 0,
        longitude: this.localizationForm.get('longitude')?.value ?? 0
      });
      this.closePopup.emit()
    }
  }

}
