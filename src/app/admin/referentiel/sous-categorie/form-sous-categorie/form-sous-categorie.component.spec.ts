import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSousCategorieComponent } from './form-sous-categorie.component';

describe('FormSousCategorieComponent', () => {
  let component: FormSousCategorieComponent;
  let fixture: ComponentFixture<FormSousCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSousCategorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSousCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
