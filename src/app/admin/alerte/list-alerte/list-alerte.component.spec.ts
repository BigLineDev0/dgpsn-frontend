import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlerteComponent } from './list-alerte.component';

describe('ListAlerteComponent', () => {
  let component: ListAlerteComponent;
  let fixture: ComponentFixture<ListAlerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAlerteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAlerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
