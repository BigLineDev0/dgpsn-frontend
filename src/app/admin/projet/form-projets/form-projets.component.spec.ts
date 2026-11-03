import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProjetsComponent } from './form-projets.component';

describe('FormProjetsComponent', () => {
  let component: FormProjetsComponent;
  let fixture: ComponentFixture<FormProjetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProjetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
