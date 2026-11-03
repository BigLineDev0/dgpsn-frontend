import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentToSelectComponent } from './agent-to-select.component';

describe('AgentToSelectComponent', () => {
  let component: AgentToSelectComponent;
  let fixture: ComponentFixture<AgentToSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentToSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentToSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
