import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReceptionDossierComponent } from './form-reception-dossier.component';

describe('FormReceptionDossierComponent', () => {
  let component: FormReceptionDossierComponent;
  let fixture: ComponentFixture<FormReceptionDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormReceptionDossierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormReceptionDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
