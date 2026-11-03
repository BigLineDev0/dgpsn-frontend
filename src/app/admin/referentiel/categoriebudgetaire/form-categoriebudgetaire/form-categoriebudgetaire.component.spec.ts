import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCategoriebudgetaireComponent } from './form-categoriebudgetaire.component';

describe('FormCategoriebudgetaireComponent', () => {
  let component: FormCategoriebudgetaireComponent;
  let fixture: ComponentFixture<FormCategoriebudgetaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCategoriebudgetaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCategoriebudgetaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
