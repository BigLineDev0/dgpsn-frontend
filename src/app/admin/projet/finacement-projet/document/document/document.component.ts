import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import saveAs from 'file-saver';
import { ListboxModule } from 'primeng/listbox';
import { DocumentService } from 'src/app/services/document/document.service';
import { DocumentTypesService } from 'src/app/services/documentType/document-types.service';
import { Authority } from 'src/app/util/Authority';
import { Alertes } from 'src/app/util/alerte';
import { FormBugetComponent } from '../../budget-global/form-buget/form-buget.component';
import { SourceDeDonneesComponent } from '../../budget-global/source-de-donnees/source-de-donnees.component';
import { RoutingFinancementComponent } from '../../routing-financement/routing-financement.component';
import { FormDocumentComponent } from '../form-document/form-document.component';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
     standalone:true,
  imports:[
     CommonModule,
    NgbTooltipModule,
    NgbDropdownModule,
    MatIconModule,
    // FeatherIconModule,
    NgbTooltipModule,
    MatTableModule,
    SpinnerComponent,
    NgbPaginationModule,
    MatMenuModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatStepperModule,
    NgbNavModule,
    NgbProgressbarModule,
    ListboxModule,
    FormsModule,
    NgbCarouselModule,
    // NgGanttEditorModule,
    NgbTimepickerModule,
    NgbPopoverModule,
    NgbDatepickerModule,
    MatCheckboxModule,
    // ProgrammeModule,
    // NgApexchartsModule,
    // DocumentModule,
    MatRippleModule,
    HasAnyAuthorityDirective,
    // TdbProjetSepecifiqueModule,
    // FoncierePubliqueModule,
    MatTreeModule,
    MatListModule,
    MatTooltipModule,
    MatButtonModule,
    SpinnerComponent,
    RoutingFinancementComponent,
    FormDocumentComponent,

  ]
})
export class DocumentComponent {

  
  displayedColumns: string[] = [
    'titre',
    'date',
    'auteur',
    'type document',
    'piece',
    'actions'
  ];
  projet:any;
  documents!: MatTableDataSource<any>;

  @Input() projetId: any;
  @Input() action!: boolean;
  pageOptions: any = { page: 0, size: 20 };
  datasource: any;
  basicModalCloseResult!: string;
  documentTypes: any;
  documentId: any;
  documentToEdit: any;

  loadingIndicator = true;
  projetlibelle:any;
  read = Authority.READ_DOCUMENT
  add = Authority.ADD_DOCUMENT
  edit = Authority.EDIT_DOCUMENT
  deletes = Authority.DELETE_DOCUMENT
  readFile = Authority.READ_FILE_DOCUMENT

  constructor(private documentService: DocumentService,
    private modalService: NgbModal,
    private documentTypeService: DocumentTypesService) { }

  ngOnInit(): void {
    this.getProjectId();
    this.getAllDocumentOfProject();
    this.getAllTypesDocument()
  
  
  }
 
  getProjectId() {
    this.projetId = localStorage.getItem('managementUnitId')!;
    this.projetlibelle = localStorage.getItem('projetLibelle')!;
    // console.log('managementUnit',this.managementUnitId)
  }

  getAllDocumentOfProject() {
    this.pageOptions.projetId = this.projetId;

    this.documentService.readDocumentOfProjects(this.pageOptions).subscribe({
      next: value => {
        this.datasource = value;
        this.documents = value.content;
        this.loadingIndicator = false;
      },
      error: err => {
        console.log(err);
        this.loadingIndicator = true;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }

  viewDoc(content: TemplateRef<any>, documentId: any) {
    this.documentId = documentId;
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => { });
  }

  openBasicModal(content: TemplateRef<any>, document?: any) {
    this.documentToEdit = document;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => { });
  }

  getAllTypesDocument() {
    this.documentTypeService.readDocumentOfProjects().subscribe({
      next: value => this.documentTypes = value.content
    })
  }

  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      //  this.getAllDocumentOfProject({ projectId: this.projetId });
      this.getAllDocumentOfProject();
    }
  }

  deleteDocument(documentId: any) {
    Alertes.confirmAction(
      "Suppression",
      "Voulez-vous vraiment executer cette action",
      () => {
        this.documentService.deleteDocumentToProject(documentId).subscribe({
          next: (value) => {
            Alertes.alerteDeleteSuccess();
            // this.getAllDocumentOfProject({ projectId: this.projetId });
            this.getAllDocumentOfProject();
          },
          error: value => { Alertes.alerteDeleteDanger(value.error.message) }
        })
      })

  }

  checkPdf(document: any) {

    if (document?.path?.indexOf(".pdf") > 0) {
      return true;
    }
    return false;
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

  readFormat(file: string, format: string) {
    if (file.indexOf(format) > 0) {
      return false;
    }
    return true;
  }

  doSearch(data: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.pageOptions.projetId = this.projetId;
    this.pageOptions.libelle = data.libelle;
    this.pageOptions.author = data.startDate;
    this.pageOptions.documentTypeId = data.documentTypeId;
    this.pageOptions.date = data.date;
    this.getAllDocumentOfProject();

  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllDocumentOfProject();
  }
}

