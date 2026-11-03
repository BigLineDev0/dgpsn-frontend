import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPtbaComponent } from './main-ptba.component';

describe('MainPtbaComponent', () => {
  let component: MainPtbaComponent;
  let fixture: ComponentFixture<MainPtbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPtbaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPtbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
