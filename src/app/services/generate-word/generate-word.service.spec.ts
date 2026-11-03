import { TestBed } from '@angular/core/testing';

import { GenerateWordService } from './generate-word.service';

describe('GenerateWordService', () => {
  let service: GenerateWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
