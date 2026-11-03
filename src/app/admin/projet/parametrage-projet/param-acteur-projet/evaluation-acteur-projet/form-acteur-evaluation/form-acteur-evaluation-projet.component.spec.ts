import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActeurEvaluationProjetComponent } from './form-acteur-evaluation-projet.component';

describe('FormActeurEvaluationComponent', () => {
  let component: FormActeurEvaluationProjetComponent;
  let fixture: ComponentFixture<FormActeurEvaluationProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormActeurEvaluationProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormActeurEvaluationProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
