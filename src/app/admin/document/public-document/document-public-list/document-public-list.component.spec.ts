import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPublicListComponent } from './document-public-list.component';

describe('DocumentPublicListComponent', () => {
  let component: DocumentPublicListComponent;
  let fixture: ComponentFixture<DocumentPublicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentPublicListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentPublicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
