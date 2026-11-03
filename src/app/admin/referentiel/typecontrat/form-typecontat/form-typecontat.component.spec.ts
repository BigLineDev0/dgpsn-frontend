import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTypecontatComponent } from './form-typecontat.component';

describe('FormTypecontatComponent', () => {
  let component: FormTypecontatComponent;
  let fixture: ComponentFixture<FormTypecontatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTypecontatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTypecontatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
