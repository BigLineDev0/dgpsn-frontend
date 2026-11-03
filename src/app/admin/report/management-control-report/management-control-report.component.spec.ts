import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementControlReportComponent } from './management-control-report.component';

describe('ManagementControlReportComponent', () => {
  let component: ManagementControlReportComponent;
  let fixture: ComponentFixture<ManagementControlReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementControlReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementControlReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
