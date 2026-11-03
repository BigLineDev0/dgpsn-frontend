import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProjetEntrepriseComponent } from './form-projet-entreprise.component';

describe('FormProjetEntrepriseComponent', () => {
  let component: FormProjetEntrepriseComponent;
  let fixture: ComponentFixture<FormProjetEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProjetEntrepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProjetEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
