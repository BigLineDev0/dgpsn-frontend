import { Component, inject, Input, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MaterialModule } from "@/app/util/material/material.module";
import { SpinnerComponent } from "@/app/util/spinner/spinner.component";
import { CommonModule } from "@angular/common";
import { PlanComptableElementService } from "@/app/services/plan-comptable/plan-comptable-element.service";
import { Alertes } from "@/app/util/alerte";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AddRealisationComponent } from "../add-realisation/add-realisation.component";

@Component({
  selector: "app-liste-realisation",
  standalone: true,
  imports: [
    NgbModule,
    MaterialModule,
    SpinnerComponent,
    CommonModule,
    ReactiveFormsModule,
    AddRealisationComponent,
    RouterLink
  ],
  templateUrl: "./liste-realisation.component.html",
  styleUrl: "./liste-realisation.component.scss",
})
export class ListeRealisationComponent implements OnInit {
  @Input() backdrumpDisplay: boolean = true;

  datasource: any;
  loading = true;
  @Input() realisationToUpdate: any;
  
  classeId!: number;
  compteId!: number;
  sousCompteId!: number;
  rubriqueId!: number;
  
  classeInfo: any;
  compteInfo: any;
  sousCompteInfo: any;
  rubriqueInfo: any;

  displayedColumns: string[] = ["code", "libelle", "commentaire", "actions"];
  filterForm!: FormGroup;
  
  pageOptions: any = {
    page: 0,
    size: 20,
  };

  private planComptableService = inject(PlanComptableElementService);

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initFilterForm();
    this.loadRealisations();
  }

  /**
   * Récupérer les paramètres de route
   */
// loadRouteParams(): void {
 
// }


  /**
   * Charger les informations de la rubrique parent
   */
// loadRubriqueInfo(): void {
//   this.planComptableService.readPlanComptableElement(this.rubriqueId).subscribe({
//     next: (response) => {
//       if (response?.body) {
//         this.rubriqueInfo = response.body;
//         this.sousCompteInfo = this.rubriqueInfo?.parent;
//         this.compteInfo = this.sousCompteInfo?.parent;
//         this.classeInfo = this.compteInfo?.parent;
//         console.log('✅ Informations de la rubrique chargées:', this.rubriqueInfo);
//       } else {
//         console.error('❌ Réponse vide');
//         Alertes.alerteAddDanger('Données introuvables');
//       }
//     },
//     error: (error) => {
//       console.error('❌ Erreur chargement:', error);
//       Alertes.alerteAddDanger('Impossible de charger les informations');
//     }
//   });
// }

  /**
   * Initialiser le formulaire de filtrage
   */
  initFilterForm(): void {
    this.filterForm = new FormGroup({
      code: new FormControl(''),
      libelle: new FormControl('')
    });
  }

  /**
   * Charger les réalisations d'une rubrique spécifique
   */
  loadRealisations(pageOptions?: any): void {
      this.loading = true;
    let requestParams =  this.pageOptions
    requestParams.parentId = localStorage.getItem('rubriqueId')
    console.log('requestParams',requestParams);
    
    this.planComptableService.getAllPlanComptableElements(requestParams).subscribe({
      next: (response) => {
        this.datasource = response;
         console.log('logg',  this.datasource);
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Erreur chargement réalisations:', error);
        Alertes.alerteAddDanger('Erreur lors du chargement des réalisations');
        this.loading = false;
      }
    });
  }

  /**
   * Appliquer les filtres
   */
  applyFilters(): void {
    const filters = this.filterForm.value;
    
    this.pageOptions = {
      page: 0,
      size: this.pageOptions.size,
      code: filters.code?.trim() || undefined,
      libelle: filters.libelle?.trim() || undefined
    };
    
    this.loadRealisations(this.pageOptions);
  }

  /**
   * Réinitialiser les filtres
   */
  resetFilters(): void {
    this.filterForm.reset();
    this.pageOptions = { page: 0, size: 20 };
    this.loadRealisations(this.pageOptions);
  }

  /**
   * Pagination
   */
  paginate(page: number): void {
    this.pageOptions.page = page - 1;
    this.loadRealisations(this.pageOptions);
  }

  /**
   * Ouvrir le modal d'ajout/modification
   */
  openDialog(content: TemplateRef<any>, modalSize: string, realisation?: any): void {
    this.realisationToUpdate = realisation;
    this.modalService.open(content, { 
      size: modalSize, 
      backdrop: "static" 
    });
  }

  /**
   * Supprimer une réalisation
   */
  deleteRealisation(realisationId: number): void {
    Alertes.confirmAction(
      'Êtes-vous sûr de vouloir supprimer cette réalisation ?',
      'Cette action est irréversible',
      () => {
        this.planComptableService.deletePlanComptableElement(realisationId).subscribe({
          next: () => {
            Alertes.alerteAddSuccess('Réalisation supprimée avec succès');
            this.loadRealisations(this.pageOptions);
          },
          error: (error) => {
            Alertes.alerteAddDanger(
              error?.error?.message || 'Erreur lors de la suppression'
            );
          }
        });
      }
    );
  }

  /**
   * Fermer le modal et recharger
   */
  close(): void {
    this.modalService.dismissAll();
    this.loadRealisations(this.pageOptions);
  }

  /**
   * Retourner à la liste des rubriques
   */
  navigateToRubriques(): void {
    this.router.navigate([
      '/admin/acces/finance/parametres/classe',
      this.classeId,
      'compte',
      this.compteId,
      'sous-compte',
      this.sousCompteId,
      'rubrique'
    ]);
  }
}