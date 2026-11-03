import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIndicateurProjetComponent } from './form-indicateur-projet.component';

describe('FormIndicateurProjetComponent', () => {
  let component: FormIndicateurProjetComponent;
  let fixture: ComponentFixture<FormIndicateurProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormIndicateurProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormIndicateurProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
