import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateOrdreMissionComponent } from './create-or-update-ordre-mission.component';

describe('CreateOrUpdateOrdreMissionComponent', () => {
  let component: CreateOrUpdateOrdreMissionComponent;
  let fixture: ComponentFixture<CreateOrUpdateOrdreMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrUpdateOrdreMissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateOrdreMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
