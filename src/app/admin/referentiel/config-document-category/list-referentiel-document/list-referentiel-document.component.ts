import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbPaginationModule, NgbAccordionModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SharedModule } from 'primeng/api';
import { CategorieDocumentService } from 'src/app/services/categorieDocument/categorie-document.service';
import { Authority } from 'src/app/util/Authority';
import { FormCategorieDocumentComponent } from '../form-categorie-document/form-categorie-document.component';
@Component({
  selector: 'app-list-referentiel-document',
  templateUrl: './list-referentiel-document.component.html',
  styleUrls: ['./list-referentiel-document.component.scss'],
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
export class ListReferentielDocumentComponent {
  displayedColumns: string[] = [
    'libelle',
    'description',
    'actions'
  ];
  pageOptions: any = {
    page: 0,
    size: 100
  }

  datasource: any;

  loading = true;

  constructor(
    private categorieDocumentService: CategorieDocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllReferentielType();
  }

  getAllReferentielType() {
    setTimeout(() => {
      this.categorieDocumentService.readCategorieDocumentTypes().subscribe({
        next: response => {
          this.datasource = response.body;
          console.log("Referentiel ALL Categorie",this.datasource)
          this.loading = false;
        }
      })
    }, 500);
  }

  paginate(event: any) {
    this.loading = true;
    this.pageOptions.page = event - 1;
    this.getAllReferentielType();
  }

  navigateToConfigLabel(referentielType: any) {
    localStorage.setItem('referentielType', JSON.stringify(referentielType));
    console.log("test",referentielType)

    this.router.navigateByUrl('/admin/acces/categorie-document');
  }

}
