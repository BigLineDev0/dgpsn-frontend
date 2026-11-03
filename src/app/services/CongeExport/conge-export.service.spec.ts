import { TestBed } from '@angular/core/testing';

import { CongeExportService } from './conge-export.service';

describe('CongeExportService', () => {
  let service: CongeExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CongeExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
