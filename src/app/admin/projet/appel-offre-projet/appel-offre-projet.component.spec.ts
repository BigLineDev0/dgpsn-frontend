import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppelOffreProjetComponent } from './appel-offre-projet.component';

describe('AppelOffreProjetComponent', () => {
  let component: AppelOffreProjetComponent;
  let fixture: ComponentFixture<AppelOffreProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppelOffreProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppelOffreProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
