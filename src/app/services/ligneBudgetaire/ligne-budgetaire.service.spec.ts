import { TestBed } from '@angular/core/testing';

import { LigneBudgetaireService } from './ligne-budgetaire.service';

describe('LigneBudgetaireService', () => {
  let service: LigneBudgetaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigneBudgetaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
