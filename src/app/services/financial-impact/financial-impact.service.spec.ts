import { TestBed } from '@angular/core/testing';

import { FinancialImpactService } from './financial-impact.service';

describe('FinancialImpactService', () => {
  let service: FinancialImpactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialImpactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
