import { TestBed } from '@angular/core/testing';

import { ValueIndicatorService } from './value-indicator.service';

describe('ValueIndicatorService', () => {
  let service: ValueIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueIndicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
