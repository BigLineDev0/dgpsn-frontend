import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetDashbordComponent } from './projet-dashbord.component';

describe('ProjetDashbordComponent', () => {
  let component: ProjetDashbordComponent;
  let fixture: ComponentFixture<ProjetDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
