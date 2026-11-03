import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { TypereunionService } from 'src/app/services/typereunion/typereunion.service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { FormRegionComponent } from '../../region/form-region/form-region.component';
import { FormSecteuractiviteComponent } from '../../secteuractivite/form-secteuractivite/form-secteuractivite.component';
import { FormTypereunionComponent } from '../form-typereunion/form-typereunion.component';

@Component({
  selector: 'app-list-typereunion',
  templateUrl: './list-typereunion.component.html',
  styleUrls: ['./list-typereunion.component.scss'],
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
   FormTypereunionComponent

   
  ],
})
export class ListTypereunionComponent implements OnInit {

  loadingIndicator = true;
  typereunionToUpdate : any;
  typereunionId : any;
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
    private typereunionService: TypereunionService
  ) { }

  ngOnInit() {
    this.getTypereunions();
  }

  getTypereunions(){
    this.loadingIndicator = true;
    const params = this.pageOptions;
    this.typereunionService.readTypereunions(params).subscribe({
      next: response => {
        this.dataSource = response?.payload;
        this.metadata = response?.metadata;
      },
      error: err => this.loadingIndicator = false,
      complete: () => this.loadingIndicator = false
    });
  }

  delete(typereunionId:any){
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.typereunionService.deleteTypereunion(typereunionId).subscribe({
      next: response => {
        Alertes.alerteDeleteSuccess()
      },
      error: err => Alertes.errorPopPup('Suppression échouée',err?.error?.message),
      complete: () => this.getTypereunions()
      });
    })

   }

  paginate($event: any){
    this.loadingIndicator = true;
     this.pageOptions.page = $event - 1;
      this.getTypereunions()
   }

  close(event: boolean){
    if (event) {
      this.modalService.dismissAll();
      this.getTypereunions()
    }
  }

  doSearch(data: any){
      this.pageOptions = data;
      this.pageOptions.page = 0;
      this.pageOptions.size = 20;
      this.getTypereunions()
      this.modalService.dismissAll();
   }

  openBasicModal(content: TemplateRef<any>, size?: any, typereunion?: any) {
      this.typereunionToUpdate = typereunion;
      this.typereunionId = typereunion?.id;
      this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {

      }).catch((res) => {
      });
   };

}
