import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCaracteristiqueComponent } from './form-caracteristique.component';

describe('FormCaracteristiqueComponent', () => {
  let component: FormCaracteristiqueComponent;
  let fixture: ComponentFixture<FormCaracteristiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCaracteristiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCaracteristiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
