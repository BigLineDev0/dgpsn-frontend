import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CadreLogiqueService } from 'src/app/services/cadre-logique/cadre-logique.service';
import { Alertes } from 'src/app/util/alerte';

import {MenuItem, SharedModule, TreeNode} from "primeng/api";
import { Authority } from '@/app/util/Authority';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { CreateOrUpdateCadrelogiqueComponent } from '../create-or-update-cadrelogique/create-or-update-cadrelogique.component';
import { RegionComponent } from '../region/region.component';
import { DepartementComponent } from '../departement/departement.component';
import { ArrondissementComponent } from '../arrondissement/arrondissement.component';
import { CommuneComponent } from '../commune/commune.component';

@Component({
  selector: 'app-list-cadrelogique',
  templateUrl: './list-cadrelogique.component.html',
  styleUrls: ['./list-cadrelogique.component.scss'],
     standalone:true,
    imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    NgbPaginationModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    CreateOrUpdateCadrelogiqueComponent,
    RegionComponent,
    NgbNavModule,
    DepartementComponent,
    ArrondissementComponent,
    CommuneComponent
  ],
   schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class ListCadrelogiqueComponent {

  cardres: any;

  datasource: any;

  cadreLogToEdit: any;
  pageOptions: any = {page: 0, size: 4};
  
  loadingIndicator = true;
  showErrorMessage= false;
add = "";
  read = "";
  update ="";
  delete ="";

  displayedColumns: string[] = [
    'code',
    'libelle',
    'actions'
  ];

  constructor(private cadrelogique: CadreLogiqueService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.readcadrelogs()
  }

  readcadrelogs() {
    this.cadrelogique.readCadreLogiques(this.pageOptions).subscribe({
      
      next: response => {
        this.datasource = response;
        this.showErrorMessage = false;
        this.loadingIndicator = false;
      },
      error: err => {
        console.log(err);
        this.loadingIndicator = false;
        this.showErrorMessage = true;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    })
  }

  openBasicModal(content: TemplateRef<any>, cadreLog?:any) {
    this.cadreLogToEdit = cadreLog;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }).catch((res) => { });
  }

  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      this.readcadrelogs()
    }
  }

  deletecadrelogs(id: any) {
    Alertes.confirmAction(
      "Suppression",
      "Voulez-vous vraiment executer cette action",
      () => {
        this.cadrelogique.deleteCadreLogique(id).subscribe(data => {
          this.readcadrelogs()
        })
      })

  }
  doSearch(data: any){
    this.pageOptions = data;
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.readcadrelogs();
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.readcadrelogs();
  }
  
}
