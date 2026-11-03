import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSousSecteurComponent } from './list-sous-secteur.component';

describe('ListSousSecteurComponent', () => {
  let component: ListSousSecteurComponent;
  let fixture: ComponentFixture<ListSousSecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSousSecteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSousSecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
