import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTypereunionComponent } from './list-typereunion.component';

describe('ListTypereunionComponent', () => {
  let component: ListTypereunionComponent;
  let fixture: ComponentFixture<ListTypereunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTypereunionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTypereunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
