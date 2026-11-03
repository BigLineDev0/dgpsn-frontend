import { TestBed } from '@angular/core/testing';

import { FinancementActivityService } from './financement-activity.service';

describe('FinancementActivityService', () => {
  let service: FinancementActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancementActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
