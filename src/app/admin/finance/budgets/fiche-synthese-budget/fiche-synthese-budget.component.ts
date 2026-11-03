
import { Component, EventEmitter, Input, OnInit, signal, ViewChild, ElementRef, AfterViewInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconDirective } from '@core/feather-icon/feather-icon.directive';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { FinancementBudgetService } from '@/app/services/financement-budget.service';
import { ExcelExportService } from '@/app/services/ExcelExport/excel-export.service';

Chart.register(...registerables);

interface LigneBudgetaire {
  code: string;
  libelle: string;
  budgetInitial: number;
  realise: number;
  tauxExecution: number;
  reste: number;
}

interface DonneesMensuelles {
  mois: string;
  budgetRecettes: number;
  realiseRecettes: number;
  budgetDepenses: number;
  realiseDepenses: number;
}

interface EvolutionTrimestrielle {
  periode: string;
  budgetRecettes: number;
  realiseRecettes: number;
  budgetDepenses: number;
  realiseDepenses: number;
}

interface CategorieDepense {
  libelle: string;
  budget: number;
  realise: number;
  taux: number;
}

interface RepartitionRecette {
  libelle: string;
  montant: number;
  pourcentage: number;
}

interface DonneeTrimestrielle {
  trimestre: string;
  budgetRecettes: number;
  realiseRecettes: number;
  tauxRecettes: number;
  budgetDepenses: number;
  realiseDepenses: number;
  tauxDepenses: number;
}

@Component({
  selector: 'app-fiche-synthese-budget',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    NgbModule,
    FeatherIconDirective
  ],
  templateUrl: './fiche-synthese-budget.component.html',
  styleUrl: './fiche-synthese-budget.component.scss'
})
export class FicheSyntheseBudgetComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() submit = new EventEmitter<boolean>();
  @Input() budgetId: any;

  @ViewChild('chartRecettes') chartRecettesRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartDepenses') chartDepensesRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartCategories') chartCategoriesRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartRepartition') chartRepartitionRef!: ElementRef<HTMLCanvasElement>;
 private excelExportService = inject(ExcelExportService);
  private chartRecettes: Chart | null = null;
  private chartDepenses: Chart | null = null;
  private chartCategories: Chart | null = null;
  private chartRepartition: Chart | null = null;

  private budgetService = inject(FinancementBudgetService);

  periodeSelectionnee = signal<string>('annee');
  periodeOptions = [
    { value: 'annee', label: 'Annuelle' },
    { value: 'trimestre', label: 'Trimestrielle' },
    { value: 'mois', label: 'Mensuelle' }
  ];

  trimestreOptions = ['T1', 'T2', 'T3', 'T4'];
  moisOptions = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  trimestreSelectionne = 'T1';
  moisSelectionne = 'Janvier';

  budgetData = {
    code: '',
    libelle: '',
    annee: 0,
    montantTotalRecettes: 0,
    montantRealiseRecettes: 0,
    tauxExecutionRecettes: 0,
    montantTotalDepenses: 0,
    montantRealiseDepenses: 0,
    tauxExecutionDepenses: 0
  };

  displayedColumns = ['code', 'libelle', 'budgetInitial', 'realise', 'tauxExecution', 'reste'];

  lignesRecettes: LigneBudgetaire[] = [];
  lignesDepenses: LigneBudgetaire[] = [];
  donneesMensuelles: DonneesMensuelles[] = [];
  donneesTrimestrielles: DonneeTrimestrielle[] = [];
  evolutionTrimestrielle: EvolutionTrimestrielle[] = [];
  repartitionRecettes: RepartitionRecette[] = [];
  categoriesDepenses: CategorieDepense[] = [];

  ngOnInit(): void {
    if (this.budgetId) {
      this.chargerDonnees();
    }
  }

  ngAfterViewInit(): void {
    // Les graphiques seront initialisés après le chargement des données
  }

  chargerDonnees(): void {
    const periode = this.periodeSelectionnee();
    let trimestre: number | undefined;
    let mois: number | undefined;

    // Convertir trimestre et mois en nombres
    if (periode === 'trimestre') {
      trimestre = parseInt(this.trimestreSelectionne.replace('T', ''));
    } else if (periode === 'mois') {
      mois = this.moisOptions.indexOf(this.moisSelectionne) + 1;
    }

    this.budgetService.getBudgetSynthese(this.budgetId, periode, trimestre, mois).subscribe({
      next: (response) => {
        const data = response.body;
        this.traiterDonnees(data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données:', err);
      }
    });
  }

  traiterDonnees(data: any): void {
    const lignes: any[] = data.lignes || [];
    const realisations: any[] = data.realisations || [];
    // Créer une map des réalisations par ligneBudgetaire.id
    const realisationsMap = new Map<number, number>();
    realisations.forEach((r: any) => {
      const ligneId = r.ligneBudgetaire?.id;
      if (ligneId) {
        realisationsMap.set(ligneId, (realisationsMap.get(ligneId) || 0) + r.montant);
      }
    });

    // Filtrer recettes (CLASSE_7) et dépenses (CLASSE_6)
    const recettesLignes = lignes.filter((l: any) => l.typeLigneBugetaire.name === 'CLASSE_7');
    const depensesLignes = lignes.filter((l: any) => l.typeLigneBugetaire.name === 'CLASSE_6');

    // Construire lignesRecettes avec réalisations
    this.lignesRecettes = recettesLignes.map((l: any) => {
      const realise = realisationsMap.get(l.id) || 0;
      const taux = l.montant > 0 ? (realise / l.montant) * 100 : 0;
      return {
        code: l.rubrique.code,
        libelle: l.rubrique.libelle,
        budgetInitial: l.montant,
        realise,
        tauxExecution: Math.round(taux),
        reste: l.montant - realise
      };
    });

    // Construire lignesDepenses avec réalisations
    this.lignesDepenses = depensesLignes.map((l: any) => {
      const realise = realisationsMap.get(l.id) || 0;
      const taux = l.montant > 0 ? (realise / l.montant) * 100 : 0;
      return {
        code: l.rubrique.code,
        libelle: l.rubrique.libelle,
        budgetInitial: l.montant,
        realise,
        tauxExecution: Math.round(taux),
        reste: l.montant - realise
      };
    });

    // Calculer les totaux selon la période
    const periode = this.periodeSelectionnee();
    let facteurBudget = 1;
    
    if (periode === 'trimestre') {
      facteurBudget = 0.25; // 1/4 du budget annuel
    } else if (periode === 'mois') {
      facteurBudget = 1/12; // 1/12 du budget annuel
    }

    const totalRecettesAnnuel = this.lignesRecettes.reduce((s, l) => s + l.budgetInitial, 0);
    const totalDepensesAnnuel = this.lignesDepenses.reduce((s, l) => s + l.budgetInitial, 0);

    this.budgetData = {
      code: data.budget.code,
      libelle: data.budget.libelle,
      annee: data.budget.annee,
      montantTotalRecettes: totalRecettesAnnuel * facteurBudget,
      montantRealiseRecettes: this.lignesRecettes.reduce((s, l) => s + l.realise, 0),
      tauxExecutionRecettes: 0,
      montantTotalDepenses: totalDepensesAnnuel * facteurBudget,
      montantRealiseDepenses: this.lignesDepenses.reduce((s, l) => s + l.realise, 0),
      tauxExecutionDepenses: 0
    };

    // Calculer taux globaux
    this.budgetData.tauxExecutionRecettes = this.budgetData.montantTotalRecettes > 0
      ? Math.round((this.budgetData.montantRealiseRecettes / this.budgetData.montantTotalRecettes) * 100)
      : 0;

    this.budgetData.tauxExecutionDepenses = this.budgetData.montantTotalDepenses > 0
      ? Math.round((this.budgetData.montantRealiseDepenses / this.budgetData.montantTotalDepenses) * 100)
      : 0;

    // Préparer les données pour les graphiques
    this.preparerDonneesGraphiques(data, realisations, lignes, totalRecettesAnnuel, totalDepensesAnnuel);

    // Initialiser les graphiques APRÈS les données
    setTimeout(() => this.initCharts(), 0);
  }

  preparerDonneesGraphiques(data: any, realisations: any[], lignes: any[], totalRecettesAnnuel: number, totalDepensesAnnuel: number): void {
    const periode = this.periodeSelectionnee();

    // 1. Répartition des recettes
    this.repartitionRecettes = this.lignesRecettes
      .filter(l => l.realise > 0)
      .map(l => ({
        libelle: l.libelle,
        montant: l.realise,
        pourcentage: this.budgetData.montantRealiseRecettes > 0
          ? Math.round((l.realise / this.budgetData.montantRealiseRecettes) * 100)
          : 0
      }));

    // 2. Catégories de dépenses
    this.categoriesDepenses = this.lignesDepenses.map(l => ({
      libelle: l.libelle.length > 30 ? l.libelle.substring(0, 30) + '...' : l.libelle,
      budget: l.budgetInitial,
      realise: l.realise,
      taux: l.tauxExecution
    }));

    // 3. Évolution selon la période
    if (periode === 'annee') {
      this.preparerDonneesAnnuelles(realisations, lignes, totalRecettesAnnuel, totalDepensesAnnuel);
    } else if (periode === 'trimestre') {
      this.preparerDonneesTrimestrielles(totalRecettesAnnuel, totalDepensesAnnuel);
    } else if (periode === 'mois') {
      this.preparerDonneesMensuelles(totalRecettesAnnuel, totalDepensesAnnuel);
    }
  }

  preparerDonneesAnnuelles(realisations: any[], lignes: any[], totalRecettesAnnuel: number, totalDepensesAnnuel: number): void {
    const moisMap = new Map<string, { recettes: number; depenses: number }>();
    
    realisations.forEach((r: any) => {
      const ligneId = r.ligneBudgetaire?.id;
      const montant = r.montant || 0;
      const dateArr = r.date;
      if (!ligneId || !dateArr || dateArr.length < 3) return;

      const date = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
      const moisKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const entry = moisMap.get(moisKey) || { recettes: 0, depenses: 0 };
      const ligne = lignes.find(l => l.id === ligneId);
      
      if (ligne?.typeLigneBugetaire.name === 'CLASSE_7') {
        entry.recettes += montant;
      } else if (ligne?.typeLigneBugetaire.name === 'CLASSE_6') {
        entry.depenses += montant;
      }
      moisMap.set(moisKey, entry);
    });

    const moisKeys = Array.from(moisMap.keys()).sort();
    const budgetMensuelRecettes = totalRecettesAnnuel / 12;
    const budgetMensuelDepenses = totalDepensesAnnuel / 12;

    this.evolutionTrimestrielle = moisKeys.map(key => {
      const data = moisMap.get(key)!;
      return {
        periode: this.formatMois(key),
        budgetRecettes: budgetMensuelRecettes,
        realiseRecettes: data.recettes,
        budgetDepenses: budgetMensuelDepenses,
        realiseDepenses: data.depenses
      };
    });

    if (this.evolutionTrimestrielle.length === 0) {
      this.evolutionTrimestrielle = [{
        periode: 'Aucune donnée',
        budgetRecettes: 0,
        realiseRecettes: 0,
        budgetDepenses: 0,
        realiseDepenses: 0
      }];
    }
  }

  preparerDonneesTrimestrielles(totalRecettesAnnuel: number, totalDepensesAnnuel: number): void {
    // Préparer les données pour les 4 trimestres
    this.donneesTrimestrielles = [];
    
    const trimestreSelectionneNum = parseInt(this.trimestreSelectionne.replace('T', ''));
    
    for (let t = 1; t <= 4; t++) {
      const trimestre = `T${t}`;
      const budgetTrimestrielRecettes = totalRecettesAnnuel * 0.25;
      const budgetTrimestrielDepenses = totalDepensesAnnuel * 0.25;
      
      // Pour le trimestre sélectionné, on a les réalisations filtrées
      const realiseRecettes = t === trimestreSelectionneNum
        ? this.budgetData.montantRealiseRecettes
        : 0;
      const realiseDepenses = t === trimestreSelectionneNum
        ? this.budgetData.montantRealiseDepenses
        : 0;
      
      this.donneesTrimestrielles.push({
        trimestre,
        budgetRecettes: budgetTrimestrielRecettes,
        realiseRecettes,
        tauxRecettes: budgetTrimestrielRecettes > 0 
          ? Math.round((realiseRecettes / budgetTrimestrielRecettes) * 100) 
          : 0,
        budgetDepenses: budgetTrimestrielDepenses,
        realiseDepenses,
        tauxDepenses: budgetTrimestrielDepenses > 0 
          ? Math.round((realiseDepenses / budgetTrimestrielDepenses) * 100) 
          : 0
      });
    }

    // Pour les graphiques en vue trimestrielle
    this.evolutionTrimestrielle = this.donneesTrimestrielles.map(t => ({
      periode: t.trimestre,
      budgetRecettes: t.budgetRecettes,
      realiseRecettes: t.realiseRecettes,
      budgetDepenses: t.budgetDepenses,
      realiseDepenses: t.realiseDepenses
    }));
  }

  preparerDonneesMensuelles(totalRecettesAnnuel: number, totalDepensesAnnuel: number): void {
    this.donneesMensuelles = [];
    
    const moisSelectionneIndex = this.moisOptions.indexOf(this.moisSelectionne);
    const budgetMensuelRecettes = totalRecettesAnnuel / 12;
    const budgetMensuelDepenses = totalDepensesAnnuel / 12;
    
    this.moisOptions.forEach((mois, index) => {
      // Pour le mois sélectionné, on a les réalisations filtrées
      const realiseRecettes = index === moisSelectionneIndex
        ? this.budgetData.montantRealiseRecettes
        : 0;
      const realiseDepenses = index === moisSelectionneIndex
        ? this.budgetData.montantRealiseDepenses
        : 0;
      
      this.donneesMensuelles.push({
        mois,
        budgetRecettes: budgetMensuelRecettes,
        realiseRecettes,
        budgetDepenses: budgetMensuelDepenses,
        realiseDepenses
      });
    });

    // Pour les graphiques en vue mensuelle
    this.evolutionTrimestrielle = this.donneesMensuelles.map(m => ({
      periode: m.mois,
      budgetRecettes: m.budgetRecettes,
      realiseRecettes: m.realiseRecettes,
      budgetDepenses: m.budgetDepenses,
      realiseDepenses: m.realiseDepenses
    }));
  }

  initCharts(): void {
    this.createChartRecettes();
    this.createChartDepenses();
    this.createChartCategories();
    this.createChartRepartition();
  }

  createChartRecettes(): void {
    if (!this.chartRecettesRef) return;

    const ctx = this.chartRecettesRef.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chartRecettes) {
      this.chartRecettes.destroy();
    }

    this.chartRecettes = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.evolutionTrimestrielle.map(t => t.periode),
        datasets: [
          {
            label: 'Budget Recettes',
            data: this.evolutionTrimestrielle.map(t => t.budgetRecettes / 1000000),
            backgroundColor: 'rgba(40, 167, 69, 0.7)',
            borderColor: 'rgb(40, 167, 69)',
            borderWidth: 2
          },
          {
            label: 'Réalisations Recettes',
            data: this.evolutionTrimestrielle.map(t => t.realiseRecettes / 1000000),
            backgroundColor: 'rgba(13, 110, 253, 0.7)',
            borderColor: 'rgb(13, 110, 253)',
            borderWidth: 2
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
              font: { size: 12 },
              padding: 15
            }
          },
          title: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                return context.dataset.label + ': ' + this.formatMontant(context.parsed.y * 1000000);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Montant (Millions FCFA)'
            },
            ticks: {
              callback: (value) => {
                return this.formatNumber(Number(value));
              }
            }
          }
        }
      }
    });
  }

  createChartDepenses(): void {
    if (!this.chartDepensesRef) return;

    const ctx = this.chartDepensesRef.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chartDepenses) {
      this.chartDepenses.destroy();
    }

    this.chartDepenses = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.evolutionTrimestrielle.map(t => t.periode),
        datasets: [
          {
            label: 'Budget Dépenses',
            data: this.evolutionTrimestrielle.map(t => t.budgetDepenses / 1000000),
            backgroundColor: 'rgba(220, 53, 69, 0.7)',
            borderColor: 'rgb(220, 53, 69)',
            borderWidth: 2
          },
          {
            label: 'Réalisations Dépenses',
            data: this.evolutionTrimestrielle.map(t => t.realiseDepenses / 1000000),
            backgroundColor: 'rgba(255, 193, 7, 0.7)',
            borderColor: 'rgb(255, 193, 7)',
            borderWidth: 2
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
              font: { size: 12 },
              padding: 15
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                return context.dataset.label + ': ' + this.formatMontant(context.parsed.y * 1000000);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Montant (Millions FCFA)'
            },
            ticks: {
              callback: (value) => {
                return this.formatNumber(Number(value));
              }
            }
          }
        }
      }
    });
  }

  createChartCategories(): void {
    if (!this.chartCategoriesRef) return;

    const ctx = this.chartCategoriesRef.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chartCategories) {
      this.chartCategories.destroy();
    }

    this.chartCategories = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.categoriesDepenses.map(c => c.libelle),
        datasets: [
          {
            label: 'Budget Alloué',
            data: this.categoriesDepenses.map(c => c.budget / 1000000),
            backgroundColor: 'rgba(23, 162, 184, 0.7)',
            borderColor: 'rgb(23, 162, 184)',
            borderWidth: 2
          },
          {
            label: 'Réalisations',
            data: this.categoriesDepenses.map(c => c.realise / 1000000),
            backgroundColor: 'rgba(255, 193, 7, 0.7)',
            borderColor: 'rgb(255, 193, 7)',
            borderWidth: 2
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { size: 12 },
              padding: 15
            }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                return context.dataset.label + ': ' + this.formatMontant(context.parsed.x * 1000000);
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Montant (Millions FCFA)'
            },
            ticks: {
              callback: (value) => {
                return this.formatNumber(Number(value));
              }
            }
          }
        }
      }
    });
  }

  createChartRepartition(): void {
    if (!this.chartRepartitionRef) return;

    const ctx = this.chartRepartitionRef.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chartRepartition) {
      this.chartRepartition.destroy();
    }

    this.chartRepartition = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.repartitionRecettes.map(r => r.libelle),
        datasets: [{
          data: this.repartitionRecettes.map(r => r.montant),
          backgroundColor: [
            'rgba(40, 167, 69, 0.8)',
            'rgba(23, 162, 184, 0.8)',
            'rgba(255, 193, 7, 0.8)',
            'rgba(220, 53, 69, 0.8)',
            'rgba(13, 110, 253, 0.8)'
          ],
          borderColor: [
            'rgb(40, 167, 69)',
            'rgb(23, 162, 184)',
            'rgb(255, 193, 7)',
            'rgb(220, 53, 69)',
            'rgb(13, 110, 253)'
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
              font: { size: 12 },
              padding: 15
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed;
                const percentage = this.repartitionRecettes[context.dataIndex].pourcentage;
                return label + ': ' + this.formatMontant(value) + ' (' + percentage + '%)';
              }
            }
          }
        }
      }
    });
  }

  formatMontant(montant: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(montant || 0);
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  calculerTotalRecettes(): number {
    return this.lignesRecettes.reduce((sum, ligne) => sum + ligne.realise, 0);
  }

  calculerTotalDepenses(): number {
    return this.lignesDepenses.reduce((sum, ligne) => sum + ligne.realise, 0);
  }

  calculerTotalBudgetRecettes(): number {
    return this.lignesRecettes.reduce((sum, ligne) => sum + ligne.budgetInitial, 0);
  }

  calculerTotalBudgetDepenses(): number {
    return this.lignesDepenses.reduce((sum, ligne) => sum + ligne.budgetInitial, 0);
  }

  getTauxClass(taux: number): string {
    if (taux >= 80) return 'text-success';
    if (taux >= 60) return 'text-warning';
    return 'text-danger';
  }

  onPeriodeChange(): void {
    console.log('Période changée:', this.periodeSelectionnee());
    this.chargerDonnees();
  }

  onTrimestreChange(): void {
    if (this.periodeSelectionnee() === 'trimestre') {
      this.chargerDonnees();
    }
  }

  onMoisChange(): void {
    if (this.periodeSelectionnee() === 'mois') {
      this.chargerDonnees();
    }
  }

  imprimer(): void {
    window.print();
  }

  // exporter(): void {
  //   alert('Export en cours...');
  // }
async exporter(): Promise<void> {
  try {
    await this.excelExportService.exporterFicheSynthese(
      this.budgetData,
      this.lignesRecettes,
      this.lignesDepenses,
      this.donneesTrimestrielles,
      this.donneesMensuelles,
      this.repartitionRecettes,
      this.categoriesDepenses,
      this.evolutionTrimestrielle,
      this.periodeSelectionnee()
    );
  } catch (error) {
    console.error('Erreur lors de l\'export Excel:', error);
    alert('Une erreur est survenue lors de l\'export');
  }
}

  formatMois(moisKey: string): string {
    const [year, month] = moisKey.split('-');
    const mois = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    return `${mois[parseInt(month) - 1]} ${year}`;
  }

  ngOnDestroy(): void {
    if (this.chartRecettes) this.chartRecettes.destroy();
    if (this.chartDepenses) this.chartDepenses.destroy();
    if (this.chartCategories) this.chartCategories.destroy();
    if (this.chartRepartition) this.chartRepartition.destroy();
  }
}