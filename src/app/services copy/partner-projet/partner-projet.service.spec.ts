import { TestBed } from '@angular/core/testing';

import { PartnerProjetService } from './partner-projet.service';

describe('PartnerProjetService', () => {
  let service: PartnerProjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnerProjetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
