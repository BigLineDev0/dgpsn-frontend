import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImpactAttenduProjetComponent } from './form-impact-attendu-projet.component';

describe('FormImpactAttenduProjetComponent', () => {
  let component: FormImpactAttenduProjetComponent;
  let fixture: ComponentFixture<FormImpactAttenduProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormImpactAttenduProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormImpactAttenduProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
