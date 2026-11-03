import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingFinancementComponent } from './routing-financement.component';

describe('RoutingFinancementComponent', () => {
  let component: RoutingFinancementComponent;
  let fixture: ComponentFixture<RoutingFinancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutingFinancementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutingFinancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
