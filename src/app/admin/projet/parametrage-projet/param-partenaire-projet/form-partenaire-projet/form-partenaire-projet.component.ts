import { PartnerProjetService } from '@/app/services/partner-projet/partner-projet.service';
import { StructureService } from '@/app/services/structure/structure.service';
import { Alertes } from '@/app/util/alerte';
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
  selector: 'app-form-partenaire-projet',
  templateUrl: './form-partenaire-projet.component.html',
  styleUrls: ['./form-partenaire-projet.component.scss'],
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
export class FormPartenaireProjetComponent implements OnInit{

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() label!: string;
  @Input() projetId: any;
  @Input() selectedPads: any;
  @Input() padToUpdate: any;
  @Input() isResearch: boolean = false;
  partenaires: any;
  // roles: any=[
  //   {id:'',libelle:''},
  //   {id:'',libelle:''},
  //   {id:'',libelle:''},
  // ];
  form!: FormGroup;

  constructor(
    private partenerProjetService: PartnerProjetService,
    private structurerService: StructureService
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.getAllPartner();

    if(this.padToUpdate !== undefined) {
      // this.getIdsToIgnore(this.selectedPads);
      this.editForm();
    }
  }

  initForm() {
    this.form = new FormGroup(
      {
        structureId: new FormControl('', Validators.required),
        // roleId: new FormControl('', Validators.required)
      }
    );
  }

  editForm() {
    this.form.get('structureId')?.disable({onlySelf: true});
    this.form.get('structureId')?.setValue(this.padToUpdate?.structure.id);
    // this.form.get('roleId')?.setValue(this.padToUpdate?.role.id);
  }

  getIdsToIgnore(pads: any[]) {
    const ids = pads.map((pad:any) => pad.structure.id);
    this.getAllPartner(ids);
  }

  getAllPartner(idsToIgnore?: any) {
    const req: any = {};
    if(idsToIgnore) {
      req.idsToIgnore = idsToIgnore
    }

    req.structureTypeList = ["Partenaire"];
    req.notOnly =true;
    req.sortBy ='nom';
    req.ascending =true;
    this.structurerService.readStructures(req).subscribe(response => {
      this.partenaires = response.content;
    })
  }

  save() {
    const partenaireRequest = this.form.value;
    partenaireRequest.projetId = +this.projetId;
    partenaireRequest.structureProjectType = "PARTNER"
    if(this.padToUpdate === undefined) {
      this.create(partenaireRequest);
    } else {
      partenaireRequest.structureId = this.padToUpdate.structure.id;

      this.update(this.padToUpdate.id, partenaireRequest);
    }
  }

  create(partenaireRequest: any) {
    this.partenerProjetService.addPartnerToProject(partenaireRequest).subscribe({
      next: value => {
        Alertes.alerteAddSuccess('Partenaire');
      },
      error: value => {
        Alertes.alerteAddDanger(value.error.message)
      },
      complete: () => {
        this.close();
      }
    })
  }

  update(padId: any, partenaireRequest: any) {
    this.partenerProjetService.updatePartnerProject(padId, partenaireRequest).subscribe({
      next: value => {
        Alertes.alerteUpdateSuccess('Partenaire');
      },
      error: value => {
        Alertes.alerteUpdateDanger(value.error.message)
      },
      complete: () => {
        this.close();
      }
    })
  }

  doResearch() {
    this.search.emit(this.form.value);
  }

  close() {
    this.submit.emit(true);
  }


}

