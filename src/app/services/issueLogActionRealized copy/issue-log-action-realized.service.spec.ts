import { TestBed } from '@angular/core/testing';

import { IssueLogActionRealizedService } from './issue-log-action-realized.service';

describe('IssueLogActionRealizedService', () => {
  let service: IssueLogActionRealizedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueLogActionRealizedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
