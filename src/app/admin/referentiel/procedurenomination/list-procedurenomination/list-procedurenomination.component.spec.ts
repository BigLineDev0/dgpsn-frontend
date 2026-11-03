import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListProcedurenominationComponent } from './list-procedurenomination.component';

describe('ListProcedurenominationComponent', () => {
  let component: ListProcedurenominationComponent;
  let fixture: ComponentFixture<ListProcedurenominationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProcedurenominationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProcedurenominationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
