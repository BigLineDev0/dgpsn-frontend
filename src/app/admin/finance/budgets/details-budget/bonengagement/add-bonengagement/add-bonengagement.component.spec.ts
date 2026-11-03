import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBonengagementComponent } from './add-bonengagement.component';

describe('AddBonengagementComponent', () => {
  let component: AddBonengagementComponent;
  let fixture: ComponentFixture<AddBonengagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBonengagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBonengagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
