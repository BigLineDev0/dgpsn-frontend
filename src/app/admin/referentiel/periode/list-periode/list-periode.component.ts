import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, TemplateRef } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { PeriodeService } from 'src/app/services/periode/periode.service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { CreateOrUpdateNatureSpecifiqueComponent } from '../../natureSpecifique/create-or-update-nature-specifique/create-or-update-nature-specifique.component';
import { FormPeriodeComponent } from '../form-periode/form-periode.component';

@Component({
  selector: 'app-list-periode',
  templateUrl: './list-periode.component.html',
  styleUrls: ['./list-periode.component.scss'],
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
   FormPeriodeComponent,

   
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ListPeriodeComponent implements OnInit {

  loadingIndicator = true;
  periodeToUpdate : any;
  periodeId : any;
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
    private periodeService: PeriodeService
  ) { }

  ngOnInit() {
    this.getPeriodes();
  }

  getPeriodes(){
    this.loadingIndicator = true;
    const params = this.pageOptions;
    this.periodeService.readPeriodes(params).subscribe({
      next: response => {
        this.dataSource = response?.payload;
        this.metadata = response?.metadata;
      },
      error: err => this.loadingIndicator = false,
      complete: () => this.loadingIndicator = false
    });
  }

  delete(periodeId:any){
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.periodeService.deletePeriode(periodeId).subscribe({
      next: response => {
        Alertes.alerteDeleteSuccess()
      },
      error: err => Alertes.errorPopPup('Suppression échouée',err?.error?.message),
      complete: () => this.getPeriodes()
      });
    })

   }

  paginate($event: any){
    this.loadingIndicator = true;
     this.pageOptions.page = $event - 1;
      this.getPeriodes()
   }

  close(event: boolean){
    if (event) {
      this.modalService.dismissAll();
      this.getPeriodes()
    }
  }

  doSearch(data: any){
      this.pageOptions = data;
      this.pageOptions.page = 0;
      this.pageOptions.size = 20;
      this.getPeriodes()
      this.modalService.dismissAll();
   }

  openBasicModal(content: TemplateRef<any>, size?: any, periode?: any) {
      this.periodeToUpdate = periode;
      this.periodeId = periode?.id;
      this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {

      }).catch((res) => {
      });
   };

  openUrl(id: any, url: any) {
    if (id) {
      localStorage.setItem('idPeriode', id);
    }
    this.router.navigateByUrl(url);
  }

}
