import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OngletSuiviRegionComponent } from './onglet-suivi-region.component';

describe('OngletSuiviRegionComponent', () => {
  let component: OngletSuiviRegionComponent;
  let fixture: ComponentFixture<OngletSuiviRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngletSuiviRegionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngletSuiviRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
