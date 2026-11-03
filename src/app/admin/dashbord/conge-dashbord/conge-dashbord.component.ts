import { Component, OnInit, TemplateRef, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Alertes } from '@/app/util/alerte';
import { DashboardService } from '@/app/services/dashboard/dashboard.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-conge-dashbord',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbTooltipModule,
    MatIconModule
  ],
  templateUrl: './conge-dashbord.component.html',
  styleUrls: ['./conge-dashbord.component.scss']
})
export class CongeDashbordComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('filterModal') filterModal!: TemplateRef<any>;
  @ViewChild('typeCongeChartCanvas') typeCongeChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('statutChartCanvas') statutChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('evolutionChartCanvas') evolutionChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('dureeChartCanvas') dureeChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('topAgentsChartCanvas') topAgentsChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('approvalRateChartCanvas') approvalRateChartCanvas!: ElementRef<HTMLCanvasElement>;

  dashboardStats = {
    totalDemandes: 0,
    congesApprouves: 0,
    congesEnCours: 0,
    congesRefuses: 0
  };

  filters = {
    statut: '',
    typeConge: '',
    dateDebut: '',
    dateFin: ''
  };

  private typeCongeChart!: Chart<'doughnut', number[], string>;
  private statutChart!: Chart<'pie', number[], string>;
  private evolutionChart!: Chart<'line', number[], string>;
  private dureeChart!: Chart<'bar', number[], string>;
  private topAgentsChart!: Chart<'bar', number[], string>;
  private approvalRateChart!: Chart<'radar', number[], string>;

  private dashboardData: any = null; // Stockage temporaire des données

  constructor(
    private modalService: NgbModal,
    private dashboardService: DashboardService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    // Ne charge que les données, pas les graphiques
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    // Les canvas sont maintenant disponibles
    // Si les données sont déjà chargées, créer les graphiques
    if (this.dashboardData) {
      setTimeout(() => {
        this.updateCharts(this.dashboardData);
      }, 0);
    }
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }

  loadDashboardData(): void {
    this.dashboardService.getDashboardSummary().subscribe({
      next: (data) => {
        this.dashboardStats = {
          totalDemandes: data.summary.totalDemandes,
          congesApprouves: data.summary.congesApprouves,
          congesEnCours: data.summary.congesEnCours,
          congesRefuses: data.summary.congesRefuses
        };

        // Stocker les données
        this.dashboardData = data;

        // Si les canvas sont déjà disponibles (après ngAfterViewInit)
        if (this.typeCongeChartCanvas?.nativeElement) {
          this.destroyCharts();
          setTimeout(() => {
            this.updateCharts(data);
          }, 0);
        }
      },
      error: (err) => {
        console.error('Erreur API dashboard:', err);
        Alertes.alerteAddDanger('Impossible de charger les données');
      }
    });
  }

  private updateCharts(data: any): void {
    if (!data) return;
    
    this.updateTypeCongeChart(data.typeCongeRepartition || []);
    this.updateStatutChart(data.statutRepartition || []);
    this.updateEvolutionChart(data.evolutionMensuelle || []);
    this.updateDureeChart(data.dureeRepartition || []);
    this.updateTopAgentsChart(data.topAgents || []);
    this.updateApprovalRateChart(data.tauxApprobationParType || {});
  }

  private updateTypeCongeChart(repartition: any[]): void {
    if (!this.typeCongeChartCanvas?.nativeElement || !repartition.length) return;
    
    const ctx = this.typeCongeChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = repartition.map(r => r.type);
    const values = repartition.map(r => r.count);

    this.typeCongeChart = new Chart<'doughnut', number[], string>(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: ['#667eea', '#4facfe', '#f093fb', '#4ecdc4', '#f6c23e'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
          legend: { 
            position: 'bottom',
            labels: { padding: 15, font: { size: 12 } }
          }
        }
      }
    } as ChartConfiguration<'doughnut', number[], string>);
  }

  private updateStatutChart(repartition: any[]): void {
    if (!this.statutChartCanvas?.nativeElement || !repartition.length) return;
    
    const ctx = this.statutChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = repartition.map(r =>
      r.statut === 'ACCEPTER' ? 'Acceptés' :
      r.statut === 'TRAITEMENT_ENCOUR' ? 'En cours' : 'Refusés'
    );
    const values = repartition.map(r => r.count);

    this.statutChart = new Chart<'pie', number[], string>(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: ['#00b894', '#fdcb6e', '#d63031'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
          legend: { 
            position: 'bottom',
            labels: { padding: 15, font: { size: 12 } }
          }
        }
      }
    } as ChartConfiguration<'pie', number[], string>);
  }

  private updateEvolutionChart(mensuelle: any[]): void {
    if (!this.evolutionChartCanvas?.nativeElement) return;
    
    const ctx = this.evolutionChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = mensuelle.length > 0 ? mensuelle.map(m => m.mois) : ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    const data = mensuelle.length > 0 ? mensuelle.map(m => m.demandes) : Array(12).fill(0);

    this.evolutionChart = new Chart<'line', number[], string>(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Demandes de congé',
          data,
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
        plugins: { legend: { position: 'top' } },
        scales: { y: { beginAtZero: true } }
      }
    } as ChartConfiguration<'line', number[], string>);
  }

  private updateDureeChart(repartition: any[]): void {
    if (!this.dureeChartCanvas?.nativeElement || !repartition.length) return;
    
    const ctx = this.dureeChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = repartition.map(r => r.range);
    const values = repartition.map(r => r.count);

    this.dureeChart = new Chart<'bar', number[], string>(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Nombre de demandes',
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
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    } as ChartConfiguration<'bar', number[], string>);
  }

  private updateTopAgentsChart(agents: any[]): void {
    if (!this.topAgentsChartCanvas?.nativeElement || !agents.length) return;
    
    const ctx = this.topAgentsChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = agents.map(a => a.nomComplet);
    const values = agents.map(a => a.conges);

    this.topAgentsChart = new Chart<'bar', number[], string>(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Nombre de congés',
          data: values,
          backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'],
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true } }
      }
    } as ChartConfiguration<'bar', number[], string>);
  }

  private updateApprovalRateChart(taux: any): void {
    if (!this.approvalRateChartCanvas?.nativeElement || !Object.keys(taux).length) return;
    
    const ctx = this.approvalRateChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = Object.keys(taux);
    const data = Object.values(taux) as number[];

    this.approvalRateChart = new Chart<'radar', number[], string>(ctx, {
      type: 'radar',
      data: {
        labels,
        datasets: [{
          label: 'Taux d\'approbation (%)',
          data,
          backgroundColor: 'rgba(78, 115, 223, 0.2)',
          borderColor: '#4e73df',
          borderWidth: 2,
          pointBackgroundColor: '#4e73df',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#4e73df'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: { stepSize: 20 }
          }
        }
      }
    } as ChartConfiguration<'radar', number[], string>);
  }

  destroyCharts(): void {
    [
      this.typeCongeChart,
      this.statutChart,
      this.evolutionChart,
      this.dureeChart,
      this.topAgentsChart,
      this.approvalRateChart
    ].forEach(chart => {
      if (chart) {
        chart.destroy();
      }
    });
  }

  openFilterModal(): void {
    this.modalService.open(this.filterModal, { size: 'lg' });
  }

  applyFilters(): void {
    this.modalService.dismissAll();
    this.loadDashboardData(); // Recharger avec les filtres
    Alertes.alerteAddSuccess('Filtres appliqués avec succès');
  }

  clearFilters(): void {
    this.filters = { statut: '', typeConge: '', dateDebut: '', dateFin: '' };
    this.loadDashboardData(); // Recharger sans filtres
    Alertes.alerteAddSuccess('Filtres effacés');
  }

  exportDashboard(): void {
    Alertes.alerteAddSuccess('Export en cours...');
  }
}