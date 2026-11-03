import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { RegionService } from 'src/app/services/region/region.service';
import { DepartementService } from '@/app/services/departement/departement.service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SharedModule } from 'primeng/api';
import { CreateOrUpdateCadrelogiqueComponent } from '../../cadrelogiques/create-or-update-cadrelogique/create-or-update-cadrelogique.component';
import { RegionComponent } from '../../cadrelogiques/region/region.component';
import { OngletSuiviRegionComponent } from '../../region/onglet-suivi-region/onglet-suivi-region.component';
import { FormDepartementComponent } from '../form-departement/form-departement.component';

@Component({
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
  styleUrls: ['./list-departement.component.scss'],
    standalone:true,
    imports: [
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
    OngletSuiviRegionComponent,
    FormDepartementComponent,
   
  ],
})
export class ListDepartementComponent implements OnInit {

   region: any;
  loadingIndicator = true;
  departementToUpdate : any;
  departementId : any;
  pageOptions: any = { page: 0, size: 10 };
  dataSource: any;
  metadata: any;
  displayedColumns: string[] = [
    'actions',
  ];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private departementService: DepartementService,
    private regionService: RegionService
  ) { }

  ngOnInit() {
    this.getDepartements();
    this.getRegion();
  }

  getDepartements(){
    this.loadingIndicator = true;
    const params = this.pageOptions;
    params.regionId = this.getRegionId();
    this.departementService.readDepartements(params).subscribe({
      next: response => {
        this.dataSource = response?.payload;
        this.metadata = response?.metadata;
      },
      error: err => this.loadingIndicator = false,
      complete: () => this.loadingIndicator = false
    });
  }

  delete(departementId:any){
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.departementService.deleteDepartement(departementId).subscribe({
      next: response => {
        Alertes.alerteDeleteSuccess()
      },
      error: err => Alertes.errorPopPup('Suppression échouée',err?.error?.message),
      complete: () => this.getDepartements()
      });
    })

   }

  paginate($event: any){
    this.loadingIndicator = true;
     this.pageOptions.page = $event - 1;
      this.getDepartements()
   }

  close(event: boolean){
    if (event) {
      this.modalService.dismissAll();
      this.getDepartements()
    }
  }

  doSearch(data: any){
      this.pageOptions = data;
      this.pageOptions.page = 0;
      this.pageOptions.size = 20;
      this.getDepartements()
      this.modalService.dismissAll();
   }

  getRegionId(): any {
    return localStorage.getItem('idRegion');
  }

  getRegion() {
    this.regionService.readRegion(localStorage.getItem('idRegion')).subscribe({
      next: response => {
        this.region = response;
      },
      error: err => {},
      complete: () => {}
    });
  }

  openBasicModal(content: TemplateRef<any>, size?: any, departement?: any) {
      this.departementToUpdate = departement;
      this.departementId = departement?.id;
      this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {

      }).catch((res) => {
      });
   };

}
