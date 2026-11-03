import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, TemplateRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { SousCategorieService } from 'src/app/services/sousCategorie/sous-categorie.service';
import { Alertes } from 'src/app/util/alerte';
import { FormRegionComponent } from '../../region/form-region/form-region.component';
import { FormSecteuractiviteComponent } from '../../secteuractivite/form-secteuractivite/form-secteuractivite.component';
import { FormSousSecteurComponent } from '../../sous-secteur/form-sous-secteur/form-sous-secteur.component';


@Component({
  selector: 'app-list-sous-categorie',
  templateUrl: './list-sous-categorie.component.html',
  styleUrls: ['./list-sous-categorie.component.scss'],
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
    FormSousSecteurComponent
     
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ListSousCategorieComponent implements OnInit {

  referentielType: any;

  displayedColumns: string[] = [
    'code',
    'libelle',
    'category',
    // 'Budget',
    'actions'
  ];

  pageOptions: any = {
    page: 0,
    size: 20
  }

  datasource: any;

  loading = true;
  sousCategorieToUpdate: any;

  constructor(
    private modalService: NgbModal,
    private sousCategorieService: SousCategorieService
    ){

  }
  ngOnInit(): void {
    this.getReferentielType();
    this.getAllSousCategorie(this.pageOptions);
    // console.log("sous categorie",this.datasource)
  }

  getReferentielType() {
    this.referentielType = localStorage.getItem('referentielType')!;
    this.referentielType = JSON.parse(this.referentielType);
  }

  getAllSousCategorie(pageOptions: any) {
    this.loading = true;
    // pageOptions.referentielType = this.referentielType.name;
    this.sousCategorieService.readSCategories(pageOptions).subscribe({
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
    this.getAllSousCategorie(this.pageOptions);
  }

  openDialog(content: TemplateRef<any>, modalSize: any, label?: any) {
    this.sousCategorieToUpdate = label;

    this.modalService.open(content, {size: modalSize, backdrop: 'static'}).result.then((result) => {

    }).catch((res) => {});
  }

  deleteSousCategories(categoryId: any) {
    Alertes.confirmAction('Etes-vous sûr de vouloire supprimer ?',
      '',
      () =>  { 
        this.sousCategorieService.deleteSousCategories(categoryId).subscribe({
          next: response => {},
          error: response => {},
          complete: () => {
            this.getAllSousCategorie(this.pageOptions);
          }
        });
      }
    )
  }

  close () {
    this.modalService.dismissAll();
    this.getAllSousCategorie(this.pageOptions);
  }

}
