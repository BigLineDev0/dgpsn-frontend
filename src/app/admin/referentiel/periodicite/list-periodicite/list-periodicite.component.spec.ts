import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPeriodiciteComponent } from './list-periodicite.component';

describe('ListPeriodiciteComponent', () => {
  let component: ListPeriodiciteComponent;
  let fixture: ComponentFixture<ListPeriodiciteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPeriodiciteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPeriodiciteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
