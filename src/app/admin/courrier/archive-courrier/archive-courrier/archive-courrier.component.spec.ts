import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveCourrierComponent } from './archive-courrier.component';

describe('ArchiveCourrierComponent', () => {
  let component: ArchiveCourrierComponent;
  let fixture: ComponentFixture<ArchiveCourrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveCourrierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveCourrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
