import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSousSecteurComponent } from './form-sous-secteur.component';

describe('FormSousSecteurComponent', () => {
  let component: FormSousSecteurComponent;
  let fixture: ComponentFixture<FormSousSecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSousSecteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSousSecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
