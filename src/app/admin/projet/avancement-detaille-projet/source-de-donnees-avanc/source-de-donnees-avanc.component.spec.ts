import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceDeDonneesAvancComponent } from './source-de-donnees-avanc.component';

describe('SourceDeDonneesComponent', () => {
  let component: SourceDeDonneesAvancComponent;
  let fixture: ComponentFixture<SourceDeDonneesAvancComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceDeDonneesAvancComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceDeDonneesAvancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
