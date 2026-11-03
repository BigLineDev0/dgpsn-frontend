import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActeurProjetComponent } from './form-acteur-projet.component';

describe('FormActeurProjetComponent', () => {
  let component: FormActeurProjetComponent;
  let fixture: ComponentFixture<FormActeurProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormActeurProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormActeurProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
