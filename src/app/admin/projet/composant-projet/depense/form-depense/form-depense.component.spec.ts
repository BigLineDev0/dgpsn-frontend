import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDepenseComponent } from './form-depense.component';

describe('FormDepenseComponent', () => {
  let component: FormDepenseComponent;
  let fixture: ComponentFixture<FormDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDepenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
