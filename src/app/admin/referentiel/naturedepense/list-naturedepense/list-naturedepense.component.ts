import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, TemplateRef } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { CreateOrUpdateRoleComponent } from '../../role/create-or-update-role/create-or-update-role.component';
import { NaturedepenseService } from '@/app/services/naturedepense/naturedepense.service';
import { FormNaturedepenseComponent } from '../form-naturedepense/form-naturedepense.component';


@Component({
  selector: 'app-list-naturedepense',
  templateUrl: './list-naturedepense.component.html',
  styleUrls: ['./list-naturedepense.component.scss'],
   schemas:[CUSTOM_ELEMENTS_SCHEMA],
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
    FormNaturedepenseComponent,

   
  ],
})
export class ListNaturedepenseComponent implements OnInit {

  loadingIndicator = true;
  naturedepenseToUpdate : any;
  naturedepenseId : any;
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
    private naturedepenseService: NaturedepenseService
  ) { }

  ngOnInit() {
    this.getNaturedepenses();
  }

  getNaturedepenses(){
    this.loadingIndicator = true;
    const params = this.pageOptions;
    this.naturedepenseService.readNaturedepenses(params).subscribe({
      next: response => {
        this.dataSource = response?.payload;
        this.metadata = response?.metadata;
      },
      error: err => this.loadingIndicator = false,
      complete: () => this.loadingIndicator = false
    });
  }

  delete(naturedepenseId:any){
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.naturedepenseService.deleteNaturedepense(naturedepenseId).subscribe({
      next: response => {
        Alertes.alerteDeleteSuccess()
      },
      error: err => Alertes.errorPopPup('Suppression échouée',err?.error?.message),
      complete: () => this.getNaturedepenses()
      });
    })

   }

  paginate($event: any){
    this.loadingIndicator = true;
     this.pageOptions.page = $event - 1;
      this.getNaturedepenses()
   }

  close(event: boolean){
    if (event) {
      this.modalService.dismissAll();
      this.getNaturedepenses()
    }
  }

  doSearch(data: any){
      this.pageOptions = data;
      this.pageOptions.page = 0;
      this.pageOptions.size = 20;
      this.getNaturedepenses()
      this.modalService.dismissAll();
   }

  openBasicModal(content: TemplateRef<any>, size?: any, naturedepense?: any) {
      this.naturedepenseToUpdate = naturedepense;
      this.naturedepenseId = naturedepense?.id;
      this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {

      }).catch((res) => {
      });
   };

}
