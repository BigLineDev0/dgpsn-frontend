import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvancFinancementComponent } from './avanc-financement.component';

describe('AvancFinancementComponent', () => {
  let component: AvancFinancementComponent;
  let fixture: ComponentFixture<AvancFinancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvancFinancementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvancFinancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
