import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigLabelComponent } from './config-label.component';

describe('ConfigLabelComponent', () => {
  let component: ConfigLabelComponent;
  let fixture: ComponentFixture<ConfigLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
