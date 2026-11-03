import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCessationPerduComponent } from './liste-cessation-perdu.component';

describe('ListeCessationPerduComponent', () => {
  let component: ListeCessationPerduComponent;
  let fixture: ComponentFixture<ListeCessationPerduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCessationPerduComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCessationPerduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
