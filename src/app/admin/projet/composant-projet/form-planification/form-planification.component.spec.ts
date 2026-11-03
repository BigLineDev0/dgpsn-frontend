import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlanificationComponent } from './form-planification.component';

describe('FormPlanificationComponent', () => {
  let component: FormPlanificationComponent;
  let fixture: ComponentFixture<FormPlanificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPlanificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPlanificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
