import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigAlerteComponent } from './config-alerte.component';

describe('ConfigAlerteComponent', () => {
  let component: ConfigAlerteComponent;
  let fixture: ComponentFixture<ConfigAlerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigAlerteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigAlerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
