import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormZoneInterventionProjetComponent } from './form-zone-intervention-projet.component';

describe('FormZoneInterventionProjetComponent', () => {
  let component: FormZoneInterventionProjetComponent;
  let fixture: ComponentFixture<FormZoneInterventionProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormZoneInterventionProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormZoneInterventionProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
