import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingAppelOffreProjetComponent } from './routing-appel-offre-projet.component';

describe('RoutingAppelOffreProjetComponent', () => {
  let component: RoutingAppelOffreProjetComponent;
  let fixture: ComponentFixture<RoutingAppelOffreProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutingAppelOffreProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutingAppelOffreProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
