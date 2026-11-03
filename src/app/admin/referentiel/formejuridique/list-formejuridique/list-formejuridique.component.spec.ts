import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListFormejuridiqueComponent } from './list-formejuridique.component';

describe('ListFormejuridiqueComponent', () => {
  let component: ListFormejuridiqueComponent;
  let fixture: ComponentFixture<ListFormejuridiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFormejuridiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFormejuridiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
