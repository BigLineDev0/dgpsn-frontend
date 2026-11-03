import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconDirective } from '@core/feather-icon/feather-icon.directive';

interface Rapprochement {
  id: string;
  date: Date;
  periode: string;
  compte: string;
  libelle: string;
  montantComptable: number;
  montantBudgetaire: number;
  ecart: number;
  ecartPourcentage: number;
  statut: 'RECONCILIE' | 'EN_COURS' | 'ECART_DETECTE' | 'EN_ATTENTE';
  commentaire?: string;
  responsable?: string;
}

@Component({
  selector: 'app-rapprochement',
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
  templateUrl: './raprochement.component.html',
  styleUrl: './raprochement.component.scss'
})
export class RapprochementComponent implements OnInit {

  displayedColumns: string[] = [
    'periode',
    'compte',
    'libelle',
    'montantComptable',
    'montantBudgetaire',
    'ecart',
    'statut',
    'actions'
  ];

  // Données mockées
  private allRapprochements: Rapprochement[] = [
    {
      id: 'RAP-001',
      date: new Date('2025-01-15'),
      periode: 'Janvier 2025',
      compte: '601111',
      libelle: 'Salaires personnel permanent',
      montantComptable: 15000000,
      montantBudgetaire: 15000000,
      ecart: 0,
      ecartPourcentage: 0,
      statut: 'RECONCILIE',
      responsable: 'Amadou DIOP'
    },
    {
      id: 'RAP-002',
      date: new Date('2025-01-15'),
      periode: 'Janvier 2025',
      compte: '601112',
      libelle: 'Personnel détaché',
      montantComptable: 8700000,
      montantBudgetaire: 8500000,
      ecart: 200000,
      ecartPourcentage: 2.35,
      statut: 'ECART_DETECTE',
      commentaire: 'Heures supplémentaires non budgétées',
      responsable: 'Fatou SALL'
    },
    {
      id: 'RAP-003',
      date: new Date('2025-01-15'),
      periode: 'Janvier 2025',
      compte: '601113',
      libelle: 'Cotisations sociales',
      montantComptable: 1200000,
      montantBudgetaire: 1200000,
      ecart: 0,
      ecartPourcentage: 0,
      statut: 'RECONCILIE',
      responsable: 'Moussa NDIAYE'
    },
    {
      id: 'RAP-004',
      date: new Date('2025-01-15'),
      periode: 'Janvier 2025',
      compte: '602100',
      libelle: 'Fournitures de bureau',
      montantComptable: 0,
      montantBudgetaire: 2500000,
      ecart: -2500000,
      ecartPourcentage: -100,
      statut: 'EN_ATTENTE',
      commentaire: 'Commande en cours, livraison en février',
      responsable: 'Aminata BA'
    },
    {
      id: 'RAP-005',
      date: new Date('2025-01-15'),
      periode: 'Janvier 2025',
      compte: '606100',
      libelle: 'Frais de mission',
      montantComptable: 3200000,
      montantBudgetaire: 3000000,
      ecart: 200000,
      ecartPourcentage: 6.67,
      statut: 'ECART_DETECTE',
      commentaire: 'Mission urgente non prévue',
      responsable: 'Cheikh FALL'
    },
    {
      id: 'RAP-006',
      date: new Date('2025-01-15'),
      periode: 'Janvier 2025',
      compte: '605200',
      libelle: 'Entretien et maintenance',
      montantComptable: 1450000,
      montantBudgetaire: 1500000,
      ecart: -50000,
      ecartPourcentage: -3.33,
      statut: 'RECONCILIE',
      responsable: 'Awa THIAM'
    },
    {
      id: 'RAP-007',
      date: new Date('2025-01-15'),
      periode: 'Janvier 2025',
      compte: '621100',
      libelle: 'Personnel intérimaire',
      montantComptable: 0,
      montantBudgetaire: 0,
      ecart: 0,
      ecartPourcentage: 0,
      statut: 'RECONCILIE',
      responsable: 'Ibrahima SARR'
    },
    {
      id: 'RAP-008',
      date: new Date('2025-01-15'),
      periode: 'Janvier 2025',
      compte: '625000',
      libelle: 'Déplacements et hébergements',
      montantComptable: 850000,
      montantBudgetaire: 800000,
      ecart: 50000,
      ecartPourcentage: 6.25,
      statut: 'EN_COURS',
      commentaire: 'Justificatifs en cours de vérification',
      responsable: 'Marieme SECK'
    }
  ];

  dataSource: any;
  loadingIndicator: boolean = false;

  // Filtres
  selectedStatut: string = '';
  selectedPeriode: string = '';
  searchQuery: string = '';

  periodeOptions: string[] = ['Janvier 2025', 'Décembre 2024', 'Novembre 2024'];
  statutOptions = [
    { value: 'RECONCILIE', label: 'Réconcilié' },
    { value: 'EN_COURS', label: 'En cours' },
    { value: 'ECART_DETECTE', label: 'Écart détecté' },
    { value: 'EN_ATTENTE', label: 'En attente' }
  ];

  pageOptions: any = {
    page: 0,
    size: 10
  };

  // KPIs
  stats = {
    totalRapproche: 0,
    totalEcarts: 0,
    tauxRapprochement: 0,
    nombreEcarts: 0
  };

  ngOnInit(): void {
    this.loadRapprochements();
    this.calculateStats();
  }

  loadRapprochements(): void {
    this.loadingIndicator = true;

    setTimeout(() => {
      let filtered = [...this.allRapprochements];

      if (this.selectedStatut) {
        filtered = filtered.filter(r => r.statut === this.selectedStatut);
      }

      if (this.selectedPeriode) {
        filtered = filtered.filter(r => r.periode === this.selectedPeriode);
      }

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(r =>
          r.compte.toLowerCase().includes(query) ||
          r.libelle.toLowerCase().includes(query)
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
    const reconcilies = this.allRapprochements.filter(r => r.statut === 'RECONCILIE');
    const ecarts = this.allRapprochements.filter(r => Math.abs(r.ecart) > 0);

    this.stats.totalRapproche = reconcilies.reduce((sum, r) => sum + r.montantComptable, 0);
    this.stats.totalEcarts = ecarts.reduce((sum, r) => sum + Math.abs(r.ecart), 0);
    this.stats.tauxRapprochement = (reconcilies.length / this.allRapprochements.length) * 100;
    this.stats.nombreEcarts = ecarts.length;
  }

  applyFilters(): void {
    this.pageOptions.page = 0;
    this.loadRapprochements();
  }

  clearFilters(): void {
    this.selectedStatut = '';
    this.selectedPeriode = '';
    this.searchQuery = '';
    this.pageOptions.page = 0;
    this.loadRapprochements();
  }

  paginate(page: number): void {
    this.pageOptions.page = page - 1;
    this.loadRapprochements();
  }

  voirDetails(rap: Rapprochement): void {
    const details = `
Compte: ${rap.compte}
Libellé: ${rap.libelle}
Période: ${rap.periode}

Montant Comptable: ${this.formatMontant(rap.montantComptable)}
Montant Budgétaire: ${this.formatMontant(rap.montantBudgetaire)}
Écart: ${this.formatMontant(rap.ecart)} (${rap.ecartPourcentage.toFixed(2)}%)

Responsable: ${rap.responsable || 'Non assigné'}
Commentaire: ${rap.commentaire || 'Aucun'}
    `;
    alert(details);
  }

  reconcilier(rap: Rapprochement): void {
    console.log('Réconciliation de:', rap.id);
    alert('Fonctionnalité de réconciliation en cours de développement');
  }

  formatMontant(montant: number): string {
    if (montant >= 1000000000) {
      return `${(montant / 1000000000).toFixed(2)} Mds FCFA`;
    }
    if (montant >= 1000000) {
      return `${(montant / 1000000).toFixed(2)}M FCFA`;
    }
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(montant);
  }

  getStatutBadgeClass(statut: string): string {
    const classes: Record<string, string> = {
      'RECONCILIE': 'text-bg-success',
      'EN_COURS': 'text-bg-warning',
      'ECART_DETECTE': 'text-bg-danger',
      'EN_ATTENTE': 'text-bg-secondary'
    };
    return classes[statut] || 'text-bg-secondary';
  }

  getStatutLabel(statut: string): string {
    const labels: Record<string, string> = {
      'RECONCILIE': 'Réconcilié',
      'EN_COURS': 'En cours',
      'ECART_DETECTE': 'Écart détecté',
      'EN_ATTENTE': 'En attente'
    };
    return labels[statut] || statut;
  }

  getEcartClass(ecart: number): string {
    if (ecart === 0) return 'text-success';
    if (Math.abs(ecart) < 100000) return 'text-warning';
    return 'text-danger';
  }
}