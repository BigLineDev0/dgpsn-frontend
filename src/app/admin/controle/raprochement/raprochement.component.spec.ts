import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaprochementComponent } from './raprochement.component';

describe('RaprochementComponent', () => {
  let component: RaprochementComponent;
  let fixture: ComponentFixture<RaprochementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaprochementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaprochementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
