import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourrierArriverComponent } from './list-courrier-arriver.component';

describe('ListCourrierArriverComponent', () => {
  let component: ListCourrierArriverComponent;
  let fixture: ComponentFixture<ListCourrierArriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCourrierArriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCourrierArriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
