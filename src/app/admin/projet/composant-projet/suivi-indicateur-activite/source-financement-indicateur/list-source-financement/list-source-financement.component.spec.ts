import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSourceFinancementComponent } from './list-source-financement.component';

describe('ListSourceFinancementComponent', () => {
  let component: ListSourceFinancementComponent;
  let fixture: ComponentFixture<ListSourceFinancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSourceFinancementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSourceFinancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
