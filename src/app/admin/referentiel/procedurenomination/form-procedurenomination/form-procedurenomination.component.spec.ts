import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormProcedurenominationComponent } from './form-procedurenomination.component';

describe('FormProcedurenominationComponent', () => {
  let component: FormProcedurenominationComponent;
  let fixture: ComponentFixture<FormProcedurenominationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProcedurenominationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProcedurenominationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
