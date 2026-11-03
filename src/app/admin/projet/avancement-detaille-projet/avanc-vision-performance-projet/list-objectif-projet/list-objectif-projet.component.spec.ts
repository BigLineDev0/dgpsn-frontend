import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListObjectifProjetComponent } from './list-objectif-projet.component';

describe('ListObjectifProjetComponent', () => {
  let component: ListObjectifProjetComponent;
  let fixture: ComponentFixture<ListObjectifProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListObjectifProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListObjectifProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
