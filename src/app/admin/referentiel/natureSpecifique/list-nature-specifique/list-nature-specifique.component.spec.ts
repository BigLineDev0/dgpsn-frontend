import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNatureSpecifiqueComponent } from './list-nature-specifique.component';

describe('ListNatureSpecifiqueComponent', () => {
  let component: ListNatureSpecifiqueComponent;
  let fixture: ComponentFixture<ListNatureSpecifiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNatureSpecifiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNatureSpecifiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
