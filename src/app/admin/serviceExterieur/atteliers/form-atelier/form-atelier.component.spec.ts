import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAtelierComponent } from './form-atelier.component';

describe('FormAtelierComponent', () => {
  let component: FormAtelierComponent;
  let fixture: ComponentFixture<FormAtelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAtelierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
