import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCessationComponent } from './form-cessation.component';

describe('FormCessationComponent', () => {
  let component: FormCessationComponent;
  let fixture: ComponentFixture<FormCessationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCessationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCessationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
