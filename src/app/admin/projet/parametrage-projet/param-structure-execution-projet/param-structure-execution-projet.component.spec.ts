import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamStructureExecutionProjetComponent } from './param-structure-execution-projet.component';

describe('ParamStructureExecutionProjetComponent', () => {
  let component: ParamStructureExecutionProjetComponent;
  let fixture: ComponentFixture<ParamStructureExecutionProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamStructureExecutionProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParamStructureExecutionProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
