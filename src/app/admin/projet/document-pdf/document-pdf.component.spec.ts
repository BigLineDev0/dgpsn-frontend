import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPdfComponent } from './document-pdf.component';

describe('DocumentPdfComponent', () => {
  let component: DocumentPdfComponent;
  let fixture: ComponentFixture<DocumentPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
