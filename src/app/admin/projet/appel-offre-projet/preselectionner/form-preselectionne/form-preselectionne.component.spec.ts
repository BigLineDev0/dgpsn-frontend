import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPreselectionneComponent } from './form-preselectionne.component';

describe('FormPreselectionneComponent', () => {
  let component: FormPreselectionneComponent;
  let fixture: ComponentFixture<FormPreselectionneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPreselectionneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPreselectionneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
