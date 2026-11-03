import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBugetComponent } from './form-buget.component';

describe('FormBugetComponent', () => {
  let component: FormBugetComponent;
  let fixture: ComponentFixture<FormBugetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBugetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBugetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
