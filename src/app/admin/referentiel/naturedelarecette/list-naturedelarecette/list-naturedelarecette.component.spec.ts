import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListNaturedelarecetteComponent } from './list-naturedelarecette.component';

describe('ListNaturedelarecetteComponent', () => {
  let component: ListNaturedelarecetteComponent;
  let fixture: ComponentFixture<ListNaturedelarecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNaturedelarecetteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNaturedelarecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
