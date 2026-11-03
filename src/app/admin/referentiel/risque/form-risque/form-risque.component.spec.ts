import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRisqueComponent } from './form-risque.component';

describe('FormRisqueComponent', () => {
  let component: FormRisqueComponent;
  let fixture: ComponentFixture<FormRisqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRisqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRisqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
