import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFormationExterieurComponent } from './liste-formation-exterieur.component';

describe('ListeFormationExterieurComponent', () => {
  let component: ListeFormationExterieurComponent;
  let fixture: ComponentFixture<ListeFormationExterieurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeFormationExterieurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeFormationExterieurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
