import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRegionComponent } from './form-region.component';

describe('FormRegionComponent', () => {
  let component: FormRegionComponent;
  let fixture: ComponentFixture<FormRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
