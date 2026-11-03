import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCandidatComponent } from './liste-candidat.component';

describe('ListeCandidatComponent', () => {
  let component: ListeCandidatComponent;
  let fixture: ComponentFixture<ListeCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
