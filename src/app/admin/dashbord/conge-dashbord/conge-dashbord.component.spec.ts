import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeDashbordComponent } from './conge-dashbord.component';

describe('CongeDashbordComponent', () => {
  let component: CongeDashbordComponent;
  let fixture: ComponentFixture<CongeDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongeDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongeDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
