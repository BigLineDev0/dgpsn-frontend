import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormObjectifComponent } from './form-objectif.component';

describe('FormObjectifComponent', () => {
  let component: FormObjectifComponent;
  let fixture: ComponentFixture<FormObjectifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormObjectifComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormObjectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
