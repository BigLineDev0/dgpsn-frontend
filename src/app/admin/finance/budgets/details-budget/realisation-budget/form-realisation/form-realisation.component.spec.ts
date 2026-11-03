import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRealisationComponent } from './form-realisation/form-realisation.component';

describe('FormRealisationComponent', () => {
  let component: FormRealisationComponent;
  let fixture: ComponentFixture<FormRealisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRealisationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRealisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
