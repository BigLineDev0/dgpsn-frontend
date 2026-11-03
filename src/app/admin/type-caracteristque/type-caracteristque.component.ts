import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbAccordionModule, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';

import { CaracteristiqueService } from '@/app/services/caracteristique/caracteristique.service';
import { LabelService } from '@/app/services/labelService/label-service';
import { Alertes } from '@/app/util/alerte';
import { configLabelName } from '@/app/util/configlabel';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';

@Component({
  selector: 'app-type-caracteristque',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SpinnerComponent,
    MaterialModule,
    SharedModule,
    NgbPaginationModule,
    NgbAccordionModule,
    NgSelectModule,
    NgbTooltipModule,
    NgbNavModule,
  ],
  templateUrl: './type-caracteristque.component.html',
  styleUrls: ['./type-caracteristque.component.scss']
})
export class TypeCaracteristqueComponent {

  loadingIndicator = true;
  caracteristiqueToUpdate: any;
  caracteristiqueId: any;
  pageOptions: any = { page: 0, size: 10 };
  dataSource: any;
  metadata: any;
  typeCaracteristique: any = [];
  displayedColumns: string[] = ['code', 'libelle', 'actions'];
  caracteristique: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private caracteristiqueService: CaracteristiqueService,
    private labelService: LabelService,
  ) { }

  ngOnInit(): void {
    this.getTypecaracteristiques();
  }

  getTypecaracteristiques(): void {
    this.labelService.readReferentielLabel(configLabelName.TYPE_CARACTERISTIQUE).subscribe({
      next: (response: any) => {
        console.log('Réponse API : ', response);
        this.dataSource = response.body?.content || [];
        this.metadata = {
          totalElements: response.body?.totalElements || 0,
          totalPages: response.body?.totalPages || 1,
          pageNumber: response.body?.number || 0
        };
        this.loadingIndicator = false;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des caractéristiques : ', error);
        this.loadingIndicator = false;
      }
    });
  }

  voirCaracteristiques(typecaracteristique: any): void {
    localStorage.setItem('selectedTypeCaracteristiqueId', typecaracteristique.id);
    this.router.navigate(['/admin/acces/list-caracteristique']);
  }

  navigateRoute(id: any, url: any): void {
    localStorage.setItem(id, 'idAgent');
    this.router.navigateByUrl(url);
  }

  paginate($event: any): void {
    this.loadingIndicator = true;
    this.pageOptions.page = $event - 1;
    this.getTypecaracteristiques();
  }

  close(event: boolean): void {
    if (event) {
      this.modalService.dismissAll();
      this.getTypecaracteristiques();
    }
  }

  doSearch(data: any): void {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    this.getTypecaracteristiques();
    this.modalService.dismissAll();
  }

  openBasicModal(content: TemplateRef<any>, size?: any, caracteristique?: any): void {
    this.caracteristique = caracteristique;
    this.caracteristiqueId = caracteristique?.id;
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {
    });
  }
} 