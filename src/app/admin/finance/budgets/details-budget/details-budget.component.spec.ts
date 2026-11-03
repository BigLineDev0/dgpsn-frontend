import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBudgetComponent } from './details-budget.component';

describe('DetailsBudgetComponent', () => {
  let component: DetailsBudgetComponent;
  let fixture: ComponentFixture<DetailsBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsBudgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
