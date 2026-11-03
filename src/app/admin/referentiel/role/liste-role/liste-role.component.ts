import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, TemplateRef} from '@angular/core';
import {NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {MatTableDataSource} from "@angular/material/table";
import { RoleService } from '@/app/services/role/role.service';
import { Alertes } from '@/app/util/alerte';
import { Authority } from '@/app/util/Authority';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { FormRegionComponent } from '../../region/form-region/form-region.component';
import { CreateOrUpdateRoleComponent } from '../create-or-update-role/create-or-update-role.component';

@Component({
  selector: 'app-liste-role',
  templateUrl: './liste-role.component.html',
  styleUrls: ['./liste-role.component.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
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

    CreateOrUpdateRoleComponent,


   
  ],
})
export class ListeRoleComponent implements OnInit {

  pageOptions: any = {page: 0, size: 20};
  datasource: any;
  roleToEdit:any;
  roles!: MatTableDataSource<any>;
  add = "";
  read ="";
  update = "";
  delete = "";
  loadingIndicator = true;
  showErrorMessage= false;

  displayedColumns: string[] = [
    'code',
    'libelle',
    'ugp',
    'action',
  ];
  constructor(private roleService: RoleService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.readRoles();
  }


  readRoles() {
    this.roleService.readRoles(this.pageOptions).subscribe({
      next:data=>{
      this.datasource = data;
      this.roles = data.content;
        this.showErrorMessage = false;
        this.loadingIndicator = false;
    },
    error:erreur =>{
      this.showErrorMessage = false;
      this.loadingIndicator = true;
    },
      complete: () => {
        this.loadingIndicator = false;
      }
    })
  }

  openBasicModal(content: TemplateRef<any>,role?:any) {
   this.roleToEdit=role;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
    }).catch((res) => {});
  }

  close(event: boolean){
    if(event){
      this.modalService.dismissAll();
      this.readRoles()
    }
  }
doSearch(data:any){
  this.pageOptions = data;
  this.pageOptions.size = 20;
  this.pageOptions.page = 0;
  this.readRoles()
}
  deleteRoles(id: any) {
    Alertes.confirmAction(
      "Suppression",
      "Voulez-vous vraiment executer cette action",
      () => {
        this.roleService.deleteRole(id).subscribe(data => {
          Alertes.alerteDeleteSuccess("Role")
          this.readRoles()
        })
      })
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.readRoles();
  }

}
