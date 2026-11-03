import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDetailsModalComponent } from './alert-details-modal.component';

describe('AlertDetailsModalComponent', () => {
  let component: AlertDetailsModalComponent;
  let fixture: ComponentFixture<AlertDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
