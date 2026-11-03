import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FianancmentGlobalComponent } from './fianancment-global.component';

describe('FianancmentGlobalComponent', () => {
  let component: FianancmentGlobalComponent;
  let fixture: ComponentFixture<FianancmentGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FianancmentGlobalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FianancmentGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
