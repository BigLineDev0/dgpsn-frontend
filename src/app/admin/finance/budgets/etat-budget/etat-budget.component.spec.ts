import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatBudgetComponent } from './etat-budget.component';

describe('EtatBudgetComponent', () => {
  let component: EtatBudgetComponent;
  let fixture: ComponentFixture<EtatBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtatBudgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtatBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
