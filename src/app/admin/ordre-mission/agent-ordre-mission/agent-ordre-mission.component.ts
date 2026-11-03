import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import saveAs from 'file-saver';

import { Alertes } from 'src/app/util/alerte';
import { Authority } from 'src/app/util/Authority';

import { DomSanitizer } from '@angular/platform-browser';
import { DocumentService } from '@/app/services/documentService/document-service.service';
import { OrdreMissionService } from '@/app/services/ordre-mission/ordre-mission.service';
import { LabelService } from '@/app/services/labelService/label-service';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { MaterialModule } from '@/app/util/material/material.module';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SharedModule } from 'primeng/api';
import { CreateOrUpdateCadrelogiqueComponent } from '../../referentiel/cadrelogiques/create-or-update-cadrelogique/create-or-update-cadrelogique.component';
import { RegionComponent } from '../../referentiel/cadrelogiques/region/region.component';
@Component({
  selector: 'app-agent-ordre-mission',
  imports : [
           CommonModule,
    SpinnerComponent,
    MaterialModule,
    SharedModule,
    NgbPaginationModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    HasAnyAuthorityDirective,
    CreateOrUpdateCadrelogiqueComponent,
    RegionComponent,
    NgbNavModule,
    // FicheOrdreMissionPerAgentComponent
  ],
  templateUrl: './agent-ordre-mission.component.html',
  styleUrls: ['./agent-ordre-mission.component.scss']
})
export class AgentOrdreMissionComponent {

  // displayedColumns: string[] = [
  //   'code',
  //   'libelle',
  //   //'piece',
  //   'actions'
  // ];
  @Input() agent: any;

  displayedColumns: string[] = [
    'matricule',
    'prenom',
    'nom',
    //'dateNaissance',
    'telephone',
    'adresse',
    // 'corps',
    //'grade',
    // 'echellon',
    //'unite',
    'actions',
  ];
  conger!: MatTableDataSource<any>;
  file!: File

  loadingIndicator = true;

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() refreshList: EventEmitter<any> = new EventEmitter();

  deleted ="";
  updated ="";
  genenred ="";

  documentConges: any = [
    { "code": "DOC001", "libelle": "Attestation de congé" },
    { "code": "DOC002", "libelle": "Certificat médical" }
  ]
  @Input() congeToCreate: any;
  documentToUpdate: any = undefined;
  basicModalCloseResult: string = '';
  datasource: any;
  pageOptions: any = { page: 0, size: 20 };
  form!: FormGroup;
  ordreMissionId: any;
  documentId: any;
  typeDocmnt: any;
  idAgent: any;
  agentFiche: any;
  OrdreMissioninfo: any;


  constructor(private modalService: NgbModal,
    private fb: FormBuilder, private document: DocumentService,
    private ordreMissionService: OrdreMissionService,
    private documentService: DocumentService,
    private sanitizer: DomSanitizer,
    private labelService: LabelService) { }

  ngOnInit(): void {
    this.initForm()
    this.getOrdreMissions()
    this.getAllOrdreMission()
  }


  getOrdreMissions() {
    this.ordreMissionId = localStorage.getItem("idOrdreMission");
    console.log("fari ordreMissionId", this.ordreMissionId)
  }



  initForm() {
    this.form = this.fb.group({
      libelle: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      documentTypeId: new FormControl('', Validators.required),

      // date: new FormControl(''), on peut prendre la date du jour
      //author: [''], l'utilisateur connecte
      //documentTypeId:new FormControl('',Validators.required)
    })
  }

  getAllActivitee(componentId?: any, code?: any, libelle?: any, poids?: any) {
    this.loadingIndicator = true;
    const req = {
      componentId: componentId,
      code: code,
      libelle: libelle,
      poids: poids
    };
    this.pageOptions.componentId = this.congeToCreate.id;
    console.log('renvoie la liste req:', this.pageOptions)

  }


  getAllOrdreMission() {
    this.loadingIndicator = false
    this.pageOptions.ordreMissionId = this.ordreMissionId
    this.ordreMissionService.readOrdreMission(this.ordreMissionId).subscribe({
      next: value => {
        this.datasource = value.payload[0]
      },
      error: error => {

      }, complete: () => {

      }
    })
  }

  openBasicModal(content: TemplateRef<any>, document?: any,ordreMission?:any) {
    this.OrdreMissioninfo=ordreMission
    this.agentFiche=document
    this.idAgent=document.id
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }).catch((res) => { });
  }


  viewDoc(content: TemplateRef<any>, documentId: any) {
    this.documentId = documentId;
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => { });
  }

  refreshActivities() {
    //this.refreshList.emit({  refresh: true });
  }

  edit(document: any) {
    this.documentToUpdate = document;
    this.form.get('code')?.setValue(this.documentToUpdate.code);
    this.form.get('libelle')?.setValue(this.documentToUpdate.libelle);
    this.form.get('poids')?.setValue(this.documentToUpdate.poids);
    this.form.get('documentTypeId')?.setValue(this.documentToUpdate.documentType.id);


  }

  getOrdreMission() {
    this.ordreMissionId = localStorage.getItem("idOrdreMission");
    console.log("lay test ordreMissionId", this.ordreMissionId)
  }


  deleteDocument(agentId: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.ordreMissionService.deleteDocumentOrdreMission(agentId).subscribe({
          next: () => {
            Alertes.alerteDeleteSuccess();
            this.getAllOrdreMission();
          }, error: value => {
            Alertes.alerteDeleteDanger(value.error.message)
          }
        })
      }
    );
  }



  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllOrdreMission()
  }

  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    this.getAllActivitee(data.congeId, data.code, data.libelle, data.poids)
  }


  save() {

    const document = this.form.value;
    document.agentId=this.idAgent
    document.ordreMissionId=this.agent
    const ordreMissionId = this.ordreMissionId;

    if (this.documentToUpdate === undefined) {
      this.create(ordreMissionId, this.file, document)
    } else {
      this.update(this.documentToUpdate.id, document, this.file);

    }
    this.form.reset();
  }



  create(idfamily: any, file?: any, document?: any) {
    this.ordreMissionService.createOrdreMissionDocument(idfamily, file, document).subscribe({
      next: (value) => {
        Alertes.alerteAddSuccess("enregistrement reussi")
        this.getAllOrdreMission()
        this.close()
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.message.code)
      },
      complete: () => {

      }
    })
  }



  close() {
    this.submit.emit(true);
  }
  // close(event: boolean) {
  //   if (event) {
  //     this.modalService.dismissAll();
  //     this.getAllActivitee(this.congeId)

  //   }
  // }

  checkFileType(document: any): string {
    const extension = document.path?.split('.').pop();
    if (extension === 'docx') {
      return 'fas fa-file-word fs-2 text-primary';
    } else if (extension === 'xlsx') {
      return 'fas fa-file-excel fs-2 text-success';
    }
    else if (extension === 'pptx') {
      return 'fas fa-file-powerpoint fs-2 text-danger';
    }
    else {
      return '';
    }
  }


  update(documentId: any, document: any, file?: any,) {
    this.documentService.updateDocument(documentId, document, file).subscribe({

      next: value => {
        Alertes.alerteAddSuccess('Modification reussi');
        this.getAllOrdreMission()
      },
      error: value => {
        Alertes.alerteAddDanger(value.error.message)
      },
      complete: () => {
        this.getAllOrdreMission()
        // this.documentToUpdate = undefined;
      }
    })
  }

  fileChange(event: any) {
    this.file = event.target.files;
  }
  checkPdf(document: any) {
    if (document?.path?.indexOf(".pdf") > 0) {

      return true;
    }
    return false;
  }
  // sanitize(url:string){
  //   return this.sanitizer.bypassSecurityTrustUrl(url);
  // }
  downloadFile(document: any) {
    this.documentService.readFile(document?.id).subscribe((data: BlobPart) => {

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
}
