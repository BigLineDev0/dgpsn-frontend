import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsProjetComponent } from './documents-projet.component';

describe('DocumentsProjetComponent', () => {
  let component: DocumentsProjetComponent;
  let fixture: ComponentFixture<DocumentsProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
