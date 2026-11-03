import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LabelService } from '@/app/services/labelService/label-service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { FormRegionComponent } from './region/form-region/form-region.component';
import { FormSecteuractiviteComponent } from './secteuractivite/form-secteuractivite/form-secteuractivite.component';

@Component({
  selector: 'app-referentiel',
  templateUrl: './referentiel.component.html',
  styleUrls: ['./referentiel.component.scss'],
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
    
  ],
})
export class ReferentielComponent implements OnInit {
  displayedColumns: string[] = [
    'libelle',
    'description',
    'actions'
  ];

  pageOptions: any = {
    page: 0,
    size: 20,
    label: '',
    description: ''
  };

  datasource: any = {
    content: [],
    totalElements: 0
  };

  loading = true;
  searchForm: FormGroup;

  constructor(
    private readonly labelService: LabelService,
    private readonly router: Router,
    private readonly modalService: NgbModal,
    private readonly fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      libelle: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.getAllReferentielType();
  }

  // getAllReferentielType(): void {
  //   this.loading = true;
  //   const req = {
  //     page: this.pageOptions.page,
  //     size: this.pageOptions.size,
  //     label: this.pageOptions.label || undefined,
  //     description: this.pageOptions.description || undefined
  //   };
  //   this.labelService.readReferentielTypes(req).subscribe({
  //     next: response => {
  //       console.log('response',response);
        
  //       this.datasource = response;
  //       this.loading = false;
  //     },
  //     error: err => {
  //       console.error('Erreur lors du chargement des référentiels', err);
  //       this.loading = false;
  //     }
  //   });
  // }

  paginate(event: number): void {
    this.pageOptions.page = event - 1;
    this.getAllReferentielType();
  }

  navigateToConfigLabel(referentielType: any): void {
    localStorage.setItem('referentielType', JSON.stringify(referentielType));
    this.router.navigateByUrl('admin/acces/config-label');
    // this.router.navigateByUrl('/admin/acces/config-label');
  }

  openBasicModal(content: TemplateRef<any>, size: any): void {
    this.searchForm.reset(); // Réinitialiser le formulaire à l'ouverture
    this.modalService.open(content, { size: size, backdrop: 'static' }).result.then(
      () => {},
      () => {}
    );
  }

  doSearch(): void {
  const formValues = this.searchForm.value;
  console.log('Form values:', formValues);
  
  this.pageOptions.label = formValues.libelle?.trim() || '';
  this.pageOptions.description = formValues.description?.trim() || '';
  this.pageOptions.page = 0;
  
  console.log('PageOptions après recherche:', this.pageOptions);
  
  this.getAllReferentielType();
  this.modalService.dismissAll();
}

getAllReferentielType(): void {
  this.loading = true;
  const req = {
    page: this.pageOptions.page,
    size: this.pageOptions.size,
    label: this.pageOptions.label || undefined,
    description: this.pageOptions.description || undefined
  };
  
  console.log('Requête envoyée à l\'API:', req);
  
  this.labelService.readReferentielTypes(req).subscribe({
    next: response => {
      console.log('Réponse API:', response);
      this.datasource = response;
      this.loading = false;
    },
    error: err => {
      console.error('Erreur API:', err);
      this.loading = false;
    }
  });
}
}
