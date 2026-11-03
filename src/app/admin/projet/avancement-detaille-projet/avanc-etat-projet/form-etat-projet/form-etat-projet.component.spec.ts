import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEtatProjetComponent } from './form-etat-projet.component';

describe('FormEtatProjetComponent', () => {
  let component: FormEtatProjetComponent;
  let fixture: ComponentFixture<FormEtatProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEtatProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEtatProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
