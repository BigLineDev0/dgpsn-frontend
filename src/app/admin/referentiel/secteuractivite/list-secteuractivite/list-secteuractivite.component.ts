import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { SecteuractiviteService } from 'src/app/services/secteuractivite/secteuractivite.service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { FormRegionComponent } from '../../region/form-region/form-region.component';
import { FormSecteuractiviteComponent } from '../form-secteuractivite/form-secteuractivite.component';

@Component({
  selector: 'app-list-secteuractivite',
  templateUrl: './list-secteuractivite.component.html',
  styleUrls: ['./list-secteuractivite.component.scss'],
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
    FormRegionComponent,
    FormSecteuractiviteComponent,

   
  ],
})
export class ListSecteuractiviteComponent implements OnInit {

  loadingIndicator = true;
  secteuractiviteToUpdate : any;
  secteuractiviteId : any;
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
    private secteuractiviteService: SecteuractiviteService
  ) { }

  ngOnInit() {
    this.getSecteuractivites();
  }

  getSecteuractivites(){
    this.loadingIndicator = true;
    const params = this.pageOptions;
    this.secteuractiviteService.readSecteuractivites(params).subscribe({
      next: response => {
        this.dataSource = response?.payload;
        this.metadata = response?.metadata;
      },
      error: err => this.loadingIndicator = false,
      complete: () => this.loadingIndicator = false
    });
  }

  delete(secteuractiviteId:any){
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.secteuractiviteService.deleteSecteuractivite(secteuractiviteId).subscribe({
      next: response => {
        Alertes.alerteDeleteSuccess()
      },
      error: err => Alertes.errorPopPup('Suppression échouée',err?.error?.message),
      complete: () => this.getSecteuractivites()
      });
    })

   }

  paginate($event: any){
    this.loadingIndicator = true;
     this.pageOptions.page = $event - 1;
      this.getSecteuractivites()
   }

  close(event: boolean){
    if (event) {
      this.modalService.dismissAll();
      this.getSecteuractivites()
    }
  }

  doSearch(data: any){
      this.pageOptions = data;
      this.pageOptions.page = 0;
      this.pageOptions.size = 20;
      this.getSecteuractivites()
      this.modalService.dismissAll();
   }

  openBasicModal(content: TemplateRef<any>, size?: any, secteuractivite?: any) {
      this.secteuractiviteToUpdate = secteuractivite;
      this.secteuractiviteId = secteuractivite?.id;
      this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {

      }).catch((res) => {
      });
   };

}
