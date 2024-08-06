import { TestBed } from '@angular/core/testing';

import { WeatherCardDataService } from './weather-card-data.service';

describe('WeatherCardDataService', () => {
  let service: WeatherCardDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherCardDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
