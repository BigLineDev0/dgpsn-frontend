import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbDropdownModule,
  NgbTooltipModule,
  NgbAccordionModule,
  NgbNavModule,
  NgbAlertModule,
  NgbPopoverModule,
} from '@ng-bootstrap/ng-bootstrap';

// Custom
import { FeatherIconDirective } from '@core/feather-icon/feather-icon.directive';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

import { BudgetService } from '../../data/version2/budget.service';
import { Budget } from '../../data/version2/budget.model';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-etat-budget',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbAlertModule,
    NgbPopoverModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
    MatPaginatorModule,
    MatSelectModule,
    MatRadioModule,
    FeatherIconDirective,
    SpinnerComponent,
    NgSelectModule,
  ],
  templateUrl: './etat-budget.component.html',
  styleUrls: ['./etat-budget.component.scss'],
})
export class EtatBudgetComponent {
  displayedColumns: string[] = ['code', 'libelle', 'montant', 'annee', 'actions'];
  dataSource = new MatTableDataSource<Budget>([]);
  budgets = signal<Budget[]>([]);
  budgetToUpdate?: Budget;
  loading = signal<boolean>(true);
  pageOptions = { page: 0, size: 20 };

  // Filtres inline
  codeFilter = '';
  libelleFilter = '';
  anneeFilter = '';
  anneeOptions: string[] = [];

  // État pour les détails
  selectedBudgetId = signal<string | null>(null);
  etatDetails = signal<any[]>([]);
  
  // Months en français
  private months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];

  private router = inject(Router);
  private budgetService = inject(BudgetService);
  public dialog = inject(MatDialog);

  ngOnInit() {
    this.loadBudgets();
  }

  loadBudgets() {
    this.loading.set(true);
    try {
      const list = this.budgetService.allBudgets()();
      this.budgets.set(list);
      this.dataSource.data = list;
      this.anneeOptions = Array.from(new Set(list.map((b) => String(b.annee)))).sort();
    } catch (error) {
      console.error('Erreur lors du chargement des budgets :', error);
      this.dataSource.data = [];
    } finally {
      this.loading.set(false);
    }
  }

  applyFilters() {
    const filtered = this.budgets().filter((b) => {
      return (
        (!this.codeFilter || b.code.toLowerCase().includes(this.codeFilter.toLowerCase())) &&
        (!this.libelleFilter || b.libelle.toLowerCase().includes(this.libelleFilter.toLowerCase())) &&
        (!this.anneeFilter || String(b.annee) === this.anneeFilter)
      );
    });
    this.dataSource.data = filtered;
  }

  paginate($event: number) {
    this.pageOptions.page = $event - 1;
    this.loadBudgets();
  }

  // Charger les détails du budget
  openBudgetDetails(budgetId: string) {
    this.selectedBudgetId.set(budgetId);
    const foundBudget = this.budgetService.getBudgetById(budgetId);
    
    if (foundBudget) {
      this.etatDetails.set(this.budgetService.getEtatMensuel(budgetId));
    } else {
      console.error(`Budget with ID ${budgetId} not found`);
      this.etatDetails.set([]);
    }
  }

  // Fermer les détails
  closeBudgetDetails() {
    this.selectedBudgetId.set(null);
    this.etatDetails.set([]);
  }

  // Obtenir le nom du mois
  getMonthName(monthNumber: number): string {
    return this.months[monthNumber - 1] || '';
  }

  // Obtenir les clés de mois d'un objet
  getMoisKeys(realisationsParMois: Record<string, number>): string[] {
    return Object.keys(realisationsParMois || {});
  }

  calculTotalMontant(montantDepense: number, montantRecette: number): number {
    return (montantDepense || 0) + (montantRecette || 0);
  }

  formatMontant(montant: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(montant || 0);
  }

  downloadFile() {
    alert('Fonctionnalité non implémentée pour le téléchargement');
  }

  uploadFile() {
    alert("Fonctionnalité non implémentée pour l'importation");
  }
}