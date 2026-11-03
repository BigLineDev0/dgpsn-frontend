import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeConfigAlerteComponent } from './liste-config-alerte.component';

describe('ListeConfigAlerteComponent', () => {
  let component: ListeConfigAlerteComponent;
  let fixture: ComponentFixture<ListeConfigAlerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeConfigAlerteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeConfigAlerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
