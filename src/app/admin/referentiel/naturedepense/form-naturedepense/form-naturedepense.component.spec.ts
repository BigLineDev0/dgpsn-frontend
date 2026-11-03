import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormNaturedepenseComponent } from './form-naturedepense.component';

describe('FormNaturedepenseComponent', () => {
  let component: FormNaturedepenseComponent;
  let fixture: ComponentFixture<FormNaturedepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNaturedepenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNaturedepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
