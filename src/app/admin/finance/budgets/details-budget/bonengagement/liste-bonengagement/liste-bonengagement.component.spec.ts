import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBonengagementComponent } from './liste-bonengagement.component';

describe('ListeBonengagementComponent', () => {
  let component: ListeBonengagementComponent;
  let fixture: ComponentFixture<ListeBonengagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeBonengagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeBonengagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
