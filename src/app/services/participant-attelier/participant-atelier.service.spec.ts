import { TestBed } from '@angular/core/testing';

import { ParticipantAtelierService } from './participant-atelier.service';

describe('ParticipantAtelierService', () => {
  let service: ParticipantAtelierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipantAtelierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
