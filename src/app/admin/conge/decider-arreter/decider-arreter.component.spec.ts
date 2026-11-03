import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeciderArreterComponent } from './decider-arreter.component';

describe('DeciderArreterComponent', () => {
  let component: DeciderArreterComponent;
  let fixture: ComponentFixture<DeciderArreterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeciderArreterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeciderArreterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
