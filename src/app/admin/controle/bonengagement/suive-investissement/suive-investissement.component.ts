import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { IBonEngagement, ILigneBudgetaire, MOCK_BUDGET_NEW } from '@/app/admin/finance/data/new.model';

interface InvestissementStats {
  budgetPrimitif: number;
  totalRealisation: number;
  creditDisponible: number;
  tauxExecution: number;
  bonEngagements: IBonEngagement[];
  ligneBudgetaire?: ILigneBudgetaire;
}

@Component({
  selector: 'app-suive-investissement',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  templateUrl: './suive-investissement.component.html',
  styleUrl: './suive-investissement.component.scss'
})
export class SuiveInvestissementComponent implements OnInit {
  
  @Input() ligneBudgetaireId?: string;
  @Input() beId?: string;

  // Pour la navigation
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  beIdFromRoute = signal<string>('');
  ligneBudgetaireIdFromRoute = signal<string>('');

  stats: InvestissementStats = {
    budgetPrimitif: 0,
    totalRealisation: 0,
    creditDisponible: 0,
    tauxExecution: 0,
    bonEngagements: []
  };

  displayedColumns: string[] = ['numero_BE', 'date', 'description', 'montant', 'statut'];

  ngOnInit(): void {
    // Récupérer les paramètres de la route
    this.route.params.subscribe(params => {
      const beId = params['beId'];
      if (beId) {
        this.beIdFromRoute.set(beId);
        this.beId = beId;
      }
    });

    this.route.queryParams.subscribe(params => {
      if (params['ligneBudgetaireId']) {
        this.ligneBudgetaireIdFromRoute.set(params['ligneBudgetaireId']);
        this.ligneBudgetaireId = params['ligneBudgetaireId'];
      }
    });

    this.loadData();
  }

  /**
   * Retour à la liste des bons d'engagement
   */
  goBack() {
    this.router.navigate(['/admin/acces/controle/suiviebudgets']);
  }

  /**
   * Charge les données depuis le mock
   */
  loadData() {
    if (!this.ligneBudgetaireId) {
      this.loadAllInvestissements();
    } else {
      this.loadLigneBudgetaire();
    }
  }

  /**
   * Charge tous les bons d'engagement de type INVESTISSEMENT
   */
  loadAllInvestissements() {
    const allBE: IBonEngagement[] = [];
    let totalBudget = 0;

    MOCK_BUDGET_NEW.rubriques?.forEach(rubrique => {
      rubrique.lignes?.forEach(ligne => {
        if (ligne.bonEngagements) {
          const investissements = ligne.bonEngagements.filter(
            be => be.type === 'INVESTISSEMENT'
          );
          allBE.push(...investissements);
          
          if (investissements.length > 0) {
            totalBudget += ligne.montant;
          }
        }
      });
    });

    this.calculateStats(totalBudget, allBE);
  }

  /**
   * Charge une ligne budgétaire spécifique
   */
  loadLigneBudgetaire() {
    let ligneTrouvee: ILigneBudgetaire | undefined;

    MOCK_BUDGET_NEW.rubriques?.forEach(rubrique => {
      const ligne = rubrique.lignes?.find(l => l.id === this.ligneBudgetaireId);
      if (ligne) {
        ligneTrouvee = ligne;
      }
    });

    if (ligneTrouvee) {
      const investissements = ligneTrouvee.bonEngagements?.filter(
        be => be.type === 'INVESTISSEMENT'
      ) || [];

      this.stats.ligneBudgetaire = ligneTrouvee;
      this.calculateStats(ligneTrouvee.montant, investissements);
    }
  }

  /**
   * Calcule les statistiques
   */
  calculateStats(budgetPrimitif: number, bonEngagements: IBonEngagement[]) {
    this.stats.budgetPrimitif = budgetPrimitif;
    this.stats.bonEngagements = bonEngagements;
    
    this.stats.totalRealisation = bonEngagements
      .filter(be => be.statut === 'VALIDE' || be.statut === 'REALISE')
      .reduce((sum, be) => sum + be.montant, 0);

    this.stats.creditDisponible = this.stats.budgetPrimitif - this.stats.totalRealisation;

    this.stats.tauxExecution = this.stats.budgetPrimitif > 0 
      ? (this.stats.totalRealisation / this.stats.budgetPrimitif) * 100 
      : 0;
  }

  /**
   * Formate un montant
   */
  formatMontant(montant: number): string {
    if (montant >= 1000000000) {
      return `${(montant / 1000000000).toFixed(2)} Mds FCFA`;
    }
    return `${(montant / 1000000).toFixed(2)}M FCFA`;
  }

  /**
   * Obtient la couleur du taux d'exécution
   */
  getTauxColor(): string {
    if (this.stats.tauxExecution >= 80) return '#10b981';
    if (this.stats.tauxExecution >= 50) return '#f59e0b';
    return '#ef4444';
  }

  /**
   * Obtient la classe du badge de statut
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
   * Obtient le label du statut
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