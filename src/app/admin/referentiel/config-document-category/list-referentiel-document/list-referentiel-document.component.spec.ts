import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReferentielDocumentComponent } from './list-referentiel-document.component';

describe('ListReferentielDocumentComponent', () => {
  let component: ListReferentielDocumentComponent;
  let fixture: ComponentFixture<ListReferentielDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReferentielDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListReferentielDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
