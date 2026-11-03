import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingProjetComponent } from './routing-projet.component';

describe('RoutimgProjetComponent', () => {
  let component: RoutingProjetComponent;
  let fixture: ComponentFixture<RoutingProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutingProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutingProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
