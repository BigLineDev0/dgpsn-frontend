import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvancEtatProjetComponent } from './avanc-etat-projet.component';

describe('AvancEtatProjetComponent', () => {
  let component: AvancEtatProjetComponent;
  let fixture: ComponentFixture<AvancEtatProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvancEtatProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvancEtatProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
