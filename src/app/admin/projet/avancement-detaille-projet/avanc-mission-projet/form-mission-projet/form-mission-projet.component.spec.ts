import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMissionProjetComponent } from './form-mission-projet.component';

describe('FormMissionProjetComponent', () => {
  let component: FormMissionProjetComponent;
  let fixture: ComponentFixture<FormMissionProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMissionProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMissionProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
