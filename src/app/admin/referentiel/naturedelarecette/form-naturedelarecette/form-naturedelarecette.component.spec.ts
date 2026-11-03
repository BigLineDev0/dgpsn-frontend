import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormNaturedelarecetteComponent } from './form-naturedelarecette.component';

describe('FormNaturedelarecetteComponent', () => {
  let component: FormNaturedelarecetteComponent;
  let fixture: ComponentFixture<FormNaturedelarecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNaturedelarecetteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNaturedelarecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
