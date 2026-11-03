import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActionActiviteComponent } from './form-action-activite.component';

describe('FormActionActiviteComponent', () => {
  let component: FormActionActiviteComponent;
  let fixture: ComponentFixture<FormActionActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormActionActiviteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormActionActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
