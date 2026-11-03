import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentOrdreMissionComponent } from './agent-ordre-mission.component';

describe('AgentOrdreMissionComponent', () => {
  let component: AgentOrdreMissionComponent;
  let fixture: ComponentFixture<AgentOrdreMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentOrdreMissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentOrdreMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
