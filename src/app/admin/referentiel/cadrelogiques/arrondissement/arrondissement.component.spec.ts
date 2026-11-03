import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrondissementComponent } from './arrondissement.component';

describe('ArrondissementComponent', () => {
  let component: ArrondissementComponent;
  let fixture: ComponentFixture<ArrondissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrondissementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrondissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
