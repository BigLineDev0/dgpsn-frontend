import { TestBed } from '@angular/core/testing';

import { CadreLogiqueService } from './cadre-logique.service';

describe('CadreLogiqueService', () => {
  let service: CadreLogiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadreLogiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
