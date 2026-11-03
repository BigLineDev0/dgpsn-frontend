import { TestBed } from '@angular/core/testing';

import { DocumentPublicService } from './document-public.service';

describe('DocumentPublicService', () => {
  let service: DocumentPublicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentPublicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
