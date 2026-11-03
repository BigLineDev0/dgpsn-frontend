import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewgeneretedDocumentComponent } from './viewgenereted-document.component';

describe('ViewgeneretedDocumentComponent', () => {
  let component: ViewgeneretedDocumentComponent;
  let fixture: ComponentFixture<ViewgeneretedDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewgeneretedDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewgeneretedDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
