import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStatutProjetComponent } from './form-statut-projet.component';

describe('FormStatutProjetComponent', () => {
  let component: FormStatutProjetComponent;
  let fixture: ComponentFixture<FormStatutProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStatutProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormStatutProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
