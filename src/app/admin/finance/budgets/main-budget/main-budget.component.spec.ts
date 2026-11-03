import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBudgetComponent } from './main-budget.component';

describe('MainBudgetComponent', () => {
  let component: MainBudgetComponent;
  let fixture: ComponentFixture<MainBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainBudgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
