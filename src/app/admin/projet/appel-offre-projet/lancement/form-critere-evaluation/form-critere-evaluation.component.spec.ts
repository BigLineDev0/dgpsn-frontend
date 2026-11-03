import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCritereEvaluationComponent } from './form-critere-evaluation.component';

describe('FormCritereEvaluationComponent', () => {
  let component: FormCritereEvaluationComponent;
  let fixture: ComponentFixture<FormCritereEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCritereEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCritereEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
