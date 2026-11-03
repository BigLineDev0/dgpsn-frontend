import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAccordionModule, NgbModal, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SharedModule } from 'primeng/api';
import { CategorieDocumentService } from 'src/app/services/categorieDocument/categorie-document.service';
import { Authority } from 'src/app/util/Authority';
import { Alertes } from 'src/app/util/alerte';
import { FormCategorieDocumentComponent } from '../form-categorie-document/form-categorie-document.component';
@Component({
  selector: 'app-list-categorie-document',
  templateUrl: './list-categorie-document.component.html',
  styleUrls: ['./list-categorie-document.component.scss'],
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
    FormCategorieDocumentComponent
  ],
})
export class ListCategorieDocumentComponent {
  referentielType: any;

  displayedColumns: string[] = [
    'typeDocument',
    'collectif',
    'obligatoire',
    'actions'
  ];

  pageOptions: any = {
    page: 0,
    size: 20
  }

  datasource: any;

  loading = true;

  labelToUpdate: any;

  constructor(
    private modalService: NgbModal,
    private categorieDocumentService: CategorieDocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getReferentielType();
    this.getAllLabels(this.pageOptions);
  }
  
  getReferentielType() {
    this.referentielType = localStorage.getItem('referentielType')!;
    this.referentielType = JSON.parse(this.referentielType);
  }

  getAllLabels(pageOptions: any) {
    this.loading = true;
    pageOptions.categoryDocument = this.referentielType.name;
    this.categorieDocumentService.readCategorieDocuments(pageOptions).subscribe({
      next: response => {
        this.datasource = response;
        console.log("test test",this.datasource)
        this.loading = false;
      },
      error: response => {},
      complete: () => this.loading = false 
    })
  }

  paginate(event: any) {
    this.pageOptions.page = event - 1;
    this.getAllLabels(this.pageOptions);
  }

  openDialog(content: TemplateRef<any>, modalSize: any, label?: any) {
    this.labelToUpdate = label;

    this.modalService.open(content, {size: modalSize, backdrop: 'static'}).result.then((result) => {

    }).catch((res) => {});
  }

  deleteLabel(labelId: any) {
    Alertes.confirmAction('Etes-vous sûr de vouloire supprimer ?',
      '',
      () =>  { 
        this.categorieDocumentService.deleteCategorieDocument(labelId).subscribe({
          next: response => {},
          error: response => {},
          complete: () => {
            this.getAllLabels(this.pageOptions);
          }
        });
      }
    )
  }

  close() {
    this.modalService.dismissAll();
    this.getAllLabels(this.pageOptions);
  }
}
