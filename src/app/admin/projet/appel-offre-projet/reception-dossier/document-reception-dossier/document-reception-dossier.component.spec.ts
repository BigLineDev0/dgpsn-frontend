import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentReceptionDossierComponent } from './document-reception-dossier.component';

describe('DocumentReceptionDossierComponent', () => {
  let component: DocumentReceptionDossierComponent;
  let fixture: ComponentFixture<DocumentReceptionDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentReceptionDossierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentReceptionDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
