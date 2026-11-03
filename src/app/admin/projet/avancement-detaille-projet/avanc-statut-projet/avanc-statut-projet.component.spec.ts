import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvancStatutProjetComponent } from './avanc-statut-projet.component';

describe('AvancStatutProjetComponent', () => {
  let component: AvancStatutProjetComponent;
  let fixture: ComponentFixture<AvancStatutProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvancStatutProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvancStatutProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
