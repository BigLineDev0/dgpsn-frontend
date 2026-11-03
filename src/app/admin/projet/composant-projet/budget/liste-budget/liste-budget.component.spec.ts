import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBudgetComponent } from './liste-budget.component';

describe('ListeBudgetComponent', () => {
  let component: ListeBudgetComponent;
  let fixture: ComponentFixture<ListeBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeBudgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
