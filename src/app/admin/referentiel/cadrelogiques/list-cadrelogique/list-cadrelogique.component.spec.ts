import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCadrelogiqueComponent } from './list-cadrelogique.component';

describe('ListCadrelogiqueComponent', () => {
  let component: ListCadrelogiqueComponent;
  let fixture: ComponentFixture<ListCadrelogiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCadrelogiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCadrelogiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
