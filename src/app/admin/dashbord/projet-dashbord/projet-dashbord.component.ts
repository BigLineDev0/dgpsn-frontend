import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-projet-dashbord',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbTooltipModule
  ],
  templateUrl: './projet-dashbord.component.html',
  styleUrls: ['./projet-dashbord.component.scss']
})
export class ProjetDashbordComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('statusChartCanvas') statusChartCanvas!: ElementRef;
  @ViewChild('budgetChartCanvas') budgetChartCanvas!: ElementRef;
  @ViewChild('topProjetsChartCanvas') topProjetsChartCanvas!: ElementRef;
  @ViewChild('evolutionChartCanvas') evolutionChartCanvas!: ElementRef;
  @ViewChild('structureChartCanvas') structureChartCanvas!: ElementRef;
  @ViewChild('alertsChartCanvas') alertsChartCanvas!: ElementRef;

  totalProjets: number = 0;
  projetsEnCours: number = 0;
  totalBudget: number = 0;
  tauxMoyenExecution: number = 0;
  recentProjets: any[] = [];
  topProjets: any[] = [];
  structuresAvecProjets: any[] = [];
  projetAlerts: any[] = [];

  selectedFilter: string = 'all';

  private statusChart!: Chart;
  private budgetChart!: Chart;
  private topProjetsChart!: Chart;
  private evolutionChart!: Chart;
  private structureChart!: Chart;
  private alertsChart!: Chart;
  private isChartInitialized = false;

  private projetsData = [
    {
      id: 1,
      name: "Projet d'Appui à la Gouvernance Locale (PAGL)",
      parent: { name: "Programme de Décentralisation et Développement Territorial" },
      ministerTutelles: [
        { structure: { code: "MININT" } },
        { structure: { code: "DGPSN" } }
      ],
      expectedStartDate: "2022-03-01",
      expectedEndDate: "2026-12-31",
      tauxAvancement: 65,
      equivalence: 5200000000,
      monnaie: "XOF",
      status: { code: "EN_COURS", libelle: "En cours" },
      disorganized: false,
      publish: true
    },
    {
      id: 2,
      name: "Projet Filets Sociaux et Transferts Monétaires (PFSTM)",
      parent: { name: "Programme de Protection Sociale" },
      ministerTutelles: [
        { structure: { code: "DGPSN" } },
        { structure: { code: "MFB" } }
      ],
      expectedStartDate: "2021-07-01",
      expectedEndDate: "2025-06-30",
      tauxAvancement: 78,
      equivalence: 8300000000,
      monnaie: "XOF",
      status: { code: "EN_COURS", libelle: "En cours d'exécution" },
      disorganized: false,
      publish: false
    },
    {
      id: 3,
      name: "Projet d'Inclusion Économique des Jeunes et des Femmes (PIEJF)",
      parent: { name: "Programme de Développement Social Inclusif" },
      ministerTutelles: [
        { structure: { code: "DGPSN" } },
        { structure: { code: "MDE" } }
      ],
      expectedStartDate: "2023-01-01",
      expectedEndDate: "2027-12-31",
      tauxAvancement: 40,
      equivalence: 3600000000,
      monnaie: "XOF",
      status: { code: "EN_LANCEMENT", libelle: "En lancement" },
      disorganized: false,
      publish: true
    },
    {
      id: 4,
      name: "Projet d'Amélioration des Conditions de Vie dans les Zones Vulnérables (PACVZV)",
      parent: { name: "Programme de Réduction de la Pauvreté" },
      ministerTutelles: [
        { structure: { code: "DGPSN" } },
        { structure: { code: "MATD" } }
      ],
      expectedStartDate: "2020-04-01",
      expectedEndDate: "2024-12-31",
      tauxAvancement: 92,
      equivalence: 10400000000,
      monnaie: "XOF",
      status: { code: "ACHEVE", libelle: "Achevé" },
      disorganized: false,
      publish: true
    },
    {
      id: 5,
      name: "Projet d'Appui aux Filets Nationaux de Sécurité Sociale (PAFNSS)",
      parent: { name: "Programme National d'Appui à la Résilience Sociale" },
      ministerTutelles: [
        { structure: { code: "DGPSN" } },
        { structure: { code: "MEFPAI" } }
      ],
      expectedStartDate: "2022-09-15",
      expectedEndDate: "2026-09-15",
      tauxAvancement: 58,
      equivalence: 7500000000,
      monnaie: "XOF",
      status: { code: "EN_COURS", libelle: "En cours" },
      disorganized: false,
      publish: false
    },
    {
      id: 6,
      name: "Projet d'Appui à la Résilience des Ménages Vulnérables (PARMV)",
      parent: { name: "Programme National de Solidarité Sociale" },
      ministerTutelles: [
        { structure: { code: "DGPSN" } },
        { structure: { code: "MAER" } }
      ],
      expectedStartDate: "2023-02-01",
      expectedEndDate: "2026-12-31",
      tauxAvancement: 50,
      equivalence: 6700000000,
      monnaie: "XOF",
      status: { code: "EN_COURS", libelle: "En cours d'exécution" },
      disorganized: false,
      publish: true
    },
    {
      id: 7,
      name: "Projet d'Appui à la Protection des Enfants Vulnérables (PAPEV)",
      parent: { name: "Programme de Protection de l'Enfance" },
      ministerTutelles: [
        { structure: { code: "DGPSN" } },
        { structure: { code: "MFFE" } }
      ],
      expectedStartDate: "2021-01-15",
      expectedEndDate: "2025-12-15",
      tauxAvancement: 70,
      equivalence: 5900000000,
      monnaie: "XOF",
      status: { code: "EN_COURS", libelle: "En cours" },
      disorganized: false,
      publish: false
    }
  ];

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.loadDashbordData();
    this.generateAlerts();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCharts();
      this.isChartInitialized = true;
    }, 1000);
  }

  ngOnDestroy() {
    if (this.statusChart) this.statusChart.destroy();
    if (this.budgetChart) this.budgetChart.destroy();
    if (this.topProjetsChart) this.topProjetsChart.destroy();
    if (this.evolutionChart) this.evolutionChart.destroy();
    if (this.structureChart) this.structureChart.destroy();
    if (this.alertsChart) this.alertsChart.destroy();
  }

  loadDashbordData() {
    const projets = this.projetsData;

    this.totalProjets = projets.length;
    this.projetsEnCours = projets.filter(p => p.status?.code === 'EN_COURS').length;
    this.totalBudget = projets.reduce((sum, projet) => sum + (projet.equivalence || 0), 0);
    this.tauxMoyenExecution = Math.round(projets.reduce((sum, projet) => sum + (projet.tauxAvancement || 0), 0) / projets.length);

    this.recentProjets = [...projets]
      .sort((a, b) => new Date(b.expectedStartDate).getTime() - new Date(a.expectedStartDate).getTime())
      .slice(0, 5);

    this.topProjets = [...projets]
      .sort((a, b) => (b.tauxAvancement || 0) - (a.tauxAvancement || 0))
      .slice(0, 5);

    this.structuresAvecProjets = this.calculateStructuresAvecProjets(projets);
  }

  private calculateStructuresAvecProjets(projets: any[]): any[] {
    const structureMap = new Map();

    projets.forEach(projet => {
      projet.ministerTutelles?.forEach((tutelle: any) => {
        const structureCode = tutelle.structure?.code;
        if (structureCode) {
          if (!structureMap.has(structureCode)) {
            structureMap.set(structureCode, {
              nom: structureCode,
              nombreProjets: 0,
              budgetTotal: 0,
              totalTaux: 0
            });
          }
          
          const structure = structureMap.get(structureCode);
          structure.nombreProjets++;
          structure.budgetTotal += projet.equivalence || 0;
          structure.totalTaux += projet.tauxAvancement || 0;
        }
      });
    });

    return Array.from(structureMap.values()).map(structure => ({
      ...structure,
      tauxMoyen: Math.round(structure.totalTaux / structure.nombreProjets)
    })).sort((a, b) => b.nombreProjets - a.nombreProjets);
  }

  initCharts() {
    this.initStatusChart();
    this.initBudgetChart();
    this.initTopProjetsChart();
    this.initEvolutionChart();
    this.initStructureChart();
    this.initAlertsChart();
  }

  initStatusChart() {
    if (!this.statusChartCanvas?.nativeElement) return;

    const ctx = this.statusChartCanvas.nativeElement.getContext('2d');
    const projets = this.projetsData;

    const statusCount: { [key: string]: number } = {
      'EN_COURS': 0,
      'EN_LANCEMENT': 0,
      'ACHEVE': 0,
      'OTHER': 0
    };

    projets.forEach(projet => {
      const status = projet.status?.code || 'OTHER';
      if (statusCount.hasOwnProperty(status)) {
        statusCount[status]++;
      } else {
        statusCount['OTHER']++;
      }
    });

    this.statusChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['En cours', 'En lancement', 'Achevés', 'Autres'],
        datasets: [{
          data: [
            statusCount['EN_COURS'],
            statusCount['EN_LANCEMENT'],
            statusCount['ACHEVE'],
            statusCount['OTHER']
          ],
          backgroundColor: [
            '#4e73df',
            '#1cc88a',
            '#36b9cc',
            '#f6c23e'
          ],
          borderColor: [
            '#4e73df',
            '#1cc88a',
            '#36b9cc',
            '#f6c23e'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true
            }
          }
        }
      }
    });
  }

  initBudgetChart() {
    if (!this.budgetChartCanvas?.nativeElement) return;

    const ctx = this.budgetChartCanvas.nativeElement.getContext('2d');
    const projets = this.projetsData;

    const yearMap = new Map();
    projets.forEach(projet => {
      const year = new Date(projet.expectedStartDate).getFullYear();
      const current = yearMap.get(year) || 0;
      yearMap.set(year, current + (projet.equivalence || 0));
    });

    const years = Array.from(yearMap.keys()).sort();
    const budgets = years.map(year => yearMap.get(year));

    this.budgetChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years.map(y => y.toString()),
        datasets: [{
          label: 'Budget (FCFA)',
          data: budgets,
          backgroundColor: '#4e73df',
          borderColor: '#4e73df',
          borderWidth: 1,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `Budget: ${this.formatMontant(context.raw as number)}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => {
                return this.formatMontant(value as number);
              }
            }
          }
        }
      }
    });
  }

  initTopProjetsChart() {
    if (!this.topProjetsChartCanvas?.nativeElement) return;

    const ctx = this.topProjetsChartCanvas.nativeElement.getContext('2d');
    const topProjets = this.topProjets.slice(0, 5);

    this.topProjetsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: topProjets.map(p => this.getTruncatedText(p.name, 25)),
        datasets: [{
          label: 'Taux d\'avancement (%)',
          data: topProjets.map(p => p.tauxAvancement),
          backgroundColor: topProjets.map(p => {
            if (p.tauxAvancement >= 80) return '#1cc88a';
            if (p.tauxAvancement >= 50) return '#f6c23e';
            return '#e74a3b';
          }),
          borderColor: topProjets.map(p => {
            if (p.tauxAvancement >= 80) return '#1cc88a';
            if (p.tauxAvancement >= 50) return '#f6c23e';
            return '#e74a3b';
          }),
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `Avancement: ${context.raw}%`;
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: (value) => {
                return value + '%';
              }
            }
          }
        }
      }
    });
  }

  initEvolutionChart() {
    if (!this.evolutionChartCanvas?.nativeElement) return;

    const ctx = this.evolutionChartCanvas.nativeElement.getContext('2d');
    const projets = this.projetsData;

    // Regrouper par mois
    const monthData = new Map();
    projets.forEach(projet => {
      const date = new Date(projet.expectedStartDate);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!monthData.has(monthKey)) {
        monthData.set(monthKey, {
          count: 0,
          budget: 0,
          label: date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
        });
      }
      
      const data = monthData.get(monthKey);
      data.count++;
      data.budget += projet.equivalence || 0;
    });

    const sortedMonths = Array.from(monthData.keys()).sort();
    const labels = sortedMonths.map(key => monthData.get(key).label);
    const counts = sortedMonths.map(key => monthData.get(key).count);

    this.evolutionChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Nombre de projets',
          data: counts,
          borderColor: '#4e73df',
          backgroundColor: 'rgba(78, 115, 223, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  initStructureChart() {
    if (!this.structureChartCanvas?.nativeElement) return;

    const ctx = this.structureChartCanvas.nativeElement.getContext('2d');
    const structures = this.structuresAvecProjets.slice(0, 8);

    this.structureChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: structures.map(s => s.nom),
        datasets: [{
          data: structures.map(s => s.nombreProjets),
          backgroundColor: [
            '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', 
            '#e74a3b', '#858796', '#5a5c69', '#6f42c1'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              padding: 15,
              usePointStyle: true
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const structure = structures[context.dataIndex];
                return `${structure.nom}: ${structure.nombreProjets} projets (${this.formatMontant(structure.budgetTotal)})`;
              }
            }
          }
        }
      }
    });
  }

  initAlertsChart() {
    if (!this.alertsChartCanvas?.nativeElement) return;

    const ctx = this.alertsChartCanvas.nativeElement.getContext('2d');
    
    const alertTypes = {
      'warning': this.projetAlerts.filter(a => a.type === 'warning').length,
      'success': this.projetAlerts.filter(a => a.type === 'success').length,
      'info': this.projetAlerts.filter(a => a.type === 'info').length,
      'danger': this.projetAlerts.filter(a => a.type === 'danger').length
    };

    this.alertsChart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: ['Alertes', 'Succès', 'Informations', 'Dangers'],
        datasets: [{
          data: [
            alertTypes.warning,
            alertTypes.success,
            alertTypes.info,
            alertTypes.danger
          ],
          backgroundColor: [
            'rgba(246, 194, 62, 0.8)',
            'rgba(28, 200, 138, 0.8)',
            'rgba(54, 185, 204, 0.8)',
            'rgba(231, 74, 59, 0.8)'
          ],
          borderColor: [
            '#f6c23e',
            '#1cc88a',
            '#36b9cc',
            '#e74a3b'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        scales: {
          r: {
            beginAtZero: true
          }
        }
      }
    });
  }

  generateAlerts() {
    const projets = this.projetsData;
    
    this.projetAlerts = [];

    projets.forEach(projet => {
      if (projet.tauxAvancement < 30 && projet.status?.code === 'EN_COURS') {
        this.projetAlerts.push({
          type: 'warning',
          title: 'Avancement faible',
          message: `Le projet ${projet.name} a un taux d'avancement de ${projet.tauxAvancement}%`,
          date: new Date()
        });
      }

      if (projet.tauxAvancement > 90 && projet.status?.code === 'EN_COURS') {
        this.projetAlerts.push({
          type: 'success',
          title: 'Projet bientôt terminé',
          message: `Le projet ${projet.name} approche de l'achèvement (${projet.tauxAvancement}%)`,
          date: new Date()
        });
      }
    });

    if (this.projetAlerts.length < 2) {
      this.projetAlerts.push({
        type: 'info',
        title: 'Situation stable',
        message: 'La majorité des projets suivent leur planning',
        date: new Date()
      });
    }

    this.projetAlerts = this.projetAlerts.slice(0, 4);
  }

  getTruncatedText(text: string, limit: number = 40): string {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  }

  formatMontant(montant: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(montant);
  }

  getPourcentageEnCours(): number {
    return this.totalProjets > 0 ? Math.round((this.projetsEnCours / this.totalProjets) * 100) : 0;
  }

  getTauxAvancementClass(taux: number): string {
    if (taux >= 80) return 'bg-success';
    if (taux >= 50) return 'bg-warning';
    return 'bg-danger';
  }

  getStatusClass(code: string): string {
    switch (code) {
      case 'EN_COURS': return 'bg-primary';
      case 'EN_LANCEMENT': return 'bg-info';
      case 'ACHEVE': return 'bg-success';
      case 'ARR': return 'bg-danger';
      default: return 'bg-warning';
    }
  }

  getStatusLabel(code: string): string {
    switch (code) {
      case 'EN_COURS': return 'En cours';
      case 'EN_LANCEMENT': return 'En lancement';
      case 'ACHEVE': return 'Achevé';
      case 'ARR': return 'Arrêté';
      default: return 'Inconnu';
    }
  }

  getAlertIcon(type: string): string {
    switch (type) {
      case 'danger': return 'icon-alert-triangle text-danger';
      case 'warning': return 'icon-alert-octagon text-warning';
      case 'info': return 'icon-info text-info';
      case 'success': return 'icon-check-circle text-success';
      default: return 'icon-bell text-secondary';
    }
  }

  refreshDashbord() {
    this.loadDashbordData();
    this.generateAlerts();
    
    if (this.isChartInitialized) {
      if (this.statusChart) this.statusChart.destroy();
      if (this.budgetChart) this.budgetChart.destroy();
      if (this.topProjetsChart) this.topProjetsChart.destroy();
      if (this.evolutionChart) this.evolutionChart.destroy();
      if (this.structureChart) this.structureChart.destroy();
      if (this.alertsChart) this.alertsChart.destroy();
      this.initCharts();
    }
  }

  updateCharts() {
    this.refreshDashbord();
  }

  openProjetDetails(projetId: number) {
    console.log('Ouvrir détails du projet:', projetId);
  }

  voirProjetsStructure(structureNom: string) {
    console.log('Voir projets de la structure:', structureNom);
  }
}