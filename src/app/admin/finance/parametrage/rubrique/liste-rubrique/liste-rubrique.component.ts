import { Component, inject, Input, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MaterialModule } from "@/app/util/material/material.module";
import { SpinnerComponent } from "@/app/util/spinner/spinner.component";
import { CommonModule } from "@angular/common";
import { PlanComptableElementService } from "@/app/services/plan-comptable/plan-comptable-element.service";
import { Alertes } from "@/app/util/alerte";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AddRubriqueComponent } from "../add-rubrique/add-rubrique.component";

@Component({
  selector: "app-liste-rubrique",
  standalone: true,
  imports: [
    NgbModule,
    MaterialModule,
    SpinnerComponent,
    CommonModule,
    ReactiveFormsModule,
    AddRubriqueComponent,
    RouterLink
  ],
  templateUrl: "./liste-rubrique.component.html",
  styleUrl: "./liste-rubrique.component.scss",
})
export class ListeRubriqueComponent implements OnInit {
  @Input() backdrumpDisplay: boolean = true;

  datasource: any;
  loading = true;
  rubriqueToUpdate: any;
  
  classeId!: number;
  compteId!: number;
  sousCompteId!: number;
  
  classeInfo: any;
  compteInfo: any;
  sousCompteInfo: any;

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
    this.loadRubriques();
  }

  /**
   * Récupérer les paramètres de route
   */
loadRouteParams(): void {
  // this.activatedRoute.params.subscribe(params => {
  //   this.classeId = +params['classId'];
  //   this.compteId = +params['compteId'];
  //   // ✅ CORRECTION : Utiliser 'sous-compteId' au lieu de 'sousCompteId'
  //   this.sousCompteId = +params['sous-compteId'];
    
  //   console.log('📌 Paramètres de route - Classe:', this.classeId, 
  //              'Compte:', this.compteId, 
  //              'Sous-compte:', this.sousCompteId);
    
  //   if (this.sousCompteId && !isNaN(this.sousCompteId)) {
  //     this.loadSousCompteInfo();
  //     this.loadRubriques(this.pageOptions);
  //   } else {
  //     console.error('❌ ID de sous-compte invalide');
  //     Alertes.alerteAddDanger('ID de sous-compte invalide');
  //   }
  // });
}

  /**
   * Charger les informations du sous-compte parent: commenter aujourd'hui aprés Abel
   */
  // loadSousCompteInfo(): void {
  //   this.planComptableService.readPlanComptableElement(this.sousCompteId).subscribe({
  //     next: (response) => {
  //       this.sousCompteInfo = response.body;
  //       this.compteInfo = this.sousCompteInfo?.parent;
  //       this.classeInfo = this.compteInfo?.parent;
  //       console.log('✅ Informations du sous-compte chargées:', this.sousCompteInfo);
  //     },
  //     error: (error) => {
  //       console.error('❌ Erreur chargement sous-compte:', error);
  //       Alertes.alerteAddDanger('Impossible de charger les informations du sous-compte');
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
   * Charger les rubriques d'un sous-compte spécifique
   */
  loadRubriques(pageOptions?: any): void {
     this.loading = true;
      let requestParams =  this.pageOptions
      requestParams.parentId = localStorage.getItem('sousCompteId')
    this.planComptableService.getAllPlanComptableElements(requestParams).subscribe({
      next: (response) => {
        this.datasource = response;
          console.log('logg',  this.datasource);
        console.log(`📊 ${response.totalElements} rubrique(s) trouvée(s)`);
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Erreur chargement rubriques:', error);
        Alertes.alerteAddDanger('Erreur lors du chargement des rubriques');
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
    
    this.loadRubriques(this.pageOptions);
  }

  /**
   * Réinitialiser les filtres
   */
  resetFilters(): void {
    this.filterForm.reset();
    this.pageOptions = { page: 0, size: 20 };
    this.loadRubriques(this.pageOptions);
  }

  /**
   * Pagination
   */
  paginate(page: number): void {
    this.pageOptions.page = page - 1;
    this.loadRubriques(this.pageOptions);
  }

  /**
   * Ouvrir le modal d'ajout/modification
   */
  openDialog(content: TemplateRef<any>, modalSize: string, rubrique?: any): void {
    this.rubriqueToUpdate = rubrique;
    this.modalService.open(content, { 
      size: modalSize, 
      backdrop: "static" 
    });
  }

  /**
   * Supprimer une rubrique
   */
  deleteRubrique(rubriqueId: number): void {
    Alertes.confirmAction(
      'Êtes-vous sûr de vouloir supprimer cette rubrique ?',
      'Cette action est irréversible',
      () => {
        this.planComptableService.deletePlanComptableElement(rubriqueId).subscribe({
          next: () => {
            Alertes.alerteAddSuccess('Rubrique supprimée avec succès');
            this.loadRubriques(this.pageOptions);
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
    this.loadRubriques(this.pageOptions);
  }
  /**
 * Naviguer vers la liste des réalisations d'une rubrique
 */
navigateToRealisations(rubriqueId: any) { 
  localStorage.setItem('rubriqueId',rubriqueId)
  this.router.navigateByUrl('/admin/acces/finance/parametres/classe/compte/realisation')
}

  /**
   * Retourner à la liste des sous-comptes
   */
  // navigateToSousComptes(): void {
  //   this.router.navigate([
  //     '/admin/acces/finance/parametres/classe',
  //     this.classeId,
  //     'compte',
  //     this.compteId,
  //     'sous-compte'

  //   ]);
  // }
    /**
   * Retourner à la liste des comptes
   */
  navigateToSousComptes(): void {
    this.router.navigateByUrl('/admin/acces/finance/parametres/classe/sous-compte');
  }
}