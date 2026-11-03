import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRoutingComponent } from './agent-routing.component';

describe('AgentRoutingComponent', () => {
  let component: AgentRoutingComponent;
  let fixture: ComponentFixture<AgentRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentRoutingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
