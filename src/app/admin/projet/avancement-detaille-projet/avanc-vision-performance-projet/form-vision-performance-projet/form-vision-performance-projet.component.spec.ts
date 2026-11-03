import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVisionPerformanceProjetComponent } from './form-vision-performance-projet.component';

describe('FormVisionPerformanceProjetComponent', () => {
  let component: FormVisionPerformanceProjetComponent;
  let fixture: ComponentFixture<FormVisionPerformanceProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVisionPerformanceProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormVisionPerformanceProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
