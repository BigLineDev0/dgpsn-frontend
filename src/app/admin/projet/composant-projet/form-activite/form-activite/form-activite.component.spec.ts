import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActiviteComponent } from './form-activite.component';

describe('FormActiviteComponent', () => {
  let component: FormActiviteComponent;
  let fixture: ComponentFixture<FormActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormActiviteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
