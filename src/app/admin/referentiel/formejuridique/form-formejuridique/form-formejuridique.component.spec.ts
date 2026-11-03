import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFormejuridiqueComponent } from './form-formejuridique.component';

describe('FormFormejuridiqueComponent', () => {
  let component: FormFormejuridiqueComponent;
  let fixture: ComponentFixture<FormFormejuridiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFormejuridiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFormejuridiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
