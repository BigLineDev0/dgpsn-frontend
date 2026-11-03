import { RoleService } from '@/app/services/role/role.service';
import { UgpService } from '@/app/services/ugp/ugp.service';
import { Alertes } from '@/app/util/alerte';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { RoutingConfigProjetComponent } from '../../../routimg-projet/routing-config-projet/routing-config-projet.component';
import { FormJalonProjetComponent } from '../../param-jalon-projet/form-jalon-projet/form-jalon-projet.component';
import { FormStructureTutelleProjetComponent } from '../../param-structure-tutelle-projet/form-structure-tutelle-projet/form-structure-tutelle-projet.component';


@Component({
  selector: 'app-form-ugp-projet',
  templateUrl: './form-ugp-projet.component.html',
  styleUrls: ['./form-ugp-projet.component.scss'],
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
    FormStructureTutelleProjetComponent
    
 
  ]
})
export class FormUgpProjetComponent implements OnInit{


  form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() ugpProjectToUpdate:any;
  @Input() isSearch!:boolean;
  @Input() projetId: any;

  ugpRoles: any;
  toUpadte = false;

  status = [
    { libelle: 'Fonctionnaire' },
    { libelle: 'Contractuel' }
  ]

  constructor(private roleService: RoleService, private ugpProjectService: UgpService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        ugpRoleId: new FormControl(null, Validators.required),
        existed: new FormControl(""),
        occupied: new FormControl(""),
        posteCle: new FormControl(""),
        status: new FormControl("")
      }
    );

    this.getUgpRoles();

    this.loadFileds();
    if(this.ugpProjectToUpdate !== undefined) {
      this.toUpadte = true;
    } else {
      this.toUpadte = false;
    }
  }

  getUgpRoles() {
    this.roleService.readRoleUgp({projectId: this.projetId}).subscribe({
      next: value => this.ugpRoles = value
    })
  }

  loadFileds() {
    if(this.ugpProjectToUpdate !== undefined) {
      this.form.get('ugpRoleId')?.setValue(this.ugpProjectToUpdate.ugpRole.id);
      this.form.get('existed')?.setValue(this.ugpProjectToUpdate.existed);
      this.form.get('occupied')?.setValue(this.ugpProjectToUpdate.occupied);
      this.form.get('status')?.setValue(this.ugpProjectToUpdate.status);
      this.form.get('posteCle')?.setValue(this.ugpProjectToUpdate.ugpRole?.libelle);

    }
  }

  save() {
    let ugpProject = this.form.value;
    ugpProject.projetId = +this.projetId;
    if(this.ugpProjectToUpdate === undefined) {
      this.create(ugpProject)
      console.log("log",ugpProject)
    } else {
      this.update(ugpProject)
    }
  }


  create(ugpProject: any) {
    this.ugpProjectService.addUgpToProject(ugpProject).subscribe({
      next:(data) =>{
        Alertes.alerteAddSuccess();
        this.close()
      },
      error:(error)=>{
        // console.log("error", error)
        Alertes.alerteAddDanger(error.error.message)
      }

    })
  }
  update(ugpProject: any) {
    this.ugpProjectService.updateUgpProject(this.ugpProjectToUpdate.id, ugpProject).subscribe({
      next:(data) =>{
        Alertes.alerteAddSuccess('Modification reussi');
        this.close()
      },
      error:(error)=>{
        // console.log("error", error)
        Alertes.alerteAddDanger(error.error.message)
      }

    })
  }

  doSearch(){
    this.search.emit(this.form.value)
  }

  close(){
    this.submit.emit(true);
  }
}
