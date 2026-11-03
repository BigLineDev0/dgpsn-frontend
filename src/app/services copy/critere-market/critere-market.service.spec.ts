import { TestBed } from '@angular/core/testing';

import { CritereMarketService } from './critere-market.service';

describe('CritereMarketService', () => {
  let service: CritereMarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CritereMarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
