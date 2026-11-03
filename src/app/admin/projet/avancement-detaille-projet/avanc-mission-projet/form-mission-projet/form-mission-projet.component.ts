import { AssignmentTypeService } from '@/app/services/assignment-type/assignment-type.service';
import { AssignmentService } from '@/app/services/assignment/assignment.service';
import { LabelService } from '@/app/services/labelService/label-service';
import { StructureService } from '@/app/services/structure/structure.service';
import { Alertes } from '@/app/util/alerte';
import { Helper } from '@/app/util/helper';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
import { NgbTooltipModule, NgbDropdownModule, NgbPaginationModule, NgbAccordionModule, NgbNavModule, NgbProgressbarModule, NgbCarouselModule, NgbTimepickerModule, NgbPopoverModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { RoutingAvancementProjetComponent } from '../../../routimg-projet/routing-avancement-projet/routing-avancement-projet.component';
import { FormRisqueProjetComponent } from '../../avanc-risque-projet/form-risque-projet/form-risque-projet.component';


@Component({
  selector: 'app-form-mission-projet',
  templateUrl: './form-mission-projet.component.html',
  styleUrls: ['./form-mission-projet.component.scss'],
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
    RoutingAvancementProjetComponent,
    FormRisqueProjetComponent
   ]
})
export class FormMissionProjetComponent implements OnInit {
  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  @Input() isResearch: boolean = false;


  @Input() updateToFormSuiMission: any;

  form!: FormGroup;
  parteners: any;
  executives: any;
  assimentTypes: any;
  @Input() projetId:any;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() isSearch!: boolean;

  file!: File;

  constructor(
    private assignmentTypeService: AssignmentTypeService,
    private structureService: StructureService,
    private labelService: LabelService,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.readParteners();
    this.readExecutives();
    this.readAssignmentTypes();
    this.getProjetId();
    this.reloadFile();
  }

  reloadFile() {
    if (this.updateToFormSuiMission !== undefined) {
      this.form.get('libelle')?.setValue(this.updateToFormSuiMission.libelle);
      this.form
        .get('partenerId')
        ?.setValue(this.updateToFormSuiMission.partener.id);
      this.form
        .get('assignmentTypeId')
        ?.setValue(this.updateToFormSuiMission?.assignmentType?.id);
      this.form
        .get('structureExecutionId')
        ?.setValue(this.updateToFormSuiMission?.structure?.id);
      this.form.get('path')?.setValue(this.updateToFormSuiMission.path);
      this.form
        .get('startDate')
        ?.setValue(Helper.editDate(this.updateToFormSuiMission?.startDate));
      this.form
        .get('endDate')
        ?.setValue(Helper.editDate(this.updateToFormSuiMission?.endDate));
    }
  }

  save() {
    if(this.form.valid){
      let mission = this.form.value;
      console.log("form",mission);
      
      mission.projetId = +this.projetId;
      if (this.updateToFormSuiMission === undefined) {
        this.create(mission);
      } else {
        this.update(this.file, this.updateToFormSuiMission.id, mission);
      }
    }
  }

  initForm() {
    this.form = new FormGroup({
      libelle: new FormControl('', Validators.required),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      assignmentTypeId: new FormControl('', Validators.required),
      partenerId: new FormControl('', Validators.required),
      structureId: new FormControl('', Validators.required),
    });
  }

  readParteners() {
    let req = {
      typeStructure: 'Partenaire',
      page: 0,
      size: 100000,
      sortBy: 'nom',
      ascending: true
    };
    this.structureService.readStructures(req).subscribe((data) => {
      this.parteners = data.content;
    });
  }

  readExecutives(){
    let req = {
      typeStructure: "Execution",
      page: 0,
      size: 100000,
      sortBy: 'nom',
      ascending: true
    }
    this.structureService.readStructures(req).subscribe(data=>{
      this.executives = data.content;
    });
  }

  readAssignmentTypes() {
    let req:any ={};
    req.referentielType = "TYPE_MISSION"
    this.labelService.readLabels(req).subscribe({
      next:reponse=>{
        console.log("liste recup type missions :",reponse)
        this.assimentTypes = reponse.content;
      },
      error:err => {
        console.log("erreur recup :",err)
      }
    });
  }

  getProjetId() {
    this.projetId = localStorage.getItem('projetId')!;
  }

  create(mission: any) {
    this.assignmentService.createAssignment(this.file, mission).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess('enregistrement effectue avec succes');
        this.close();
      },
      error: (error) => {
        console.log("error",error);
        
        Alertes.alerteAddDanger(error.error.message);
      },
    });
  }

  update(file: any, missionId: any, mission: any) {
    this.assignmentService.updateAssignment(file, missionId, mission).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess();
        this.close();
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.error.message);
      },
    });
  }

  fileChange(event: any){
    this.file = event.target.files;
  }

  reset() {
    this.form.reset();
  }

  close() {
    this.submit.emit(true);
  }
  doSearch(){
    const mission: any = {
      libelle: this.form.value.libelle,
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
      assignmentTypeId: this.form.value.assignmentTypeId,
      structureExecutionId: this.form.value.structureExecutionId,
      projetId: +this.projetId!
    };
    this.search.emit(mission);
  }
}
