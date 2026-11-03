import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCessationComponent } from './list-cessation.component';

describe('ListCessationComponent', () => {
  let component: ListCessationComponent;
  let fixture: ComponentFixture<ListCessationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCessationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCessationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
