import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlanPassationProjetComponent } from './form-plan-passation-projet.component';

describe('FormPlanPassationProjetComponent', () => {
  let component: FormPlanPassationProjetComponent;
  let fixture: ComponentFixture<FormPlanPassationProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPlanPassationProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPlanPassationProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
