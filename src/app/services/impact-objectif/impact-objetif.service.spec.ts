import { TestBed } from '@angular/core/testing';

import { ImpactObjetifService } from './impact-objetif.service';

describe('ImpactObjetifService', () => {
  let service: ImpactObjetifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpactObjetifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
