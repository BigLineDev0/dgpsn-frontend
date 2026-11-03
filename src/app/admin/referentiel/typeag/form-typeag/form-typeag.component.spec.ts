import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTypeagComponent } from './form-typeag.component';

describe('FormTypeagComponent', () => {
  let component: FormTypeagComponent;
  let fixture: ComponentFixture<FormTypeagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTypeagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTypeagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
