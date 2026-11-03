import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAgentMatriculeComponent } from './app-agent-matricule.component';

describe('AppAgentMatriculeComponent', () => {
  let component: AppAgentMatriculeComponent;
  let fixture: ComponentFixture<AppAgentMatriculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAgentMatriculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAgentMatriculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
