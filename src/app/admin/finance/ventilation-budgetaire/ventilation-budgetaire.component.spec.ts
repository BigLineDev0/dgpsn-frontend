import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentilationBudgetaireComponent } from './ventilation-budgetaire.component';

describe('VentilationBudgetaireComponent', () => {
  let component: VentilationBudgetaireComponent;
  let fixture: ComponentFixture<VentilationBudgetaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentilationBudgetaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentilationBudgetaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
