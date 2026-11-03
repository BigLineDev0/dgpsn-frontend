import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiveFonctionnementComponent } from './suive-fonctionnement.component';

describe('SuiveFonctionnementComponent', () => {
  let component: SuiveFonctionnementComponent;
  let fixture: ComponentFixture<SuiveFonctionnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiveFonctionnementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuiveFonctionnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
