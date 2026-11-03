import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdreMissionComponent } from './list-ordre-mission.component';

describe('ListOrdreMissionComponent', () => {
  let component: ListOrdreMissionComponent;
  let fixture: ComponentFixture<ListOrdreMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrdreMissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrdreMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
