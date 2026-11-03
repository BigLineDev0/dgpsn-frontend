import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LignesChargesComponent } from './lignes-charges.component';

describe('LignesChargesComponent', () => {
  let component: LignesChargesComponent;
  let fixture: ComponentFixture<LignesChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LignesChargesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LignesChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
