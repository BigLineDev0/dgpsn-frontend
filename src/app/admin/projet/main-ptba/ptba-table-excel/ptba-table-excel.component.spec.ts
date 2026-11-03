import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtbaTableExcelComponent } from './ptba-table-excel.component';

describe('PtbaTableExcelComponent', () => {
  let component: PtbaTableExcelComponent;
  let fixture: ComponentFixture<PtbaTableExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtbaTableExcelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtbaTableExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
