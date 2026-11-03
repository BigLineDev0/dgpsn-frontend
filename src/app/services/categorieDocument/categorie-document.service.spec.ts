import { TestBed } from '@angular/core/testing';

import { CategorieDocumentService } from './categorie-document.service';

describe('CategorieDocumentService', () => {
  let service: CategorieDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
