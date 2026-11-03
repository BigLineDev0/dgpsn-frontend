import { TestBed } from '@angular/core/testing';

import { BudgetActivityService } from './budget-activity.service';

describe('BudgetActivityService', () => {
  let service: BudgetActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
