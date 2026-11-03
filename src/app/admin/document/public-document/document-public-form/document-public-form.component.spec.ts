import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPublicFormComponent } from './document-public-form.component';

describe('DocumentPublicFormComponent', () => {
  let component: DocumentPublicFormComponent;
  let fixture: ComponentFixture<DocumentPublicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentPublicFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentPublicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
