import { TestBed } from '@angular/core/testing';

import { DelayImpactService } from './delay-impact.service';

describe('DelayImpactService', () => {
  let service: DelayImpactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelayImpactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
