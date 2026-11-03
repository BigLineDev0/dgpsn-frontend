import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { TypeRequeteService } from 'src/app/services/typeRequete/type-requete.service';
import { Alertes } from 'src/app/util/alerte';
import { FormRegionComponent } from '../../region/form-region/form-region.component';
import { FormSecteuractiviteComponent } from '../../secteuractivite/form-secteuractivite/form-secteuractivite.component';
import { CreateOrUpdateTypeRequeteComponent } from '../create-or-update-type-requete/create-or-update-type-requete.component';

@Component({
  selector: 'app-list-type-requete',
  templateUrl: './list-type-requete.component.html',
  styleUrls: ['./list-type-requete.component.scss'],
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
    FormRegionComponent,
    CreateOrUpdateTypeRequeteComponent,

   
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ListTypeRequeteComponent {

  referentielType: any;
  displayedColumns: string[] = [
    'code',
    'libelle',
    'categorieDepense',
    // 'Budget',
    'actions'
  ];

  pageOptions: any = {
    page: 0,
    size: 20
  }
  datasource: any;

  loading = true;
 requeteToUpdate: any;

  constructor(
    private modalService: NgbModal,
    private typeRequete: TypeRequeteService
    ){

}

ngOnInit(): void {
  this.getReferentielType();
  this.getAllTypedepense(this.pageOptions);
  // console.log("sous categorie",this.datasource)
}
 
  getReferentielType() {
    this.referentielType = localStorage.getItem('referentielType')!;
    this.referentielType = JSON.parse(this.referentielType);
  }
  
  getAllTypedepense(pageOptions: any) {
    this.loading = true;
    // pageOptions.referentielType = this.referentielType.name;
    this.typeRequete.readTypeRequete(pageOptions).subscribe({
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
    this.getAllTypedepense(this.pageOptions);
  }

  openDialog(content: TemplateRef<any>, modalSize: any, label?: any) {
    this.requeteToUpdate = label;

    this.modalService.open(content, {size: modalSize, backdrop: 'static'}).result.then((result) => {

    }).catch((res) => {});
  }

  deleteSubsector(sectorId: any) {
    Alertes.confirmAction('Etes-vous sûr de vouloire supprimer ?',
      '',
      () =>  { 
        this.typeRequete.deleteTypeRequete(sectorId).subscribe({
          next: response => {},
          error: response => {},
          complete: () => {
            this.getAllTypedepense(this.pageOptions);
          }
        });
      }
    )
  }

  close () {
    this.modalService.dismissAll();
    this.getAllTypedepense(this.pageOptions);
  }


}



