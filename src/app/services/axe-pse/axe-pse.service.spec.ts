import { TestBed } from '@angular/core/testing';

import { AxePseService } from './axe-pse.service';

describe('AxePseService', () => {
  let service: AxePseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AxePseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
