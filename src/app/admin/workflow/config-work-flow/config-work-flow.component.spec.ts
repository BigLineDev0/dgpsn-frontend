import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigWorkFlowComponent } from './config-work-flow.component';

describe('ConfigWorkFlowComponent', () => {
  let component: ConfigWorkFlowComponent;
  let fixture: ComponentFixture<ConfigWorkFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigWorkFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
