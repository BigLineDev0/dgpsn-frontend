import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSourceComponent } from './form-source.component';

describe('FormSourceComponent', () => {
  let component: FormSourceComponent;
  let fixture: ComponentFixture<FormSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
