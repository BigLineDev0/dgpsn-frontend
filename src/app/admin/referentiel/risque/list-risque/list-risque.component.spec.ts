import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListRisqueComponent } from './list-risque.component';

describe('ListRisqueComponent', () => {
  let component: ListRisqueComponent;
  let fixture: ComponentFixture<ListRisqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRisqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRisqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
