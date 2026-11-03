import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRisqueProjetComponent } from './form-risque-projet.component';

describe('FormRisqueProjetComponent', () => {
  let component: FormRisqueProjetComponent;
  let fixture: ComponentFixture<FormRisqueProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRisqueProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRisqueProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
