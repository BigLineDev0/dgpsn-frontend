import { PartnerProjetService } from '@/app/services/partner-projet/partner-projet.service';
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
import { RoutingConfigProjetComponent } from '../../../routimg-projet/routing-config-projet/routing-config-projet.component';
import { FormJalonProjetComponent } from '../../param-jalon-projet/form-jalon-projet/form-jalon-projet.component';


@Component({
  selector: 'app-form-structure-tutelle-projet',
  templateUrl: './form-structure-tutelle-projet.component.html',
  styleUrls: ['./form-structure-tutelle-projet.component.scss'],
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
    RoutingConfigProjetComponent,
    FormJalonProjetComponent,
    SpinnerComponent,
    
 
  ]
})
export class FormStructureTutelleProjetComponent implements OnInit {

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() projetId: any;
  @Input() isResearch: boolean = false;
  @Input() partenaireRequestToUpdate:any
  partenaires: any;
  form!: FormGroup;

  structureProjectTypeList: any = [
    { nom: 'EXECUTION', libelle: 'Exécution' },
    { nom: 'PARTNER', libelle: 'Partenaire' },
    { nom: 'GUARDIANSHIP', libelle: 'Tutelle' },
  ];

  constructor(
    private partenerProjetService: PartnerProjetService,
    private structurerService: StructureService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.reloadFile();
    this.getProjet();

    this.getAllPartner();
  }
  reloadFile() {

    if (this.partenaireRequestToUpdate !== undefined) {
      // console.log("log", this.partenaireRequestToUpdate);
      this.form.get('structureId')?.setValue(this.partenaireRequestToUpdate?.structure?.id);
      this.form.get('startDate')?.setValue(Helper.editDate(this.partenaireRequestToUpdate.startDate));
      this.form.get('endDate')?.setValue(Helper.editDate(this.partenaireRequestToUpdate.endDate));
      this.form.get('structureProjectType')?.setValue(this.partenaireRequestToUpdate?.structureProjectType.name);
    }
  }
  getProjet() {
    this.projetId = localStorage.getItem('projectId')!;
  }

  initForm() {
    this.form = new FormGroup({
      structureId: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl(''),
      structureProjectType: new FormControl(''),


    });
  }

  getIdsToIgnore(pads: any[]) {
    const ids = pads.map((pad: any) => pad.structure.id);
    this.getAllPartner(ids);
  }

  getAllPartner(idsToIgnore?: any) {

    const req: any = {};
    if (idsToIgnore) {
      req.idsToIgnore = idsToIgnore;
    }
    req.structureTypeList = ["Ministere"];
    req.notOnly = true;
    req.sortBy = 'nom';
    req.ascending = true;
    this.structurerService.readStructures(req).subscribe((response) => {
      this.partenaires = response.content;
    });
  }

  save() {
    const partenaireRequest = this.form.value
    partenaireRequest.projetId = +this.projetId;
    partenaireRequest.structureProjectType = 'GUARDIANSHIP';

     console.log("GUARDIANSHIP: ",partenaireRequest)

    if (this.partenaireRequestToUpdate === undefined) {
      this.create(partenaireRequest);
    } else {
      this.update(partenaireRequest);
    }
  }

  create(partenaireRequest: any) {
    this.partenerProjetService.addPartnerToProject(partenaireRequest)
      .subscribe({
        next: (value) => {
          Alertes.alerteAddSuccess('Structure tutelle');
        },
        error: (value) => {
          Alertes.alerteAddDanger(value.error.message);
        },
        complete: () => {
          this.close();
        },
      });
  }

  update(partenaireRequest: any) {
    this.partenerProjetService.updatePartnerProject(this.partenaireRequestToUpdate.id, partenaireRequest).subscribe({
      next:(data) =>{
        Alertes.alerteUpdateSuccess('Structure tutelle');
        this.close();
      },
      error:(error)=>{
        Alertes.alerteUpdateDanger(error.error.message)
      }
    })
  }

  doResearch() {
    const structure :any ={
      structureId:this.form.value.structureId,
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
      structureProjectType: this.form.value.structureProjectType
    }
    this.search.emit(structure);
  }

  close() {
    this.submit.emit(true);
  }
}
