import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStructureExecutionProjetComponent } from './form-structure-execution-projet.component';

describe('FormStructureExecutionProjetComponent', () => {
  let component: FormStructureExecutionProjetComponent;
  let fixture: ComponentFixture<FormStructureExecutionProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStructureExecutionProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormStructureExecutionProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
