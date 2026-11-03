import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleMarcherComponent } from './controle-marcher.component';

describe('ControleMarcherComponent', () => {
  let component: ControleMarcherComponent;
  let fixture: ComponentFixture<ControleMarcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControleMarcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControleMarcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
