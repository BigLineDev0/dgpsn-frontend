import { TestBed } from '@angular/core/testing';

import { PreselectionnedFileService } from './preselectionned-file.service';

describe('PreselectionnedFileService', () => {
  let service: PreselectionnedFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreselectionnedFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
