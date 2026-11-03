import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBonengagementComponent } from './main-bonengagement.component';

describe('MainBonengagementComponent', () => {
  let component: MainBonengagementComponent;
  let fixture: ComponentFixture<MainBonengagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainBonengagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBonengagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
