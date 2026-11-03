import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelOrdreMissionComponent } from './model-ordre-mission.component';

describe('ModelOrdreMissionComponent', () => {
  let component: ModelOrdreMissionComponent;
  let fixture: ComponentFixture<ModelOrdreMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelOrdreMissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelOrdreMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
