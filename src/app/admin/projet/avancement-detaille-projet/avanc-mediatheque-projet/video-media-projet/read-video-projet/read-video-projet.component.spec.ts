import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadVideoProjetComponent } from './read-video-projet.component';

describe('ReadVideoProjetComponent', () => {
  let component: ReadVideoProjetComponent;
  let fixture: ComponentFixture<ReadVideoProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadVideoProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadVideoProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
