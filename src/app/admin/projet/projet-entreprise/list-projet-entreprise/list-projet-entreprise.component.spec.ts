import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjetEntrepriseComponent } from './list-projet-entreprise.component';

describe('ListProjetEntrepriseComponent', () => {
  let component: ListProjetEntrepriseComponent;
  let fixture: ComponentFixture<ListProjetEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProjetEntrepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProjetEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
