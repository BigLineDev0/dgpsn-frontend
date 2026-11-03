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
import { IndicateurService } from '@/app/services/indicateur/indicateur.service';
import { CreateOrUpdateIndicateurComponent } from '../create-or-update-indicateur/create-or-update-indicateur.component';

@Component({
  selector: 'app-list-indicateur',
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
    HasAnyAuthorityDirective,
    CreateOrUpdateIndicateurComponent,
    RegionComponent,
    NgbNavModule,

   
  ],
   schemas : [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './list-indicateur.component.html',
  styleUrls: ['./list-indicateur.component.scss']
})
export class ListIndicateurComponent implements OnInit {
  referentielType: any;
  indicatorType: any;
  indicateurToUpdate: any;
  displayedColumns: string[] = [
    'code',
    'libelle',
    'unite',
    'typeIndicateur',
    'actions'
  ];

  pageOptions: any = {
    page: 0,
    size: 10
  }
  datasource: any;

  loading = true;
  updateIndicateurModal: any;

  constructor(
    private modalService: NgbModal,
    private indicateurService: IndicateurService
    ){

  }
  ngOnInit(): void {
    this.getReferentielType();
    this.getAllIndicateur();
  }

  getReferentielType() {
    this.referentielType = localStorage.getItem('referentielType')!;
    this.referentielType = JSON.parse(this.referentielType);
  }
  getAllIndicateur() {
    this.loading = true;
    this.indicateurService.readIndicators(this.pageOptions).subscribe({
      next: response => {
        this.datasource = response;
        this.loading = false;
      },
      error: response => {},
      complete: () => this.loading = false 
    })
  }


  openDialog(content: TemplateRef<any>, modalSize: any, indicateur?: any) {
    this.indicateurToUpdate = indicateur;
    this.modalService.open(content, {size: modalSize, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteIndicateur(labelId: any) {
    Alertes.confirmAction('Etes-vous sûr de vouloire supprimer ?',
      '',
      () =>  { 
        this.indicateurService.deleteIndicateur(labelId).subscribe({
          next: response => {},
          error: response => {},
          complete: () => {
            this.getAllIndicateur();
          }
        });
      }
    )
  }

  doSearch(data:any){
    this.pageOptions=data;
    this.pageOptions.size=3;
    this.pageOptions.page=0;
    this.getAllIndicateur()
  }


  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllIndicateur();
  }

  deleteStatut(labelId: any) {
    Alertes.confirmAction('Etes-vous sûr de vouloire supprimer ?',
      '',
      () =>  { 
        this.indicateurService.deleteIndicateur(labelId).subscribe({
          next: response => {},
          error: response => {},
          complete: () => {
            this.getAllIndicateur();
          }
        });
      }
    )
  }
  close() {
    this.modalService.dismissAll();
    this.getAllIndicateur();
  }
}
