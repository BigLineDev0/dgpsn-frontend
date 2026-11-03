import { Component, inject, OnInit, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MaterialModule } from "@/app/util/material/material.module";
import { SpinnerComponent } from "@/app/util/spinner/spinner.component";
import { CommonModule, NgIf } from "@angular/common";
import { AddFournisseurComponent } from "../add-fournisseur/add-fournisseur.component";
import { Alertes } from "@/app/util/alerte";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FournisseurService } from "@/app/services/fournisseur/fournisseur.service";
import { DetailFournisseurComponent } from "../detail-fournisseur/detail-fournisseur.component";
import { HasAnyAuthorityDirective } from "@views/has-any-authority/has-any-authority.module";
import { Authority } from "@/app/util/Authority";

@Component({
  selector: "app-list-fournisseur",
  standalone: true,
  imports: [
    NgbModule,
    MaterialModule,
    SpinnerComponent,
    NgIf,
    CommonModule,
    AddFournisseurComponent,
    ReactiveFormsModule,
    HasAnyAuthorityDirective
  ],
  templateUrl: "./list-fournisseur.component.html",
  styleUrl: "./list-fournisseur.component.scss",
})
export class ListFournisseurComponent implements OnInit {
  // Données
  datasource: any;
  loading = false;
  fournisseurToUpdate: any;
  add = Authority.ADD_FOURNISSEUR;
      updated = Authority.EDIT_FOURNISSEUR;
      deleted = Authority.DELETE_FOURNISSEUR;
      read = Authority.READ_FOURNISSEUR;

  // Colonnes du tableau
  displayedColumns: string[] = [
    "codeFournisseur", 
    "raisonSociale", 
    "ninea", 
    "contact", 
    "categorieFournisseur", 
    "statut", 
    "actions"
  ];

  // Formulaire de filtrage
  filterForm!: FormGroup;

  // Options de pagination
  pageOptions: any = {
    page: 0,
    size: 20,
  };

  constructor(
    private modalService: NgbModal,
    private route: Router,
    private fournisseurService: FournisseurService
  ) { }

  ngOnInit(): void {
    this.initFilterForm();
    this.loadFournisseurs(this.pageOptions);
  }

  /**
   * Initialiser le formulaire de filtrage
   */
  initFilterForm() {
    this.filterForm = new FormGroup({
      raisonSociale: new FormControl(''),
      codeFournisseur: new FormControl(''),
      ninea: new FormControl(''),
      categorieFournisseur: new FormControl(''),
      statut: new FormControl('')
    });
  }

  /**
   * Charger les fournisseurs depuis le backend
   */
  loadFournisseurs(pageOptions: any) {
    this.loading = true;

    // Préparer les paramètres de la requête
    const requestParams = {
      page: pageOptions.page || 0,
      size: pageOptions.size || 20,
      raisonSociale: pageOptions.raisonSociale || undefined,
      codeFournisseur: pageOptions.codeFournisseur || undefined,
      ninea: pageOptions.ninea || undefined,
      categorieFournisseur: pageOptions.categorieFournisseur || undefined,
      statut: pageOptions.statut || undefined,
      sortBy: pageOptions.sortBy || undefined,
      ascending: pageOptions.ascending !== undefined ? pageOptions.ascending : undefined
    };

    console.log("Chargement fournisseurs avec params:", requestParams);

    this.fournisseurService.getAllFournisseurs(requestParams).subscribe({
      next: (response) => {
        console.log("✅ Réponse brute du serveur:", response);
        console.log("Type de réponse:", typeof response);
        console.log("Est un tableau?", Array.isArray(response));
        
        // Vérifier si la réponse est un tableau ou un objet paginé
        if (Array.isArray(response)) {
          // Si c'est un tableau simple, on le transforme en structure paginée
          console.log("⚠️ Réponse est un tableau, transformation en objet paginé");
          this.datasource = {
            content: response,
            totalElements: response.length,
            totalPages: 1,
            size: response.length,
            number: 0
          };
        } else if (response && response.content) {
          // Si c'est déjà un objet paginé (Spring Page)
          console.log("✅ Réponse est un objet paginé Spring");
          this.datasource = response;
        } else {
          // Cas inattendu
          console.error("❌ Structure de réponse non reconnue:", response);
          this.datasource = {
            content: [],
            totalElements: 0,
            totalPages: 0,
            size: 0,
            number: 0
          };
        }
        
        console.log("📊 Datasource final:", this.datasource);
        console.log("📋 Nombre d'éléments:", this.datasource.totalElements);
        this.loading = false;
      },
      error: (error) => {
        console.error("❌ Erreur lors du chargement des fournisseurs:", error);
        Alertes.alerteAddDanger(
          error?.error?.message || "Erreur lors du chargement des fournisseurs"
        );
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  /**
   * Appliquer les filtres de recherche
   */
  applyFilters() {
    const filters = this.filterForm.value;

    this.pageOptions = {
      page: 0,
      size: 20,
      raisonSociale: filters.raisonSociale?.trim() || undefined,
      codeFournisseur: filters.codeFournisseur?.trim() || undefined,
      ninea: filters.ninea?.trim() || undefined,
      categorieFournisseur: filters.categorieFournisseur || undefined,
      statut: filters.statut || undefined
    };

    console.log("Application des filtres:", this.pageOptions);
    this.loadFournisseurs(this.pageOptions);
  }

  /**
   * Réinitialiser les filtres
   */
  resetFilters() {
    this.filterForm.reset();
    this.pageOptions = {
      page: 0,
      size: 20
    };
    this.loadFournisseurs(this.pageOptions);
  }

  /**
   * Pagination
   */
  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.loadFournisseurs(this.pageOptions);
  }

  /**
   * Ouvrir le modal d'ajout/modification
   */
  openDialog(content: TemplateRef<any>, modalSize: any, fournisseur?: any) {
    this.fournisseurToUpdate = fournisseur;
    
    this.modalService
      .open(content, { size: modalSize, backdrop: "static" })
      .result.then((result: any) => {
        console.log("Modal fermé avec succès:", result);
      })
      .catch((res: any) => {
        console.log("Modal annulé:", res);
      });
  }

  /**
   * Supprimer un fournisseur
   */
  deleteFournisseur(fournisseurId: number) {
    Alertes.confirmAction(
      'Êtes-vous sûr de vouloir supprimer ce fournisseur ?',
      'Cette action est irréversible',
      () => {
        this.fournisseurService.deleteFournisseur(fournisseurId).subscribe({
          next: () => {
            console.log("✅ Fournisseur supprimé avec succès");
            Alertes.alerteAddSuccess('Fournisseur supprimé avec succès');
            this.loadFournisseurs(this.pageOptions);
          },
          error: (error) => {
            console.error("❌ Erreur suppression:", error);
            Alertes.alerteAddDanger(
              error?.error?.message || 'Erreur lors de la suppression'
            );
          }
        });
      }
    );
  }

  /**
   * Changer le statut d'un fournisseur
   */
  toggleStatut(fournisseur: any) {
    const nouveauStatut = fournisseur.statut === 'ACTIF' ? 'INACTIF' : 'ACTIF';
    
    Alertes.confirmAction(
      `Changer le statut en ${nouveauStatut} ?`,
      'Cette action modifiera l\'état du fournisseur',
      () => {
        // Créer un objet avec les données mises à jour
        const fournisseurUpdated = {
          ...fournisseur,
          statut: nouveauStatut
        };

        this.fournisseurService.updateFournisseur(fournisseur.id, fournisseurUpdated).subscribe({
          next: () => {
            console.log(`✅ Statut changé en ${nouveauStatut}`);
            Alertes.alerteAddSuccess(`Statut changé en ${nouveauStatut}`);
            this.loadFournisseurs(this.pageOptions);
          },
          error: (error) => {
            console.error("❌ Erreur changement statut:", error);
            Alertes.alerteAddDanger(
              error?.error?.message || 'Erreur lors du changement de statut'
            );
          }
        });
      }
    );
  }

  /**
   * Voir les détails d'un fournisseur
   */
  viewDetails(fournisseur: any): void {
    console.log("Ouverture des détails du fournisseur:", fournisseur);
    
    const modalRef = this.modalService.open(DetailFournisseurComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    
    // Passer les données au composant de détail
    modalRef.componentInstance.fournisseurDetails = fournisseur;
    
    // Optionnel: Gérer la fermeture du modal
    modalRef.result.then(
      (result) => {
        console.log("Modal détails fermé:", result);
      },
      (reason) => {
        console.log("Modal détails annulé:", reason);
      }
    );
  }

  /**
   * Fermer le modal et recharger les données
   */
  close() {
    this.modalService.dismissAll();
    this.loadFournisseurs(this.pageOptions);
  }
}