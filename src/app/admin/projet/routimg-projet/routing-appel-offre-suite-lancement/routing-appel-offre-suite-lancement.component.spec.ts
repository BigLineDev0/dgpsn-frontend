import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingAppelOffreSuiteLancementComponent } from './routing-appel-offre-suite-lancement.component';

describe('RoutingAppelOffreSuiteLancementComponent', () => {
  let component: RoutingAppelOffreSuiteLancementComponent;
  let fixture: ComponentFixture<RoutingAppelOffreSuiteLancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutingAppelOffreSuiteLancementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutingAppelOffreSuiteLancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
