import { Component, OnInit, TemplateRef, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Chart, registerables } from 'chart.js';
import { Alertes } from '@/app/util/alerte';
import { Router } from '@angular/router';
import { ServiceExterieurDashboardService, ServiceExterieurKpi } from '@/app/services/dashboardBudgetaire/service-exterieur-dashboard.service';
@Component({
  selector: 'app-service-exterieur-dashbord',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbTooltipModule
  ],
  templateUrl: './service-exterieur-dashbord.component.html',
  styleUrls: ['./service-exterieur-dashbord.component.scss']
})
export class ServiceExterieurDashbordComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('filterModal') filterModal!: TemplateRef<any>;
  @ViewChild('typeActiviteChartCanvas') typeActiviteChartCanvas!: ElementRef;
  @ViewChild('budgetChartCanvas') budgetChartCanvas!: ElementRef;
  @ViewChild('evolutionChartCanvas') evolutionChartCanvas!: ElementRef;
  @ViewChild('statutChartCanvas') statutChartCanvas!: ElementRef;
  @ViewChild('topBudgetChartCanvas') topBudgetChartCanvas!: ElementRef;
  @ViewChild('participantsChartCanvas') participantsChartCanvas!: ElementRef;

  dashboardStats: ServiceExterieurKpi = {
    totalFormations: 0,
    totalMissions: 0,
    totalAteliers: 0,
    totalBudget: 0,
    totalParticipants: 0
  };

  filters = {
    typeActivite: '',
    statut: '',
    dateDebut: '',
    dateFin: ''
  };

  loading = false;

  private typeActiviteChart!: Chart;
  private budgetChart!: Chart;
  private evolutionChart!: Chart;
  private statutChart!: Chart;
  private topBudgetChart!: Chart;
  private participantsChart!: Chart;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private dashboardService: ServiceExterieurDashboardService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initCharts();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }

  loadDashboardData(): void {
    this.loading = true;
    
    // Charger les KPIs
    this.dashboardService.getKpis().subscribe({
      next: (data) => {
        this.dashboardStats = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des KPIs:', error);
        Alertes.alerteAddDanger('Erreur lors du chargement des données');
        this.loading = false;
      }
    });
  }

  initCharts(): void {
    this.initTypeActiviteChart();
    this.initBudgetChart();
    this.initEvolutionChart();
    this.initStatutChart();
    this.initTopBudgetChart();
    this.initParticipantsChart();
  }

  destroyCharts(): void {
    if (this.typeActiviteChart) this.typeActiviteChart.destroy();
    if (this.budgetChart) this.budgetChart.destroy();
    if (this.evolutionChart) this.evolutionChart.destroy();
    if (this.statutChart) this.statutChart.destroy();
    if (this.topBudgetChart) this.topBudgetChart.destroy();
    if (this.participantsChart) this.participantsChart.destroy();
  }

  initTypeActiviteChart(): void {
    if (!this.typeActiviteChartCanvas?.nativeElement) return;

    const ctx = this.typeActiviteChartCanvas.nativeElement.getContext('2d');
    
    this.dashboardService.getActivitiesByType().subscribe({
      next: (data) => {
        const labels = data.map(d => d.label);
        const values = data.map(d => d.value);
        
        this.typeActiviteChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              data: values,
              backgroundColor: [
                '#667eea',
                '#4facfe',
                '#f093fb'
              ],
              borderWidth: 2,
              borderColor: '#ffffff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      },
      error: (error) => console.error('Erreur chart type activité:', error)
    });
  }

  initBudgetChart(): void {
    if (!this.budgetChartCanvas?.nativeElement) return;

    const ctx = this.budgetChartCanvas.nativeElement.getContext('2d');
    
    this.dashboardService.getBudgetByActivityType().subscribe({
      next: (data) => {
        const labels = data.map(d => d.label);
        const values = data.map(d => d.value);
        
        this.budgetChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Budget (FCFA)',
              data: values,
              backgroundColor: [
                '#667eea',
                '#4facfe',
                '#f093fb'
              ],
              borderWidth: 1,
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => {
                    return value.toLocaleString() + ' FCFA';
                  }
                }
              }
            }
          }
        });
      },
      error: (error) => console.error('Erreur chart budget:', error)
    });
  }

  initEvolutionChart(): void {
    if (!this.evolutionChartCanvas?.nativeElement) return;

    const ctx = this.evolutionChartCanvas.nativeElement.getContext('2d');
    
    this.dashboardService.getMonthlyEvolution().subscribe({
      next: (data) => {
        const labels = data.map(d => {
          const [year, month] = d.month.split('-');
          const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
          return monthNames[parseInt(month) - 1];
        });
        
        const formationsData = data.map(d => d.formations);
        const missionsData = data.map(d => d.missions);
        const ateliersData = data.map(d => d.ateliers);
        
        this.evolutionChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Formations',
                data: formationsData,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
              },
              {
                label: 'Missions',
                data: missionsData,
                borderColor: '#4facfe',
                backgroundColor: 'rgba(79, 172, 254, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
              },
              {
                label: 'Ateliers',
                data: ateliersData,
                borderColor: '#f093fb',
                backgroundColor: 'rgba(240, 147, 251, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top'
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      },
      error: (error) => console.error('Erreur chart évolution:', error)
    });
  }

  initStatutChart(): void {
    if (!this.statutChartCanvas?.nativeElement) return;

    const ctx = this.statutChartCanvas.nativeElement.getContext('2d');
    
    this.dashboardService.getActivitiesByStatus().subscribe({
      next: (data) => {
        const labels = data.map(d => this.translateStatus(d.label));
        const values = data.map(d => d.value);
        
        const colors = labels.map(label => {
          if (label.includes('Planifié')) return '#6c757d';
          if (label.includes('En cours')) return '#ffc107';
          if (label.includes('Traité')) return '#198754';
          if (label.includes('Rejétée')) return '#dc3545';
          return '#0dcaf0';
        });
        
        this.statutChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              data: values,
              backgroundColor: colors,
              borderWidth: 2,
              borderColor: '#ffffff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      },
      error: (error) => console.error('Erreur chart statut:', error)
    });
  }

  initTopBudgetChart(): void {
    if (!this.topBudgetChartCanvas?.nativeElement) return;

    const ctx = this.topBudgetChartCanvas.nativeElement.getContext('2d');
    
    this.dashboardService.getTop5ByBudget().subscribe({
      next: (data) => {
        const labels = data.map(d => this.truncateLabel(d.label, 30));
        const values = data.map(d => d.value);
        
        this.topBudgetChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Budget (FCFA)',
              data: values,
              backgroundColor: '#36b9cc',
              borderColor: '#36b9cc',
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
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => {
                    return value.toLocaleString() + ' FCFA';
                  }
                }
              }
            }
          }
        });
      },
      error: (error) => console.error('Erreur chart top budget:', error)
    });
  }

  initParticipantsChart(): void {
    if (!this.participantsChartCanvas?.nativeElement) return;

    const ctx = this.participantsChartCanvas.nativeElement.getContext('2d');
    
    this.dashboardService.getParticipantsByType().subscribe({
      next: (data) => {
        const labels = data.map(d => d.label);
        const values = data.map(d => d.value);
        
        this.participantsChart = new Chart(ctx, {
          type: 'polarArea',
          data: {
            labels: labels,
            datasets: [{
              data: values,
              backgroundColor: [
                'rgba(102, 126, 234, 0.8)',
                'rgba(79, 172, 254, 0.8)',
                'rgba(240, 147, 251, 0.8)'
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
            }
          }
        });
      },
      error: (error) => console.error('Erreur chart participants:', error)
    });
  }

  openFilterModal(): void {
    this.modalService.open(this.filterModal, { size: 'lg' });
  }

  applyFilters(): void {
    this.modalService.dismissAll();
    this.destroyCharts();
    
    // Recharger les données avec les filtres
    this.loadDashboardData();
    
    setTimeout(() => {
      this.initCharts();
    }, 500);
    
    Alertes.alerteAddSuccess('Filtres appliqués avec succès');
  }

  clearFilters(): void {
    this.filters = {
      typeActivite: '',
      statut: '',
      dateDebut: '',
      dateFin: ''
    };
    Alertes.alerteAddSuccess('Filtres effacés');
  }

  exportDashboard(): void {
    Alertes.alerteAddSuccess('Export du dashboard en cours...');
    // Implémenter la logique d'export ici
  }

  translateStatus(status: string): string {
    const translations: { [key: string]: string } = {
      'nouvelle': 'Nouvelle',
      'EN_COURS': 'En cours',
      'TRAITREE': 'Traité',
      'ANNULE': 'Rejétée',
      'NON_DEFINI': 'Non défini'
    };
    return translations[status] || status;
  }

  truncateLabel(label: string, maxLength: number): string {
    if (label.length <= maxLength) return label;
    return label.substring(0, maxLength) + '...';
  }

  getStatutClass(statut: string): string {
    switch (statut) {
      case 'NOUVELLE':
        return 'bg-secondary';
      case 'EN_COURS':
        return 'bg-warning';
      case 'TRAITEE':
        return 'bg-success';
      case 'REJETEE':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }
}