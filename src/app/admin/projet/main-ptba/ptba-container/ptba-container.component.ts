import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPtbaComponent} from "@/app/admin/projet/main-ptba/main-ptba.component";
import {PtbaTableExcelComponent} from "@/app/admin/projet/main-ptba/ptba-table-excel/ptba-table-excel.component";
import {FinancementBudgetService} from "@/app/services/financement-budget.service";
import {FormsModule} from "@angular/forms";
import {ManangementUnitService} from "@/app/services/manangement-unit/manangement-unit.service";

@Component({
    selector: 'app-ptba-container',
    standalone: true,
    imports: [CommonModule, MainPtbaComponent, PtbaTableExcelComponent, FormsModule],
    templateUrl: './ptba-container.component.html',
    styleUrl: './ptba-container.component.scss'
})
export class PtbaContainerComponent implements OnInit {
    activeView: 'filters' | 'excel' = 'filters';

    // Paramètres de sélection
    selectedYear: number = new Date().getFullYear();
    selectedBudgetId: string = '';
    searchMode: 'year' | 'budget' = 'year';

    // Options disponibles
    availableYears: number[] = [];
    availableBudgets: any[] = [];

    // Données à passer aux composants enfants
    ptbaParams = {
        year: this.selectedYear,
        budgetId: '',
        timestamp: Date.now()
    };

    // États de chargement
    isLoadingBudgets: boolean = false;
    budgetsError: string = '';

    constructor(private readonly budgetService: FinancementBudgetService,
                private readonly managementUnitService: ManangementUnitService) {
    }

    ngOnInit() {
        this.initializeYears();
        this.loadBudgets();

        // Récupérer les paramètres depuis localStorage si disponibles
        const storedYear = localStorage.getItem('selectedYear');
        const storedBudgetId = localStorage.getItem('selectedBudgetId');
        const storedMode = localStorage.getItem('searchMode');

        if (storedYear) {
            this.selectedYear = parseInt(storedYear);
        }
        if (storedBudgetId) {
            this.selectedBudgetId = storedBudgetId;
        }
        if (storedMode === 'budget' || storedMode === 'year') {
            this.searchMode = storedMode;
        }

        this.applySelection();
    }

    initializeYears() {
        const currentYear = new Date().getFullYear();
        for (let i = currentYear - 5; i <= currentYear + 5; i++) {
            this.availableYears.push(i);
        }
    }

    onSearchModeChange() {
        // Réinitialiser la sélection du budget si on passe en mode année
        if (this.searchMode === 'year') {
            this.selectedBudgetId = '';
        }
        this.applySelection();
    }


    applySelection() {
        console.log()
        // Validation
        if (this.searchMode === 'budget' && !this.selectedBudgetId) {
            console.warn('Aucun budget sélectionné en mode budget');
            return;
        }

        // Sauvegarder dans localStorage
        localStorage.setItem('selectedYear', this.selectedYear.toString());
        localStorage.setItem('selectedBudgetId', this.selectedBudgetId);
        localStorage.setItem('searchMode', this.searchMode);

        // Mettre à jour les paramètres pour les composants enfants
        this.ptbaParams = {
            year: this.selectedYear,
            budgetId: this.searchMode === 'budget' ? this.selectedBudgetId : '',
            timestamp: Date.now() // Force le rechargement
        };
    }

    getBudgetName(budgetId: string): string {
        const budget = this.availableBudgets.find(b => b.id.toString() === budgetId);
        return budget ? budget.libelle : 'Budget inconnu';
    }

    loadBudgets() {
        this.isLoadingBudgets = true;
        this.budgetsError = '';

        let pageOptions = {page: 0, size: 100};

        this.budgetService.readAllBudgetDgpsn(pageOptions).subscribe({
            next: response => {
                this.availableBudgets = response.content || [];
                this.isLoadingBudgets = false;
            },
            error: err => {
                console.error('Erreur lors du chargement des budgets:', err);
                this.budgetsError = 'Impossible de charger la liste des budgets';
                this.isLoadingBudgets = false;
            }
        });
    }

    switchView(view: 'filters' | 'excel') {
        this.activeView = view;
    }

    exportToCSV() {
        // Logique d'export CSV
        console.log('Export CSV en cours...');
    }

    exportToPDF() {
        // Logique d'export PDF
        console.log('Export PDF en cours...');
    }

    /**
     * Rafraîchir manuellement les données
     */
    refreshData() {
        this.applySelection();
    }
}
