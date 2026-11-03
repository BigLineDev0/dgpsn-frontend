import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificationActiviteComponent } from './planification-activite.component';

describe('PlanificationActiviteComponent', () => {
  let component: PlanificationActiviteComponent;
  let fixture: ComponentFixture<PlanificationActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanificationActiviteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanificationActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
