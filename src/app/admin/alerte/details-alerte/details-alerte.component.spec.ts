import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAlerteComponent } from './details-alerte.component';

describe('DetailsAlerteComponent', () => {
  let component: DetailsAlerteComponent;
  let fixture: ComponentFixture<DetailsAlerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsAlerteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsAlerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
