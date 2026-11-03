import { TestBed } from '@angular/core/testing';

import { FinancementBudgetService } from './financement-budget.service';

describe('FinancementBudgetService', () => {
  let service: FinancementBudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancementBudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
