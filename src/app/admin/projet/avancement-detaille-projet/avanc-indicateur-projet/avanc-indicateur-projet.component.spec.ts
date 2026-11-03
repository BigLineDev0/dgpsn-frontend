import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvancIndicateurProjetComponent } from './avanc-indicateur-projet.component';

describe('AvancIndicateurProjetComponent', () => {
  let component: AvancIndicateurProjetComponent;
  let fixture: ComponentFixture<AvancIndicateurProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvancIndicateurProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvancIndicateurProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
