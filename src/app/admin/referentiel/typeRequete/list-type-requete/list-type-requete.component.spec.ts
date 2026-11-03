import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeRequeteComponent } from './list-type-requete.component';

describe('ListTypeRequeteComponent', () => {
  let component: ListTypeRequeteComponent;
  let fixture: ComponentFixture<ListTypeRequeteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTypeRequeteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTypeRequeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
