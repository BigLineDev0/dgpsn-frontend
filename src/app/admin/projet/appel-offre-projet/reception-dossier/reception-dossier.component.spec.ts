import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionDossierComponent } from './reception-dossier.component';

describe('ReceptionDossierComponent', () => {
  let component: ReceptionDossierComponent;
  let fixture: ComponentFixture<ReceptionDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionDossierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
