import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { finalize, forkJoin } from 'rxjs';
import { BudgetDashboardService } from '@/app/services/dashboardBudgetaire/budget-dashboard.service';

interface StatisticalFundingDTO {
    label: string; 
    value: number; 
}

interface MonthlyConsumption {
    monthYear: string;
    amount: number;
}

@Component({
    selector: 'app-budget-dashbord',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    templateUrl: './budget-dashbord.component.html', 
    styleUrls: ['./budget-dashbord.component.scss'] 
})
export class BudgetDashbordComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('yearChartCanvas') yearChartCanvas!: ElementRef;
    @ViewChild('executionChartCanvas') executionChartCanvas!: ElementRef;
    @ViewChild('evolutionChartCanvas') evolutionChartCanvas!: ElementRef;
    @ViewChild('topBudgetsChartCanvas') topBudgetsChartCanvas!: ElementRef;

    // Données des KPIs
    totalBudget: number = 0;
    totalConsumed: number = 0;
    totalRemaining: number = 0;

    budgetDistributionByYear: StatisticalFundingDTO[] = []; 
    topBudgetsByExecution: StatisticalFundingDTO[] = []; 
    topBudgetsByAmount: StatisticalFundingDTO[] = []; 
    monthlyConsumptionEvolution: MonthlyConsumption[] = []; 

    yearOptions: string[] = [];

    // Filtres
    selectedYear: string = 'all';

    // Instances de Chart.js
    private yearChart!: Chart;
    private executionChart!: Chart;
    private evolutionChart!: Chart;
    private topBudgetsChart!: Chart;

    private dashboardData: any = null; // Stockage temporaire des données
    private viewInitialized = false;

    constructor(private dashboardService: BudgetDashboardService) { 
        Chart.register(...registerables);
    }

    ngOnInit() {
        console.log('Dashbord ngOnInit - début');
        this.loadDashbordData();
    }

    ngAfterViewInit() {
        console.log('ngAfterViewInit - Vue initialisée');
        this.viewInitialized = true;
        
        // Si les données sont déjà chargées, initialiser les graphiques
        if (this.dashboardData) {
            setTimeout(() => {
                this.initCharts();
            }, 0);
        }
    }

    ngOnDestroy() {
        this.destroyCharts();
    }

    destroyCharts(): void {
        if (this.yearChart) this.yearChart.destroy();
        if (this.executionChart) this.executionChart.destroy();
        if (this.evolutionChart) this.evolutionChart.destroy();
        if (this.topBudgetsChart) this.topBudgetsChart.destroy();
    }

    // ======================= CHARGEMENT DES DONNÉES DU BACKEND =======================

    loadDashbordData() {
        const kpis$ = this.dashboardService.getBudgetSummaryKpis();
        const distributionByYear$ = this.dashboardService.getBudgetDistributionByYear();
        const top5Amount$ = this.dashboardService.getTop5BudgetsByAmount();
        const top5Execution$ = this.dashboardService.getTop5BudgetExecutionRates();
        const monthlyEvolution$ = this.dashboardService.getMonthlyConsumptionEvolution();

        forkJoin({
            kpis: kpis$,
            yearDistribution: distributionByYear$,
            top5Amount: top5Amount$,
            top5Execution: top5Execution$,
            monthlyEvolution: monthlyEvolution$
        }).subscribe({
            next: (results: any) => {
                console.log('=== DONNÉES BACKEND REÇUES ===');
                console.log('KPIs:', results.kpis);
                console.log('Year Distribution:', results.yearDistribution);
                console.log('Top 5 Amount:', results.top5Amount);
                console.log('Top 5 Execution:', results.top5Execution);
                console.log('Monthly Evolution:', results.monthlyEvolution);
                
                // Stocker les données
                this.dashboardData = results;
                
                // Mettre à jour les KPIs
                this.totalBudget = results.kpis?.totalBudget || 0;
                this.totalConsumed = results.kpis?.totalConsumed || 0;
                this.totalRemaining = results.kpis?.totalRemaining || 0;
                
                // Mettre à jour les données des graphiques
                this.budgetDistributionByYear = results.yearDistribution || [];
                this.topBudgetsByAmount = results.top5Amount || [];
                this.topBudgetsByExecution = results.top5Execution || [];
                this.monthlyConsumptionEvolution = results.monthlyEvolution || [];

                // Year Options (triées par ordre décroissant)
                this.yearOptions = [...new Set(this.budgetDistributionByYear.map(d => d.label))]
                    .sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
                
                // Si la vue est déjà initialisée, créer les graphiques
                if (this.viewInitialized && this.yearChartCanvas?.nativeElement) {
                    this.destroyCharts();
                    setTimeout(() => {
                        this.initCharts();
                    }, 0);
                }
            },
            error: (error) => {
                console.error('Erreur lors du chargement des données du dashboard:', error);
            }
        });
    }

    // ======================= GESTION DES GRAPHIQUES =======================

    initCharts() {
        console.log('=== INITIALISATION DES GRAPHIQUES ===');
        console.log('yearChartCanvas disponible:', !!this.yearChartCanvas?.nativeElement);
        console.log('executionChartCanvas disponible:', !!this.executionChartCanvas?.nativeElement);
        console.log('evolutionChartCanvas disponible:', !!this.evolutionChartCanvas?.nativeElement);
        console.log('topBudgetsChartCanvas disponible:', !!this.topBudgetsChartCanvas?.nativeElement);
        
        this.initYearChart();
        this.initExecutionChart();
        this.initEvolutionChart();
        this.initTopBudgetsChart();
    }

    // ======================= GRAPHIQUE: RÉPARTITION PAR ANNÉE =======================
    initYearChart() {
        if (!this.yearChartCanvas?.nativeElement) {
            console.warn('❌ yearChartCanvas non disponible');
            return;
        }
        
        if (!this.budgetDistributionByYear || this.budgetDistributionByYear.length === 0) {
            console.warn('❌ Pas de données pour budgetDistributionByYear');
            return;
        }

        const ctx = this.yearChartCanvas.nativeElement.getContext('2d');
        if (!ctx) {
            console.warn('❌ Impossible de récupérer le contexte 2D');
            return;
        }
        
        // Filtrage selon l'année sélectionnée
        let filteredData: StatisticalFundingDTO[] = [];
        
        if (this.selectedYear === 'all') {
            filteredData = [...this.budgetDistributionByYear].sort((a, b) => {
                return parseInt(a.label, 10) - parseInt(b.label, 10);
            });
        } else {
            filteredData = this.budgetDistributionByYear.filter(d => d.label === this.selectedYear);
        }

        if (filteredData.length === 0) {
            console.warn('❌ Aucune donnée après filtrage');
            return;
        }

        const labels = filteredData.map(d => d.label);
        const amounts = filteredData.map(d => d.value);

        console.log('✅ Création graphique année - Labels:', labels, 'Amounts:', amounts);

        this.yearChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Budget par Année',
                    data: amounts,
                    backgroundColor: '#4e73df',
                    borderColor: '#4e73df',
                    borderWidth: 1,
                    borderRadius: 8,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        display: true,
                        position: 'top'
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
                    },
                    x: {
                        ticks: {
                            autoSkip: false
                        }
                    }
                }
            }
        });
        
        console.log('✅ Graphique année créé avec succès');
    }

    // ======================= GRAPHIQUE: TOP 5 EXÉCUTION =======================
    initExecutionChart() {
        if (!this.executionChartCanvas?.nativeElement) {
            console.warn('❌ executionChartCanvas non disponible');
            return;
        }
        
        if (!this.topBudgetsByExecution || this.topBudgetsByExecution.length === 0) {
            console.warn('❌ Pas de données pour topBudgetsByExecution');
            return;
        }
        
        const ctx = this.executionChartCanvas.nativeElement.getContext('2d');
        if (!ctx) return;
        
        const topBudgets = this.topBudgetsByExecution;
        
        console.log('✅ Création graphique exécution - Budgets:', topBudgets.length);
        
        this.executionChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: topBudgets.map(b => b.label), 
                datasets: [{
                    label: 'Taux d\'exécution (%)',
                    data: topBudgets.map(b => b.value), 
                    backgroundColor: topBudgets.map(b => this.getColorByExecutionRate(b.value)),
                    borderColor: topBudgets.map(b => this.getColorByExecutionRate(b.value)),
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `Exécution: ${context.raw}%`;
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
        
        console.log('✅ Graphique exécution créé avec succès');
    }

    // ======================= GRAPHIQUE: ÉVOLUTION MENSUELLE =======================
    initEvolutionChart() {
        if (!this.evolutionChartCanvas?.nativeElement) {
            console.warn('❌ evolutionChartCanvas non disponible');
            return;
        }
        
        if (!this.monthlyConsumptionEvolution || this.monthlyConsumptionEvolution.length === 0) {
            console.warn('❌ Pas de données pour monthlyConsumptionEvolution');
            return;
        }
        
        const ctx = this.evolutionChartCanvas.nativeElement.getContext('2d');
        if (!ctx) return;
        
        const labels = this.monthlyConsumptionEvolution.map(data => data.monthYear);
        const amounts = this.monthlyConsumptionEvolution.map(data => data.amount);
        
        console.log('✅ Création graphique évolution - Mois:', labels.length);
        
        this.evolutionChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels, 
                datasets: [{
                    label: 'Budget consommé (FCFA)',
                    data: amounts,
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
                    legend: { position: 'top' }
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
        
        console.log('✅ Graphique évolution créé avec succès');
    }

    // ======================= GRAPHIQUE: TOP BUDGETS PAR MONTANT =======================
    initTopBudgetsChart() {
        if (!this.topBudgetsChartCanvas?.nativeElement) {
            console.warn('❌ topBudgetsChartCanvas non disponible');
            return;
        }
        
        if (!this.topBudgetsByAmount || this.topBudgetsByAmount.length === 0) {
            console.warn('❌ Pas de données pour topBudgetsByAmount');
            return;
        }
        
        console.log('=== INITIALISATION GRAPHIQUE TOP BUDGETS ===');
        console.log('Nombre de budgets:', this.topBudgetsByAmount.length);
        console.log('Données brutes:', this.topBudgetsByAmount);
        
        const ctx = this.topBudgetsChartCanvas.nativeElement.getContext('2d');
        if (!ctx) return;
        
        const validBudgets = this.topBudgetsByAmount.filter(b => 
            b && b.label && typeof b.value === 'number' && !isNaN(b.value)
        );
        
        if (validBudgets.length === 0) {
            console.error('❌ Aucune donnée valide après filtrage');
            return;
        }
        
        const labels = validBudgets.map(b => b.label);
        const data = validBudgets.map(b => b.value);
        
        const colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796', '#5a5c69', '#17a2b8'];
        const backgroundColors = validBudgets.map((_, index) => colors[index % colors.length]);
        
        console.log('✅ Création graphique top budgets - Labels:', labels.length);
        
        this.topBudgetsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Montant (FCFA)',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors,
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: (context) => {
                                const label = context.label || '';
                                const value = context.raw as number;
                                return `${label}: ${this.formatMontant(value)}`;
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
                    },
                    x: {
                        ticks: {
                            autoSkip: false,
                            maxRotation: 45,
                            minRotation: 0
                        }
                    }
                }
            }
        });
        
        console.log('✅ Graphique Top Budgets créé avec succès');
    }

    // ======================= METHODES UTILITAIRES =======================

    formatMontant(montant: number): string {
        if (!montant || isNaN(montant)) {
            return '0 F CFA';
        }
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0
        }).format(montant);
    }

    getConsumptionPercentage(): number {
        return this.totalBudget > 0 ? Math.round((this.totalConsumed / this.totalBudget) * 100) : 0;
    }

    getRemainingPercentage(): number {
        return this.totalBudget > 0 ? Math.round((this.totalRemaining / this.totalBudget) * 100) : 0;
    }

    getExecutionRate(): number {
        const rate = this.totalBudget > 0 ? (this.totalConsumed / this.totalBudget) * 100 : 0;
        return Math.min(100, Math.round(rate));
    }

    getColorByExecutionRate(taux: number): string {
        if (taux >= 80) return '#1cc88a';
        if (taux >= 50) return '#f6c23e';
        return '#e74a3b';
    }

    refreshDashbord() {
        console.log('🔄 Rafraîchissement du dashbord...');
        this.selectedYear = 'all';
        this.destroyCharts();
        this.loadDashbordData();
    }

    updateCharts() {
        console.log('🔄 Changement de filtre année:', this.selectedYear);
        if (this.yearChart) {
            this.yearChart.destroy();
        }
        setTimeout(() => {
            this.initYearChart();
        }, 0);
    }
}