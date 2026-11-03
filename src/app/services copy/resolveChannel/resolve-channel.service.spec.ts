import { TestBed } from '@angular/core/testing';

import { ResolveChannelService } from './resolve-channel.service';

describe('ResolveChannelService', () => {
  let service: ResolveChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolveChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
