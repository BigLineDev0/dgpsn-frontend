import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifPtbaComponent } from './objectif-ptba.component';

describe('ObjectifPtbaComponent', () => {
  let component: ObjectifPtbaComponent;
  let fixture: ComponentFixture<ObjectifPtbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectifPtbaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectifPtbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
