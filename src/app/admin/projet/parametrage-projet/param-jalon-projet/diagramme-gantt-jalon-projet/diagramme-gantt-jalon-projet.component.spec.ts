import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagrammeGanttJalonProjetComponent } from './diagramme-gantt-jalon-projet.component';

describe('DiagrammeGanttJalonProjetComponent', () => {
  let component: DiagrammeGanttJalonProjetComponent;
  let fixture: ComponentFixture<DiagrammeGanttJalonProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagrammeGanttJalonProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagrammeGanttJalonProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
