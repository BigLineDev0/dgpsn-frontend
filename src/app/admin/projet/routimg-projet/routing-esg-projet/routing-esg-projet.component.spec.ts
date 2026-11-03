import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingEsgProjetComponent } from './routing-esg-projet.component';

describe('RoutingEsgProjetComponent', () => {
  let component: RoutingEsgProjetComponent;
  let fixture: ComponentFixture<RoutingEsgProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutingEsgProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutingEsgProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
