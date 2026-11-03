import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCategoriebudgetaireComponent } from './list-categoriebudgetaire.component';

describe('ListCategoriebudgetaireComponent', () => {
  let component: ListCategoriebudgetaireComponent;
  let fixture: ComponentFixture<ListCategoriebudgetaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCategoriebudgetaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCategoriebudgetaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
