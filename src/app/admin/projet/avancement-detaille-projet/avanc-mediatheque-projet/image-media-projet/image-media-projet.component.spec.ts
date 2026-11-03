import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMediaProjetComponent } from './image-media-projet.component';

describe('ImageMediaProjetComponent', () => {
  let component: ImageMediaProjetComponent;
  let fixture: ComponentFixture<ImageMediaProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageMediaProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageMediaProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
