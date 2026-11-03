import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetActionsComponent } from './projet-actions.component';

describe('ProjetActionsComponent', () => {
  let component: ProjetActionsComponent;
  let fixture: ComponentFixture<ProjetActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
