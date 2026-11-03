import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleGestionDashbordComponent } from './controle-gestion-dashbord.component';

describe('ControleGestionDashbordComponent', () => {
  let component: ControleGestionDashbordComponent;
  let fixture: ComponentFixture<ControleGestionDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControleGestionDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControleGestionDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
