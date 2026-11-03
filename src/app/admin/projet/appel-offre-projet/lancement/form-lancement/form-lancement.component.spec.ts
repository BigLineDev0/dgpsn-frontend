import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLancementComponent } from './form-lancement.component';

describe('FormLancementComponent', () => {
  let component: FormLancementComponent;
  let fixture: ComponentFixture<FormLancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLancementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
