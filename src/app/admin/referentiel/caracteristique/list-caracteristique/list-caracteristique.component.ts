import { Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbPaginationModule, NgbAccordionModule, NgbTooltipModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';

import { CaracteristiqueService } from '@/app/services/caracteristique/caracteristique.service';
import { LabelService } from '@/app/services/labelService/label-service';
import { Alertes } from '@/app/util/alerte';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { FormCaracteristiqueComponent } from '../form-caracteristique/form-caracteristique.component';

@Component({
  selector: 'app-list-caracteristique',
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
    FormCaracteristiqueComponent
  ],
  templateUrl: './list-caracteristique.component.html',
  styleUrls: ['./list-caracteristique.component.scss']
})
export class ListCaracteristiqueComponent {

  loadingIndicator = true;
  caracteristiqueToUpdate: any;
  caracteristiqueId: any;
  pageOptions: any = { page: 0, size: 10 };
  dataSource: any = [];
  metadata: any;
  typeCaracteristique: any = [];
  displayedColumns: string[] = ['code', 'libelle', 'actions'];
  caracteristique: any;
  selectedTypeId: any = null;
    allCaracteristiques: any = [];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private caracteristiqueService: CaracteristiqueService,
    private labelService: LabelService,
  ) { }

  ngOnInit(): void {
    this.selectedTypeId = localStorage.getItem('selectedTypeCaracteristiqueId');
    if (this.selectedTypeId) {
      this.pageOptions.caracteristiqueTypeId = this.selectedTypeId
    } 
      this.getAllCaracteristiques();
    
  }

  // getCaracteristiquesByType(typeId: any): void {
  //   this.loadingIndicator = true;
    
  //   const params = {
  //     page: this.pageOptions.page,
  //     size: this.pageOptions.size,
  //     typeCaracteristiqueId: typeId
  //   };
    
  //   console.log('Appel API avec params:', params);
    
  //   this.caracteristiqueService.readCaracteristiqueByType(typeId, params).subscribe({
  //     next: (response: any) => {
  //       console.log('Réponse API caractéristiques par type:', response);
  //       this.dataSource = response?.payload || [];
  //       this.metadata = response?.metadata || { totalElements: 0, totalPages: 0, number: 0 };
  //       this.loadingIndicator = false;
  //     },
  //     error: (err: any) => {
  //       console.error('Erreur lors du chargement des caractéristiques par type:', err);
  //       Alertes.errorPopPup('Erreur de chargement', 'Impossible de charger les caractéristiques de ce type');
  //       this.loadingIndicator = false;
  //       this.isFiltered = false;
  //       this.selectedTypeId = null;
  //       localStorage.removeItem('selectedTypeCaracteristiqueId');
  //       this.getAllCaracteristiques();
  //     },
  //     complete: () => {
  //       this.loadingIndicator = false;
  //     }
  //   });
  // }


  getAllCaracteristiques(): void {
    this.loadingIndicator = true;
    
    console.log('Chargement de toutes les caractéristiques avec params:', this.pageOptions);
    
    this.caracteristiqueService.readCaracteristique(this.pageOptions).subscribe({
      next: (response: any) => {
        console.log('Réponse API toutes les caractéristiques:', response);
        this.allCaracteristiques = response?.payload || [];
        
        // Filtrer par type si un type est sélectionné
        if (this.selectedTypeId) {
          this.dataSource = this.allCaracteristiques.filter((item: any) => 
            item.caracteristiqueType?.id?.toString() === this.selectedTypeId.toString()
          );
          console.log('Caractéristiques filtrées:', this.dataSource);
        } else {
          this.dataSource = this.allCaracteristiques;
        }
        
        // Mettre à jour les métadonnées en fonction du filtre
        this.metadata = {
          totalElements: this.dataSource.length,
          totalPages: Math.ceil(this.dataSource.length / this.pageOptions.size),
          number: this.pageOptions.page
        };
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement de toutes les caractéristiques:', err);
        // Alertes.errorPopPup('Erreur de chargement', 'Impossible de charger les caractéristiques');
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }

  // getAllCaracteristiques(): void {
  //   this.loadingIndicator = true;
    
  //   console.log('Chargement de toutes les caractéristiques avec params:', this.pageOptions);
    
  //   this.caracteristiqueService.readCaracteristique(this.pageOptions).subscribe({
  //     next: (response: any) => {
  //       console.log('Réponse API toutes les caractéristiques:', response);
  //       this.dataSource = response?.payload || [];
  //       this.metadata = response?.metadata || { totalElements: 0, totalPages: 0, number: 0 };
  //     },
  //     error: (err: any) => {
  //       console.error('Erreur lors du chargement de toutes les caractéristiques:', err);
  //       Alertes.errorPopPup('Erreur de chargement', 'Impossible de charger les caractéristiques');
  //       this.loadingIndicator = false;
  //     },
  //     complete: () => {
  //       this.loadingIndicator = false;
  //     }
  //   });
  // }

  // retourTypeCaracteristique(): void {
  //
  //   localStorage.removeItem('selectedTypeCaracteristiqueId');
  //   this.router.navigate(['/admin/acces/type-caracteristique']);
  // }

  delete(caracteristiqueId: any): void {
    Alertes.confirmAction(
      'Voulez-vous supprimer ?',
      'Cet élément sera définitivement supprimé',
      () => {
        this.caracteristiqueService.deleteCaracteristique(caracteristiqueId).subscribe({
          next: (response: any) => {
            Alertes.alerteDeleteSuccess();
          },
          error: (err: any) => Alertes.errorPopPup('Suppression échouée', err?.error?.message),
          complete: () => {
              this.getAllCaracteristiques();
          }
        });
      }
    );
  }

  paginate($event: any): void {
    this.loadingIndicator = true;
    this.pageOptions.page = $event - 1;
    this.getAllCaracteristiques();
    
  }

  close(event: boolean): void {
    if (event) {
      this.modalService.dismissAll();
      this.getAllCaracteristiques();
      
    }
  }

  doSearch(data: any): void {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    this.getAllCaracteristiques();
    this.modalService.dismissAll();
  }

  openBasicModal(content: TemplateRef<any>, size?: any, caracteristique?: any): void {
    this.caracteristique = caracteristique;
    this.caracteristiqueId = caracteristique?.id;
    this.caracteristiqueToUpdate = caracteristique;
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {
    });
  }
}