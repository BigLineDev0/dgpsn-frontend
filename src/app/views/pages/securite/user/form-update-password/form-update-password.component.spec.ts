import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdatePasswordComponent } from './form-update-password.component';

describe('FormUpdatePasswordComponent', () => {
  let component: FormUpdatePasswordComponent;
  let fixture: ComponentFixture<FormUpdatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdatePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
