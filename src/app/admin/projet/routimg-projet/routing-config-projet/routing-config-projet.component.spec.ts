import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingConfigProjetComponent } from './routing-config-projet.component';

describe('RoutingConfigProjetComponent', () => {
  let component: RoutingConfigProjetComponent;
  let fixture: ComponentFixture<RoutingConfigProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutingConfigProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutingConfigProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
