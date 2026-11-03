import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPeriodiciteComponent } from './form-periodicite.component';

describe('FormPeriodiciteComponent', () => {
  let component: FormPeriodiciteComponent;
  let fixture: ComponentFixture<FormPeriodiciteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPeriodiciteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPeriodiciteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
