import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvancVisionPerformanceProjetComponent } from './avanc-vision-performance-projet.component';

describe('AvancVisionPerformanceProjetComponent', () => {
  let component: AvancVisionPerformanceProjetComponent;
  let fixture: ComponentFixture<AvancVisionPerformanceProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvancVisionPerformanceProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvancVisionPerformanceProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
