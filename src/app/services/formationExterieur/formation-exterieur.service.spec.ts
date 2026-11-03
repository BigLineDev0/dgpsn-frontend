import { TestBed } from '@angular/core/testing';

import { FormationExterieurService } from './formation-exterieur.service';

describe('FormationExterieurService', () => {
  let service: FormationExterieurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormationExterieurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
