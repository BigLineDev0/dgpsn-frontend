import { TestBed } from '@angular/core/testing';

import { RepertoireDeclarationService } from './repertoire-declaration.service';

describe('RepertoireDeclarationService', () => {
  let service: RepertoireDeclarationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepertoireDeclarationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
