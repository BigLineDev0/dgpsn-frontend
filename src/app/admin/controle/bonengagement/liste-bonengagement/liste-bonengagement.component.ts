import { Alertes } from '@/app/util/alerte';
import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { 
  NgbAccordionModule, 
  NgbAlertModule, 
  NgbDropdownModule, 
  NgbModal, 
  NgbNavModule, 
  NgbPaginationModule, 
  NgbPopoverModule, 
  NgbTooltipModule 
} from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FeatherIconDirective } from '@core/feather-icon/feather-icon.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { QuillModule } from 'ngx-quill';
import { IBonEngagement, MOCK_BUDGET_NEW } from '@/app/admin/finance/data/new.model';
import { AddBonengagementComponent } from '../add-bonengagement/add-bonengagement.component';
import { SuiveInvestissementComponent } from '../suive-investissement/suive-investissement.component';
import { SuiveFonctionnementComponent } from '../suive-fonctionnement/suive-fonctionnement.component';

@Component({
  selector: 'app-liste-bonengagement',
  standalone: true,
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbDropdownModule,
    SpinnerComponent,
    MatTabsModule,
    NgbAccordionModule,
    MatDialogModule,
    MatTableModule,
    NgbTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    FeatherIconDirective,
    MatRippleModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatButtonModule,
    QuillModule,
    MatRadioModule,
    NgbNavModule,
    MatCardModule,
    FormsModule,
    MatPaginatorModule,
    MatSelectModule,
    NgbAlertModule,
    HasAnyAuthorityDirective,
    NgbPopoverModule,
    AddBonengagementComponent,
  ],
  templateUrl: './liste-bonengagement.component.html',
  styleUrls: ['./liste-bonengagement.component.scss']
})
export class ListeBonengagementComponent implements OnInit { 
  
  displayedColumns: string[] = [
    'numero_bon',
    'date',
    'numero_BE',
    'numero_mandat',
    'type',
    'description',
    'montant',
    // 'statut',
    'actions',
  ];
  @Input()
  bonEngagements: IBonEngagement[] = [];

  dataSource: any;
  beToUpdate: any;
  loadingIndicator: boolean = true;
  selectedAnnee: string = '';
  annees: number[] = [];

  
  pageOptions: any = {
    page: 0, 
    size: 20
  };

  // Données mockées pour les bons d'engagement
  private allBonEngagements: IBonEngagement[] = [];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.initializeAnnees();
    this.loadMockData();
    this.loadBonEngagements();
  }

  /**
   * Initialise la liste des années disponibles
   */
  initializeAnnees() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 5; i--) {
      this.annees.push(i);
    }
  }

  /**
   * Charge les données mockées depuis MOCK_BUDGET_NEW
   */
  loadMockData() {
    // Extraire tous les BE du budget mock
    this.allBonEngagements = this.extractAllBonEngagements(MOCK_BUDGET_NEW);
  }
  

  /**
   * Extrait tous les bons d'engagement d'un budget
   */
  private extractAllBonEngagements(budget: any): IBonEngagement[] {
    const allBE: IBonEngagement[] = [];
    
    if (budget.rubriques) {
      budget.rubriques.forEach((rubrique: any) => {
        if (rubrique.lignes) {
          rubrique.lignes.forEach((ligne: any) => {
            if (ligne.bonEngagements && ligne.bonEngagements.length > 0) {
              allBE.push(...ligne.bonEngagements);
            }
          });
        }
      });
    }
    
    return allBE;
  }

  /**
   * Charge et affiche les bons d'engagement avec filtres et pagination
   */
  loadBonEngagements() {
    this.loadingIndicator = true;

    // Simuler un délai de chargement
    setTimeout(() => {
      let filteredBE = [...this.allBonEngagements];

      // Filtrer par année si sélectionnée
      if (this.selectedAnnee) {
        filteredBE = filteredBE.filter(be => {
          const beYear = new Date(be.date).getFullYear();
          return beYear.toString() === this.selectedAnnee;
        });
      }

      // Pagination
      const startIndex = this.pageOptions.page * this.pageOptions.size;
      const endIndex = startIndex + this.pageOptions.size;
      const paginatedData = filteredBE.slice(startIndex, endIndex);

      this.dataSource = {
        payload: paginatedData,
        metadata: {
          totalElements: filteredBE.length
        }
      };

      this.loadingIndicator = false;
    }, 300);
  }

  /**
   * Gestion du changement d'année
   */
  onAnneeChange() {
    this.pageOptions.page = 0;
    this.loadBonEngagements();
  }

  /**
   * Ouvre un modal
   */
  openBasicModal(content: TemplateRef<any>, size?: any, be?: any) {
    this.beToUpdate = be;
    this.modalService
      .open(content, { size: size, backdrop: 'static' })
      .result.then((result) => {
        this.modalService.dismissAll();
      })
      .catch((res) => { });
  }

  /**
   * Ferme le modal et recharge les données
   */
  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      this.loadMockData();
      this.loadBonEngagements();
    }
  }

  /**
   * Supprime un bon d'engagement
   */
  delete(beId: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimer ce bon d\'engagement ?',
      'Cette action est irréversible',
      () => {
        // VERSION MOCK
        this.allBonEngagements = this.allBonEngagements.filter(be => be.id !== beId);
        Alertes.alerteDeleteSuccess();
        this.loadBonEngagements();
      }
    );
  }

  /**
   * Recherche
   */
  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    this.modalService.dismissAll();
    this.loadBonEngagements();
  }

  /**
   * Pagination
   */
  paginate($event: any) {
    this.loadingIndicator = true;
    this.pageOptions.page = $event - 1;
    this.loadBonEngagements();
  }

  /**
   * Voir les détails d'un BE
   */
  voirDetails(be: any) {
    this.beToUpdate = be;
    console.log('Détails BE:', be);
  }

/**
 * Suivi Investissement
 */
suiviInvestissement(be: any) {
  console.log('Suivi Investissement pour BE:', be.numero_BE);
  
  // ✅ Correction : utiliser le bon chemin de route
  this.router.navigate(['/admin/acces/controle/bonengagement/suivie-investissement', be.id], {
    queryParams: { 
      ligneBudgetaireId: be.ligneBudgetaireId,
      type: 'investissement' 
    }
  });
}

/**
 * Suivi Fonctionnement
 */
suiviFonctionnement(be: any) {
  console.log('Suivi Fonctionnement pour BE:', be.numero_BE);
  
  // ✅ Correction : utiliser le bon chemin de route
  this.router.navigate(['/admin/acces/controle/bonengagement/suivie-fonctionnement', be.id], {
    queryParams: { 
      ligneBudgetaireId: be.ligneBudgetaireId,
      type: 'fonctionnement' 
    }
  });
}

  /**
   * Télécharger le document
   */
  telechargerDocument(be: any) {
    console.log('Téléchargement document pour BE:', be.numero_BE);
    Alertes.alerteAddSuccess(`Téléchargement du document BE_${be.numero_BE}.pdf`);
  }

  /**
   * Export Excel
   */
  exportToExcel() {
    console.log('Export Excel des bons d\'engagement');
    
    // Préparer les données pour l'export
    const dataToExport = this.allBonEngagements.map(be => ({
      'N° Bon': be.numero_bon,
      'Date': new Date(be.date).toLocaleDateString('fr-FR'),
      'N° BE': be.numero_BE,
      'N° Mandat': be.numero_mandat,
      'Type': be.type,
      'Description': be.description,
      'Montant': be.montant,
      'Montant Formaté': this.formatMontant(be.montant),
      'Statut': this.getStatutLabel(be.statut),
      'Factures/États': be.facturesEtats || 'N/A'
    }));

    console.log('Données à exporter:', dataToExport);
    
    const message = `${dataToExport.length} bon(s) d'engagement prêt(s) pour export`;
    Alertes.alerteAddSuccess(message);
    
    // TODO: Implémenter l'export Excel avec xlsx
    // npm install xlsx
    // import * as XLSX from 'xlsx';
    /*
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bons Engagement');
    
    const fileName = `BE_${this.selectedAnnee || 'tous'}_${new Date().getTime()}.xlsx`;
    XLSX.writeFile(wb, fileName);
    */
  }

  // ==========================================================================
  // MÉTHODES DE FORMATAGE
  // ==========================================================================

  /**
   * Formate un montant en millions/milliards de FCFA
   */
  formatMontant(montant: number): string {
    if (montant >= 1000000000) {
      return `${(montant / 1000000000).toFixed(2)} Mds FCFA`;
    }
    return `${(montant / 1000000).toFixed(1)}M FCFA`;
  }

  /**
   * Obtient la classe CSS pour le badge de type
   */
  getTypeBadgeClass(type: string): string {
    switch (type) {
      case 'INVESTISSEMENT':
        return 'text-bg-info';
      case 'FONCTIONNEMENT':
        return 'text-bg-primary';
      default:
        return 'text-bg-secondary';
    }
  }

  /**
   * Obtient la classe CSS pour le badge de statut
   */
  getStatutBadgeClass(statut: string): string {
    switch (statut) {
      case 'VALIDE':
      case 'REALISE':
        return 'text-bg-success';
      case 'EN_ATTENTE':
        return 'text-bg-warning';
      case 'REJETE':
        return 'text-bg-danger';
      default:
        return 'text-bg-secondary';
    }
  }

  /**
   * Obtient le label français pour un statut
   */
  getStatutLabel(statut: string): string {
    const labels: Record<string, string> = {
      'VALIDE': 'Validé',
      'REALISE': 'Réalisé',
      'EN_ATTENTE': 'En attente',
      'REJETE': 'Rejeté'
    };
    return labels[statut] || statut;
  }
}