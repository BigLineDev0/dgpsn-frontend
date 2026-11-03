import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComposantComponent } from './form-composant.component';

describe('FormParamComposantComponent', () => {
  let component: FormComposantComponent;
  let fixture: ComponentFixture<FormComposantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComposantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComposantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
