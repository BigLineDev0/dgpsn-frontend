import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailArchiveCourrierComponent } from './detail-archive-courrier.component';

describe('DetailArchiveCourrierComponent', () => {
  let component: DetailArchiveCourrierComponent;
  let fixture: ComponentFixture<DetailArchiveCourrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailArchiveCourrierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailArchiveCourrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
