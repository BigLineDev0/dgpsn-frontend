import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotationCandidatComponent } from './notation-candidat.component';

describe('NotationCandidatComponent', () => {
  let component: NotationCandidatComponent;
  let fixture: ComponentFixture<NotationCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotationCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotationCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
