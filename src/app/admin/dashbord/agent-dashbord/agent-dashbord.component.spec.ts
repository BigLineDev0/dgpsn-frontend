import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDashbordComponent } from './agent-dashbord.component';

describe('AgentDashbordComponent', () => {
  let component: AgentDashbordComponent;
  let fixture: ComponentFixture<AgentDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
