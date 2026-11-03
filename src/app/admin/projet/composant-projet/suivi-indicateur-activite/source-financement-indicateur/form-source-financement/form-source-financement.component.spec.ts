import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSourceFinancementComponent } from './form-source-financement.component';

describe('FormSourceFinancementComponent', () => {
  let component: FormSourceFinancementComponent;
  let fixture: ComponentFixture<FormSourceFinancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSourceFinancementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSourceFinancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
