import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, TemplateRef } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SharedModule } from 'primeng/api';
import { CreateOrUpdateCadrelogiqueComponent } from '../../cadrelogiques/create-or-update-cadrelogique/create-or-update-cadrelogique.component';
import { RegionComponent } from '../../cadrelogiques/region/region.component';
import { NaturedelarecetteService } from '@/app/services/naturedelarecette/naturedelarecette.service';
import { FormNaturedelarecetteComponent } from '../form-naturedelarecette/form-naturedelarecette.component';
// TODO : import NaturedelarecetteService

@Component({
  selector: 'app-list-naturedelarecette',
  standalone : true,
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
    HasAnyAuthorityDirective,
    CreateOrUpdateCadrelogiqueComponent,
    RegionComponent,
    NgbNavModule,
    FormNaturedelarecetteComponent
  ],
  templateUrl: './list-naturedelarecette.component.html',
  styleUrls: ['./list-naturedelarecette.component.scss']
})
export class ListNaturedelarecetteComponent implements OnInit {

  loadingIndicator = true;
  naturedelarecetteToUpdate : any;
  naturedelarecetteId : any;
  pageOptions: any = { page: 0, size: 10 };
  dataSource: any;
  metadata: any;
  displayedColumns: string[] = [
    'code',
    'libelle',
    'actions',
  ];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private naturedelarecetteService: NaturedelarecetteService
  ) { }

  ngOnInit() {
    this.getNaturedelarecettes();
  }

  getNaturedelarecettes(){
    this.loadingIndicator = true;
    const params = this.pageOptions;
    this.naturedelarecetteService.readNaturedelarecettes(params).subscribe({
      next: response => {
        this.dataSource = response?.payload;
        this.metadata = response?.metadata;
      },
      error: err => this.loadingIndicator = false,
      complete: () => this.loadingIndicator = false
    });
  }

  delete(naturedelarecetteId:any){
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.naturedelarecetteService.deleteNaturedelarecette(naturedelarecetteId).subscribe({
      next: response => {
        Alertes.alerteDeleteSuccess()
      },
      error: err => Alertes.errorPopPup('Suppression échouée',err?.error?.message),
      complete: () => this.getNaturedelarecettes()
      });
    })

   }

  paginate($event: any){
    this.loadingIndicator = true;
     this.pageOptions.page = $event - 1;
      this.getNaturedelarecettes()
   }

  close(event: boolean){
    if (event) {
      this.modalService.dismissAll();
      this.getNaturedelarecettes()
    }
  }

  doSearch(data: any){
      this.pageOptions = data;
      this.pageOptions.page = 0;
      this.pageOptions.size = 20;
      this.getNaturedelarecettes()
      this.modalService.dismissAll();
   }

  openBasicModal(content: TemplateRef<any>, size?: any, naturedelarecette?: any) {
      this.naturedelarecetteToUpdate = naturedelarecette;
      this.naturedelarecetteId = naturedelarecette?.id;
      this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {

      }).catch((res) => {
      });
   };

}
