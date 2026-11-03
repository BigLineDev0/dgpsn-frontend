import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { CategoriebudgetaireService } from 'src/app/services/categoriebudgetaire/categoriebudgetaire.service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SharedModule } from 'primeng/api';
import { CreateOrUpdateCadrelogiqueComponent } from '../../cadrelogiques/create-or-update-cadrelogique/create-or-update-cadrelogique.component';
import { RegionComponent } from '../../cadrelogiques/region/region.component';
import { FormCategoriebudgetaireComponent } from '../form-categoriebudgetaire/form-categoriebudgetaire.component';

@Component({
  selector: 'app-list-categoriebudgetaire',
  templateUrl: './list-categoriebudgetaire.component.html',
  styleUrls: ['./list-categoriebudgetaire.component.scss'],
    standalone:true,
    imports: [
    CommonModule,
    SpinnerComponent,
    MaterialModule,
    SharedModule,
    NgbPaginationModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    HasAnyAuthorityDirective,
    CreateOrUpdateCadrelogiqueComponent,
    RegionComponent,
    FormCategoriebudgetaireComponent,
    NgbNavModule,
   
  ],
})
export class ListCategoriebudgetaireComponent implements OnInit {

  loadingIndicator = true;
  categoriebudgetaireToUpdate : any;
  categoriebudgetaireId : any;
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
    private categoriebudgetaireService: CategoriebudgetaireService
  ) { }

  ngOnInit() {
    this.getCategoriebudgetaires();
  }

  getCategoriebudgetaires(){
    this.loadingIndicator = true;
    const params = this.pageOptions;
    this.categoriebudgetaireService.readCategoriebudgetaires(params).subscribe({
      next: response => {
        this.dataSource = response?.payload;
        this.metadata = response?.metadata;
      },
      error: err => this.loadingIndicator = false,
      complete: () => this.loadingIndicator = false
    });
  }

  delete(categoriebudgetaireId:any){
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.categoriebudgetaireService.deleteCategoriebudgetaire(categoriebudgetaireId).subscribe({
      next: response => {
        Alertes.alerteDeleteSuccess()
      },
      error: err => Alertes.errorPopPup('Suppression échouée',err?.error?.message),
      complete: () => this.getCategoriebudgetaires()
      });
    })

   }

  paginate($event: any){
    this.loadingIndicator = true;
     this.pageOptions.page = $event - 1;
      this.getCategoriebudgetaires()
   }

  close(event: boolean){
    if (event) {
      this.modalService.dismissAll();
      this.getCategoriebudgetaires()
    }
  }

  doSearch(data: any){
      this.pageOptions = data;
      this.pageOptions.page = 0;
      this.pageOptions.size = 20;
      this.getCategoriebudgetaires()
      this.modalService.dismissAll();
   }

  openBasicModal(content: TemplateRef<any>, size?: any, categoriebudgetaire?: any) {
      this.categoriebudgetaireToUpdate = categoriebudgetaire;
      this.categoriebudgetaireId = categoriebudgetaire?.id;
      this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {

      }).catch((res) => {
      });
   };

}
