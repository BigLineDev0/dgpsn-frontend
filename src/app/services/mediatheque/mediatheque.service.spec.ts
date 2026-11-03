import { TestBed } from '@angular/core/testing';

import { MediathequeService } from './mediatheque.service';

describe('MediathequeService', () => {
  let service: MediathequeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediathequeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
