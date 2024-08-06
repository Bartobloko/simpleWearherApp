import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedWeatherInfoComponent } from './detailed-weather-info.component';

describe('DetailedWeatherInfoComponent', () => {
  let component: DetailedWeatherInfoComponent;
  let fixture: ComponentFixture<DetailedWeatherInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedWeatherInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailedWeatherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
