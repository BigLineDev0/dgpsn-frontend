import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormParamComposantComponent } from './form-param-composant.component';

describe('FormParamComposantComponent', () => {
  let component: FormParamComposantComponent;
  let fixture: ComponentFixture<FormParamComposantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormParamComposantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormParamComposantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
