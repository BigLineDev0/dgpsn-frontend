import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIndicateurComponent } from './form-indicateur.component';

describe('FormIndicateurComponent', () => {
  let component: FormIndicateurComponent;
  let fixture: ComponentFixture<FormIndicateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormIndicateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormIndicateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
