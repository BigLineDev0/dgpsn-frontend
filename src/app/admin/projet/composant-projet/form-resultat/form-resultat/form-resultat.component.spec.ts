import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResultatComponent } from './form-resultat.component';

describe('FormResultatComponent', () => {
  let component: FormResultatComponent;
  let fixture: ComponentFixture<FormResultatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormResultatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormResultatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
