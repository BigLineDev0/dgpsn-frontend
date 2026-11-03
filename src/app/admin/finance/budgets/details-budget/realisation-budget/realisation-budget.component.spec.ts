import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealisationBudgetComponent } from './realisation-budget.component';

describe('RealisationBudgetComponent', () => {
  let component: RealisationBudgetComponent;
  let fixture: ComponentFixture<RealisationBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealisationBudgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealisationBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
