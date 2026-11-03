import { TestBed } from '@angular/core/testing';

import { IssuelogStructureService } from './issuelog-structure.service';

describe('IssuelogStructureService', () => {
  let service: IssuelogStructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuelogStructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
