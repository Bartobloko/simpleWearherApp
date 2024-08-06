import { TestBed } from '@angular/core/testing';

import { ToastDataService } from './toast-data.service';

describe('ToastDataService', () => {
  let service: ToastDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
