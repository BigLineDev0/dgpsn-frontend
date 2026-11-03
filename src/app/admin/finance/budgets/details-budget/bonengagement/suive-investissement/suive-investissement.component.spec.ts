import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiveInvestissementComponent } from './suive-investissement.component';

describe('SuiveInvestissementComponent', () => {
  let component: SuiveInvestissementComponent;
  let fixture: ComponentFixture<SuiveInvestissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiveInvestissementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuiveInvestissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
