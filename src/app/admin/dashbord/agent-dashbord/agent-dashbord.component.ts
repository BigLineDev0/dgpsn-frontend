import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { AgentService } from 'src/app/services/agent/agent.service';
import { DirectionService } from '@/app/services/direction/direction.service';
import { CongeService } from '@/app/services/conge/conge.service';
import { DashboardService } from '@/app/services/dashboard/dashboard.service';
import { LabelService } from '@/app/services/labelService/label-service';
import { Alertes } from 'src/app/util/alerte';
import { computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Interfaces
interface StatsCard {
  totalAgents: number;
  totalAgentsEnConges: number;
  totalAgentsParDirection: number;
}

interface AgentsByDirection {
  direction: string;
  totalAgents: number;
}

@Component({
  selector: 'app-agent-dashbord',
  templateUrl: './agent-dashbord.component.html',
  styleUrls: ['./agent-dashbord.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.6s cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('hoverAnimation', [
      state('initial', style({ transform: 'scale(1)' })),
      state('hover', style({ transform: 'scale(1.02)' })),
      transition('initial <=> hover', animate('200ms ease-in-out')),
    ]),
  ],
})
export class AgentDashbordComponent implements OnInit, AfterViewInit, OnDestroy {
  // ViewChild References
  @ViewChild('directionChartCanvas') directionChartCanvas!: ElementRef;
  @ViewChild('agentAgeChartCanvas') agentAgeChartCanvas!: ElementRef;
  @ViewChild('recruitmentChartCanvas') recruitmentChartCanvas!: ElementRef;
  @ViewChild('functionChartCanvas') functionChartCanvas!: ElementRef;
  @ViewChild('topDirectionsChartCanvas') topDirectionsChartCanvas!: ElementRef;
  @ViewChild('performanceChartCanvas') performanceChartCanvas!: ElementRef;
  @ViewChild('chartRetraite') chartRetraite!: ElementRef<HTMLCanvasElement>;
  private chartInstance: Chart | undefined;

  // Chart Instances
  private directionChart!: Chart;
  private agentAgeChart!: Chart;
  private recruitmentChart!: Chart;
  private functionChart!: Chart;
  private topDirectionsChart!: Chart;
  private performanceChart!: Chart;

  // Signals and Computed Properties
  agentsData = signal<any[]>([]);
  agents = computed(() => this.agentsData());

  agentCardStatsCount = signal<StatsCard>({
    totalAgents: 0,
    totalAgentsEnConges: 0,
    totalAgentsParDirection: 0,
  });
  cardStatsCount = computed(() => this.agentCardStatsCount());

  statsAgentsCard = computed(() => [
    {
      label: 'Agents Totaux',
      value: this.cardStatsCount().totalAgents,
      icon: 'feather icon-users',
      bgClass: 'bg-primary',
      textClass: 'text-primary',
    },
    {
      label: 'Congé',
      value: this.cardStatsCount().totalAgentsEnConges,
      icon: 'feather icon-activity',
      bgClass: 'bg-success',
      textClass: 'text-success',
    },
    {
      label: 'Directions',
      value: this.cardStatsCount().totalAgentsParDirection,
      icon: 'feather icon-user-x',
      bgClass: 'bg-warning',
      textClass: 'text-warning',
    },
  ]);

  agentGroupingData = signal<any>({});
  agentGrouping = computed(() => this.agentGroupingData());

  agentsByDirectionData = signal<AgentsByDirection[]>([]);
  agentsByDirection = computed(() =>
    this.agentsByDirectionData().map(agent => ({
      direction: agent.direction,
      totalAgents: agent.totalAgents,
    }))
  );

  directionData = signal<any[]>([]);
  direction = computed(() => this.directionData());
  allLabelDirection = computed(() => this.direction().map(direction => direction.libelle));

  congeData = signal<any[]>([]);
  conge = computed(() => this.congeData());

  fonctionData = signal<any[]>([]);
  fonction = computed(() => this.fonctionData());

  // Prevision des agents prise retraites 

  agentsRetraiteData = signal<any[]>([]);
  agentsRetraite = computed(() => this.agentsRetraiteData());
  selectedYear: number | null = null;
  yearsList = signal<number[]>([]);
  colorPalette: string[] = ['#1E90FF', '#32CD32', '#FFA500', '#FF4500', '#8A2BE2', '#00CED1'];
  hasNoData = signal<boolean>(false);

  // Component State
  animationState = 'initial';
  cardHover: string[] = ['initial', 'initial', 'initial', 'initial'];

  constructor(
    private modalService: NgbModal,
    private agentService: AgentService,
    private directionService: DirectionService,
    private congeService: CongeService,
    private dashboardService: DashboardService,
    private labelService: LabelService
  ) {
    Chart.register(...registerables);
  }

  // Lifecycle Hooks
  ngOnInit(): void {
    this.loadAgentsCard();
    this.loadDirections();
    this.loadAgentsByDirection();
    this.loadConges();
    this.initDashboard();
    this.getReferentielType();
    this.loadAgents();
    this.loadAgentGrouping();
    // init years list
       // Annee actuelle + 60 ans
    const currentYear = new Date().getFullYear();
    this.yearsList.set(Array.from({ length: 60 }, (_, i) => currentYear + i));
   
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initCharts(), 1000);
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }

loadRetraiteChart(annee?: number): void {
    // Réinitialiser l'état de données manquantes
    this.hasNoData.set(false);

    // Détruire l'instance précédente si elle existe
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.dashboardService.getProjectionsRetraite(annee).subscribe({
      next: (data: any[]) => {
        if (!data || data.length === 0) {
          this.hasNoData.set(true);
          return;
        }

        const annees = [...new Set(data.map(item => item.annee))];
        const directions = [...new Set(data.map(item => item.direction))];

        const datasets = directions.map((direction, i) => {
          const color = this.colorPalette[i % this.colorPalette.length];
          return {
            label: direction,
            data: annees.map(a => {
              const item = data.find(d => d.annee === a && d.direction === direction);
              return item ? item.totalAgents : 0;
            }),
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1
          };
        });

        const ctx = this.chartRetraite.nativeElement.getContext('2d');
        if (ctx) {
          this.chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: annees,
              datasets
            },
            options: {
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    boxWidth: 12,
                    padding: 20
                  }
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = context.dataset.label || '';
                      const value = context.raw as number;
                      return `${label}: ${value} agent(s)`;
                    }
                  }
                }
              },
              scales: {
                x: {
                  stacked: true,
                  title: {
                    display: true,
                    text: "Nombre d'agents"
                  }
                },
                y: {
                  stacked: true,
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Année de retraite"
                  }
                }
              }
            }
          });
        }
      },
      error: () => {
        this.hasNoData.set(true);
      }
    });
  }

onYearChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const annee = selectElement.value ? +selectElement.value : undefined;
    this.selectedYear = annee ? +annee : null;
    this.loadRetraiteChart(annee);
}

  resetFilter(): void {
    this.selectedYear = null;
    const selectElement = document.getElementById('yearFilter') as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = '';
    }
    this.loadRetraiteChart();
  }


  // Data Loading Methods
  private loadAgentGrouping(): void {
    this.dashboardService.getAgentGrouping().subscribe({
      next: (data) => {
        this.agentGroupingData.set(data);
      },
      error: () => {},
    });
  }

  private loadConges(): void {
    this.congeService.readListConges().subscribe({
      next: (conges) => this.congeData.set(conges.content),
      error: () => {}
    });
  }

  private loadDirections(): void {
    this.directionService.readDirections(null, 0, 10).subscribe({
      next: (directions) => this.directionData.set(directions.content),
      error: () => {}
    });
  }

  private loadAgentsCard(): void {
    this.dashboardService.getStatsCardAgent().subscribe({
      next: (data) => this.agentCardStatsCount.set(data),
      error: () => {}
    });
  }

  private loadAgentsByDirection(): void {
    this.dashboardService.getCountAgentsByDirection().subscribe({
      next: (data) => this.agentsByDirectionData.set(data),
      error: () => {}
    });
  }

  private loadAgents(): void {
    this.agentService.getAllAgents(null).subscribe({
      next: (agents) => this.agentsData.set(agents.content),
      error: () => {}
    });
  }

  private getReferentielType(): void {
    this.labelService
      .readLabels({ page: 0, size: 200, referentielType: 'FONCTION' })
      .subscribe({
        next: (data) => this.fonctionData.set(data.content),
        error: () => {}
      });
  }

  // Chart Initialization Methods
  private initCharts(): void {
    this.initDirectionChart();
    this.initAgentAgeChart();
    this.initRecruitmentChart();
    this.initFunctionChart();
    this.initTopDirectionsChart();
    this.initPerformanceChart();
    this.loadRetraiteChart();
  }

  private destroyCharts(): void {
    [this.directionChart, this.agentAgeChart, this.recruitmentChart, this.functionChart, this.topDirectionsChart, this.performanceChart]
      .forEach(chart => chart?.destroy());
  }

  private initDirectionChart(): void {
    if (!this.directionChartCanvas?.nativeElement) return;

    const ctx = this.directionChartCanvas.nativeElement.getContext('2d');
    this.directionChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.agentsByDirection().map(agent => agent.direction || 'Sans direction'),
        datasets: [
          {
            data: this.agentsByDirection().map(agent => agent.totalAgents || 0),
            backgroundColor: this.agentsByDirection().map((_, index) => this.colorPalette[index % this.colorPalette.length]),
            borderWidth: 2,
            borderColor: '#ffffff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 20, usePointStyle: true, font: { size: 11 } },
          },
        },
        cutout: '65%',
      },
    });
  }

  private initAgentAgeChart(): void {
    if (!this.agentAgeChartCanvas?.nativeElement) return;
    const ctx = this.agentAgeChartCanvas.nativeElement.getContext('2d');
    const source = this.agentGrouping().ageGroups;
    const labels = Object.keys(source);
    const hommes = labels.map(k => -Number(source[k]?.masculin ?? 0));
    const femmes = labels.map(k => Number(source[k]?.feminin ?? 0));

    const data: ChartConfiguration<'bar'>['data'] = {
      labels,
      datasets: [
        {
          label: 'Hommes',
          data: hommes,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Femmes',
          data: femmes,
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };

    const options: ChartConfiguration<'bar'>['options'] = {
      indexAxis: 'y',
      responsive: true,
      scales: {
        x: {
          stacked: true,
          ticks: { callback: value => Math.abs(Number(value)).toString() },
          title: { display: true, text: "Nombre d'agents" },
        },
        y: { stacked: true, title: { display: true, text: "Tranches d'âge" } },
      },
      plugins: {
        tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${Math.abs(Number(ctx.parsed.x))}` } },
        legend: { position: 'bottom' },
        title: { display: true, text: 'Pyramide des ages des agents' },
      },
    };

    this.agentAgeChart = new Chart(ctx, { type: 'bar', data, options });
  }

  private initRecruitmentChart(): void {
    if (!this.recruitmentChartCanvas?.nativeElement) return;
    const ctx = this.recruitmentChartCanvas.nativeElement.getContext('2d');

    this.recruitmentChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
        datasets: [
          {
            label: 'Recrutements mensuels',
            data: [2, 3, 1, 2, 4, 3, 2, 1, 3, 2, 1, 2],
            borderColor: '#4e73df',
            backgroundColor: 'rgba(78, 115, 223, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true, position: 'top' } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
      },
    });
  }

  private initFunctionChart(): void {
    if (!this.functionChartCanvas?.nativeElement) return;
    const ctx = this.functionChartCanvas.nativeElement.getContext('2d');

    this.functionChart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: this.fonction().map(fonction => fonction.libelle),
        datasets: [
          {
            data: this.fonction().map(value => value.libelle.length),
            backgroundColor: this.fonction().map((_, index) => this.colorPalette[index % this.colorPalette.length]),
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
      },
    });
  }

  private initTopDirectionsChart(): void {
    if (!this.topDirectionsChartCanvas?.nativeElement) return;
    const ctx = this.topDirectionsChartCanvas.nativeElement.getContext('2d');

    this.topDirectionsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Ressources Humaines', 'Direction Financière', 'Direction Technique', 'Communication', 'Logistique'],
        datasets: [
          {
            label: "Nombre d'agents",
            data: [8, 5, 4, 4, 3],
            backgroundColor: '#4e73df',
            borderColor: '#4e73df',
            borderWidth: 1,
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true } },
      },
    });
  }

  private initPerformanceChart(): void {
    if (!this.performanceChartCanvas?.nativeElement) return;
    const ctx = this.performanceChartCanvas.nativeElement.getContext('2d');
    const hommes = this.agentGrouping().totalHommes;
    const femmes = this.agentGrouping().totalFemmes;

    this.performanceChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Masculin', 'Feminin'],
        datasets: [
          {
            label: '',
            data: [hommes, femmes],
            backgroundColor: ['rgba(78, 115, 223, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(78, 115, 223, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 2,
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
      },
    });
  }

  // Utility Methods
  countConges(): number {
    return this.conge().length;
  }

  countDirections(): number {
    return this.direction().length;
  }

  countAgents(): number {
    return this.agents().length;
  }

  exportDashboardData(): void {
    Alertes.success('Export des données en cours...');
  }

  refreshDashboard(): void {
    this.destroyCharts();
    this.initDashboard();
    setTimeout(() => this.initCharts(), 500);
  }

  close(): void {
    this.modalService.dismissAll();
    this.refreshDashboard();
  }

  private initDashboard(): void {
    setTimeout(() => (this.animationState = 'final'), 100);
  }
}