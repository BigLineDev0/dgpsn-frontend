import { TestBed } from '@angular/core/testing';

import { MarketFolderService } from './market-folder.service';

describe('MarketFolderService', () => {
  let service: MarketFolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketFolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
