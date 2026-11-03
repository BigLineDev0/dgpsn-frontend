import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExecutionComponent } from './form-execution.component';

describe('FormExecutionComponent', () => {
  let component: FormExecutionComponent;
  let fixture: ComponentFixture<FormExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormExecutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
