import { TestBed } from '@angular/core/testing';

import { PlanPassationService } from './plan-passation.service';

describe('PlanPassationService', () => {
  let service: PlanPassationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanPassationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
