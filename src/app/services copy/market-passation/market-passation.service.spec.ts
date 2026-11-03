import { TestBed } from '@angular/core/testing';

import { MarketPassationService } from './market-passation.service';

describe('MarketPassationService', () => {
  let service: MarketPassationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketPassationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
