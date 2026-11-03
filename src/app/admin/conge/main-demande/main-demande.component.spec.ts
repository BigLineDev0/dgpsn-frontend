import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDemandeComponent } from './main-demande.component';

describe('MainDemandeComponent', () => {
  let component: MainDemandeComponent;
  let fixture: ComponentFixture<MainDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDemandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
