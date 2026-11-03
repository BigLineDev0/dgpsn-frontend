import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPeriodeComponent } from './list-periode.component';

describe('ListPeriodeComponent', () => {
  let component: ListPeriodeComponent;
  let fixture: ComponentFixture<ListPeriodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPeriodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPeriodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
