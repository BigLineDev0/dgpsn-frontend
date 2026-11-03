import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTypedvaluationComponent } from './list-typedvaluation.component';

describe('ListTypedvaluationComponent', () => {
  let component: ListTypedvaluationComponent;
  let fixture: ComponentFixture<ListTypedvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTypedvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTypedvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
