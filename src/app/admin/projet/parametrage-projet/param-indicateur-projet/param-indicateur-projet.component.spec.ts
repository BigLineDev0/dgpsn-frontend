import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamIndicateurProjetComponent } from './param-indicateur-projet.component';

describe('ParamIndicateurProjetComponent', () => {
  let component: ParamIndicateurProjetComponent;
  let fixture: ComponentFixture<ParamIndicateurProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamIndicateurProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParamIndicateurProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
