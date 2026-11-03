import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceDeDonneesComponent } from './source-de-donnees.component';

describe('SourceDeDonneesComponent', () => {
  let component: SourceDeDonneesComponent;
  let fixture: ComponentFixture<SourceDeDonneesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceDeDonneesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceDeDonneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
