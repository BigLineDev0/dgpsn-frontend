import { TestBed } from '@angular/core/testing';

import { ParticipantMissionService } from './participant-mission.service';

describe('ParticipantMissionService', () => {
  let service: ParticipantMissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipantMissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
