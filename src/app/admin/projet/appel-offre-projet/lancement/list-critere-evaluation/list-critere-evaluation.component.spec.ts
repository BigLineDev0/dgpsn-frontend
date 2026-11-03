import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCritereEvaluationComponent } from './list-critere-evaluation.component';

describe('ListCritereEvaluationComponent', () => {
  let component: ListCritereEvaluationComponent;
  let fixture: ComponentFixture<ListCritereEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCritereEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCritereEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
