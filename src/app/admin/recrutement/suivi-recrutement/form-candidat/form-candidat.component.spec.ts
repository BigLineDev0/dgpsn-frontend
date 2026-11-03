import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCandidatComponent } from './form-candidat.component';

describe('FormCandidatComponent', () => {
  let component: FormCandidatComponent;
  let fixture: ComponentFixture<FormCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
