import { TestBed } from '@angular/core/testing';

import { TypecontratService } from './typecontrat.service';

describe('TypecontratService', () => {
  let service: TypecontratService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypecontratService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
