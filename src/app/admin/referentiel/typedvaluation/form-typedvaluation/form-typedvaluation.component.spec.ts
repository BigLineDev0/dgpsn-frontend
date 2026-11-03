import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTypedvaluationComponent } from './form-typedvaluation.component';

describe('FormTypedvaluationComponent', () => {
  let component: FormTypedvaluationComponent;
  let fixture: ComponentFixture<FormTypedvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTypedvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTypedvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
