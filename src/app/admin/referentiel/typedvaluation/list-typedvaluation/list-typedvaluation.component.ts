import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { TypedvaluationService } from 'src/app/services/typedvaluation/typedvaluation.service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { FormRegionComponent } from '../../region/form-region/form-region.component';
import { FormSecteuractiviteComponent } from '../../secteuractivite/form-secteuractivite/form-secteuractivite.component';
import { FormTypedvaluationComponent } from '../form-typedvaluation/form-typedvaluation.component';

@Component({
  selector: 'app-list-typedvaluation',
  templateUrl: './list-typedvaluation.component.html',
  styleUrls: ['./list-typedvaluation.component.scss'],
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
    FormTypedvaluationComponent,
   
  ],
})
export class ListTypedvaluationComponent implements OnInit {

  loadingIndicator = true;
  typedvaluationToUpdate : any;
  typedvaluationId : any;
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
    private typedvaluationService: TypedvaluationService
  ) { }

  ngOnInit() {
    this.getTypedvaluations();
  }

  getTypedvaluations(){
    this.loadingIndicator = true;
    const params = this.pageOptions;
    this.typedvaluationService.readTypedvaluations(params).subscribe({
      next: response => {
        this.dataSource = response?.payload;
        this.metadata = response?.metadata;
      },
      error: err => this.loadingIndicator = false,
      complete: () => this.loadingIndicator = false
    });
  }

  delete(typedvaluationId:any){
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.typedvaluationService.deleteTypedvaluation(typedvaluationId).subscribe({
      next: response => {
        Alertes.alerteDeleteSuccess()
      },
      error: err => Alertes.errorPopPup('Suppression échouée',err?.error?.message),
      complete: () => this.getTypedvaluations()
      });
    })

   }

  paginate($event: any){
    this.loadingIndicator = true;
     this.pageOptions.page = $event - 1;
      this.getTypedvaluations()
   }

  close(event: boolean){
    if (event) {
      this.modalService.dismissAll();
      this.getTypedvaluations()
    }
  }

  doSearch(data: any){
      this.pageOptions = data;
      this.pageOptions.page = 0;
      this.pageOptions.size = 20;
      this.getTypedvaluations()
      this.modalService.dismissAll();
   }

  openBasicModal(content: TemplateRef<any>, size?: any, typedvaluation?: any) {
      this.typedvaluationToUpdate = typedvaluation;
      this.typedvaluationId = typedvaluation?.id;
      this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {

      }).catch((res) => {
      });
   };

}
