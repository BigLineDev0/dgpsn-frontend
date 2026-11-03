import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategorieDocumentComponent } from './list-categorie-document.component';

describe('ListCategorieDocumentComponent', () => {
  let component: ListCategorieDocumentComponent;
  let fixture: ComponentFixture<ListCategorieDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCategorieDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCategorieDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
