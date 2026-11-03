import { TestBed } from '@angular/core/testing';

import { HistoryFlagService } from './history-flag.service';

describe('HistoryFlagService', () => {
  let service: HistoryFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryFlagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
