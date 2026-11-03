import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeParticipantMissionComponent } from './liste-participant-mission.component';

describe('ListeParticipantMissionComponent', () => {
  let component: ListeParticipantMissionComponent;
  let fixture: ComponentFixture<ListeParticipantMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeParticipantMissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeParticipantMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
