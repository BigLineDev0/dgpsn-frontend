import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbPagination, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ManangementUnitService } from 'src/app/services/manangement-unit/manangement-unit.service';
import {MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource} from "@angular/material/table";
import {saveAs} from "file-saver";
import { CategorieDocumentService } from 'src/app/services/categorieDocument/categorie-document.service';
import { DocumentService } from '@/app/services/documentService/document-service.service';
import { ListDocumentComponent } from '../../list-document/list-document.component';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule, NgIf } from '@angular/common';
import { FormDocumentComponent } from '../../form-document/form-document.component';
import { ViewDocumentComponent } from '../../view-document/view-document.component';
import { FolderFormComponent } from '../folder/folder-form/folder-form.component';
import { DocumentPdfComponent } from '../../document-pdf/document-pdf.component';
import { DocumentPublicFormComponent } from '../document-public-form/document-public-form.component';
import { SkeletonModule } from 'primeng/skeleton';
import { SafeUrlPipe } from '@core/pipe/safe-url.pipe';
import { DocumentPublicListComponent } from '../document-public-list/document-public-list.component';
@Component({
  selector: 'app-document-main',
  templateUrl: './document-main.component.html',
  styleUrls: ['./document-main.component.scss'],
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
  standalone:true
})
export class DocumentMainComponent implements OnInit {

  folderId: any;
  refreshFolders: boolean = false;
  documents!: MatTableDataSource<any>;
  documentId: any;
  activeList = false;
  loadingIndicator = true;
  loadingIndicatorDocument = false;
  pageOptions: any = { page: 0, size: 20 };
  datasource: any;
  documentToEdit: any;
  documentPageOptions: any = { page: 0, size: 20 };

  projects: any;

  selectedProjectId: any;

  displayedColumns: string[] = [
    'projet',
    'date',
    'auteur',
    'type document',
    'piece',
  ];
  categories: any;
  category: any;
  selectedCategory: any
  @ViewChild(ListDocumentComponent, { static: false }) listDocument!: ListDocumentComponent;


  constructor(
    private managementUnitService: ManangementUnitService,
    private documentService: DocumentService,
    private modalService: NgbModal,
    private categorieDocumentService: CategorieDocumentService
  ) {}

  ngOnInit(): void {
    // this.getAllProjects();
    this.getAllCategories()
  }

    // this.projectToUpdate = projet;

  openNewDocument(content: TemplateRef<any>, document?: any) {
    this.openModal(content, 'lg')
  }

  openEditDocument(content: any, document: any) {
    this.documentToEdit = document;
    this.openModal(content, 'lg')
  }

  openModal(content: TemplateRef<any>, size: string) {
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  close(event: any) {
    if(event) {
      this.refreshFolders = true;
    }
  }

  onSelectedCategory(category: any) {
    console.log('category',category);
    
    // alert(category)
    this.selectedCategory = category;
    // this.listDocument.getDocuments()
  }


  onSelectedProject(category: any) {
    // this.category = category;
    this.getAllDocument();
  }

  activeListViewMode() {
    this.activeList = true;
    this.selectedCategory = null
  }

  activeBlockViewMode() {
    this.activeList = false;
  }

  doSearch(event: any) {
    this.documentPageOptions = event;
  }

  getAllProjects() {
    // this.managementUnitService.readAllProgrammes({type: 'PROJECT', page: 0, size: 100000}).subscribe({
    //   next: value => {
    //     this.projects = value.content;
    //     this.loadingIndicator = false;
    //   },
    //   error: err => {
    //     console.log('liste projects',err);
    //     this.loadingIndicator = true;
    //   },
    //   complete: () => {
    //     this.loadingIndicator = false;
    //   }
    // })
  }

  getAllDocument() {
    // this.loadingIndicatorDocument = true;
    // this.pageOptions.projetId = this.selectedProjectId;
    // this.documentService.readDocumentOfProjects(this.pageOptions).subscribe({
    //   next: value => {
    //     console.log('liste des documents',value);
    //     this.datasource = value;
    //     this.documents = value.content;
    //     this.loadingIndicatorDocument = false;
    //   },
    //   error: err => {
    //     console.log('liste recup documents',err);
    //     this.loadingIndicatorDocument = true;
    //   },
    //   complete: () => {
    //     this.loadingIndicatorDocument = false;
    //   }
    // });
  }

  viewDoc(content: TemplateRef<any>, documentId: any) {
    this.documentId = documentId;
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {

    }).catch((res) => { });
  }

  downloadFile(document: any) {
    this.documentService.readFile(document?.id).subscribe(data => {

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

  checkPdf(document: any) {
    return document?.path?.indexOf(".pdf") > 0;
  }
  readFormat(file: string, format: string) {
    return file.indexOf(format) <= 0;
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllDocument();
  }

  getAllCategories() {
    this.loadingIndicator = true
    this.categorieDocumentService.readCategorieDocumentTypes().subscribe({
      next: response => {
        this.categories = response.body;
        // console.log("categories ", this.categories)
      },
      error: response => { },
      complete: () =>  this.loadingIndicator = false
    })
  }

}
