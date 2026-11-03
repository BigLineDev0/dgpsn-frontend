import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestissementComponent } from './add-investissement.component';

describe('AddInvestissementComponent', () => {
  let component: AddInvestissementComponent;
  let fixture: ComponentFixture<AddInvestissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInvestissementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInvestissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
