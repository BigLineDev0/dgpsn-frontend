import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDocumentProjetComponent } from './form-document-projet.component';

describe('FormDocumentProjetComponent', () => {
  let component: FormDocumentProjetComponent;
  let fixture: ComponentFixture<FormDocumentProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDocumentProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDocumentProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
