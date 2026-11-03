import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, TemplateRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { SubSectorService } from 'src/app/services/sub-sector/sub-sector.service';
import { Alertes } from 'src/app/util/alerte';
import { CreateOrUpdateStatusComponent } from '../../status/create-or-update-status/create-or-update-status.component';
import { FormSousSecteurComponent } from '../form-sous-secteur/form-sous-secteur.component';


@Component({
  selector: 'app-list-sous-secteur',
  templateUrl: './list-sous-secteur.component.html',
  styleUrls: ['./list-sous-secteur.component.scss'],
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
    FormSousSecteurComponent

   
  ],
})
export class ListSousSecteurComponent  implements OnInit{

  referentielType: any;
  displayedColumns: string[] = [
    'code',
    'libelle',
    'sector',
    // 'Budget',
    'actions'
  ];

  pageOptions: any = {
    page: 0,
    size: 20
  }
  datasource: any;

  loading = true;
  sousSecteurToUpdate: any;

  constructor(
    private modalService: NgbModal,
    private subSectorService: SubSectorService
    ){

}

ngOnInit(): void {
  this.getReferentielType();
  this.getAllSousSecteur(this.pageOptions);
  // console.log("sous categorie",this.datasource)
}

  getReferentielType() {
    this.referentielType = localStorage.getItem('referentielType')!;
    this.referentielType = JSON.parse(this.referentielType);
  }

  getAllSousSecteur(pageOptions: any) {
    this.loading = true;
    // pageOptions.referentielType = this.referentielType.name;
    this.subSectorService.readSubsectors(pageOptions).subscribe({
      next: response => {
        this.datasource = response;
        this.loading = false;
      },
      error: response => {},
      complete: () => this.loading = false
    })
  }

  openBasicModal(content: TemplateRef<any>) {

    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
    }).catch((res) => {});
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllSousSecteur(this.pageOptions);
  }

  openDialog(content: TemplateRef<any>, modalSize: any, label?: any) {
    this.sousSecteurToUpdate = label;

    this.modalService.open(content, {size: modalSize, backdrop: 'static'}).result.then((result) => {

    }).catch((res) => {});
  }

  deleteSubsector(sectorId: any) {
    Alertes.confirmAction('Etes-vous sûr de vouloire supprimer ?',
      '',
      () =>  {
        this.subSectorService.deleteSubsector(sectorId).subscribe({
          next: response => {},
          error: response => {},
          complete: () => {
            this.getAllSousSecteur(this.pageOptions);
          }
        });
      }
    )
  }

  close () {
    this.modalService.dismissAll();
    this.getAllSousSecteur(this.pageOptions);
  }

  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.getAllSousSecteur(this.pageOptions);
    this.modalService.dismissAll();
  }

}

