import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, TemplateRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SharedModule } from 'primeng/api';
import { NatureSpecifiqueService } from 'src/app/services/natureSpecifique/nature-specifique.service';
import { Alertes } from 'src/app/util/alerte';
import { CreateOrUpdateCadrelogiqueComponent } from '../../cadrelogiques/create-or-update-cadrelogique/create-or-update-cadrelogique.component';
import { RegionComponent } from '../../cadrelogiques/region/region.component';
import { CreateOrUpdateNatureSpecifiqueComponent } from '../create-or-update-nature-specifique/create-or-update-nature-specifique.component';

@Component({
  selector: 'app-list-nature-specifique',
  templateUrl: './list-nature-specifique.component.html',
  styleUrls: ['./list-nature-specifique.component.scss'],
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
    CreateOrUpdateNatureSpecifiqueComponent

   
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ListNatureSpecifiqueComponent implements OnInit {
  referentielType: any;
  natureSpecifiqueToUpdate: any;
  displayedColumns: string[] = [
    'code',
    'libelle',
    'nature',
    'actions'
  ];

  pageOptions: any = {
    page: 0,
    size: 20
  }
  datasource: any;
  loading = true;

  constructor(
    private modalService: NgbModal,
    private natureSpecifiqueService: NatureSpecifiqueService
    ){
  }

  ngOnInit(): void {
    this.getReferentielType();
    this.getAllNatureSpecifique();
  }

  getReferentielType() {
    this.referentielType = localStorage.getItem('referentielType')!;
    this.referentielType = JSON.parse(this.referentielType);
  }

  getAllNatureSpecifique() {
    this.loading = true;
    this.natureSpecifiqueService.readnaturesSpecifiques(this.pageOptions).subscribe({
      next: response => {
        this.datasource = response;
        this.loading = false;
      },
      error: response => {},
      complete: () => this.loading = false 
    })
  }

  openDialog(content: TemplateRef<any>, modalSize: any, natureSpecifique?: any) {
    this.natureSpecifiqueToUpdate = natureSpecifique;
    this.modalService.open(content, {size: modalSize, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteNatureSpecifique(specificNatureId: any) {
    Alertes.confirmAction('Etes-vous sûr de vouloire supprimer ?',
      '',
      () =>  { 
        this.natureSpecifiqueService.deletenature(specificNatureId).subscribe({
          next: response => {},
          error: response => {
          },
          complete: () => {
            this.getAllNatureSpecifique();
          }
        });
      }
    )
  }

  doSearch(data:any){
    this.pageOptions=data;
    this.pageOptions.size=20;
    this.pageOptions.page=0;
    this.getAllNatureSpecifique()
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllNatureSpecifique();
  }

  close() {
    this.modalService.dismissAll();
    this.getAllNatureSpecifique();
  }

}
