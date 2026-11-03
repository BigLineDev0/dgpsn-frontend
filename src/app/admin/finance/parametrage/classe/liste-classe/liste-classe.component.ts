import { Component, inject, Input, OnInit, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MaterialModule } from "@/app/util/material/material.module";
import { SpinnerComponent } from "@/app/util/spinner/spinner.component";
import { CommonModule, NgIf } from "@angular/common";
import { AddParametrageComponent } from "../add-classe/add-classe.component";
import { PlanComptableElementService } from "@/app/services/plan-comptable/plan-comptable-element.service";
import { Alertes } from "@/app/util/alerte";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-liste-classe",
  standalone: true,
  imports: [
    NgbModule,
    MaterialModule,
    SpinnerComponent,
    NgIf,
    CommonModule,
    AddParametrageComponent,
    ReactiveFormsModule
  ],
  templateUrl: "./liste-classe.component.html",
  styleUrl: "./liste-classe.component.scss",
})
export class ListeClasseComponent implements OnInit {
  @Input() backdrumpDisplay: boolean = true;

  // Données
  datasource: any;
  loading = true;
  classeToUpdate: any;

  // Colonnes du tableau
  displayedColumns: string[] = ["code", "libelle", "commentaire", "actions"];

  // Service injecté
  private planComptableService = inject(PlanComptableElementService);

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
  ) { }

  ngOnInit(): void {
    this.initFilterForm();
    this.loadClasses(this.pageOptions);
  }

  /**
   * Initialiser le formulaire de filtrage
   */
  initFilterForm() {
    this.filterForm = new FormGroup({
      code: new FormControl(''),
      libelle: new FormControl('')
    });
  }

  /**
   * Charger les classes depuis le backend
   */
  loadClasses(pageOptions: any) {
    this.loading = true;

    // Préparer les paramètres de la requête
    const requestParams = {
      page: pageOptions.page || 0,
      size: pageOptions.size || 20,
      type: 'CLASSE', // Filtrer uniquement les CLASSES
      code: pageOptions.code || undefined,
      libelle: pageOptions.libelle || undefined,
      sortBy: pageOptions.sortBy || undefined,
      ascending: pageOptions.ascending !== undefined ? pageOptions.ascending : undefined
    };


    this.planComptableService.getAllClasses(requestParams).subscribe({
      next: (response) => {
        this.datasource = response;
        console.log("Classes chargées:", response);
        this.loading = false;
      },
      error: (error) => {
        console.error("Erreur lors du chargement des classes:", error);
        Alertes.alerteAddDanger("Erreur lors du chargement des classes");
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
      code: filters.code?.trim() || undefined,
      libelle: filters.libelle?.trim() || undefined
    };

    console.log("Application des filtres:", this.pageOptions);
    this.loadClasses(this.pageOptions);
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
    this.loadClasses(this.pageOptions);
  }

  /**
   * Pagination
   */
  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.loadClasses(this.pageOptions);
  }

  /**
   * Ouvrir le modal d'ajout/modification
   */
  openDialog(content: TemplateRef<any>, modalSize: any, classe?: any) {
    this.classeToUpdate = classe;
    
    this.modalService
      .open(content, { size: modalSize, backdrop: "static" })
      .result.then((result: any) => {
      })
      .catch((res: any) => {
        console.log("Modal annulé:", res);
      });
  }

  /**
   * Supprimer une classe
   */
  deleteClasse(classeId: number) {
    Alertes.confirmAction(
      'Êtes-vous sûr de vouloir supprimer cette classe ?',
      'Cette action est irréversible',
      () => {
        this.planComptableService.deletePlanComptableElement(classeId).subscribe({
          next: () => {
            Alertes.alerteAddSuccess('Classe supprimée avec succès');
            this.loadClasses(this.pageOptions);
          },
          error: (error) => {
            console.error("Erreur suppression:", error);
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
  close() {
    this.modalService.dismissAll();
    this.loadClasses(this.pageOptions);
  }
    /**
   * Naviguer vers la liste des comptes d'une classe
   */
  navigateToComptes(classeId: any): void {
    localStorage.setItem("classeId", classeId)
    this.route.navigate(['/admin/acces/finance/parametres/classe',classeId,'compte'
    ]);
  }

  /**
   * Naviguer vers la liste des comptes d'une classe
   */
  navigateRoute(url: any) {
    this.route.navigateByUrl(url);
  }
}