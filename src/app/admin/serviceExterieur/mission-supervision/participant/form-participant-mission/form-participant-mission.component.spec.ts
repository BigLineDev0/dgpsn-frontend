import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormParticipantMissionComponent } from './form-participant-mission.component';

describe('FormParticipantMissionComponent', () => {
  let component: FormParticipantMissionComponent;
  let fixture: ComponentFixture<FormParticipantMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormParticipantMissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormParticipantMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
