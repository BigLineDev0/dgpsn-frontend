import { TestBed } from '@angular/core/testing';

import { IndicateurProjetService } from './indicateur-projet.service';

describe('IndicateurProjetService', () => {
  let service: IndicateurProjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicateurProjetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
