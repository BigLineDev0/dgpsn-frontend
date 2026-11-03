import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTypeagComponent } from './list-typeag.component';

describe('ListTypeagComponent', () => {
  let component: ListTypeagComponent;
  let fixture: ComponentFixture<ListTypeagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTypeagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTypeagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
