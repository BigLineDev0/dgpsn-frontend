import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParamZoneInterventionProjetComponent } from './param-zone-intervention-projet.component';




describe('ParamZoneInterventionProjetComponent', () => {
  let component: ParamZoneInterventionProjetComponent;
  let fixture: ComponentFixture<ParamZoneInterventionProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamZoneInterventionProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParamZoneInterventionProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
