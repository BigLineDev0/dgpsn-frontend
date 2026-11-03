import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourrierSortieComponent } from './list-courrier-sortie.component';

describe('ListCourrierSortieComponent', () => {
  let component: ListCourrierSortieComponent;
  let fixture: ComponentFixture<ListCourrierSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCourrierSortieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCourrierSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
