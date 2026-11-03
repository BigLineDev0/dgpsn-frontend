import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormObjectifProjetComponent } from './form-objectif-projet.component';

describe('FormObjectifProjetComponent', () => {
  let component: FormObjectifProjetComponent;
  let fixture: ComponentFixture<FormObjectifProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormObjectifProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormObjectifProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
