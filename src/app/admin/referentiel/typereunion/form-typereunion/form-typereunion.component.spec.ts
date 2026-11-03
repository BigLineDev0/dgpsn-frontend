import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTypereunionComponent } from './form-typereunion.component';

describe('FormTypereunionComponent', () => {
  let component: FormTypereunionComponent;
  let fixture: ComponentFixture<FormTypereunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTypereunionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTypereunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
