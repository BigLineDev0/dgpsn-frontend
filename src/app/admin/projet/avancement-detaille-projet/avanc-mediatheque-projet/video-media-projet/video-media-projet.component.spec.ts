import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoMediaProjetComponent } from './video-media-projet.component';

describe('VideoMediaProjetComponent', () => {
  let component: VideoMediaProjetComponent;
  let fixture: ComponentFixture<VideoMediaProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoMediaProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoMediaProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
