import { TestBed } from '@angular/core/testing';

import { TripStatusService } from './trip-status.service';

describe('TripStatusService', () => {
  let service: TripStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
