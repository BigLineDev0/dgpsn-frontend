import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEvaluationActeurProjetComponent } from './list-evaluation-acteur-projet.component';

describe('ListEvaluationActeurComponent', () => {
  let component: ListEvaluationActeurProjetComponent;
  let fixture: ComponentFixture<ListEvaluationActeurProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEvaluationActeurProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEvaluationActeurProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
