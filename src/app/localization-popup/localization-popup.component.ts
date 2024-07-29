import { Component } from '@angular/core';
import { MapComponent } from "../map/map.component";

@Component({
  selector: 'app-localization-popup',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './localization-popup.component.html',
  styleUrl: './localization-popup.component.scss'
})
export class LocalizationPopupComponent {

}
