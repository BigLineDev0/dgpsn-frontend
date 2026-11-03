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
import { AddCourrierDepartComponent } from "../add-courrier-depart/add-courrier-depart.component";
import { SearchCourrierDepartComponent } from "../search-courrier-depart/search-courrier-depart.component";
import { DetailCourrierDepartComponent } from "../detail-courrier-depart/detail-courrier-depart.component";
import { CourrierService } from "@/app/services/courrier/courrier.service";
import { Alertes } from "@/app/util/alerte";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { ListDocumentComponent } from "@/app/admin/document/list-document/list-document.component";
import { MatTableModule } from "@angular/material/table";
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import {Authority} from "@/app/util/Authority";

@Component({
  selector: "app-list-courrier-depart",
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
    FormsModule,
    NgbAlertModule,
    HasAnyAuthorityDirective,
    NgbPopoverModule,
    AddCourrierDepartComponent,
    SearchCourrierDepartComponent,
    DetailCourrierDepartComponent,
    MatIconModule,
    MatMenuModule,
    ListDocumentComponent,
    DragDropModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatRippleModule,
      HasAnyAuthorityDirective
  ],
  templateUrl: "./list-courrier-depart.component.html",
  styleUrl: "./list-courrier-depart.component.scss",
})
export class ListCourrierDepartComponent implements OnInit, AfterViewInit {
  @Input() set courriers(value: any[]) {
    if (value) {
      this.dataSource = this.adaptCourriersData(value);
    }
  }

  @Output() onArchiver = new EventEmitter<any>();

  @ViewChild("basicModal") basicModal!: TemplateRef<any>;
  @ViewChild("searchModal") searchModal!: TemplateRef<any>;
  @ViewChild("detailModal") detailModal!: TemplateRef<any>;
  @ViewChild("columnConfigModal") columnConfigModal!: TemplateRef<any>;

  dataSource: any[] = [];
  displayedColumns: string[] = [
        'reference',
        'destinataire',
        'objet',
        'dateDepart',
        'dateEnvoi',
        'typeCourrier',
        'urgence',
        'statut',
        'actions'
    ];
  
  // Configuration des colonnes avec système clé-valeur
  availableColumns: any[] = [
    {key: 'reference', label: 'Référence', visible: true, order: 0},
    {key: 'destinataire', label: 'Destinataire', visible: true, order: 1},
    {key: 'objet', label: 'Objet', visible: true, order: 2},
    {key: 'dateDepart', label: 'Date de départ', visible: true, order: 3},
    {key: 'dateEnvoi', label: 'Date d\'envoi', visible: true, order: 4},
    {key: 'typeCourrier', label: 'Type', visible: true, order: 5},
    {key: 'urgence', label: 'Urgence', visible: true, order: 6},
    {key: 'statut', label: 'Statut', visible: true, order: 7},
    {key: 'actions', label: 'Actions', visible: true, order: 8,}
  ];

  @Input() typeCourrier: any;
  courrierToUpdate: any;
  loadingIndicator: boolean = true;
  pageOptions: any = {
    page: 0,
    size: 20,
  };
  agentToUpdate: any;
  searchCriteria: any = {};

  // Autorisations
  add = Authority.ADD_COURRIER;
  updated = Authority.EDIT_COURRIER;
  deleted = Authority.DELETE_COURRIER;
  archiveCourier = Authority.ARCHIVER_COURRIER;
  dearchiveCourier= Authority.DESARCHIVER_COURRIER;
  statutStatut = Authority.CHANGER_STATUT_COURRIER;
  readStatistique= Authority.READ_STATISTIQUES;
  impoort= Authority.IMPORT_COURRIER;
  export = Authority.EXPORT_COURRIER;
  document= Authority.READ_DOCUMENT;
  read = "READ_COURRIER_DEPART";
  readDocument = "READ_DOCUMENT";
  generer_accuse = "GENERER_ACCUSE_DEPART";
  generer_fiche = "GENERER_FICHE_DEPART";
  traiter_courrier = "TRAITER_COURRIER_DEPART";
  archiver_courrier = "ARCHIVER_COURRIER_DEPART";

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private courrierService: CourrierService
  ) {}

  ngOnInit(): void {
    this.loadColumnConfiguration();
    if (!this.courriers || this.courriers.length === 0) {
      this.loadCourriersDepart();
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
      {key: 'destinataire', label: 'Destinataire', visible: true, order: 1},
      {key: 'objet', label: 'Objet', visible: true, order: 2},
      {key: 'dateDepart', label: 'Date de départ', visible: true, order: 3},
      {key: 'dateEnvoi', label: 'Date d\'envoi', visible: true, order: 4},
      {key: 'typeCourrier', label: 'Type', visible: true, order: 5},
      {key: 'urgence', label: 'Urgence', visible: true, order: 6},
      {key: 'statut', label: 'Statut', visible: true, order: 7},
      {key: 'actions', label: 'Actions', visible: true, order: 8, fixed: true}
    ];
    this.saveColumnConfiguration();
  }

  loadColumnConfiguration(): void {
    const savedConfig = localStorage.getItem('courrierDepartListColumnConfig');
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
    localStorage.setItem('courrierDepartListColumnConfig', JSON.stringify(config));
  }

  openColumnConfig(): void {
    this.openBasicModal(this.columnConfigModal, 'lg');
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    // Implémentez votre logique de filtrage ici
  }

  onStatusFilterChange(event: Event): void {
    const filterValue = (event.target as HTMLSelectElement).value;
    // Implémentez votre logique de filtrage ici
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
        courrier.statut || courrier.statutType?.name || "BROUILLON";
      const statutDescription =
        courrier.statutType?.description ||
        this.getStatutDescription(statut) ||
        "Brouillon";

      return {
        ...courrier,
        destinataire:
          courrier.correspondant || courrier.destinataire || "Non spécifié",
        typeCourrier: courrier.type?.description || "Non spécifié",
        statut: statut,
        statutType: {
          name: statut,
          description: statutDescription,
        },
      };
    });
  }

  loadCourriersDepart(): void {
    this.loadingIndicator = true;

    this.courrierService.getAllCourriers().subscribe({
      next: (tousCourriers: any) => {
        try {
          const courriersArray = Array.isArray(tousCourriers)
            ? tousCourriers
            : [];

          const courriersDepart = courriersArray.filter(
            (courrier: any) => courrier?.type?.name === "DEPART"
          );

          this.dataSource = this.adaptCourriersData(courriersDepart);

        } catch (error) {
          this.dataSource = [];
        } finally {
          this.loadingIndicator = false;
        }
      },
      error: (error: any) => {
        Alertes.alerteAddDanger(error.message);
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
            this.loadCourriersDepart();
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

    if (
      confirm(
        `Voulez-vous vraiment supprimer le courrier ${
          courrier.reference || ""
        } ?`
      )
    ) {
      this.courrierService.deleteCourrier(courrierId).subscribe({
        next: () => {
          this.dataSource = this.dataSource.filter(
            (c: any) => c.id !== courrierId
          );
          Alertes.alerteAddSuccess("Courrier départ supprimé avec succès");
        },
        error: (error: any) => {
          Alertes.alerteAddDanger("Erreur lors de la suppression du courrier");
        },
      });
    }
  }

  doSearch(data: { page?: number; size?: number; [key: string]: any }): void {
    if (!data) return;

    this.pageOptions = {
      ...this.pageOptions,
      ...data,
      page: 0,
      size: data.size || 20,
    };

    this.modalService.dismissAll();
    this.loadCourriersDepart();
  }

  paginate(event: any): void {
    this.pageOptions.page = event - 1;
    this.loadCourriersDepart();
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

  archiverCourrier(courrier: any): void {
    if (
      confirm(`Voulez-vous archiver le courrier "${courrier?.reference}" ?`)
    ) {
      this.updateStatus(courrier, "ARCHIVE");
      this.onArchiver.emit(courrier);
    }
  }

  updateStatus(courrier: any, newStatus: string): void {
    if (!courrier) return;

    Alertes.alerteAddSuccess(
      `Mise à jour du statut du courrier ${courrier.id} vers ${newStatus}`
    );

    courrier.statut = newStatus;
    courrier.statutType = {
      name: newStatus,
      description: this.getStatutDescription(newStatus),
    };
  }

  genererAccuseReception(courrier: any): void {
    if (!courrier) return;
    Alertes.alerteAddSuccess(`Accusé de réception généré pour le courrier: ${courrier.reference}`);
  }

  voirDetails(courrier: any): void {
    if (!courrier) return;

    this.courrierToUpdate = courrier;
    this.openBasicModal(this.detailModal, "lg", courrier);
  }

  suivreEnvoi(courrier: any): void {
    if (!courrier) return;

    const reference = courrier.reference || "Non spécifié";
    const statut = courrier.statutType?.description || "Inconnu";

    Alertes.alerteAddSuccess(`Suivi de l'envoi pour: ${reference}\nStatut: ${statut}`);
  }

  ajouterCourrier(): void {
    this.courrierToUpdate = null;
    this.openBasicModal(this.basicModal, "lg");
  }

  rechercherCourrier(): void {
    this.openBasicModal(this.searchModal, "md");
  }

  openDialog(content: TemplateRef<any>, modalSize: any, agent?: any) {
    this.agentToUpdate = agent;

    this.modalService
      .open(content, { size: modalSize, backdrop: "static" })
      .result.then((result) => {})
      .catch((res) => {});
  }

  onCourrierAdded(success: boolean): void {
    if (success) {
      this.modalService.dismissAll();
      this.loadCourriersDepart();
    }
  }

  hasSearchCriteria(): boolean {
    return Object.keys(this.searchCriteria).length > 0 &&
           Object.values(this.searchCriteria).some(value =>
               value !== null && value !== undefined && value !== '' &&
               !(Array.isArray(value) && value.length === 0)
           );
  }
  exportData(format: string): void {
  Alertes.alerteAddDanger(`Exportation au format ${format} non implémentée pour Courrier Départ.`);
}

onPageSizeChange(): void {
  this.pageOptions.page = 0;
  this.loadCourriersDepart();
}
}