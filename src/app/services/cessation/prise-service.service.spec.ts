import { TestBed } from '@angular/core/testing';

import { PriseServiceService } from './prise-service.service';

describe('PriseServiceService', () => {
  let service: PriseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
