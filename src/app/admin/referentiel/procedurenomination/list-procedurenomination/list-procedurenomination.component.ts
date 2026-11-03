import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { ProcedurenominationService } from 'src/app/services/procedurenomination/procedurenomination.service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { CreateOrUpdateNatureSpecifiqueComponent } from '../../natureSpecifique/create-or-update-nature-specifique/create-or-update-nature-specifique.component';
import { FormProcedurenominationComponent } from '../form-procedurenomination/form-procedurenomination.component';

@Component({
  selector: 'app-list-procedurenomination',
  templateUrl: './list-procedurenomination.component.html',
  styleUrls: ['./list-procedurenomination.component.scss'],
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
    FormProcedurenominationComponent
  
  ],
})
export class ListProcedurenominationComponent implements OnInit {

  loadingIndicator = true;
  procedurenominationToUpdate : any;
  procedurenominationId : any;
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
    private procedurenominationService: ProcedurenominationService
  ) { }

  ngOnInit() {
    this.getProcedurenominations();
  }

  getProcedurenominations(){
    this.loadingIndicator = true;
    const params = this.pageOptions;
    this.procedurenominationService.readProcedurenominations(params).subscribe({
      next: response => {
        this.dataSource = response?.payload;
        this.metadata = response?.metadata;
      },
      error: err => this.loadingIndicator = false,
      complete: () => this.loadingIndicator = false
    });
  }

  delete(procedurenominationId:any){
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.procedurenominationService.deleteProcedurenomination(procedurenominationId).subscribe({
      next: response => {
        Alertes.alerteDeleteSuccess()
      },
      error: err => Alertes.errorPopPup('Suppression échouée',err?.error?.message),
      complete: () => this.getProcedurenominations()
      });
    })

   }

  paginate($event: any){
    this.loadingIndicator = true;
     this.pageOptions.page = $event - 1;
      this.getProcedurenominations()
   }

  close(event: boolean){
    if (event) {
      this.modalService.dismissAll();
      this.getProcedurenominations()
    }
  }

  doSearch(data: any){
      this.pageOptions = data;
      this.pageOptions.page = 0;
      this.pageOptions.size = 20;
      this.getProcedurenominations()
      this.modalService.dismissAll();
   }

  openBasicModal(content: TemplateRef<any>, size?: any, procedurenomination?: any) {
      this.procedurenominationToUpdate = procedurenomination;
      this.procedurenominationId = procedurenomination?.id;
      this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {

      }).catch((res) => {
      });
   };

}
