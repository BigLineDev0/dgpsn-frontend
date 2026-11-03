import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetDashbordComponent } from './budget-dashbord.component';

describe('BudgetDashbordComponent', () => {
  let component: BudgetDashbordComponent;
  let fixture: ComponentFixture<BudgetDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
