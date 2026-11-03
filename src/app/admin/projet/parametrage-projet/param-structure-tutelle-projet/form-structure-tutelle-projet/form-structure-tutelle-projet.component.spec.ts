import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStructureTutelleProjetComponent } from './form-structure-tutelle-projet.component';

describe('FormStructureTutelleProjetComponent', () => {
  let component: FormStructureTutelleProjetComponent;
  let fixture: ComponentFixture<FormStructureTutelleProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStructureTutelleProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormStructureTutelleProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
