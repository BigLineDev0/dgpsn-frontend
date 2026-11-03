import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAlerteComponent } from './main-alerte.component';

describe('MainAlerteComponent', () => {
  let component: MainAlerteComponent;
  let fixture: ComponentFixture<MainAlerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAlerteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAlerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
