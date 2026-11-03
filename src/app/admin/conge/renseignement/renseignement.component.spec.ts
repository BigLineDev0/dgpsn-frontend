import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenseignementComponent } from './renseignement.component';

describe('RenseignementComponent', () => {
  let component: RenseignementComponent;
  let fixture: ComponentFixture<RenseignementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenseignementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenseignementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
