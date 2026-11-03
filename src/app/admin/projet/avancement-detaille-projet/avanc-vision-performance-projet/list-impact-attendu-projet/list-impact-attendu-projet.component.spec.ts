import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImpactAttenduProjetComponent } from './list-impact-attendu-projet.component';

describe('ListImpactAttenduProjetComponent', () => {
  let component: ListImpactAttenduProjetComponent;
  let fixture: ComponentFixture<ListImpactAttenduProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListImpactAttenduProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListImpactAttenduProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
