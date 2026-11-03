import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImageProjetComponent } from './upload-image-projet.component';

describe('UploadImageProjetComponent', () => {
  let component: UploadImageProjetComponent;
  let fixture: ComponentFixture<UploadImageProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadImageProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadImageProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
