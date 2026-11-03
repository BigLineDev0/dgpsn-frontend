import { TestBed } from '@angular/core/testing';

import { ManangementUnitService } from './manangement-unit.service';

describe('ManangementUnitService', () => {
  let service: ManangementUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManangementUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
