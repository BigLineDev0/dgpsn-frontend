import { TestBed } from '@angular/core/testing';

import { IssuelogResolveChannelService } from './issuelog-resolve-channel.service';

describe('IssuelogResolveChannelService', () => {
  let service: IssuelogResolveChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuelogResolveChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
