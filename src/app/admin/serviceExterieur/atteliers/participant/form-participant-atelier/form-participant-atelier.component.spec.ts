import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormParticipantAtelierComponent } from './form-participant-atelier.component';

describe('FormParticipantAtelierComponent', () => {
  let component: FormParticipantAtelierComponent;
  let fixture: ComponentFixture<FormParticipantAtelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormParticipantAtelierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormParticipantAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
