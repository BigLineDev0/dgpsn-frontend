import { TestBed } from '@angular/core/testing';

import { HistoryStatusService } from './history-status.service';

describe('HistoryStatusService', () => {
  let service: HistoryStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
