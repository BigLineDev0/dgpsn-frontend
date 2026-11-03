import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IBonEngagement, ILigneBudgetaire, MOCK_BUDGET_NEW } from '@/app/admin/finance/data/new.model';
import { ActivatedRoute, Router } from '@angular/router';

interface FonctionnementStats {
  budgetPrimitif: number;
  totalRealisation: number;
  creditDisponible: number;
  progression: number;
  bonEngagements: IBonEngagement[];
  ligneBudgetaire?: ILigneBudgetaire;
}

@Component({
  selector: 'app-suive-fonctionnement',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './suive-fonctionnement.component.html',
  styleUrl: './suive-fonctionnement.component.scss'
})
export class SuiveFonctionnementComponent implements OnInit {
  
  @Input() ligneBudgetaireId?: string;
  @Input() beId?: string;
    private router = inject(Router);
  private route = inject(ActivatedRoute);
  
  beIdFromRoute = signal<string>('');
  ligneBudgetaireIdFromRoute = signal<string>('');

  stats: FonctionnementStats = {
    budgetPrimitif: 0,
    totalRealisation: 0,
    creditDisponible: 0,
    progression: 0,
    bonEngagements: []
  };

  displayedColumns: string[] = ['numero_BE', 'date', 'description', 'montant', 'statut'];

  ngOnInit(): void {
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

  goBack() {
    this.router.navigate(['/admin/acces/controle/suiviebudgets']);
  }

  /**
   * Charge les données depuis le mock
   */
  loadData() {
    if (!this.ligneBudgetaireId) {
      this.loadAllFonctionnement();
    } else {
      this.loadLigneBudgetaire();
    }
  }

  /**
   * Charge tous les bons d'engagement de type FONCTIONNEMENT
   */
  loadAllFonctionnement() {
    const allBE: IBonEngagement[] = [];
    let totalBudget = 0;

    MOCK_BUDGET_NEW.rubriques?.forEach(rubrique => {
      rubrique.lignes?.forEach(ligne => {
        if (ligne.bonEngagements) {
          const fonctionnements = ligne.bonEngagements.filter(
            be => be.type === 'FONCTIONNEMENT'
          );
          allBE.push(...fonctionnements);
          
          if (fonctionnements.length > 0) {
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
      const fonctionnements = ligneTrouvee.bonEngagements?.filter(
        be => be.type === 'FONCTIONNEMENT'
      ) || [];

      this.stats.ligneBudgetaire = ligneTrouvee;
      this.calculateStats(ligneTrouvee.montant, fonctionnements);
    }
  }

  /**
   * Calcule les statistiques
   */
  calculateStats(budgetPrimitif: number, bonEngagements: IBonEngagement[]) {
    this.stats.budgetPrimitif = budgetPrimitif;
    this.stats.bonEngagements = bonEngagements;
    
    // Total des réalisations
    this.stats.totalRealisation = bonEngagements
      .filter(be => be.statut === 'VALIDE' || be.statut === 'REALISE')
      .reduce((sum, be) => sum + be.montant, 0);

    // Crédit disponible
    this.stats.creditDisponible = this.stats.budgetPrimitif - this.stats.totalRealisation;

    // Progression (même que taux d'exécution mais appelé différemment)
    this.stats.progression = this.stats.budgetPrimitif > 0 
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
   * Obtient la couleur de la progression
   */
  getProgressionColor(): string {
    if (this.stats.progression >= 80) return 'success';
    if (this.stats.progression >= 50) return 'warning';
    return 'danger';
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
  /**
 * Obtient la classe du badge de progression
 */
getProgressionBadgeClass(): string {
  if (this.stats.progression >= 80) return 'text-success';
  if (this.stats.progression >= 50) return 'text-warning';
  return 'text-danger';
}

/**
 * Obtient la classe text de la progression
 */
getProgressionTextClass(): string {
  if (this.stats.progression >= 80) return 'text-success';
  if (this.stats.progression >= 50) return 'text-warning';
  return 'text-danger';
}

/**
 * Obtient la classe de la barre de progression
 */
getProgressionBarClass(): string {
  if (this.stats.progression >= 80) return 'bg-success';
  if (this.stats.progression >= 50) return 'bg-warning';
  return 'bg-danger';
}
}