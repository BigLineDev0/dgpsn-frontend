import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvancDocumentProjetComponent } from './avanc-document-projet.component';

describe('AvancDocumentProjetComponent', () => {
  let component: AvancDocumentProjetComponent;
  let fixture: ComponentFixture<AvancDocumentProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvancDocumentProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvancDocumentProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
