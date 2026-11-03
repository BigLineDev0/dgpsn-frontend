import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImageProjetComponent } from './form-image-projet.component';

describe('FormImageProjetComponent', () => {
  let component: FormImageProjetComponent;
  let fixture: ComponentFixture<FormImageProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormImageProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormImageProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
