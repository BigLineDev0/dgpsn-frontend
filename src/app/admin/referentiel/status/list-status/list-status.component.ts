import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, TemplateRef } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ResponseApi } from 'src/app/util/response.model';
import { Router } from '@angular/router';
import { StatutService } from 'src/app/services/statut/statut.service';
import { Alertes } from 'src/app/util/alerte';
import { LabelService } from '@/app/services/labelService/label-service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { FormRegionComponent } from '../../region/form-region/form-region.component';
import { FormSecteuractiviteComponent } from '../../secteuractivite/form-secteuractivite/form-secteuractivite.component';
import { CreateOrUpdateStatusComponent } from '../create-or-update-status/create-or-update-status.component';

@Component({
  selector: 'app-list-status',
  templateUrl: './list-status.component.html',
  styleUrls: ['./list-status.component.scss'],
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
    CreateOrUpdateStatusComponent

   
  ],
   schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ListStatusComponent {
  referentielType: any;
  
  

  displayedColumns: string[] = [
    'code',
    'libelle',
    'statusType',
    // 'Budget',
    'actions'
  ];

  pageOptions: any = {
    page: 0,
    size: 3
  }

  

  datasource: any;

  loading = true;
  statutToUpdate: any;
  updateStatutModal: any;
  
  

  constructor(
    private modalService: NgbModal,
    private statutService: StatutService,
    private labelService: LabelService,
    private router: Router
    ){

  }
  ngOnInit(): void {
    //this.getAllPrograms(this.pageOptions);
    this.getReferentielType();
    this.getAllStatut();
  }

  getReferentielType() {
    this.referentielType = localStorage.getItem('referentielType')!;
    this.referentielType = JSON.parse(this.referentielType);
  }

  
  

  openBasicModal(content: TemplateRef<any>) {
    
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
    }).catch((res) => {});
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    //this.getAllPrograms(this.pageOptions);
    this.getAllStatut();
  }
  getAllStatut() {
    this.loading = true;
    this.statutService.readstatut(this.pageOptions).subscribe({
      next: response => {
        this.datasource = response;
        this.loading = false;
      },
      error: response => {},
      complete: () => this.loading = false 
    })
  }
  openDialog(content: TemplateRef<any>, modalSize: any, statut?: any) {
    this.statutToUpdate = statut;

    this.modalService.open(content, {size: modalSize, backdrop: 'static'}).result.then((result) => {

    }).catch((res) => {});
  }
  deleteStatut(labelId: any) {
    Alertes.confirmAction('Etes-vous sûr de vouloire supprimer ?',
      '',
      () =>  { 
        this.statutService.deleteStatut(labelId).subscribe({
          next: response => {},
          error: response => {},
          complete: () => {
            this.getAllStatut();
          }
        });
      }
    )
  }
  close() {
    this.modalService.dismissAll();
    this.getAllStatut();
  }
  doSearch(data:any){
    this.pageOptions=data;
    this.pageOptions.size=3;
    this.pageOptions.page=0;
    this.getAllStatut()
  }
  
}
