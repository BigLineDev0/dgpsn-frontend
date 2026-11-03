import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { RisqueService } from 'src/app/services/risque/risque.service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { FormRegionComponent } from '../../region/form-region/form-region.component';
import { FormRisqueComponent } from '../form-risque/form-risque.component';

@Component({
  selector: 'app-list-risque',
  templateUrl: './list-risque.component.html',
  styleUrls: ['./list-risque.component.scss'],
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
    FormRisqueComponent

   
  ],
})
export class ListRisqueComponent implements OnInit {

  loadingIndicator = true;
  risqueToUpdate : any;
  risqueId : any;
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
    private risqueService: RisqueService
  ) { }

  ngOnInit() {
    this.getRisques();
  }

  getRisques(){
    this.loadingIndicator = true;
    const params = this.pageOptions;
    this.risqueService.readRisques(params).subscribe({
      next: response => {
        this.dataSource = response?.payload;
        this.metadata = response?.metadata;
      },
      error: err => this.loadingIndicator = false,
      complete: () => this.loadingIndicator = false
    });
  }

  delete(risqueId:any){
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.risqueService.deleteRisque(risqueId).subscribe({
      next: response => {
        Alertes.alerteDeleteSuccess()
      },
      error: err => Alertes.errorPopPup('Suppression échouée',err?.error?.message),
      complete: () => this.getRisques()
      });
    })

   }

  paginate($event: any){
    this.loadingIndicator = true;
     this.pageOptions.page = $event - 1;
      this.getRisques()
   }

  close(event: boolean){
    if (event) {
      this.modalService.dismissAll();
      this.getRisques()
    }
  }

  doSearch(data: any){
      this.pageOptions = data;
      this.pageOptions.page = 0;
      this.pageOptions.size = 20;
      this.getRisques()
      this.modalService.dismissAll();
   }

  openBasicModal(content: TemplateRef<any>, size?: any, risque?: any) {
      this.risqueToUpdate = risque;
      this.risqueId = risque?.id;
      this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {

      }).catch((res) => {
      });
   };

}
