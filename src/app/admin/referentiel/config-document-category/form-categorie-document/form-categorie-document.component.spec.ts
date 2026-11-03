import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCategorieDocumentComponent } from './form-categorie-document.component';

describe('FormCategorieDocumentComponent', () => {
  let component: FormCategorieDocumentComponent;
  let fixture: ComponentFixture<FormCategorieDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCategorieDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCategorieDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
