import { TestBed } from '@angular/core/testing';

import { TypeCadreLogiqueService } from './type-cadre-logique.service';

describe('TypeCadreLogiqueService', () => {
  let service: TypeCadreLogiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeCadreLogiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
