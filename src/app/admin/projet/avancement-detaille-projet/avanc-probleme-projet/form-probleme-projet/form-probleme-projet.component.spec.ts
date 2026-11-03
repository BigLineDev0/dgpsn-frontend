import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProblemeProjetComponent } from './form-probleme-projet.component';

describe('FormProblemeProjetComponent', () => {
  let component: FormProblemeProjetComponent;
  let fixture: ComponentFixture<FormProblemeProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProblemeProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProblemeProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
