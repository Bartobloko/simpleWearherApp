import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public L: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadLeaflet();
    }
  }

  async loadLeaflet(): Promise<void> {
    if (this.L === null && isPlatformBrowser(this.platformId)) {
      try {
        const leafletModule = await import('leaflet');
        this.L = leafletModule.default;
      } catch (error) {
        console.error('Error loading Leaflet:', error);
      }
    }
  }
}
