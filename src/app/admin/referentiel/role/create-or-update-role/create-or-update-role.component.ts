import { RoleService } from '@/app/services/role/role.service';
import { Alertes } from '@/app/util/alerte';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { FormRegionComponent } from '../../region/form-region/form-region.component';




@Component({
  selector: 'app-create-or-update-role',
  templateUrl: './create-or-update-role.component.html',
  styleUrls: ['./create-or-update-role.component.scss'],
     standalone : true,
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
    NgbNavModule,
    FormRegionComponent

   
  ],
})
export class CreateOrUpdateRoleComponent implements OnInit {

  form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input()roleToUpdate:any;
  @Input() isSearch!:boolean;

  constructor(private roleService: RoleService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        code: new FormControl("", Validators.required),
        libelle: new FormControl("", Validators.required),
        ugp: new FormControl("")
      }
    );
    this.loadFileds();
  }

  loadFileds() {
    if(this.roleToUpdate !== undefined) {
      this.form.get('code')?.setValue(this.roleToUpdate.code);
      this.form.get('libelle')?.setValue(this.roleToUpdate.libelle);
      this.form.get('ugp')?.setValue(this.roleToUpdate.ugp);
    }
  }

  save() {
    if(this.roleToUpdate === undefined) {
      this.create()
    } else {
      this.update()
    }
  }


  create() {
    let role = this.form.value;
    this.roleService.createRole(role).subscribe({
      next:(data) =>{
        Alertes.alerteAddSuccess();
        this.close()
      },
      error:(error)=>{
         console.log("error", error)
        Alertes.alerteAddDanger(error.error.message)
      }

    })
  }
  update() {
    let role = this.form.value;
    this.roleService.updateRole(this.roleToUpdate.id, role).subscribe({
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
