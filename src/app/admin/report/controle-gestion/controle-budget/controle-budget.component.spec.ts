import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleBudgetComponent } from './controle-budget.component';

describe('ControleBudgetComponent', () => {
  let component: ControleBudgetComponent;
  let fixture: ComponentFixture<ControleBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControleBudgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControleBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
