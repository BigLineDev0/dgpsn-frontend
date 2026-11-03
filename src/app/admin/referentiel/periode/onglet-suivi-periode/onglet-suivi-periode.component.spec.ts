import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OngletSuiviPeriodeComponent } from './onglet-suivi-periode.component';

describe('OngletSuiviPeriodeComponent', () => {
  let component: OngletSuiviPeriodeComponent;
  let fixture: ComponentFixture<OngletSuiviPeriodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngletSuiviPeriodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngletSuiviPeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
