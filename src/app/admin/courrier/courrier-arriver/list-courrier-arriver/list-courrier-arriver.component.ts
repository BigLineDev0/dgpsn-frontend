import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from "@angular/common";
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnInit,
  AfterViewInit,
  TemplateRef,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  NgbAccordionModule,
  NgbAlertModule,
  NgbDropdownModule,
  NgbModal,
  NgbNavModule,
  NgbPaginationModule,
  NgbPopoverModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import { SpinnerComponent } from "@/app/util/spinner/spinner.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FeatherIconDirective } from "@core/feather-icon/feather-icon.directive";
import { NgSelectModule } from "@ng-select/ng-select";
import { HasAnyAuthorityDirective } from "@views/has-any-authority/has-any-authority.module";
import { QuillModule } from "ngx-quill";
import { AddCourrierArriverComponent } from "../add-courrier-arriver/add-courrier-arriver.component";
import { DetailCourrierArriverComponent } from "../detail-courrier-arriver/detail-courrier-arriver.component";
import { CourrierService } from "@/app/services/courrier/courrier.service";
import { Alertes } from "@/app/util/alerte";
import { ListDocumentComponent } from '@/app/admin/document/list-document/list-document.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import {Authority} from "@/app/util/Authority";

@Component({
  selector: "app-list-courrier-arriver",
  standalone:true,
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbDropdownModule,
    SpinnerComponent,
    NgbAccordionModule,
    NgbTooltipModule,
    FeatherIconDirective,
    MatTableModule,
    ReactiveFormsModule,
    NgSelectModule,
    QuillModule,
    NgbNavModule,
    MatIconModule,
    FormsModule,
    NgbAlertModule,
    HasAnyAuthorityDirective,
    NgbPopoverModule,
    AddCourrierArriverComponent,
    DetailCourrierArriverComponent,
    ListDocumentComponent,
    MatMenuModule,
    DragDropModule,
  ],
  templateUrl: "./list-courrier-arriver.component.html",
  styleUrl: "./list-courrier-arriver.component.scss",
})
export class ListCourrierArriverComponent implements OnInit, AfterViewInit {
  @Input() set courriers(value: any[]) {
      if (value) {
          this.allCourriers = this.adaptCourriersData(value);
          this.dataSource = [...this.allCourriers];
      }
  }

  @Output() onArchiver = new EventEmitter<any>();

  @ViewChild("basicModal") basicModal!: TemplateRef<any>;
  @ViewChild("detailModal") detailModal!: TemplateRef<any>;
  @ViewChild("columnConfigModal") columnConfigModal!: TemplateRef<any>;
    @ViewChild("searchModal") searchModal!: TemplateRef<any>;

  dataSource: any[] = [];
    allCourriers: any[] = [];


  // Configuration des colonnes avec système clé-valeur
  availableColumns: any[] = [
    {key: 'reference', label: 'Référence', visible: true, order: 0},
    {key: 'correspondant', label: 'Correspondant', visible: true, order: 1},
    {key: 'objet', label: 'Objet', visible: true, order: 2},
    {key: 'dateReception', label: 'Date de réception', visible: true, order: 3},
    {key: 'typeCourrier', label: 'Type', visible: true, order: 4},
    {key: 'urgence', label: 'Urgence', visible: true, order: 5},
    {key: 'statut', label: 'Statut', visible: true, order: 6},
    {key: 'actions', label: 'Actions', visible: true, order: 7}
  ];

  @Input() typeCourrier: any;
  courrierToUpdate: any;
  loadingIndicator: boolean = true;
  pageOptions: any = {
    page: 0,
    size: 20,
  };
  agentToUpdate: any;
 // searchCriteria: any = {};
    // Critères de recherche
    searchCriteria: any = {
        reference: '',
        correspondant: '',
        objet: '',
        dateDebut: null,
        dateFin: null,
        statut: '',
        urgence: ''
    };

  // Autorisations
    //Authority.ADD_COURRIER,
    //     Authority.EDIT_COURRIER,
    //     Authority.DELETE_COURRIER

  add = Authority.ADD_COURRIER;
  updated = Authority.EDIT_COURRIER;
  deleted = Authority.DELETE_COURRIER;
  read = Authority.READ_STATISTIQUES;
  readDocument =  Authority.DOCUMENT_COURIER;
  generer_accuse = "GENERER_ACCUSE_ARRIVE";
  generer_fiche = "GENERER_FICHE_ARRIVE";
  traiter_courrier = "TRAITER_COURRIER_ARRIVE";
  archiver =Authority.ARCHIVER_COURRIER;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private courrierService: CourrierService
  ) {}

  ngOnInit(): void {
    this.loadColumnConfiguration();
    if (!this.courriers || this.courriers.length === 0) {
      this.loadCourriersArriver();
    } else {
      this.loadingIndicator = false;
    }
  }

  ngAfterViewInit(): void {}

  // Méthodes pour la configuration des colonnes
  getVisibleColumns(): string[] {
    return this.availableColumns
      .filter(col => col.visible)
      .sort((a, b) => a.order - b.order)
      .map(col => col.key);
  }

  getVisibleColumnConfig(): any[] {
    return this.availableColumns
      .filter(col => col.visible)
      .sort((a, b) => a.order - b.order);
  }

  toggleColumnVisibility(column: any): void {
    if (column.fixed) return;
    column.visible = !column.visible;
    this.saveColumnConfiguration();
  }

  trackByColumn(index: number, column: any): any {
    return column.key;
  }

  dropColumn(event: CdkDragDrop<any[]>): void {
    const visibleColumns = this.getVisibleColumnConfig();
    moveItemInArray(visibleColumns, event.previousIndex, event.currentIndex);

    // Mettre à jour l'ordre dans availableColumns
    visibleColumns.forEach((column, index) => {
      const col = this.availableColumns.find(c => c.key === column.key);
      if (col) {
        col.order = index;
      }
    });
    this.saveColumnConfiguration();
  }

  selectAllColumns(): void {
    this.availableColumns.forEach(col => {
      if (!col.fixed) col.visible = true;
    });
    this.saveColumnConfiguration();
  }

  deselectAllColumns(): void {
    this.availableColumns.forEach(col => {
      if (!col.fixed) col.visible = false;
    });
    this.saveColumnConfiguration();
  }

  resetColumnsToDefault(): void {
    this.availableColumns = [
      {key: 'reference', label: 'Référence', visible: true, order: 0},
      {key: 'correspondant', label: 'Correspondant', visible: true, order: 1},
      {key: 'objet', label: 'Objet', visible: true, order: 2},
      {key: 'dateReception', label: 'Date de réception', visible: true, order: 3},
      {key: 'typeCourrier', label: 'Type', visible: true, order: 4},
      {key: 'urgence', label: 'Urgence', visible: true, order: 5},
      {key: 'statut', label: 'Statut', visible: true, order: 6},
      {key: 'actions', label: 'Actions', visible: true, order: 7, fixed: true}
    ];
    this.saveColumnConfiguration();
  }

  loadColumnConfiguration(): void {
    const savedConfig = localStorage.getItem('courrierArriverListColumnConfig');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        if (config.columns) {
          config.columns.forEach((savedCol: any) => {
            const column = this.availableColumns.find(col => col.key === savedCol.key);
            if (column) {
              column.visible = savedCol.visible;
              column.order = savedCol.order;
            }
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la configuration des colonnes:', error);
      }
    }
  }

  saveColumnConfiguration(): void {
    const config = {
      columns: this.availableColumns.map(col => ({
        key: col.key,
        visible: col.visible,
        order: col.order
      }))
    };
    localStorage.setItem('courrierArriverListColumnConfig', JSON.stringify(config));
  }

  openColumnConfig(): void {
    this.openBasicModal(this.columnConfigModal, 'lg');
  }

  exportData(format: string): void {
    Alertes.alerteAddDanger(`Exportation au format ${format} non implémentée pour Courrier Arrivé.`);
  }

  // hasSearchCriteria(): boolean {
  //   return Object.keys(this.searchCriteria).length > 0 &&
  //          Object.values(this.searchCriteria).some(value =>
  //              value !== null && value !== undefined && value !== '' &&
  //              !(Array.isArray(value) && value.length === 0)
  //          );
  // }

  onPageSizeChange(): void {
    this.pageOptions.page = 0;
    this.loadCourriersArriver();
  }
    // ============ MÉTHODES DE RECHERCHE ============

    rechercherCourrier(): void {
        if (!this.searchModal) {
            console.error('Modal de recherche non trouvée');
            return;
        }
        this.openBasicModal(this.searchModal, 'lg');
    }

    hasSearchCriteria(): boolean {
        return Object.keys(this.searchCriteria).some(key => {
            const value = this.searchCriteria[key];
            return value !== null && value !== undefined && value !== '' &&
                !(Array.isArray(value) && value.length === 0);
        });
    }

    applySearch(): void {
        if (!this.hasSearchCriteria()) {
            this.dataSource = [...this.allCourriers];
            return;
        }

        this.dataSource = this.allCourriers.filter((courrier: any) => {
            let matches = true;

            // Filtre par référence
            if (this.searchCriteria.reference) {
                matches = matches && courrier.reference?.toLowerCase()
                    .includes(this.searchCriteria.reference.toLowerCase());
            }

            // Filtre par correspondant
            if (this.searchCriteria.correspondant) {
                matches = matches && courrier.correspondant?.toLowerCase()
                    .includes(this.searchCriteria.correspondant.toLowerCase());
            }

            // Filtre par objet
            if (this.searchCriteria.objet) {
                matches = matches && courrier.objet?.toLowerCase()
                    .includes(this.searchCriteria.objet.toLowerCase());
            }

            // Filtre par statut
            if (this.searchCriteria.statut) {
                const courrierStatut = typeof courrier.statut === 'object'
                    ? courrier.statut.libelle
                    : courrier.statut;
                matches = matches && courrierStatut === this.searchCriteria.statut;
            }

            // Filtre par urgence
            if (this.searchCriteria.urgence) {
                const courrierUrgence = typeof courrier.urgence === 'object'
                    ? courrier.urgence.libelle
                    : courrier.urgence;
                matches = matches && courrierUrgence === this.searchCriteria.urgence;
            }

            // Filtre par date de début
            if (this.searchCriteria.dateDebut && courrier.dateReception) {
                const dateReception = new Date(courrier.dateReception);
                const dateDebut = new Date(this.searchCriteria.dateDebut);
                matches = matches && dateReception >= dateDebut;
            }

            // Filtre par date de fin
            if (this.searchCriteria.dateFin && courrier.dateReception) {
                const dateReception = new Date(courrier.dateReception);
                const dateFin = new Date(this.searchCriteria.dateFin);
                dateFin.setHours(23, 59, 59, 999); // Fin de journée
                matches = matches && dateReception <= dateFin;
            }

            return matches;
        });

        // Réinitialiser la pagination
        this.pageOptions.page = 0;

        // Message si aucun résultat
        if (this.dataSource.length === 0) {
            Alertes.alerteAddDanger('Aucun courrier ne correspond aux critères de recherche');
        } else {
            Alertes.alerteAddSuccess(`${this.dataSource.length} courrier(s) trouvé(s)`);
        }
    }

    clearSearch(): void {
        this.searchCriteria = {
            reference: '',
            correspondant: '',
            objet: '',
            dateDebut: null,
            dateFin: null,
            statut: '',
            urgence: ''
        };
        this.dataSource = [...this.allCourriers];
        this.pageOptions.page = 0;
    }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    if (!filterValue) {
      this.dataSource = this.adaptCourriersData(this.courriers || []);
      return;
    }

    this.dataSource = (this.courriers || []).filter(
      (courrier) =>
        courrier.reference?.toLowerCase().includes(filterValue) ||
        courrier.correspondant?.toLowerCase().includes(filterValue) ||
        courrier.objet?.toLowerCase().includes(filterValue)
    );
  }

  onStatusFilterChange(event: Event): void {
    const filterValue = (event.target as HTMLSelectElement).value;

    if (!filterValue) {
      this.dataSource = this.adaptCourriersData(this.courriers || []);
      return;
    }

    this.dataSource = (this.courriers || []).filter(
      (courrier) =>
        courrier.statutType?.name === filterValue ||
        courrier.statut === filterValue
    );
  }

  modifierCourrier(courrier?: any): void {
    if (!courrier) return;

    this.courrierToUpdate = { ...courrier };
    this.openBasicModal(this.basicModal, "lg", this.courrierToUpdate);
  }

  private adaptCourriersData(courriers: any[]): any[] {
    if (!courriers || !Array.isArray(courriers)) {
      return [];
    }

    return courriers.map((courrier: any) => {
      const statut =
        courrier.statut || courrier.statutType?.name || "NON_TRAITE";
      const statutDescription =
        courrier.statutType?.description ||
        this.getStatutDescription(statut) ||
        "Non traité";

      return {
        ...courrier,
        correspondant: courrier.correspondant || "Non spécifié",
        typeCourrier: courrier.type?.description || "Courrier Arrivé",
        statut: statut,
        statutType: {
          name: statut,
          description: statutDescription,
        },
      };
    });
  }

  archiverCourrier(courrier: any): void {
    if (!courrier) {
      return;
    }

    Alertes.confirmAction(
      "Voulez-vous archiver ce courrier ?",
      `Le courrier "${courrier?.reference}" sera archivé`,
      () => {
        // Mettre à jour localement
        courrier.cour_archive = true;
        this.onArchiver.emit(courrier);

        // Recharger les données
        this.loadCourriersArriver();

        // Message de succès optionnel
        Alertes.alerteAddSuccess("Courrier archivé avec succès");
      }
    );
  }

  loadCourriersArriver(): void {
    this.loadingIndicator = true;

    // Utiliser l'endpoint des courriers non archivés
    this.courrierService.getCourriersNonArchives().subscribe({
      next: (courriersNonArchives: any) => {
        try {
          const courriersArray = Array.isArray(courriersNonArchives)
            ? courriersNonArchives
            : [];

          // Filtrer pour garder seulement les courriers arrivés
          const courriersArriver = courriersArray.filter((courrier: any) => {
            const typeName = courrier?.type?.name || courrier?.type;
            return typeName === "ARRIVER" || typeName === "ARRIVEE";
          });

          this.dataSource = this.adaptCourriersData(courriersArriver);
          console.log(this.dataSource);

        } catch (error) {
          console.error("Erreur lors du traitement des données:", error);
          this.dataSource = [];
        } finally {
          this.loadingIndicator = false;
        }
      },
      error: (error: any) => {
        console.error(
          "Erreur lors du chargement des courriers arrivés:",
          error
        );
        this.loadingIndicator = false;
        this.dataSource = [];
      },
    });
  }

  openBasicModal(content: any, size: string = "md", courrier?: any): void {
    if (!content) {
      console.error("Le contenu de la modale est requis");
      return;
    }

    this.courrierToUpdate = courrier;
    this.modalService
      .open(content, {
        size: size,
        backdrop: "static",
        keyboard: false,
      })
      .result.then(
        (result: any) => {
          if (result) {
            this.loadCourriersArriver();
          }
        },
        (reason: any) => {
          console.log("Modal fermée avec:", reason);
        }
      );
  }

  closeModal(event?: any): void {
    try {
      this.modalService.dismissAll();
    } catch (error) {
      console.error("Erreur lors de la fermeture de la modale:", error);
    } finally {
      this.courrierToUpdate = null;
    }
  }

  close(event?: any): void {
    this.closeModal(event);
  }

  delete(courrier: any): void {
    if (!courrier) {
      console.error("Aucun courrier fourni pour la suppression");
      return;
    }

    const courrierId = courrier.id;
    if (!courrierId) {
      console.error("ID du courrier non fourni");
      return;
    }

    Alertes.confirmAction(
      "Voulez-vous supprimer ce courrier ?",
      `Le courrier "${courrier.reference || ''}" sera définitivement supprimé`,
      () => {
        this.courrierService.deleteCourrier(courrierId).subscribe({
          next: () => {
            this.dataSource = this.dataSource.filter(
              (c: any) => c.id !== courrierId
            );
            Alertes.alerteAddSuccess("Courrier supprimé avec succès");
          },
          error: (error: any) => {
            console.error("Erreur lors de la suppression:", error);
            Alertes.alerteAddDanger("Erreur lors de la suppression du courrier");
          },
        });
      }
    );
  }

  paginate(event: any): void {
    this.pageOptions.page = event - 1;
    this.loadCourriersArriver();
  }

  getBadgeClass(statutLibelle: any): string {
    if (!statutLibelle) return "badge bg-secondary";

    const statut = typeof statutLibelle === "object" ? statutLibelle : statutLibelle;

    switch (statut) {
      case "NON_TRAITE":
      case "En attente":
        return "badge bg-warning text-dark";
      case "EN_COURS":
      case "En cours de traitement":
        return "badge bg-info text-white";
      case "TRAITE":
      case "Traité":
        return "badge bg-success text-white";
      case "ARCHIVE":
      case "Archivé":
        return "badge bg-secondary text-white";
      case "ANNULE":
      case "Annulé":
        return "badge bg-danger text-white";
      default:
        return "badge bg-secondary text-white";
    }
  }

  getStatutDescription(statutLibelle: any): string {
    if (!statutLibelle) return "En attente";

    const statut = typeof statutLibelle === "object" ? statutLibelle : statutLibelle;

    switch (statut) {
      case "NON_TRAITE":
        return "En attente";
      case "EN_COURS":
        return "En cours de traitement";
      case "TRAITE":
        return "Traité";
      case "ARCHIVE":
        return "Archivé";
      case "ANNULE":
        return "Annulé";
      default:
        return statut || "En attente";
    }
  }

  updateStatus(courrier: any, newStatus: string): void {
    if (!courrier || !courrier.id) return;

    Alertes.confirmAction(
      "Changer le statut du courrier ?",
      `Le statut de "${courrier.reference}" sera changé vers "${this.getStatutDescription(newStatus)}"`,
      () => {
        // Mise à jour locale immédiate pour l'UI
        courrier.statut = {
          libelle: newStatus,
          description: this.getStatutDescription(newStatus)
        };

        // Appel API pour persister le changement
        this.courrierService.updateCourrierStatut(courrier.id, newStatus).subscribe({
          next: () => {
            Alertes.alerteAddSuccess(
              `Statut mis à jour vers "${this.getStatutDescription(newStatus)}"`
            );
            this.loadCourriersArriver();
          },
          error: (error: any) => {
            console.error("Erreur lors de la mise à jour du statut:", error);
            Alertes.alerteAddDanger("Erreur lors de la mise à jour du statut");
            this.loadCourriersArriver();
          },
        });
      }
    );
  }

  genererAccuseReception(courrier: any): void {
    if (!courrier) return;
    Alertes.alerteAddSuccess(
      `Accusé de réception généré pour le courrier: ${courrier.reference}`
    );
  }

  voirDetails(courrier: any): void {
    if (!courrier) return;

    this.courrierToUpdate = courrier;
    this.openBasicModal(this.detailModal, "lg", courrier);
  }

  ajouterCourrier(): void {
    this.courrierToUpdate = null;
    this.openBasicModal(this.basicModal, "lg");
  }

  onCourrierAdded(success: boolean): void {
    if (success) {
      this.modalService.dismissAll();
      this.loadCourriersArriver();
    }
  }
}