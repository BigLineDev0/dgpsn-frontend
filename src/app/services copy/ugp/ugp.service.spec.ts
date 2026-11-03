import { TestBed } from '@angular/core/testing';

import { UgpService } from './ugp.service';

describe('UgpService', () => {
  let service: UgpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UgpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
