import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationDossierComponent } from './evaluation-dossier.component';

describe('EvaluationDossierComponent', () => {
  let component: EvaluationDossierComponent;
  let fixture: ComponentFixture<EvaluationDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationDossierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
