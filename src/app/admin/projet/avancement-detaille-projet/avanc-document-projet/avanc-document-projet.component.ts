import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {saveAs} from "file-saver";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { EvaluationDossierComponent } from '../../appel-offre-projet/evaluation-dossier/evaluation-dossier.component';
import { DocumentReceptionDossierComponent } from '../../appel-offre-projet/reception-dossier/document-reception-dossier/document-reception-dossier.component';
import { FormReceptionDossierComponent } from '../../appel-offre-projet/reception-dossier/form-reception-dossier/form-reception-dossier.component';
import { RoutingAppelOffreSuiteLancementComponent } from '../../routimg-projet/routing-appel-offre-suite-lancement/routing-appel-offre-suite-lancement.component';
import { DocumentService } from '@/app/services/document/document.service';
import { DocumentTypesService } from '@/app/services/documentType/document-types.service';
import { Alertes } from '@/app/util/alerte';
import { Authority } from '@/app/util/Authority';
import { RoutingAvancementProjetComponent } from '../../routimg-projet/routing-avancement-projet/routing-avancement-projet.component';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';

@Component({
  selector: 'app-avanc-document-projet',
  templateUrl: './avanc-document-projet.component.html',
  styleUrls: ['./avanc-document-projet.component.scss'],
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
    RoutingAvancementProjetComponent,
    
    MatButtonModule,
  ]
})
export class AvancDocumentProjetComponent implements OnInit {

  displayedColumns: string[] = [
    'titre',
    'date',
    'auteur',
    'type document',
    'piece',
    'actions'
  ];

  documents!: MatTableDataSource<any>;

  @Input() projetId: any;
  @Input() action!: boolean;
  pageOptions: any = { page: 0, size: 20 };
  datasource: any;
  basicModalCloseResult!: string;
  documentId: any;
  documentToEdit: any;
  libelle: any;

  loadingIndicator = true;

  read = Authority.READ_DOCUMENT
  add = Authority.ADD_DOCUMENT
  edit = Authority.EDIT_DOCUMENT
  deletes = Authority.DELETE_DOCUMENT
  readFile = Authority.READ_FILE_DOCUMENT

  constructor(private documentService: DocumentService,
              private modalService: NgbModal,
              private documentTypeService: DocumentTypesService) { }

  ngOnInit(): void {
    this.getAllDocumentOfProject();
    this.libelle = localStorage.getItem('projetLibelle');
  }

  getAllDocumentOfProject() {
    this.projetId = localStorage.getItem('managementUnitId');
    // this.pageOptions.projetId = this.projetId;
    this.pageOptions.projetId = localStorage.getItem('managementUnitId');
    this.documentService.readDocumentOfProjects(this.pageOptions).subscribe({
      next: value => {
        this.datasource = value;
        this.documents = value.content;
        this.loadingIndicator = false;
      },
      error: err => {
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


  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
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
