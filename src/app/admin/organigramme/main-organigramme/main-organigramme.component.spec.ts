import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOrganigrammeComponent } from './main-organigramme.component';

describe('MainOrganigrammeComponent', () => {
  let component: MainOrganigrammeComponent;
  let fixture: ComponentFixture<MainOrganigrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainOrganigrammeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainOrganigrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
