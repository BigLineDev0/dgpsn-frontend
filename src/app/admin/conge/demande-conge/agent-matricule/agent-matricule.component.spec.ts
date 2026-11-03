import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentMatriculeComponent } from './agent-matricule.component';

describe('AgentMatriculeComponent', () => {
  let component: AgentMatriculeComponent;
  let fixture: ComponentFixture<AgentMatriculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentMatriculeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentMatriculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
