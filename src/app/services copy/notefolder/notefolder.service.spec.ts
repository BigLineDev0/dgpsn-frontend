import { TestBed } from '@angular/core/testing';

import { NotefolderService } from './notefolder.service';

describe('NotefolderService', () => {
  let service: NotefolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotefolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
