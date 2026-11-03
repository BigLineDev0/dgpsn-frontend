import { TestBed } from '@angular/core/testing';

import { CriticityService } from './criticity.service';

describe('CriticityService', () => {
  let service: CriticityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriticityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
