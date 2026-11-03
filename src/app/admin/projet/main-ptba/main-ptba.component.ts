import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PtbaActivity, PtbaFilters, PtbaResponse, PtbaTrimester} from '@/app/models/ptba.model';
import { ManangementUnitService } from "@/app/services/manangement-unit/manangement-unit.service"; // Assurez-vous que le chemin est correct

// Les constantes pour les filtres peuvent rester
const TRIMESTRES = [
  { value: 'all', label: 'Tous les trimestres' },
  { value: 1, label: 'Trimestre 1' },
  { value: 2, label: 'Trimestre 2' },
  { value: 3, label: 'Trimestre 3' },
  { value: 4, label: 'Trimestre 4' }
];

const MOIS = [
  { value: 'all', label: 'Tous les mois' },
  { value: 'janvier', label: 'Janvier' },
  { value: 'fevrier', label: 'Février' },
  { value: 'mars', label: 'Mars' },
  { value: 'avril', label: 'Avril' },
  { value: 'mai', label: 'Mai' },
  { value: 'juin', label: 'Juin' },
  { value: 'juillet', label: 'Juillet' },
  { value: 'aout', label: 'Août' },
  { value: 'septembre', label: 'Septembre' },
  { value: 'octobre', label: 'Octobre' },
  { value: 'novembre', label: 'Novembre' },
  { value: 'decembre', label: 'Décembre' }
];


@Component({
  selector: 'app-main-ptba',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main-ptba.component.html',
  styleUrls: ['./main-ptba.component.scss']
})
export class MainPtbaComponent implements OnInit, OnChanges {
  @Input() ptbaParams!: { year: number; budgetId: string; timestamp: number };

  // Données
  allActivities: any[] = [];
  filteredActivities: any[] = [];

  // Informations générales
  projetName: string = '';
  annee: number = new Date().getFullYear();

  // Options pour les filtres
  trimestres = TRIMESTRES;
  mois = MOIS;
  actions: any[] = [];
  acteurs: any[] = [];
  sourcesFinancement: string[] = [];

  // État des filtres
  filters: PtbaFilters = {
    trimestre: 'all',
    mois: 'all',
    action: 'all',
    acteurResponsable: 'all',
    sourceFinancement: 'all',
    searchText: ''
  };

  // Gestion des états
  isLoading: boolean = false;
  errorMessage: string = '';
  expandedRows: Set<string> = new Set();

  constructor(private readonly managementUnitService: ManangementUnitService) { }

  ngOnInit() {
    if (this.ptbaParams) {
      this.loadPtbaWithParams();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ptbaParams'] && !changes['ptbaParams'].firstChange) {
      this.loadPtbaWithParams();
    }
  }

  loadPtbaWithParams() {
    this.isLoading = true;
    this.errorMessage = '';

    const { year, budgetId } = this.ptbaParams;

    // Prépare les options pour l'appel de service en fonction du mode choisi dans le parent.
    const options: { budgetId?: string; annee?: number } = {};
    if (budgetId) {
      // Mode "Par Budget" : le budgetId est la clé.
      options.budgetId = budgetId;
    } else {
      // Mode "Par Année" : l'année est la clé.
      options.annee = year;
    }

    this.managementUnitService.generatePtba(options).subscribe({
      next: (response: PtbaResponse) => {
        this.processResponse(response);
      },
      error: (err) => {
        console.error('Erreur lors du chargement du PTBA:', err);
        this.errorMessage = "Une erreur est survenue lors du chargement des données du PTBA.";
        this.isLoading = false;
      }
    });
  }

  processResponse(response: PtbaResponse) {
    this.allActivities = response.activities || [];
    this.projetName = response.projetName;
    this.annee = response.annee;

    this.initializeFilters(response);
    this.applyFilters();

    this.isLoading = false;
  }

  initializeFilters(response: PtbaResponse) {
    const uniqueActions = [...new Set(this.allActivities.map(a => a.action).filter(Boolean))];
    const uniqueActeurs = [...new Set(this.allActivities.map(a => a.acteurResponsable).filter(Boolean))];

    this.actions = ['Toutes les actions', ...uniqueActions];
    this.acteurs = ['Tous les acteurs', ...uniqueActeurs];

    this.sourcesFinancement = ['Toutes les sources', ...(response.bailleurs || [])];

    // Réinitialise les filtres après avoir peuplé les options
    this.resetFilters();
  }

  applyFilters() {
    let result = [...this.allActivities];

    // Filtre par trimestre
    if (this.filters.trimestre !== 'all') {
      result = result.filter(activity => {
        const trimKey = `trimestre${this.filters.trimestre}` as keyof PtbaActivity;
        const trim = activity[trimKey] as PtbaTrimester; // Cast en type correct
        return trim && Object.values(trim).some(v => v === true);
      });
    }

    // Filtre par mois
    if (this.filters.mois !== 'all') {
      const moisKey = this.filters.mois as keyof PtbaTrimester;
      result = result.filter(activity => {
        return (activity.trimestre1 && activity.trimestre1[moisKey]) ||
            (activity.trimestre2 && activity.trimestre2[moisKey]) ||
            (activity.trimestre3 && activity.trimestre3[moisKey]) ||
            (activity.trimestre4 && activity.trimestre4[moisKey]);
      });
    }

    // Filtres par Action, Acteur
    if (this.filters.action !== 'all' && this.filters.action !== 'Toutes les actions') {
      result = result.filter(activity => activity.action === this.filters.action);
    }
    if (this.filters.acteurResponsable !== 'all' && this.filters.acteurResponsable !== 'Tous les acteurs') {
      result = result.filter(activity => activity.acteurResponsable === this.filters.acteurResponsable);
    }

    // Filtre par source de financement (corrigé pour la nouvelle structure)
    if (this.filters.sourceFinancement !== 'all' && this.filters.sourceFinancement !== 'Toutes les sources') {
      result = result.filter(activity =>
          activity.sourcesFinancement?.sources &&
          Object.keys(activity.sourcesFinancement.sources).includes(this.filters.sourceFinancement)
      );
    }

    // Recherche textuelle
    if (this.filters.searchText.trim()) {
      const searchLower = this.filters.searchText.toLowerCase();
      result = result.filter(activity =>
          activity.activite.toLowerCase().includes(searchLower) ||
          activity.objectif.toLowerCase().includes(searchLower) ||
          activity.action.toLowerCase().includes(searchLower) ||
          (activity.taches && activity.taches.toLowerCase().includes(searchLower))
      );
    }

    this.filteredActivities = result;
  }

  getMonthsForTrimester(activity: PtbaActivity, trimestre: number): string[] {
    const trimKey = `trimestre${trimestre}` as keyof PtbaActivity;
    const trim = activity[trimKey];
    const months: string[] = [];

    if (trim && typeof trim === 'object') {
      const trimObj = trim as any;
      const monthNames = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];
      monthNames.forEach(month => {
        if (trimObj[month]) months.push(month);
      });
    }

    return months;
  }

  resetFilters() {
    this.filters = {
      trimestre: 'all',
      mois: 'all',
      action: 'all',
      acteurResponsable: 'all',
      sourceFinancement: 'all',
      searchText: ''
    };
    this.applyFilters();
  }

  toggleRow(id: any) {
    if (this.expandedRows.has(id)) {
      this.expandedRows.delete(id);
    } else {
      this.expandedRows.add(id);
    }
  }

  isRowExpanded(id: any): boolean {
    return this.expandedRows.has(id);
  }

  formatCurrency(amount: any): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0
    }).format(amount) + ' FCFA';
  }

  getTotalCout(): number {
    return this.filteredActivities.reduce((sum, activity) => sum + activity.coutCFA, 0);
  }

  /**
   * Vérifie si une activité a au moins un trimestre planifié
   */
  hasAnyTrimestre(activity: PtbaActivity): boolean {
    return this.getMonthsForTrimester(activity, 1).length > 0 ||
        this.getMonthsForTrimester(activity, 2).length > 0 ||
        this.getMonthsForTrimester(activity, 3).length > 0 ||
        this.getMonthsForTrimester(activity, 4).length > 0;
  }

}
