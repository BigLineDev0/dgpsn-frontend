import {Component, OnInit} from '@angular/core';
import {LogsService} from 'src/app/services/logs/logs.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {FormLogComponent} from "@views/pages/securite/logs/form-log/form-log.component";
import {SpinnerComponent} from "@/app/util/spinner/spinner.component";
import {DatePipe, NgIf} from "@angular/common";
import {
  NgbAccordionBody,
  NgbAccordionCollapse,
  NgbAccordionHeader,
  NgbAccordionItem,
  NgbAccordionModule,
  NgbPagination
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-list-log',
  templateUrl: './list-log.component.html',
  styleUrls: ['./list-log.component.scss'],
  imports: [
    SpinnerComponent,
    MatTable,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatColumnDef,
    NgIf,
    DatePipe,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    NgbPagination,
    NgbAccordionModule,
    NgbPagination
  ],
  standalone: true
})
export class ListLogComponent implements OnInit {

  displayedColumns: string[] = [
    'utilisateur',
    'login',
    'actionType',
    'chemin',
    // 'method',
    'ipAddress',
    'userAgent',
    // 'url',
    'creationDate'
  ];

  datasource: any;
  logs: any;

  pageOptions: any = { page: 0, size: 20 };
  loadingIndicator = true;
  showErrorMessage= false;

  // read = Authority.READ_JOURNAL;

  advancedPaginationCurrentPage = 2;

  constructor(
    private readonly logService: LogsService
  ) { }

  ngOnInit(): void {
    this.getInfos();
  }

  getInfos() {
    this.logService.getLogs(this.pageOptions).subscribe({
      next: value => {
        this.datasource = value;
        this.logs = value.content;
        // console.log("logs ", this.logs)
      },
      error: err => {
        console.log(err);
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
      })
  }

  doSearch(data: any) {
    this.loadingIndicator = true;
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    console.log("test:",data)
    this.getInfos();
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getInfos();
  }

  protected readonly Number = Number;
}
