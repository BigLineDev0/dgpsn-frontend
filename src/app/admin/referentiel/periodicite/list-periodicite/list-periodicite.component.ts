import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, TemplateRef } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { PeriodiciteService } from 'src/app/services/periodicite/periodicite.service';
import { PeriodeService } from 'src/app/services/periode/periode.service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { CreateOrUpdateNatureSpecifiqueComponent } from '../../natureSpecifique/create-or-update-nature-specifique/create-or-update-nature-specifique.component';
import { FormPeriodiciteComponent } from '../form-periodicite/form-periodicite.component';

@Component({
  selector: 'app-list-periodicite',
  templateUrl: './list-periodicite.component.html',
  styleUrls: ['./list-periodicite.component.scss'],
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
   FormPeriodiciteComponent

   
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ListPeriodiciteComponent implements OnInit {

   periode: any;
  loadingIndicator = true;
  periodiciteToUpdate : any;
  periodiciteId : any;
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
    private periodiciteService: PeriodiciteService,
    private periodeService: PeriodeService
  ) { }

  ngOnInit() {
    this.getPeriodicites();
    this.getPeriode();
  }

  getPeriodicites(){
    this.loadingIndicator = true;
    const params = this.pageOptions;
    params.periodeId = this.getPeriodeId();
    this.periodiciteService.readPeriodicites(params).subscribe({
      next: response => {
        this.dataSource = response?.payload;
        this.metadata = response?.metadata;
      },
      error: err => this.loadingIndicator = false,
      complete: () => this.loadingIndicator = false
    });
  }

  delete(periodiciteId:any){
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.periodiciteService.deletePeriodicite(periodiciteId).subscribe({
      next: response => {
        Alertes.alerteDeleteSuccess()
      },
      error: err => Alertes.errorPopPup('Suppression échouée',err?.error?.message),
      complete: () => this.getPeriodicites()
      });
    })

   }

  paginate($event: any){
    this.loadingIndicator = true;
     this.pageOptions.page = $event - 1;
      this.getPeriodicites()
   }

  close(event: boolean){
    if (event) {
      this.modalService.dismissAll();
      this.getPeriodicites()
    }
  }

  doSearch(data: any){
      this.pageOptions = data;
      this.pageOptions.page = 0;
      this.pageOptions.size = 20;
      this.getPeriodicites()
      this.modalService.dismissAll();
   }

  getPeriodeId(): any {
    return localStorage.getItem('idPeriode');
  }

  getPeriode() {
    this.periodeService.readPeriode(localStorage.getItem('idPeriode')).subscribe({
      next: response => {
        this.periode = response;
      },
      error: err => {},
      complete: () => {}
    });
  }

  openBasicModal(content: TemplateRef<any>, size?: any, periodicite?: any) {
      this.periodiciteToUpdate = periodicite;
      this.periodiciteId = periodicite?.id;
      this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {

      }).catch((res) => {
      });
   };

}
