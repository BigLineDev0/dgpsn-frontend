import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTacheComponent } from './form-tache.component';

describe('FormTacheComponent', () => {
  let component: FormTacheComponent;
  let fixture: ComponentFixture<FormTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTacheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
