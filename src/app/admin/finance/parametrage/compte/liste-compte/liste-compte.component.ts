import { Component, inject, Input, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MaterialModule } from "@/app/util/material/material.module";
import { SpinnerComponent } from "@/app/util/spinner/spinner.component";
import { CommonModule } from "@angular/common";
import { AddCompteComponent } from "../add-compte/add-compte.component";
import { PlanComptableElementService } from "@/app/services/plan-comptable/plan-comptable-element.service";
import { Alertes } from "@/app/util/alerte";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-liste-compte",
  standalone: true,
  imports: [
    NgbModule,
    MaterialModule,
    SpinnerComponent,
    CommonModule,
    AddCompteComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: "./liste-compte.component.html",
  styleUrl: "./liste-compte.component.scss",
})
export class ListeCompteComponent implements OnInit {
  @Input() backdrumpDisplay: boolean = true;

  datasource: any;
  loading = true;
  compteToUpdate: any;
  classeId!: any;
  classeInfo: any;
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
    this.loadComptes();
  }

  initFilterForm(): void {
    this.filterForm = new FormGroup({
      code: new FormControl(''),
      libelle: new FormControl('')
    });
  }

  loadComptes(){
    let requestParams = this.pageOptions
     requestParams.parentId = localStorage.getItem("classeId")
    this.planComptableService.getAllPlanComptableElements(requestParams).subscribe({
      next: (response) => {
        this.datasource = response;
        console.log(" this.datasource", this.datasource);    
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Erreur lors du chargement des comptes:', error);
        Alertes.alerteAddDanger('Erreur lors du chargement des comptes');
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    const filters = this.filterForm.value;
    
    // Mise à jour avec spread operator pour éviter les erreurs de typage
    this.pageOptions = {
      page: 0,
      size: this.pageOptions.size,
      code: filters.code?.trim() || undefined,
      libelle: filters.libelle?.trim() || undefined
    };
    
    console.log('🔍 Application des filtres:', this.pageOptions);
    this.loadComptes();
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
    this.loadComptes();
  }

  /**
   * Pagination
   */
  paginate(page: number): void {
    this.pageOptions.page = page - 1;
    this.loadComptes();
  }

  /**
   * Ouvrir le modal d'ajout/modification
   */
  openDialog(content: TemplateRef<any>, modalSize: string, compte?: any): void {
    this.compteToUpdate = compte;
    this.modalService.open(content, { 
      size: modalSize, 
      backdrop: "static" 
    });
  }

  /**
   * Supprimer un compte
   */
  deleteCompte(compteId: number): void {
    Alertes.confirmAction(
      'Êtes-vous sûr de vouloir supprimer ce compte ?',
      'Cette action est irréversible',
      () => {
        this.planComptableService.deletePlanComptableElement(compteId).subscribe({
          next: () => {
            Alertes.alerteAddSuccess('Compte supprimé avec succès');
            this.loadComptes();
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
    this.loadComptes();
  }

  /**
   * Naviguer vers la liste des sous-comptes
   */
  navigateToSousComptes(compteId: any) {
    localStorage.setItem("compteId", compteId)
    this.router.navigateByUrl('/admin/acces/finance/parametres/classe/sous-compte');
  }

  /**
   * Retourner à la liste des classes
   */
  navigateToClasses(): void {
    this.router.navigate(['/admin/acces/finance/parametres']);
  }
}