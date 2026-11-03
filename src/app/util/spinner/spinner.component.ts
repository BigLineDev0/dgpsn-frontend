import { Component, Input, OnInit } from '@angular/core';
import {
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatHeaderCellDef,
    NgForOf
  ],
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() datasource = [{}, {}, {}, {}, {}, {}];
  @Input() displayedColumns: any;

  ngOnInit(): void {
  }

}
