import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifActionsComponent } from './objectif-actions.component';

describe('ObjectifActionsComponent', () => {
  let component: ObjectifActionsComponent;
  let fixture: ComponentFixture<ObjectifActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectifActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectifActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
