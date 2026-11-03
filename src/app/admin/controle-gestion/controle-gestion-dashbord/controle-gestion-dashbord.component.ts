import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'; // Utilisation des tooltips comme dans les autres composants
import {  IDepense, IDette, IMarche, IRecette } from '../data/cg/cg-data.model';
import { ControleGestionMockService } from '../data/cg/cg-data.service';
import { Alertes } from '@/app/util/alerte';

@Component({
  selector: 'app-controle-gestion-dashbord',
  standalone: true,
  imports: [
    CommonModule,
    NgbTooltipModule // Pour les tooltips si nécessaire
    // Ajoutez d'autres modules si nécessaire (ex: Material components pour les tables/icônes)
  ],
  templateUrl: './controle-gestion-dashbord.component.html',
  styleUrls: ['./controle-gestion-dashbord.component.scss'] // Utilisation du style générique du dashboard
})
export class ControleGestionDashbordComponent implements OnInit, AfterViewInit, OnDestroy {

  // Références aux canvas pour les graphiques
  @ViewChild('recetteChartCanvas') recetteChartCanvas!: ElementRef;
  @ViewChild('depenseChartCanvas') depenseChartCanvas!: ElementRef;
  @ViewChild('marcheStatusChartCanvas') marcheStatusChartCanvas!: ElementRef;
  
  private recetteChart!: Chart;
  private depenseChart!: any;
  private marcheStatusChart!: Chart;

  // Données des rapports
  recettesData: IRecette[] = [];
  depensesData: IDepense[] = [];
  dettesData: IDette[] = [];
  marchesData: IMarche[] = [];

  // Indicateurs de Performance (Basé sur les exigences DGPSN et les données mockées)
  statCards: any[] = [];
  
  private isChartInitialized = false;

  constructor(private cgService: ControleGestionMockService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadDashboardData();
    this.initStatCards();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initCharts();
      this.isChartInitialized = true;
    }, 1000);
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }

  /**
   * Chargement des données mockées du service de Contrôle de Gestion
   */
  loadDashboardData(): void {
    this.recettesData = this.cgService.getAllRecettes();
    this.depensesData = this.cgService.getAllDepenses();
    this.dettesData = this.cgService.getAllDettes();
    this.marchesData = this.cgService.getAllMarches();
  }

    exportDashboardData(): void {
      // Le comportement est basé sur l'exemple AgentDashbordComponent [1]
      Alertes.success('Export des données du Contrôle de Gestion en cours...');
      // Dans une application réelle, on ferait ici appel à un service pour générer un fichier (CSV, PDF, XLSX)
  }
  /**
   * Initialisation des cartes statistiques (KPIs)
   */
  initStatCards(): void {
    const totalRecettes = this.cgService.getTotalRecettesExecutees(); 
    const totalDepenses = this.cgService.getTotalDepensesExecutees(); // Réalisations T2 [4]
    const totalMarchesFinalises = this.marchesData.filter(m => m.type === 'FINALISE').length;
    const totalMarchesEnCours = this.marchesData.filter(m => m.type === 'EN_COURS').length;
    
    // Calcul de l'engagement total des dettes (instances)
    const totalDettes = this.dettesData.reduce((sum, dette) => sum + (dette.montantDu || 0), 0);
    // Le montant des créances est estimé à 164 220 431 FCFA [6]
    const totalCreances = 164220431; 

    // Calcul du taux d'exécution budgétaire au 30/06/2025 (TOTAL DEPENSES) [4]
    const totalDepenseRow = this.depensesData.find(d => d.libelle === 'TOTAL DEPENSES');
    const tauxExecutionT2 = totalDepenseRow ? parseFloat(totalDepenseRow.tr2.replace('%', '')) : 0;
    
    this.statCards = [
      {
        label: 'Taux Exécution Dépenses (T2)',
        value: `${tauxExecutionT2}%`,
        icon: 'feather icon-trending-up',
        iconClass: 'icon-primary',
        trend: totalDepenseRow?.tr2, // 44% [4]
        trendIcon: 'feather icon-arrow-up',
        trendClass: 'trend-up'
      },
      {
        label: 'Recettes Réalisées (T2)',
        value: this.formatMontant(totalRecettes),
        icon: 'feather icon-dollar-sign',
        iconClass: 'icon-success',
        trend: '10.6 Md FCFA', // Montant issu de [7]
        trendIcon: 'feather icon-arrow-up',
        trendClass: 'trend-up'
      },
      {
        label: 'Marchés en Cours',
        value: totalMarchesEnCours.toString(),
        icon: 'feather icon-folder',
        iconClass: 'icon-warning',
        trend: '+2 nouveaux',
        trendIcon: 'feather icon-arrow-up',
        trendClass: 'trend-up'
      }
    ];
  }
  
  // Utilitaire pour formater le montant (emprunté au composant Budget [14])
  formatMontant(montant: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(montant);
  }

  // --- Initialisation des graphiques (Utilisation du design des graphiques existants) ---

  initCharts(): void {
    this.initRecetteChart();
    this.initDepenseChart();
    this.initMarcheStatusChart();
  }

  destroyCharts(): void {
    if (this.recetteChart) this.recetteChart.destroy();
    if (this.depenseChart) this.depenseChart.destroy();
    if (this.marcheStatusChart) this.marcheStatusChart.destroy();
  }

  /**
   * Graphique des Recettes par Type (similaire à Direction/Doughnut [15])
   */
  initRecetteChart(): void {
    if (!this.recetteChartCanvas?.nativeElement) return;
    const ctx = this.recetteChartCanvas.nativeElement.getContext('2d');
    
    const labels = this.recettesData.map(r => r.libelle);
    const data = this.recettesData.map(r => r.realisations30062025);

    this.recetteChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            '#2E8B57', '#4facfe', '#f093fb', '#32CD32' // Couleurs similaires au design Agent
          ],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: { callbacks: { label: (c) => `${c.label}: ${this.formatMontant(c.raw as number)}` } }
        },
        cutout: '65%'
      }
    });
  }

  /**
   * Graphique des Dépenses de Fonctionnement (similaire à Evolution Recrutement/Ligne [16])
   */
  initDepenseChart(): void {
    if (!this.depenseChartCanvas?.nativeElement) return;
    const ctx = this.depenseChartCanvas.nativeElement.getContext('2d');
    
    const chargesGenerales = this.depensesData.find(d => d.libelle === 'Charges à caractère général');
    const chargesPersonnel = this.depensesData.find(d => d.libelle === 'Charges de personnel');

    this.depenseChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['T1 (Mar)', 'T2 (Juin)', 'T3 (Sep)'],
        datasets: [
          {
            label: 'Charges Générales (FCFA)',
            data: [
              chargesGenerales?.realisationsT1, 
              chargesGenerales?.realisationsT2, 
              chargesGenerales?.realisationsT3
            ],
            borderColor: '#4e73df', // Couleur primaire
            backgroundColor: 'rgba(78, 115, 223, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
          },
          {
            label: 'Charges de Personnel (FCFA)',
            data: [
              chargesPersonnel?.realisationsT1, 
              chargesPersonnel?.realisationsT2, 
              chargesPersonnel?.realisationsT3
            ],
            borderColor: '#1cc88a', // Couleur succès
            backgroundColor: 'rgba(28, 200, 138, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { callback: (value) => this.formatMontant(value as number) }
          }
        }
      }
    });
  }
  
  /**
   * Graphique Statut des Marchés (similaire à Taux d'Exécution Projet/Bar [17])
   */
  initMarcheStatusChart(): void {
    if (!this.marcheStatusChartCanvas?.nativeElement) return;
    const ctx = this.marcheStatusChartCanvas.nativeElement.getContext('2d');
    
    const statusCounts = this.marchesData.reduce((acc: any, marche) => {
        acc[marche.type] = (acc[marche.type] || 0) + 1;
        return acc;
    }, {});
    
    this.marcheStatusChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Finalisés', 'En Cours', 'A Lancer'],
        datasets: [{
          label: 'Nombre de Dossiers',
          data: [statusCounts.FINALISE, statusCounts.EN_COURS, statusCounts.A_LANCER],
          backgroundColor: ['#1cc88a', '#f6c23e', '#e74a3b'],
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true } }
      }
    });
  }
  
  getMarcheStatusClass(type: string): string {
    switch (type) {
      case 'FINALISE': return 'bg-success';
      case 'EN_COURS': return 'bg-warning';
      case 'A_LANCER': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
  
  getDetteStatusClass(statut: string): string {
    if (statut.includes('Facture')) return 'bg-info';
    if (statut.includes('Engagement') || statut.includes('Ordonnancement')) return 'bg-warning';
    return 'bg-secondary';
  }
}