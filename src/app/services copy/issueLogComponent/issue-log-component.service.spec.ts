import { TestBed } from '@angular/core/testing';

import { IssueLogComponentService } from './issue-log-component.service';

describe('IssueLogComponentService', () => {
  let service: IssueLogComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueLogComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
