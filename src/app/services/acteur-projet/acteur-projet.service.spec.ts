import { TestBed } from '@angular/core/testing';

import { ActeurProjetService } from './acteur-projet.service';

describe('ActeurProjetService', () => {
  let service: ActeurProjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActeurProjetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
