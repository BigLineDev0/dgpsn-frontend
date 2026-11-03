import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviIndicateurActiviteComponent } from './suivi-indicateur-activite.component';

describe('SuiviIndicateurActiviteComponent', () => {
  let component: SuiviIndicateurActiviteComponent;
  let fixture: ComponentFixture<SuiviIndicateurActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiviIndicateurActiviteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuiviIndicateurActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
