import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceExterieurDashbordComponent } from './service-exterieur-dashbord.component';

describe('ServiceExterieurDashbordComponent', () => {
  let component: ServiceExterieurDashbordComponent;
  let fixture: ComponentFixture<ServiceExterieurDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceExterieurDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceExterieurDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
