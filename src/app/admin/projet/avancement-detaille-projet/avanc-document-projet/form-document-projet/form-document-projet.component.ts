import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { DocumentService } from '@/app/services/document/document.service';
import { DocumentTypesService } from '@/app/services/documentType/document-types.service';
import { LabelService } from '@/app/services/labelService/label-service';
import { Alertes } from '@/app/util/alerte';
import { Helper } from '@/app/util/helper';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { EvaluationDossierComponent } from '../../../appel-offre-projet/evaluation-dossier/evaluation-dossier.component';
import { DocumentReceptionDossierComponent } from '../../../appel-offre-projet/reception-dossier/document-reception-dossier/document-reception-dossier.component';
import { FormReceptionDossierComponent } from '../../../appel-offre-projet/reception-dossier/form-reception-dossier/form-reception-dossier.component';
import { RoutingAppelOffreSuiteLancementComponent } from '../../../routimg-projet/routing-appel-offre-suite-lancement/routing-appel-offre-suite-lancement.component';



@Component({
  selector: 'app-form-document-projet',
  templateUrl: './form-document-projet.component.html',
  styleUrls: ['./form-document-projet.component.scss'],
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

  ]
})
export class FormDocumentProjetComponent implements OnInit {

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() projetId: any;
  @Input() documentToUpdate: any;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() isSearch!: boolean;
  documentTypes: any = [];
  file!: File;

  constructor(private modalService: NgbModal,
              private documentTypeService: DocumentTypesService,
              private fb: FormBuilder,
              private document:DocumentService,
              private labelService:LabelService) { }
  form!: FormGroup;
  ngOnInit(): void {
    this.getAllTypesDocument();
    this.initForm();
    if(this.documentToUpdate){
      this.loadFileds();
    }
  }

  initForm() {
    this.form = this.fb.group({
      libelle: new FormControl('',Validators.required),
      date:new FormControl(''),
      author:[''],
      documentTypeId:new FormControl('',Validators.required)
    })
  }


  create(){
    let document = this.form.value;
    document.projetId = localStorage.getItem('projetId');
    if(this.form.valid){
      if(!this.documentToUpdate){
        // console.log("doc add", document)
        this.document.addDocumentToProject(document, this.file).subscribe({
          next:(data) =>{
            Alertes.alerteAddSuccess();
            this.close();
          },
          error:(error)=>{
            Alertes.alerteAddDanger(error.error.message)
          }
        })
      }else {
        // console.log("doc ", document)
        this.document.updateDocumentToProject(this.documentToUpdate.id, document, this.file).subscribe({
          next:(data) =>{
            Alertes.alerteUpdateSuccess();
            this.close();

          },
          error:(error)=>{
            Alertes.alerteUpdateDanger(error.error.message)
          }
        })
      }
    }
  }



  close(){
    this.submit.emit(true);
  }

  getAllTypesDocument() {
    let req = {
      page: 0,
      size: 100000,
      sortBy: 'libelle',
      ascending: true,
      referentielType : 'TYPE_DOCUMENT',
    };
    this.labelService.readLabels(req).subscribe({
      next: value => this.documentTypes = value.content
    })
  }

  fileChange(event: any){
    this.file = event.target.files;
  }

  loadFileds() {
    this.form.get('libelle')?.setValue(this.documentToUpdate.libelle);
    if(this.documentToUpdate.date){
      this.form.get('date')?.setValue(Helper.editDate(this.documentToUpdate.date));
    }
    this.form.get('author')?.setValue(this.documentToUpdate.author);
    this.form.get('documentTypeId')?.setValue(this.documentToUpdate.documentType.id);
  }

  doSearch() {
    const document: any = this.form.value;
    document.projetId = +this.projetId!,
      // document.date = Helper.getDateFormatter(this.form.value.date),
      this.search.emit(document);
  }
}
