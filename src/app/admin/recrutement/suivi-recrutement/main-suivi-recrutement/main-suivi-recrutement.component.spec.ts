import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSuiviRecrutementComponent } from './main-suivi-recrutement.component';

describe('MainSuiviRecrutementComponent', () => {
  let component: MainSuiviRecrutementComponent;
  let fixture: ComponentFixture<MainSuiviRecrutementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSuiviRecrutementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSuiviRecrutementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
