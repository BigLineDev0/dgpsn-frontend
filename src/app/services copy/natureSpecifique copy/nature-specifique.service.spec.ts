import { TestBed } from '@angular/core/testing';

import { NatureSpecifiqueService } from './nature-specifique.service';

describe('NatureSpecifiqueService', () => {
  let service: NatureSpecifiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NatureSpecifiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
