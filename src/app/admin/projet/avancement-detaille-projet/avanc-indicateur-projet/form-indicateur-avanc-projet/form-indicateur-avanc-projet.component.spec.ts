import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIndicateurAvancProjetComponent } from './form-indicateur-avanc-projet.component';

describe('FormIndicateurProjetComponent', () => {
  let component: FormIndicateurAvancProjetComponent;
  let fixture: ComponentFixture<FormIndicateurAvancProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormIndicateurAvancProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormIndicateurAvancProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
