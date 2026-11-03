import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingAvancementProjetComponent } from './routing-avancement-projet.component';

describe('RoutingAvancementProjetComponent', () => {
  let component: RoutingAvancementProjetComponent;
  let fixture: ComponentFixture<RoutingAvancementProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutingAvancementProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutingAvancementProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
