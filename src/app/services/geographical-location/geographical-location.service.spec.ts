import { TestBed } from '@angular/core/testing';

import { GeographicalLocationService } from './geographical-location.service';

describe('GeographicalLocationService', () => {
  let service: GeographicalLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeographicalLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
