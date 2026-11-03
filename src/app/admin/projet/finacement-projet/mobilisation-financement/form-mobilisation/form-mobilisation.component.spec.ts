import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMobilisationComponent } from './form-mobilisation.component';

describe('FormMobilisationComponent', () => {
  let component: FormMobilisationComponent;
  let fixture: ComponentFixture<FormMobilisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMobilisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMobilisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
