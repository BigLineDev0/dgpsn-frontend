import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBesoinComponent } from './form-besoin.component';

describe('FormBesoinComponent', () => {
  let component: FormBesoinComponent;
  let fixture: ComponentFixture<FormBesoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBesoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBesoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
