import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { NgbPaginationModule, NgbTooltipModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconDirective } from '@core/feather-icon/feather-icon.directive';

interface Risque {
  id: string;
  reference: string;
  dateIdentification: Date;
  categorie: 'BUDGETAIRE' | 'FINANCIER' | 'OPERATIONNEL' | 'REGLEMENTAIRE';
  description: string;
  probabilite: 'FAIBLE' | 'MOYENNE' | 'ELEVEE';
  impact: 'FAIBLE' | 'MOYEN' | 'ELEVE' | 'CRITIQUE';
  niveauRisque: 'FAIBLE' | 'MOYEN' | 'ELEVE' | 'CRITIQUE';
  statut: 'IDENTIFIE' | 'EN_COURS_TRAITEMENT' | 'ATTENUE' | 'RESOLU';
  mesuresAttenuation: string;
  responsable: string;
  echeance?: Date;
}

@Component({
  selector: 'app-risque',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatRippleModule,
    NgbPaginationModule,
    NgbTooltipModule,
    FeatherIconDirective
  ],
  templateUrl: './risque.component.html',
  styleUrl: './risque.component.scss'
})
export class RisqueComponent implements OnInit {

  displayedColumns: string[] = [
    'reference',
    'categorie',
    'description',
    'probabilite',
    'impact',
    'niveauRisque',
    'statut',
    'responsable',
    'actions'
  ];

  private allRisques: Risque[] = [
    {
      id: 'RSQ-001',
      reference: 'RSQ-2025-001',
      dateIdentification: new Date('2025-01-10'),
      categorie: 'BUDGETAIRE',
      description: 'Dépassement budgétaire sur les dépenses de personnel',
      probabilite: 'ELEVEE',
      impact: 'CRITIQUE',
      niveauRisque: 'CRITIQUE',
      statut: 'EN_COURS_TRAITEMENT',
      mesuresAttenuation: 'Mise en place d\'un contrôle hebdomadaire des engagements, gel des recrutements non essentiels',
      responsable: 'Amadou DIOP',
      echeance: new Date('2025-02-28')
    },
    {
      id: 'RSQ-002',
      reference: 'RSQ-2025-002',
      dateIdentification: new Date('2025-01-12'),
      categorie: 'FINANCIER',
      description: 'Retard de paiement des fournisseurs critiques',
      probabilite: 'MOYENNE',
      impact: 'ELEVE',
      niveauRisque: 'ELEVE',
      statut: 'IDENTIFIE',
      mesuresAttenuation: 'Priorisation des paiements, négociation de délais avec fournisseurs',
      responsable: 'Fatou SALL',
      echeance: new Date('2025-01-31')
    },
    {
      id: 'RSQ-003',
      reference: 'RSQ-2025-003',
      dateIdentification: new Date('2025-01-15'),
      categorie: 'OPERATIONNEL',
      description: 'Insuffisance de personnel pour les contrôles budgétaires',
      probabilite: 'MOYENNE',
      impact: 'MOYEN',
      niveauRisque: 'MOYEN',
      statut: 'ATTENUE',
      mesuresAttenuation: 'Formation du personnel existant, externalisation temporaire',
      responsable: 'Moussa NDIAYE',
      echeance: new Date('2025-03-15')
    },
    {
      id: 'RSQ-004',
      reference: 'RSQ-2025-004',
      dateIdentification: new Date('2025-01-08'),
      categorie: 'REGLEMENTAIRE',
      description: 'Non-conformité aux nouvelles règles de passation de marchés',
      probabilite: 'FAIBLE',
      impact: 'CRITIQUE',
      niveauRisque: 'ELEVE',
      statut: 'EN_COURS_TRAITEMENT',
      mesuresAttenuation: 'Formation équipe achats, audit des procédures en cours',
      responsable: 'Aminata BA',
      echeance: new Date('2025-02-15')
    },
    {
      id: 'RSQ-005',
      reference: 'RSQ-2025-005',
      dateIdentification: new Date('2025-01-18'),
      categorie: 'BUDGETAIRE',
      description: 'Sous-estimation des coûts de maintenance informatique',
      probabilite: 'ELEVEE',
      impact: 'MOYEN',
      niveauRisque: 'ELEVE',
      statut: 'IDENTIFIE',
      mesuresAttenuation: 'Révision budgétaire, recherche de solutions alternatives',
      responsable: 'Cheikh FALL',
      echeance: new Date('2025-02-28')
    },
    {
      id: 'RSQ-006',
      reference: 'RSQ-2024-012',
      dateIdentification: new Date('2024-12-20'),
      categorie: 'FINANCIER',
      description: 'Fluctuation des taux de change affectant les contrats internationaux',
      probabilite: 'MOYENNE',
      impact: 'ELEVE',
      niveauRisque: 'ELEVE',
      statut: 'RESOLU',
      mesuresAttenuation: 'Couverture de change mise en place, clauses de révision négociées',
      responsable: 'Awa THIAM',
      echeance: new Date('2025-01-15')
    },
    {
      id: 'RSQ-007',
      reference: 'RSQ-2025-006',
      dateIdentification: new Date('2025-01-20'),
      categorie: 'OPERATIONNEL',
      description: 'Système de gestion budgétaire obsolète',
      probabilite: 'FAIBLE',
      impact: 'MOYEN',
      niveauRisque: 'FAIBLE',
      statut: 'IDENTIFIE',
      mesuresAttenuation: 'Évaluation de nouveaux systèmes, planification migration',
      responsable: 'Ibrahima SARR',
      echeance: new Date('2025-06-30')
    },
    {
      id: 'RSQ-008',
      reference: 'RSQ-2025-007',
      dateIdentification: new Date('2025-01-22'),
      categorie: 'BUDGETAIRE',
      description: 'Augmentation imprévue des prix énergétiques',
      probabilite: 'MOYENNE',
      impact: 'ELEVE',
      niveauRisque: 'ELEVE',
      statut: 'EN_COURS_TRAITEMENT',
      mesuresAttenuation: 'Audit énergétique, mesures d\'économie, renégociation contrats',
      responsable: 'Marieme SECK',
      echeance: new Date('2025-03-31')
    }
  ];

  dataSource: any;
  loadingIndicator: boolean = false;

  // Filtres
  selectedCategorie: string = '';
  selectedNiveau: string = '';
  selectedStatut: string = '';
  searchQuery: string = '';

  categorieOptions = [
    { value: 'BUDGETAIRE', label: 'Budgétaire' },
    { value: 'FINANCIER', label: 'Financier' },
    { value: 'OPERATIONNEL', label: 'Opérationnel' },
    { value: 'REGLEMENTAIRE', label: 'Réglementaire' }
  ];

  niveauOptions = [
    { value: 'FAIBLE', label: 'Faible' },
    { value: 'MOYEN', label: 'Moyen' },
    { value: 'ELEVE', label: 'Élevé' },
    { value: 'CRITIQUE', label: 'Critique' }
  ];

  statutOptions = [
    { value: 'IDENTIFIE', label: 'Identifié' },
    { value: 'EN_COURS_TRAITEMENT', label: 'En cours' },
    { value: 'ATTENUE', label: 'Atténué' },
    { value: 'RESOLU', label: 'Résolu' }
  ];

  pageOptions: any = {
    page: 0,
    size: 10
  };

  // Stats
  stats = {
    totalRisques: 0,
    critiques: 0,
    enCours: 0,
    resolus: 0
  };

  ngOnInit(): void {
    this.loadRisques();
    this.calculateStats();
  }
  @Input() set pageSize(size: number) {
    this.pageOptions.size = size;
    this.loadRisques();
  }
  loadRisques(): void {
    this.loadingIndicator = true;

    setTimeout(() => {
      let filtered = [...this.allRisques];

      if (this.selectedCategorie) {
        filtered = filtered.filter(r => r.categorie === this.selectedCategorie);
      }

      if (this.selectedNiveau) {
        filtered = filtered.filter(r => r.niveauRisque === this.selectedNiveau);
      }

      if (this.selectedStatut) {
        filtered = filtered.filter(r => r.statut === this.selectedStatut);
      }

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(r =>
          r.reference.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.responsable.toLowerCase().includes(query)
        );
      }

      const startIndex = this.pageOptions.page * this.pageOptions.size;
      const endIndex = startIndex + this.pageOptions.size;
      const paginatedData = filtered.slice(startIndex, endIndex);

      this.dataSource = {
        payload: paginatedData,
        metadata: {
          totalElements: filtered.length
        }
      };

      this.loadingIndicator = false;
    }, 300);
  }

  calculateStats(): void {
    this.stats.totalRisques = this.allRisques.length;
    this.stats.critiques = this.allRisques.filter(r => r.niveauRisque === 'CRITIQUE').length;
    this.stats.enCours = this.allRisques.filter(r => r.statut === 'EN_COURS_TRAITEMENT').length;
    this.stats.resolus = this.allRisques.filter(r => r.statut === 'RESOLU').length;
  }

  applyFilters(): void {
    this.pageOptions.page = 0;
    this.loadRisques();
  }

  clearFilters(): void {
    this.selectedCategorie = '';
    this.selectedNiveau = '';
    this.selectedStatut = '';
    this.searchQuery = '';
    this.pageOptions.page = 0;
    this.loadRisques();
  }

  paginate(page: number): void {
    this.pageOptions.page = page - 1;
    this.loadRisques();
  }

  voirDetails(risque: Risque): void {
    const echeance = risque.echeance ? new Date(risque.echeance).toLocaleDateString('fr-FR') : 'Non définie';
    const details = `
Référence: ${risque.reference}
Catégorie: ${this.getCategorieLabel(risque.categorie)}
Date d'identification: ${new Date(risque.dateIdentification).toLocaleDateString('fr-FR')}

Description:
${risque.description}

Probabilité: ${this.getProbabiliteLabel(risque.probabilite)}
Impact: ${this.getImpactLabel(risque.impact)}
Niveau de risque: ${this.getNiveauLabel(risque.niveauRisque)}

Mesures d'atténuation:
${risque.mesuresAttenuation}

Responsable: ${risque.responsable}
Échéance: ${echeance}
Statut: ${this.getStatutLabel(risque.statut)}
    `;
    alert(details);
  }

  getNiveauBadgeClass(niveau: string): string {
    const classes: Record<string, string> = {
      'FAIBLE': 'text-bg-success',
      'MOYEN': 'text-bg-warning',
      'ELEVE': 'text-bg-danger',
      'CRITIQUE': 'bg-danger text-white'
    };
    return classes[niveau] || 'text-bg-secondary';
  }

  getStatutBadgeClass(statut: string): string {
    const classes: Record<string, string> = {
      'IDENTIFIE': 'text-bg-secondary',
      'EN_COURS_TRAITEMENT': 'text-bg-warning',
      'ATTENUE': 'text-bg-info',
      'RESOLU': 'text-bg-success'
    };
    return classes[statut] || 'text-bg-secondary';
  }

  getCategorieBadgeClass(categorie: string): string {
    const classes: Record<string, string> = {
      'BUDGETAIRE': 'text-bg-primary',
      'FINANCIER': 'text-bg-success',
      'OPERATIONNEL': 'text-bg-info',
      'REGLEMENTAIRE': 'text-bg-warning'
    };
    return classes[categorie] || 'text-bg-secondary';
  }

  getCategorieLabel(categorie: string): string {
    return this.categorieOptions.find(c => c.value === categorie)?.label || categorie;
  }

  getProbabiliteLabel(probabilite: string): string {
    const labels: Record<string, string> = {
      'FAIBLE': 'Faible',
      'MOYENNE': 'Moyenne',
      'ELEVEE': 'Élevée'
    };
    return labels[probabilite] || probabilite;
  }

  getImpactLabel(impact: string): string {
    const labels: Record<string, string> = {
      'FAIBLE': 'Faible',
      'MOYEN': 'Moyen',
      'ELEVE': 'Élevé',
      'CRITIQUE': 'Critique'
    };
    return labels[impact] || impact;
  }

  getNiveauLabel(niveau: string): string {
    return this.niveauOptions.find(n => n.value === niveau)?.label || niveau;
  }

  getStatutLabel(statut: string): string {
    return this.statutOptions.find(s => s.value === statut)?.label || statut;
  }
}