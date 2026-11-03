import { ResponseApi } from '@/app/util/response.model';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { MatHeaderRow, MatRow, MatRowDef, MatHeaderRowDef, MatColumnDef, MatHeaderCell, MatCell, MatTable, MatHeaderCellDef, MatCellDef } from '@angular/material/table';
import { NgbAccordionModule, NgbModal, NgbModalRef, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import saveAs from 'file-saver';
import { DocumentService } from 'src/app/services/documentService/document-service.service';
import { Alertes } from 'src/app/util/alerte';
import { RESPONSE_STATUS } from 'src/app/util/response-status';
import { FormDocumentComponent } from '../form-document/form-document.component';
import { ViewDocumentComponent } from '../view-document/view-document.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { Authority } from '@/app/util/Authority';

@Component({
  selector: "app-list-document",
  templateUrl: "./list-document.component.html",
  styleUrls: ["./list-document.component.scss"],
  imports: [
    FormDocumentComponent,
    ViewDocumentComponent,
    NgbPagination,
    MatHeaderRow,
    MatRow,
    NgIf,
    MatRowDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    NgSelectModule,
    NgbAccordionModule,
    HasAnyAuthorityDirective,
    SpinnerComponent,
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
  ],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListDocumentComponent implements OnChanges {
  @Input() category: any;
  @Input() categoryId: any;
  loadingIndicator = true;
  datasource: any;
  @Input() agentId: any;
  @Input() inputAgent: any;
  @Input() statut: any;
  @Input() agents: any;
  pageOptions: any = { page: 0, size: 20 };
  displayedColumns: string[] = [
    // 'proprietaire',
    "typeDocument",
    "libelle",
    "piece",
    "actions",
  ];

  document: any;
  documentId: any;
  modalRef!: NgbModalRef;
  add = Authority.ADD_DOCUMENT;
  update = Authority.EDIT_DOCUMENT;
  delete = Authority.DELETE_DOCUMENT;

  constructor(
    private documentService: DocumentService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.pageOptions.categoryId = this.categoryId;
    this.pageOptions.category = this.category;
    if (this.categoryId) {
      this.displayedColumns = [
        // 'proprietaire',
        "typeDocument",
        "libelle",
        "piece",
        "actions",
      ];
    }
    this.getDocuments();
  }

  openBasicModal(content: TemplateRef<any>, size?: any, document?: any) {
    this.document = document;
    this.modalRef = this.modalService.open(content, {
      size: size,
      backdrop: "static",
    });
  }

  viewDoc(content: TemplateRef<any>, documentId: any, size?: any) {
    this.documentId = documentId;
    this.modalRef = this.modalService.open(content, {
      size: size,
      backdrop: "static",
    });
  }

  deleteDocument(agentId: any) {
    Alertes.confirmAction(
      "Voulez-vous supprimé ?",
      "Cet element sera definitivement supprimé",
      () => {
        this.documentService.deleteDocument(agentId).subscribe({
          next: (value: ResponseApi) => {
            if (value.status == RESPONSE_STATUS.OK) {
              Alertes.alerteDeleteSuccess();
            } else {
              Alertes.alerteDeleteDanger(value.message);
            }
          },
          error: (value: any) => Alertes.alerteUpdateDanger(value.message),
          complete: () => this.getDocuments(),
        });
      }
    );
  }

  refresh(event: boolean) {
    if (event) {
      this.getDocuments();
    }
  }

  getDocuments() {
    let req = this.pageOptions;
    this.pageOptions.categoryId = this.categoryId;
    this.pageOptions.category = this.category;
    this.loadingIndicator = true;
    this.documentService.readDocuments(this.pageOptions).subscribe({
      next: (value: ResponseApi) => {
        console.log("value ", value);
        if (value.status == RESPONSE_STATUS.OK) {
          // console.log("Liste des documents : ", value);
          this.datasource = value;
        } else {
          console.log("error ", value.message);
        }
      },
      complete: () => {
        this.loadingIndicator = false;
      },
    });
  }

  downloadFile(document: any) {
    this.documentService.readFile(document?.id).subscribe((data: BlobPart) => {
      let fileArrays: string[] = document?.path?.split("\\");
      let value = fileArrays[fileArrays?.length - 1];

      if (value != null) {
        if (this.readFormat(document?.path, ".xlsx")) {
          const blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          saveAs(blob, value);
        } else if (this.readFormat(document?.path, ".xls")) {
          const blob = new Blob([data], { type: "application/vnd.ms-excel" });
          saveAs(blob, value);
        } else if (this.readFormat(document?.path, ".doc")) {
          const blob = new Blob([data], { type: "application/msword" });
          saveAs(blob, value);
        } else if (this.readFormat(document?.path, ".docx")) {
          const blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          saveAs(blob, value);
        }
      }
    });
  }

  readFormat(file: string, format: string) {
    if (file.indexOf(format) > 0) {
      return false;
    }
    return true;
  }

  checkPdf(document: any) {
    if (document?.path?.indexOf(".pdf") > 0) {
      return true;
    }
    return false;
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getDocuments();
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['category']) {
    //   // La catégorie a changé, tu peux appeler ta méthode ici

    // }
    this.getDocuments();
  }

  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    // console.log("form value", this.pageOptions)
    this.getDocuments();
  }
}
