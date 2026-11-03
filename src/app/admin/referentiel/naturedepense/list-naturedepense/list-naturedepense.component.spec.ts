import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListNaturedepenseComponent } from './list-naturedepense.component';

describe('ListNaturedepenseComponent', () => {
  let component: ListNaturedepenseComponent;
  let fixture: ComponentFixture<ListNaturedepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNaturedepenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNaturedepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
