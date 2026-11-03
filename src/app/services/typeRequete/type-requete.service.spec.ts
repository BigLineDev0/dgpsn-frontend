import { TestBed } from '@angular/core/testing';

import { TypeRequeteService } from './type-requete.service';

describe('TypeRequeteService', () => {
  let service: TypeRequeteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeRequeteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
