import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { 
  Chart, 
  ChartConfiguration, 
  registerables,
  ChartType,
  DoughnutControllerChartOptions 
} from 'chart.js';

// Enregistrer tous les composants de Chart.js
Chart.register(...registerables);

interface KPI {
  label: string;
  value: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
}

interface EvolutionData {
  mois: string;
  engagement: number;
  realisation: number;
}

interface RepartitionData {
  label: string;
  value: number;
  color: string;
}

interface Alerte {
  type: 'warning' | 'info';
  titre: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-statistique',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './statistique.component.html',
  styleUrl: './statistique.component.scss'
})
export class StatistiqueComponent implements OnInit {

  // KPIs principaux
  kpis: KPI[] = [
    {
      label: 'Budget Total',
      value: '1.5 Mds FCFA',
      icon: 'account_balance',
      iconBgColor: '#dbeafe',
      iconColor: '#3b82f6'
    },
    {
      label: 'Engagements',
      value: '50.5M FCFA',
      icon: 'receipt_long',
      iconBgColor: '#d1fae5',
      iconColor: '#10b981'
    },
    {
      label: 'Taux Exécution',
      value: '45.2%',
      icon: 'trending_up',
      iconBgColor: '#e9d5ff',
      iconColor: '#9333ea'
    },
    {
      label: 'Crédit Disponible',
      value: '27M FCFA',
      icon: 'check_circle',
      iconBgColor: '#fed7aa',
      iconColor: '#f97316'
    }
  ];

  // Données d'évolution mensuelle
  evolutionData: EvolutionData[] = [
    { mois: 'Jan', engagement: 8000000, realisation: 6000000 },
    { mois: 'Fév', engagement: 12000000, realisation: 9000000 },
    { mois: 'Mar', engagement: 0, realisation: 0 }
  ];

  // Données de répartition budgétaire
  repartitionData: RepartitionData[] = [
    { label: 'Fonctionnement', value: 65, color: '#10b981' },
    { label: 'Investissement', value: 20, color: '#3b82f6' },
    { label: 'Réserve', value: 15, color: '#f59e0b' }
  ];

  // Alertes budgétaires
  alertes: Alerte[] = [
    {
      type: 'warning',
      titre: 'Taux d\'exécution élevé - Dons et subventions',
      description: 'Budget exécuté à 100% - Crédit disponible: 0 FCFA',
      icon: 'warning'
    },
    {
      type: 'info',
      titre: 'Engagement en attente de validation',
      description: 'BE 002 - indemnités départ à la retraite (12M FCFA)',
      icon: 'info'
    }
  ];

  private evolutionChart?: Chart;
  private repartitionChart?: Chart;
@Input() budgetPrimitif: number = 1500000000;
@Input() bonEngagements: any[] = [];
  ngOnInit(): void {
    // Attendre que le DOM soit chargé
    setTimeout(() => {
      this.createEvolutionChart();
      this.createRepartitionChart();
    }, 100);
  }

  ngOnDestroy(): void {
    // Détruire les graphiques pour éviter les fuites mémoire
    if (this.evolutionChart) {
      this.evolutionChart.destroy();
    }
    if (this.repartitionChart) {
      this.repartitionChart.destroy();
    }
  }

  /**
   * Crée le graphique d'évolution mensuelle
   */
  private createEvolutionChart(): void {
    const canvas = document.getElementById('evolutionChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: this.evolutionData.map(d => d.mois),
        datasets: [
          {
            label: 'Engagement',
            data: this.evolutionData.map(d => d.engagement),
            backgroundColor: '#3b82f6',
            borderRadius: 8,
            barThickness: 80
          },
          {
            label: 'Réalisation',
            data: this.evolutionData.map(d => d.realisation),
            backgroundColor: '#10b981',
            borderRadius: 8,
            barThickness: 80
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 12
              }
            }
          },
            tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.parsed.y ?? 0;
                const formatted = this.formatMontant(value);
                return `${context.dataset.label}: ${formatted}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (tickValue) => {
                // ✅ Correction : vérifier que tickValue est un nombre
                if (typeof tickValue === 'number') {
                  return this.formatMontantCourt(tickValue);
                }
                return tickValue;
              }
            },
            grid: {
              color: '#e5e7eb'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    };

    this.evolutionChart = new Chart(ctx, config);
  }

  /**
   * Crée le graphique de répartition budgétaire (camembert)
   */
  private createRepartitionChart(): void {
    const canvas = document.getElementById('repartitionChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ✅ Correction : Typage correct pour doughnut avec cutout
    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: this.repartitionData.map(d => `${d.label} ${d.value}%`),
        datasets: [{
          data: this.repartitionData.map(d => d.value),
          backgroundColor: this.repartitionData.map(d => d.color),
          borderWidth: 0,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // ✅ Correction : cutout dans les options au bon endroit
        cutout: '65%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 13
              },
              generateLabels: (chart) => {
                const data = chart.data;
                if (data.labels && data.datasets.length) {
                  return data.labels.map((label, i) => ({
                    text: label as string,
                    fillStyle: this.repartitionData[i].color,
                    hidden: false,
                    index: i
                  }));
                }
                return [];
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = this.repartitionData[context.dataIndex].label;
                const value = context.parsed;
                return `${label}: ${value}%`;
              }
            }
          }
        }
      }
    };

    this.repartitionChart = new Chart(ctx, config);
  }

  /**
   * Formate un montant en notation courte
   */
  formatMontantCourt(montant: number): string {
    if (montant >= 1000000000) {
      return `${(montant / 1000000000).toFixed(1)}Mds`;
    }
    if (montant >= 1000000) {
      return `${(montant / 1000000).toFixed(0)}M`;
    }
    if (montant >= 1000) {
      return `${(montant / 1000).toFixed(0)}K`;
    }
    return montant.toString();
  }

  /**
   * Formate un montant complet
   */
  formatMontant(montant: number): string {
    if (montant >= 1000000000) {
      return `${(montant / 1000000000).toFixed(2)} Mds FCFA`;
    }
    if (montant >= 1000000) {
      return `${(montant / 1000000).toFixed(1)}M FCFA`;
    }
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(montant);
  }

  /**
   * Obtient la classe CSS pour les alertes
   */
  getAlerteClass(type: string): string {
    return type === 'warning' ? 'border-warning' : 'border-info';
  }

  /**
   * Obtient la classe CSS pour l'icône d'alerte
   */
  getAlerteIconClass(type: string): string {
    return type === 'warning' ? 'text-warning' : 'text-info';
  }
}