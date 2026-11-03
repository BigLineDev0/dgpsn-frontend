import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { DocumentPublicService } from 'src/app/services/documentPublic/document-public.service';
import { saveAs } from 'file-saver';
import { Alertes } from 'src/app/util/alerte';
import { NgbModal, NgbPagination, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { error } from 'console';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule, NgIf } from '@angular/common';
import { MatHeaderRow, MatRow, MatRowDef, MatHeaderRowDef, MatColumnDef, MatHeaderCell, MatCell, MatTable, MatHeaderCellDef, MatCellDef } from '@angular/material/table';
import { FormDocumentComponent } from '../../form-document/form-document.component';
import { ViewDocumentComponent } from '../../view-document/view-document.component';
import { SafeUrlPipe } from '@core/pipe/safe-url.pipe';
import { SkeletonModule } from 'primeng/skeleton';
import { DocumentPdfComponent } from '../../document-pdf/document-pdf.component';
import { ListDocumentComponent } from '../../list-document/list-document.component';
import { DocumentPublicFormComponent } from '../document-public-form/document-public-form.component';
import { FolderFormComponent } from '../folder/folder-form/folder-form.component';
import { MatIconModule } from '@angular/material/icon';
import { DocumentPublicPdfComponent } from '../document-public-pdf/document-public-pdf.component';

@Component({
  selector: 'app-document-public-list',
  templateUrl: './document-public-list.component.html',
  styleUrls: ['./document-public-list.component.scss'],
    imports: [
       FormDocumentComponent,
       CommonModule,
       SafeUrlPipe ,
       ViewDocumentComponent,
       NgbPagination,
       MatHeaderRow,
       MatRow,
       NgIf,
       MatRowDef,
       MatIconModule,
       DocumentPdfComponent,
       DocumentPublicPdfComponent,
       MatHeaderRowDef,
       MatColumnDef,
       MatHeaderCell,
       MatCell,
       SpinnerComponent,
       MatTable,
       MatHeaderCellDef,
       MatCellDef,
       FolderFormComponent,
       ListDocumentComponent,
       DocumentPdfComponent,    
       DocumentPublicFormComponent,
       SkeletonModule,
       DocumentPublicListComponent,
       NgbTooltipModule,
     ],
})
export class DocumentPublicListComponent implements OnInit, OnChanges {

  @Output() documentToEdit: EventEmitter<any> = new EventEmitter();

  @Input() folderId: any;

  @Input() activeActions: boolean = true;

  @Input() refresh!: boolean;

  displayedColumns: string[] = [
    'titre',
    'date',
    'auteur(s)',
    'type document',
    'themes',
    'PAD',
    'secteurs',
    'telecharger',
    // 'actions'
  ];

  loadingIndicator = true;

  @Input() searchData: any;

  @Input() pageOptions: any;

  dataSource: any;

  documentId: any;

  constructor(
    private documentPublicService: DocumentPublicService,
    private modalService: NgbModal
  ) {}

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['folderId'] !== undefined && changes['folderId'].currentValue !== undefined) {
      this.pageOptions.folderId = this.folderId;
    }

    if(changes['pageOptions'] !== undefined && changes['pageOptions'].previousValue !== undefined) {
      // then the user is doing a search
      this.pageOptions = changes['pageOptions'].currentValue;
    }

    if(changes['refresh']  !== undefined && changes['refresh'].currentValue) {
      this.pageOptions = { page: 0, size: 20 };
    }

    if(changes['searchData'] !== undefined && changes['searchData'].currentValue !== undefined) {
      this.doPublicSearch(this.searchData);
    } else {
      this.getAllDocuments(this.pageOptions);
    }
  }

  ngOnInit(): void {
    if(this.searchData !== undefined) {
      this.doPublicSearch(this.searchData);
    } else {
      this.getAllDocuments(this.pageOptions);
    }

    if(this.activeActions === true) this.displayedColumns.push('actions');
  }

  getAllDocuments(pageOptions: any) {
    if(!this.activeActions) {
      pageOptions.publish = true;
    }

    this.loadingIndicator = true;

    this.documentPublicService.readDocument(pageOptions).subscribe({
      next: value => { this.dataSource = value; console.log('DOCS: ', this.dataSource); },
      error: value => {},
      complete: () => this.loadingIndicator = false
    })
  }

  doPublicSearch(dataOptions: any) {
    this.loadingIndicator = true;
    this.documentPublicService.readPublishDocument(dataOptions).subscribe({
			next: response => { this.dataSource = response },
      error: value  => {},
      complete: ()  => this.loadingIndicator = false
		})
  }

  paginate($event: any) {
    if(this.searchData ! == undefined) {
      this.searchData.page = $event - 1;
      this.doPublicSearch(this.searchData);
    } else {
      this.pageOptions.page = $event - 1;
      this.getAllDocuments(this.pageOptions);
    }
  }

  editDocument(document: any) {
    this.documentToEdit.emit(document);
  }

  deleteDocument(documentId: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimer le document',
      'Le decument sera supprimer definitivement',
      () => {
        this.documentPublicService.deleteDocument(documentId).subscribe({
          next: response => Alertes.alerteDeleteSuccess(),
          error: resopnse => Alertes.alerteDeleteDanger(resopnse),
          complete: () => this.getAllDocuments(this.pageOptions)
        })
      }
    )
  }

  checkPdf(document: any) {
    if (document?.path?.indexOf(".pdf") > 0) {
      return true;
    }
    return false;
  }

  viewDoc(content: TemplateRef<any>, documentId: any) {
    this.documentId = documentId;
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
    }).catch((res) => { });
  }

  downloadFile(document: any) {
    this.documentPublicService.readFile(document?.id).subscribe(data => {

      let fileArrays: string[] = document?.path?.split("\\")
      let value = fileArrays[fileArrays?.length - 1]

      if (value != null) {
        if (this.readFormat(document?.path, ".xlsx")) {
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, value)
        }
        else if (this.readFormat(document?.path, ".xls")) {
          const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
          saveAs(blob, value)

        }
        else if (this.readFormat(document?.path, ".doc")) {
          const blob = new Blob([data], { type: 'application/msword' });
          saveAs(blob, value)

        }
        else if (this.readFormat(document?.path, ".docx")) {
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
          saveAs(blob, value)
        }
      }
    })
  }

  readFormat(file: string, format: string) {
    if (file.indexOf(format) > 0) {
      return false;
    }
    return true;
  }

  getTooltipText(publish: boolean): string {
    return publish ? 'Annuler la publication' : 'Publier';
  }

  publishDocument(documentId: any, publish: boolean) {
    this.documentPublicService.publishUnpublishDocument(documentId).subscribe({
      next: value => Alertes.alerteGlobal(
        !publish? 'Le document vient d\être publié avec succés' : 'La publication de ce document vient d\'être annulé'
      ),
      error: value => Alertes.alerteAddDanger('Une erreur est survenue lors de la publication du document'),
      complete: () => this.getAllDocuments(this.pageOptions)
    })
  }

}
