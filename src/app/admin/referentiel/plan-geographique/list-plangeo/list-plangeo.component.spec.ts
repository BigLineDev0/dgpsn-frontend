import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlangeoComponent } from './list-plangeo.component';

describe('ListPlangeoComponent', () => {
  let component: ListPlangeoComponent;
  let fixture: ComponentFixture<ListPlangeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPlangeoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlangeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
