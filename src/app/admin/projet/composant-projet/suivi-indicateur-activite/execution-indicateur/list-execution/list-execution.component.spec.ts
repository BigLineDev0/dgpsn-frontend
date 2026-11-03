import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExecutionComponent } from './list-execution.component';

describe('ListExecutionComponent', () => {
  let component: ListExecutionComponent;
  let fixture: ComponentFixture<ListExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListExecutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
