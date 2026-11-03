import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOrgarganigrammeComponent } from './form-orgarganigramme.component';

describe('FormOrgarganigrammeComponent', () => {
  let component: FormOrgarganigrammeComponent;
  let fixture: ComponentFixture<FormOrgarganigrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormOrgarganigrammeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormOrgarganigrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
