import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheSyntheseBudgetComponent } from './fiche-synthese-budget.component';

describe('FicheSyntheseBudgetComponent', () => {
  let component: FicheSyntheseBudgetComponent;
  let fixture: ComponentFixture<FicheSyntheseBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FicheSyntheseBudgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheSyntheseBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
