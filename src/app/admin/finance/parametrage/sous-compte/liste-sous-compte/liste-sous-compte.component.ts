import { Component, inject, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from "@/app/util/material/material.module";
import { SpinnerComponent } from "@/app/util/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddSousCompteComponent } from "../add-sous-compte/add-sous-compte.component";
import { PlanComptableElementService } from '@/app/services/plan-comptable/plan-comptable-element.service';
import { Alertes } from '@/app/util/alerte';

@Component({
  selector: 'app-liste-sous-compte',
  standalone: true,
  imports: [
    NgbModule,
    MaterialModule,
    SpinnerComponent,
    CommonModule,
    ReactiveFormsModule,
    AddSousCompteComponent,
    RouterLink
  ],
  templateUrl: './liste-sous-compte.component.html',
  styleUrl: './liste-sous-compte.component.scss'
})
export class ListeSousCompteComponent implements OnInit {
  @Input() backdrumpDisplay: boolean = true;

  datasource: any;
  loading = true;
  sousCompteToUpdate: any;
  classeId!: number;
  compteId!: number;
  compteInfo: any;
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
    this.loadSousComptes();
  }

  /**
   * Récupérer les IDs depuis la route
   */
  // loadIds(): void {
  //   this.activatedRoute.params.subscribe(params => {
  //     this.classeId = +params['classId'];
  //     this.compteId = +params['compteId'];
      
  //     if (this.compteId && !isNaN(this.compteId)) {
  //       // Charger d'abord les infos du compte pour récupérer sa valeur "parentId"
  //       this.loadCompteInfo();
  //     } else {
  //       console.error('❌ ID de compte invalide');
  //       Alertes.alerteAddDanger('ID de compte invalide');
  //     }
  //   });
  // }

  /**
   * Charger les informations du compte parent pour récupérer sa valeur "parentId"
   */
  // loadCompteInfo(): void {
  //   this.planComptableService.readPlanComptableElement(this.compteId).subscribe({
  //     next: (response) => {
  //       this.compteInfo = response.body;
        
  //       // Charger les sous-comptes avec le plan du compte parent
  //       this.loadSousComptes(this.pageOptions);
  //     },
  //     error: (error) => {
  //       console.error('❌ Erreur lors du chargement du compte:', error);
  //       Alertes.alerteAddDanger('Impossible de charger les informations du compte');
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
   * Charger les sous-comptes d'un compte spécifique
   */
  loadSousComptes(pageOptions?: any): void {
        let requestParams = this.pageOptions
     requestParams.parentId = localStorage.getItem("compteId")
    this.planComptableService.getAllPlanComptableElements(requestParams).subscribe({
      next: (response) => {
        this.datasource = response;        
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Erreur lors du chargement des sous-comptes:', error);
        console.error('📍 URL appelée:', error.url);
        Alertes.alerteAddDanger('Erreur lors du chargement des sous-comptes');
        this.loading = false;
      }
    });
  }

  /**
   * Appliquer les filtres de recherche
   */
  applyFilters(): void {
    const filters = this.filterForm.value;
    
    this.pageOptions = {
      page: 0,
      size: this.pageOptions.size,
      code: filters.code?.trim() || undefined,
      libelle: filters.libelle?.trim() || undefined
    };
    
    console.log('🔍 Application des filtres:', this.pageOptions);
    this.loadSousComptes(this.pageOptions);
  }

  /**
   * Réinitialiser les filtres
   */
  resetFilters(): void {
    this.filterForm.reset();
    this.pageOptions = {
      page: 0,
      size: 20
    };
    console.log('🔄 Réinitialisation des filtres');
    this.loadSousComptes(this.pageOptions);
  }

  /**
   * Pagination
   */
  paginate(page: number): void {
    this.pageOptions.page = page - 1;
    this.loadSousComptes(this.pageOptions);
  }

  /**
   * Ouvrir le modal d'ajout/modification
   */
  openDialog(content: TemplateRef<any>, modalSize: string, sousCompte?: any): void {
    this.sousCompteToUpdate = sousCompte;
    this.modalService.open(content, { 
      size: modalSize, 
      backdrop: "static" 
    });
  }

  /**
   * Supprimer un sous-compte
   */
  deleteSousCompte(sousCompteId: number): void {
    Alertes.confirmAction(
      'Êtes-vous sûr de vouloir supprimer ce sous-compte ?',
      'Cette action est irréversible',
      () => {
        this.planComptableService.deletePlanComptableElement(sousCompteId).subscribe({
          next: () => {
            Alertes.alerteAddSuccess('Sous-compte supprimé avec succès');
            this.loadSousComptes(this.pageOptions);
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
   * Fermer le modal et recharger les données
   */
  close(): void {
    this.modalService.dismissAll();
    this.loadSousComptes(this.pageOptions);
  }

  /**
   * Naviguer vers la liste des rubriques
   */
navigateToRubriques(sousCompteId: any): void { 
  localStorage.setItem('sousCompteId',sousCompteId)
  this.router.navigateByUrl('/admin/acces/finance/parametres/classe/rubrique')
}
  /**
   * Retourner à la liste des comptes
   */
  navigateToComptes(): void {
    this.router.navigateByUrl('/admin/acces/finance/parametres/classe');
  }
}