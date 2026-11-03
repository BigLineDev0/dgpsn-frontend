import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPublicPdfComponent } from './document-public-pdf.component';

describe('DocumentPublicPdfComponent', () => {
  let component: DocumentPublicPdfComponent;
  let fixture: ComponentFixture<DocumentPublicPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentPublicPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentPublicPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
