import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPublicSearchComponent } from './document-public-search.component';

describe('DocumentPublicSearchComponent', () => {
  let component: DocumentPublicSearchComponent;
  let fixture: ComponentFixture<DocumentPublicSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentPublicSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentPublicSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
