import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreselectionnerComponent } from './preselectionner.component';

describe('PreselectionnerComponent', () => {
  let component: PreselectionnerComponent;
  let fixture: ComponentFixture<PreselectionnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreselectionnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreselectionnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
