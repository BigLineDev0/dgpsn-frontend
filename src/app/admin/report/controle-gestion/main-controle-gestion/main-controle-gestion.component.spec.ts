import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainControleGestionComponent } from './main-controle-gestion.component';

describe('MainControleGestionComponent', () => {
  let component: MainControleGestionComponent;
  let fixture: ComponentFixture<MainControleGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainControleGestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainControleGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
