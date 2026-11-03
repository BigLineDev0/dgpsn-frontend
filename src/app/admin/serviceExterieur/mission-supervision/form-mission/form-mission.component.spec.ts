import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMissionComponent } from './form-mission.component';

describe('FormMissionComponent', () => {
  let component: FormMissionComponent;
  let fixture: ComponentFixture<FormMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
