import { TestBed } from '@angular/core/testing';

import { RejetService } from './rejet.service';

describe('RejetService', () => {
  let service: RejetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RejetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
