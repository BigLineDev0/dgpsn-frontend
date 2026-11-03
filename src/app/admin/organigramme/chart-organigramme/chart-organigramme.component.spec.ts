import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOrganigrammeComponent } from './chart-organigramme.component';

describe('ChartOrganigrammeComponent', () => {
  let component: ChartOrganigrammeComponent;
  let fixture: ComponentFixture<ChartOrganigrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartOrganigrammeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartOrganigrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
