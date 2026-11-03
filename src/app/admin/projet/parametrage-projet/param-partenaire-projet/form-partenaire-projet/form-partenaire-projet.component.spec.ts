import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPartenaireProjetComponent } from './form-partenaire-projet.component';

describe('FormPartenaireProjetComponent', () => {
  let component: FormPartenaireProjetComponent;
  let fixture: ComponentFixture<FormPartenaireProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPartenaireProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPartenaireProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
