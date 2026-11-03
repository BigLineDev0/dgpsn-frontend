import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx-js-style';
import { ActivatedRoute } from '@angular/router';
import {
  BudgetReportRow,
  FinancialReportResponse,
  FinancialReportService
} from "@/app/services/financial-report/financial-report.service";
import {Engagement} from "@/app/admin/report/financial-report.mock";

type PeriodType = 'annuel' | 'mensuel' | 'trimestriel';

type EngagementTableRow = Engagement & {
  isTotal?: boolean;
  totalLabel?: string;
};

interface DynamicColumn {
  key: string;
  label: string;
  type: 'text' | 'number' | 'percent';
  isFixed?: boolean;
  isPeriodic?: boolean;
  width?: string;
}

@Component({
  selector: 'app-financial-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './financial-report.component.html',
  styleUrl: './financial-report.component.scss'
})
export class FinancialReportComponent implements OnInit {
  // Filtres
  selectedYear: number = 2025;
  selectedPeriodType: PeriodType = 'annuel';
  selectedTabIndex: number = 0;
  budgetId: number = 1;

  availableYears: number[] = [];

  // États de chargement
  isLoading: boolean = false;
  errorMessage: string = '';

  // Données chargées depuis le backend
  recettesFonctionnementData: BudgetReportRow[] = [];
  depensesFonctionnementData: BudgetReportRow[] = [];
  investissementData: BudgetReportRow[] = [];
  recapInvestissementData: BudgetReportRow[] = [];
  engagements: Engagement[] = [];

  engagementsWithTotals: EngagementTableRow[] = [];

  // Colonnes fixes pour recettes et dépenses
  fixedColumns: DynamicColumn[] = [
    { key: 'classe', label: 'Classe', type: 'text', isFixed: true, width: '60px' },
    { key: 'compte', label: 'Compte', type: 'text', isFixed: true, width: '80px' },
    { key: 'sousCompte', label: 'Sous-Compte', type: 'text', isFixed: true, width: '100px' },
    { key: 'rubrique', label: 'Rubriques', type: 'text', isFixed: true, width: '350px' },
    { key: 'budgetInitial', label: 'Budget Initial', type: 'number', isFixed: true, width: '130px' },
    { key: 'primitif', label: 'Primitif', type: 'number', isFixed: true, width: '130px' },
    { key: 'modification', label: 'Modification', type: 'number', isFixed: true, width: '130px' },
    { key: 'budgetModifie', label: 'Budget Modifié', type: 'number', isFixed: true, width: '130px' }
  ];

  // Colonnes pour récapitulatif investissement
  recapColumns: DynamicColumn[] = [
    { key: 'classe', label: 'Classe', type: 'text', isFixed: true, width: '50px' },
    { key: 'compte', label: 'Compte', type: 'text', isFixed: true, width: '60px' },
    { key: 'sousCompte', label: 'Sous-Compte', type: 'text', isFixed: true, width: '80px' },
    { key: 'rubrique', label: 'Rubrique', type: 'text', isFixed: true, width: '350px' },
    { key: 'budgetInitial', label: 'Budget Initial', type: 'number', isFixed: true, width: '120px' },
    { key: 'realisationsCumulees', label: 'Réalisations', type: 'number', isFixed: true, width: '130px' },
    { key: 'tauxExecution', label: 'Niveau d\'exécution (%)', type: 'percent', isFixed: true, width: '100px' },
    { key: 'resteARealiser', label: 'Reste à réaliser', type: 'number', isFixed: true, width: '120px' },
    { key: 'budgetModifie', label: 'Budget Modifié', type: 'number', isFixed: true, width: '120px' },
    { key: 't1', label: 'CUMUL PREMIER TRIMESTRE', type: 'number', isPeriodic: true, width: '110px' },
    { key: 't2', label: 'CUMUL DEUXIEME TRIMESTRE', type: 'number', isPeriodic: true, width: '110px' },
    { key: 't3', label: 'CUMUL TROISIEME TRIMESTRE', type: 'number', isPeriodic: true, width: '110px' },
    { key: 't4', label: 'CUMUL QUATRIEME TRIMESTRE', type: 'number', isPeriodic: true, width: '110px' }
  ];

  // Colonnes périodiques (générées dynamiquement)
  periodicColumns: DynamicColumn[] = [];

  // Colonnes de synthèse
  summaryColumns: DynamicColumn[] = [
    { key: 'realisationsCumulees', label: 'Réalisations Cumulées', type: 'number', isFixed: true, width: '130px' },
    { key: 'tauxExecution', label: 'Taux d\'Exécution (%)', type: 'percent', isFixed: true, width: '100px' },
    { key: 'resteARealiser', label: 'Reste à Réaliser', type: 'number', isFixed: true, width: '120px' }
  ];

  // Toutes les colonnes (calculées dynamiquement)
  allColumns: DynamicColumn[] = [];

  // Colonnes pour engagements
  engagementColumns: DynamicColumn[] = [
    { key: 'numBon', label: 'N° Bon engagement', type: 'text', isFixed: true },
    { key: 'dateEngagement', label: 'Date engagement', type: 'text', isFixed: true },
    { key: 'numBE', label: 'N°BE', type: 'text', isFixed: true },
    { key: 'numMandat', label: 'N° Mandat', type: 'text', isFixed: true },
    { key: 'factureEtat', label: 'Factures/Etats', type: 'text', isFixed: true },
    { key: 'montants', label: 'Montants', type: 'number', isFixed: true },
    { key: 'fournisseurBeneficiaire', label: 'Fournisseurs/Bénéficiaires', type: 'text', isFixed: true },
    { key: 'servicesDGPSN', label: 'Services DGPSN', type: 'text', isFixed: true },
    { key: 'compte', label: 'Compte', type: 'text', isFixed: true },
    { key: 'date', label: 'Date', type: 'text', isFixed: true }
  ];

  constructor(
      private readonly financialReportService: FinancialReportService,
      private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Générer les années dynamiquement de 2015 à l'année actuelle
    const currentYear = new Date().getFullYear();
    for (let year = 2015; year <= currentYear; year++) {
      this.availableYears.push(year);
    }

    // Optionnel : définir l’année sélectionnée par défaut sur l’année courante
    this.selectedYear = currentYear;

    // Récupération éventuelle depuis la route
    this.route.queryParams.subscribe(params => {
      if (params['budgetId']) {
        this.budgetId = +params['budgetId'];
      }
      if (params['annee']) {
        this.selectedYear = +params['annee'];
      }
    });

    this.updateColumns();
    this.loadFinancialReport();
  }

  /**
   * Charge le rapport financier complet depuis le backend
   */
  loadFinancialReport(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.financialReportService.generateFinancialReport(
        this.selectedYear,
        this.selectedPeriodType,
        this.budgetId
    ).subscribe({
      next: (response: any) => {
        this.recettesFonctionnementData = this.processReportData(response.recettesFonctionnement);
        this.depensesFonctionnementData = this.processReportData(response.depensesFonctionnement);
        this.investissementData = this.processReportData(response.investissements);
        this.recapInvestissementData = this.processReportData(response.recapInvestissement);
        this.engagements = response.engagements;
        this.engagementsWithTotals = this.processEngagementsWithTotals(response.engagements);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du rapport:', error);
        this.errorMessage = 'Erreur lors du chargement du rapport financier. Veuillez réessayer.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Traite les données du rapport pour aplatir les réalisations périodiques
   */
  processReportData(data: BudgetReportRow[]): BudgetReportRow[] {
    return data.map(row => {
      // Aplatir les réalisations périodiques au niveau de l'objet
      if (row.realisationsPeriodiques) {
        Object.keys(row.realisationsPeriodiques).forEach(key => {
          (row as any)[key] = row.realisationsPeriodiques![key];
        });
      }
      return row;
    });
  }

  /**
   * Met à jour les colonnes selon le type de période
   */
  updateColumns(): void {
    this.periodicColumns = [];

    if (this.selectedPeriodType === 'mensuel') {
      const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      const moisKeys = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];

      moisKeys.forEach((key, index) => {
        this.periodicColumns.push({
          key: key,
          label: mois[index],
          type: 'number',
          isPeriodic: true,
          width: '100px'
        });
      });
    } else if (this.selectedPeriodType === 'trimestriel') {
      for (let i = 1; i <= 4; i++) {
        this.periodicColumns.push({
          key: `t${i}`,
          label: `Trimestre ${i}`,
          type: 'number',
          isPeriodic: true,
          width: '110px'
        });
      }
    }

    this.allColumns = [
      ...this.fixedColumns,
      ...this.periodicColumns,
      ...this.summaryColumns
    ];
  }

  /**
   * Changement de type de période - recharge les données
   */
  onPeriodTypeChange(): void {
    this.updateColumns();
    this.loadFinancialReport();
  }

  /**
   * Changement d'année - recharge les données
   */
  onYearChange(): void {
    this.loadFinancialReport();
  }

  /**
   * Obtenir la valeur d'une cellule
   */
  getCellValue(row: BudgetReportRow, columnKey: string): any {
    return (row as any)[columnKey];
  }

  /**
   * Formater les nombres
   */
  formatNumber(value: number | undefined): string {
    if (value === undefined || value === null) return '-';
    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  /**
   * Formater les pourcentages
   */
  formatPercent(value: number | undefined): string {
    if (value === undefined || value === null) return '-';
    return `${value.toFixed(2)}%`;
  }

  /**
   * Formater les dates
   */
  formatDate(value: string | Date | number[] | undefined): string {
    if (!value) return '-';

    let date: Date;

    if (Array.isArray(value) && value.length === 3) {
      const [year, month, day] = value;
      date = new Date(year, month - 1, day);
    } else if (value instanceof Date) {
      date = value;
    } else if (typeof value === 'string') {
      date = new Date(value);
    } else {
      return '-';
    }

    return isNaN(date.getTime())
        ? '-'
        : date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  /**
   * Formater une valeur selon son type
   */
  formatValue(value: any, type: 'text' | 'number' | 'percent'): string {
    if (type === 'number') {
      return this.formatNumber(value);
    } else if (type === 'percent') {
      return this.formatPercent(value);
    } else if (value instanceof Date || (typeof value === 'string' && value.includes('-'))) {
      return this.formatDate(value);
    }
    return value || '-';
  }

  /**
   * Classes CSS pour les lignes
   */
  getRowClass(row: BudgetReportRow): string {
    if (row.isTotal) return 'total-row';
    if (row.isCategory) return 'category-row';
    if (row.isSubCategory) return 'subcategory-row';
    return '';
  }

  /**
   * Classes pour le récapitulatif - Gère Classe 1 et 2
   */
  getRecapRowClass(row: BudgetReportRow): string {
    // PRIORITÉ 0: La ligne de titre de section "2 DEPENSES D'INVESTISSEMENT"
    if (row.isTitle) {
      return 'recap-title-row';
    }

    // PRIORITÉ 1: Les lignes de titre de catégorie (fond noir)
    if (row.isCategory && row.compte && !row.sousCompte) {
      return 'category-header-row';
    }

    // PRIORITÉ 2: La ligne de total final des dépenses (jaune)
    if (row.isTotal && row.rubrique?.includes('TOTAL DEPENSES')) {
      return 'total-final-row';
    }

    // PRIORITÉ 3: La ligne de total des recettes (gris)
    if (row.isTotal && row.rubrique?.includes('TOTAL RECETTES')) {
      return 'recap-section-total';
    }

    // PRIORITÉ 4: Les lignes de sous-totaux (jaune)
    if (row.isTotal && row.rubrique?.includes('SOUS TOTAL')) {
      return 'subtotal-row';
    }

    // PRIORITÉ 5: Autres catégories (jaune clair)
    if (row.isCategory) {
      return 'yellow-row';
    }

    return ''; // Lignes de données normales
  }

  /**
   * Vérifier si la cellule doit être en surbrillance
   */
  isHighlightCell(row: BudgetReportRow, columnKey: string): boolean {
    return row.compte === '244' && columnKey === 'realisationsAu31032024' && row.isCategory === true;
  }

  /**
   * Vérifier si c'est une ligne d'indentation
   */
  isIndentedRow(row: BudgetReportRow): boolean {
    const rubrique = row.rubrique || '';
    return rubrique.includes('12110') ||
        rubrique.includes('14114') ||
        rubrique.includes('14115') ||
        rubrique.includes('14170') ||
        rubrique.includes('2130') ||
        rubrique.includes('23500') ||
        rubrique.includes('24410') ||
        rubrique.includes('24420') ||
        rubrique.includes('24440') ||
        rubrique.includes('24510');
  }

  /**
   * Impression
   */
  printReport(): void {
    window.print();
  }

  /**
   * Export Excel avec styles et formatage
   */
  exportToExcel(): void {
    const wb = XLSX.utils.book_new();

    // Styles de base
    const styles = {
      headerGreen: {
        fill: { fgColor: { rgb: "A8D08D" } },
        font: { bold: true, sz: 10, name: 'Calibri' },
        alignment: { horizontal: "center", vertical: "center", wrapText: true },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } }
        }
      },
      headerGray: {
        fill: { fgColor: { rgb: "D9D9D9" } },
        font: { bold: true, sz: 11, name: 'Calibri' },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } }
        }
      },
      headerBlack: {
        fill: { fgColor: { rgb: "000000" } },
        font: { bold: true, sz: 13, name: 'Calibri', color: { rgb: "FFFFFF" } },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } }
        }
      },
      categoryRow: {
        fill: { fgColor: { rgb: "FFFF00" } },
        font: { bold: true, sz: 10, name: 'Calibri' },
        alignment: { horizontal: "left", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } }
        }
      },
      totalRow: {
        fill: { fgColor: { rgb: "FFD966" } },
        font: { bold: true, sz: 10, name: 'Calibri' },
        alignment: { horizontal: "left", vertical: "center" },
        border: {
          top: { style: "medium", color: { rgb: "000000" } },
          bottom: { style: "medium", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } }
        }
      },
      normalCell: {
        font: { sz: 10, name: 'Calibri' },
        alignment: { horizontal: "left", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } }
        }
      },
      numberCell: {
        font: { sz: 10, name: 'Calibri' },
        alignment: { horizontal: "right", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } }
        },
        numFmt: '#,##0'
      },
      percentCell: {
        font: { sz: 10, name: 'Calibri', color: { rgb: "4f6c52" } },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } }
        },
        numFmt: '0.00"%"'
      },
      centerCell: {
        font: { sz: 10, name: 'Calibri' },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } }
        }
      }
    };

    // 1. Onglet Recettes Fonctionnement
    const wsRecettes = this.createStyledWorksheet(
        this.recettesFonctionnementData,
        this.allColumns,
        styles,
        'TOTAL RECETTES DE FONCTIONNEMENT'
    );
    XLSX.utils.book_append_sheet(wb, wsRecettes, 'Recettes Fonctionnement');

    // 2. Onglet Dépenses Fonctionnement
    const wsDepenses = this.createStyledWorksheet(
        this.depensesFonctionnementData,
        this.allColumns,
        styles,
        '6 | DEPENSES DE FONCTIONNEMENT'
    );
    XLSX.utils.book_append_sheet(wb, wsDepenses, 'Dépenses Fonctionnement');

    // 3. Onglet Investissements
    const wsInvestissements = this.createStyledWorksheet(
        this.investissementData,
        this.allColumns,
        styles,
        'SITUATION D\'EXECUTION DES INVESTISSEMENTS'
    );
    XLSX.utils.book_append_sheet(wb, wsInvestissements, 'Investissements');

    // 4. Onglet Engagements
    const wsEngagements = this.createEngagementsWorksheet(
        this.engagementsWithTotals,
        this.engagementColumns,
        styles
    );
    XLSX.utils.book_append_sheet(wb, wsEngagements, 'Engagements');

    // 5. Onglet Récapitulatif
    const wsRecap = this.createRecapWorksheet(
        this.recapInvestissementData,
        this.recapColumns,
        styles
    );
    XLSX.utils.book_append_sheet(wb, wsRecap, 'Récapitulatif');

    // Sauvegarder le fichier
    const fileName = `Rapport_Financier_${this.selectedYear}_${this.selectedPeriodType}_${new Date().getTime()}.xlsx`;
    XLSX.writeFile(wb, fileName);
  }

  /**
   * Crée une feuille Excel stylisée pour les données standard
   */
  private createStyledWorksheet(
      data: BudgetReportRow[],
      columns: DynamicColumn[],
      styles: any,
      title: string
  ): XLSX.WorkSheet {
    const ws: XLSX.WorkSheet = {};
    const range = { s: { c: 0, r: 0 }, e: { c: columns.length - 1, r: data.length + 2 } };

    // Ligne de titre
    const titleCell = { v: title, t: 's', s: styles.headerBlack };
    ws['A1'] = titleCell;
    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: columns.length - 1 } }];

    // En-têtes de colonnes (ligne 2)
    columns.forEach((col, colIndex) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 1, c: colIndex });
      ws[cellAddress] = {
        v: col.label,
        t: 's',
        s: styles.headerGreen
      };
    });

    // Données (à partir de la ligne 3)
    data.forEach((row, rowIndex) => {
      const actualRow = rowIndex + 2;

      columns.forEach((col, colIndex) => {
        const cellAddress = XLSX.utils.encode_cell({ r: actualRow, c: colIndex });
        const value = this.getCellValue(row, col.key);

        let cellStyle = { ...styles.normalCell };
        let cellValue: any = value;
        let cellType: string = 's';

        // Déterminer le style de la ligne
        if (row.isTotal) {
          cellStyle = { ...styles.totalRow };
        } else if (row.isCategory) {
          cellStyle = { ...styles.categoryRow };
        } else if (row.isSubCategory) {
          cellStyle = {
            ...styles.normalCell,
            fill: { fgColor: { rgb: "FFFACD" } },
            font: { bold: true, sz: 10, name: 'Calibri' }
          };
        }

        // Appliquer le formatage selon le type de colonne
        if (col.type === 'number') {
          cellStyle.alignment = { horizontal: "right", vertical: "center" };
          cellStyle.numFmt = '#,##0';
          cellValue = value !== undefined && value !== null ? Number(value) : 0;
          cellType = 'n';
        } else if (col.type === 'percent') {
          cellStyle = { ...cellStyle, ...styles.percentCell };
          cellValue = value !== undefined && value !== null ? Number(value) / 100 : 0;
          cellType = 'n';
        } else if (col.key === 'rubrique') {
          cellStyle.alignment = { horizontal: "left", vertical: "center" };
          if (row.isCategory || row.isTotal) {
            cellStyle.font = { bold: true, sz: 10, name: 'Calibri' };
          }
        } else {
          cellStyle.alignment = { horizontal: "center", vertical: "center" };
        }

        // Coloration spéciale pour les colonnes périodiques
        if (col.isPeriodic && !row.isTotal && !row.isCategory) {
          cellStyle.fill = { fgColor: { rgb: "E6F7FF" } };
        }

        ws[cellAddress] = {
          v: cellValue || (col.type === 'number' ? 0 : '-'),
          t: cellType,
          s: cellStyle
        };
      });
    });

    // Définir les largeurs de colonnes
    ws['!cols'] = columns.map(col => {
      const width = col.width ? parseInt(col.width) / 7 : 15;
      return { wch: width };
    });

    ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
  }

  /**
   * Crée la feuille des engagements
   */
  private createEngagementsWorksheet(
      data: EngagementTableRow[],
      columns: DynamicColumn[],
      styles: any
  ): XLSX.WorkSheet {
    const ws: XLSX.WorkSheet = {};
    const range = { s: { c: 0, r: 0 }, e: { c: columns.length - 1, r: data.length + 1 } };

    // Titre
    const titleCell = { v: `LISTE DES BONS D'ENGAGEMENT - ${this.selectedYear}`, t: 's', s: styles.headerBlack };
    ws['A1'] = titleCell;
    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: columns.length - 1 } }];

    // En-têtes
    columns.forEach((col, colIndex) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 1, c: colIndex });
      ws[cellAddress] = {
        v: col.label,
        t: 's',
        s: styles.headerGray
      };
    });

    // Données
    let rowIndex = 0;
    data.forEach((row) => {
      const actualRow = rowIndex + 2;

      if (row.isTotal) {
        // C'est une ligne de total
        const totalStyle = {
          ...styles.headerGreen, // Réutilisation du style d'en-tête vert
          font: { bold: true, sz: 11, name: 'Calibri' }
        };

        // Fusionner les cellules pour le libellé
        const labelCellAddress = XLSX.utils.encode_cell({ r: actualRow, c: 4 });
        ws[labelCellAddress] = {
          v: row.totalLabel,
          t: 's',
          s: {...totalStyle, alignment: { horizontal: "left", vertical: "center", indent: 1 }}
        };
        // Créer des cellules vides pour appliquer le style et les bordures sur la fusion
        for (let i = 0; i < 4; i++) {
          const emptyCellAddr = XLSX.utils.encode_cell({ r: actualRow, c: i });
          ws[emptyCellAddr] = { v: '', t: 's', s: totalStyle };
        }

        // Montant du total
        const amountCellAddress = XLSX.utils.encode_cell({ r: actualRow, c: 5 });
        ws[amountCellAddress] = {
          v: row.montants || 0,
          t: 'n',
          s: {...totalStyle, ...styles.numberCell }
        };

        // Fusionner les dernières cellules
        for (let i = 6; i < columns.length; i++) {
          const emptyCellAddr = XLSX.utils.encode_cell({ r: actualRow, c: i });
          ws[emptyCellAddr] = { v: '', t: 's', s: totalStyle };
        }

        // Déclarer les fusions
        if (!ws['!merges']) ws['!merges'] = [];
        ws['!merges'].push({ s: { r: actualRow, c: 0 }, e: { r: actualRow, c: 3 } }); // Fusion avant le label
        ws['!merges'].push({ s: { r: actualRow, c: 6 }, e: { r: actualRow, c: columns.length - 1 } }); // Fusion après le montant

      } else {
        // C'est une ligne d'engagement normale
        const isEvenRow = rowIndex % 2 === 0;
        columns.forEach((col, colIndex) => {
          const cellAddress = XLSX.utils.encode_cell({ r: actualRow, c: colIndex });
          let value = (row as any)[col.key];
          let cellStyle = { ...styles.normalCell };
          if (isEvenRow) {
            cellStyle.fill = { fgColor: { rgb: "F2F2F2" } };
          }

          if (col.key === 'montants') {
            cellStyle = { ...cellStyle, ...styles.numberCell, fill: { fgColor: { rgb: "C5E0B4" } }};
            ws[cellAddress] = { v: value || 0, t: 'n', s: cellStyle };
          } else if (col.key === 'dateEngagement' || col.key === 'date') {
            value = this.formatDate(value);
            cellStyle.alignment = { horizontal: "center", vertical: "center" };
            ws[cellAddress] = { v: value || '-', t: 's', s: cellStyle };
          } else if (col.key === 'fournisseurBeneficiaire' || col.key === 'factureEtat') {
            cellStyle.alignment = { horizontal: "left", vertical: "center" };
            ws[cellAddress] = { v: value || '-', t: 's', s: cellStyle };
          } else {
            cellStyle.alignment = { horizontal: "center", vertical: "center" };
            ws[cellAddress] = { v: value || '-', t: 's', s: cellStyle };
          }
        });
      }
      rowIndex++;
    });

    ws['!cols'] = [
      { wch: 15 }, { wch: 12 }, { wch: 10 }, { wch: 10 },
      { wch: 25 }, { wch: 15 }, { wch: 30 }, { wch: 15 },
      { wch: 10 }, { wch: 12 }
    ];

    // Ajuster la range pour inclure toutes les lignes
    range.e.r = data.length + 1;
    ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
  }

  /**
   * Crée la feuille récapitulative - Gère les Classes 1 et 2
   */
  private createRecapWorksheet(
      data: BudgetReportRow[],
      columns: DynamicColumn[],
      styles: any
  ): XLSX.WorkSheet {
    const ws: XLSX.WorkSheet = {};
    const fixedCols = columns.slice(0, 9);
    const trimestreCols = columns.slice(9);
    const totalCols = columns.length;
    const range = { s: { c: 0, r: 0 }, e: { c: totalCols - 1, r: data.length + 3 } };

    // Titre
    const titleCell = { v: `BUDGET D'INVESTISSEMENT - ${this.selectedYear}`, t: 's', s: styles.headerBlack };
    ws['A1'] = titleCell;
    // Initialisation du tableau des fusions, c'est ce qui rend l'assertion '!' sûre
    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push({ s: { r: 0, c: 0 }, e: { r: 0, c: totalCols - 1 } });

    // En-têtes - Ligne 1
    fixedCols.forEach((col, colIndex) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 1, c: colIndex });
      ws[cellAddress] = { v: col.label, t: 's', s: styles.headerGreen };
    });

    // Fusion pour "CUMULS TRIMESTRIELS"
    const cumulCell = XLSX.utils.encode_cell({ r: 1, c: fixedCols.length });
    ws[cumulCell] = {
      v: 'CUMULS TRIMESTRIELS',
      t: 's',
      s: { ...styles.headerGreen, fill: { fgColor: { rgb: "92D050" } }, font: { bold: true, sz: 11, name: 'Calibri' } }
    };
    ws['!merges'].push({ s: { r: 1, c: fixedCols.length }, e: { r: 1, c: totalCols - 1 } });

    // En-têtes - Ligne 2
    trimestreCols.forEach((col, index) => {
      const colIndex = fixedCols.length + index;
      const cellAddress = XLSX.utils.encode_cell({ r: 2, c: colIndex });
      ws[cellAddress] = {
        v: col.label, t: 's',
        s: { ...styles.headerGreen, fill: { fgColor: { rgb: "92D050" } }, font: { bold: true, sz: 9, name: 'Calibri' } }
      };
    });

    // Données (à partir de la ligne 3)
    data.forEach((row, rowIndex) => {
      const actualRow = rowIndex + 3;

      if (row.isTitle) {
        const titleStyle = {
          fill: { fgColor: { rgb: "BFBFBF" } },
          font: { bold: true, sz: 11, name: 'Calibri', color: { rgb: "000000" } },
          alignment: { horizontal: "left", vertical: "center", indent: 1 },
          border: { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } }
        };
        for(let i = 0; i < totalCols; i++) {
          ws[XLSX.utils.encode_cell({ r: actualRow, c: i })] = { v: i === 0 ? row.rubrique : '', t: 's', s: titleStyle };
        }
        // LA CORRECTION FINALE EST ICI : ajout du '!' pour rassurer TypeScript
        ws['!merges']!.push({ s: { r: actualRow, c: 0 }, e: { r: actualRow, c: totalCols - 1 } });
        return;
      }

      columns.forEach((col, colIndex) => {
        const cellAddress = XLSX.utils.encode_cell({ r: actualRow, c: colIndex });
        const value = this.getCellValue(row, col.key);

        let cellStyle = { ...styles.normalCell };
        let cellValue: any = value;
        let cellType = 's';

        // Logique de style des lignes
        if (this.getRecapRowClass(row) === 'category-header-row') {
          cellStyle = {
            fill: { fgColor: { rgb: "000000" } },
            font: { bold: true, sz: 11, name: 'Calibri', color: { rgb: "FFFFFF" } },
            alignment: { horizontal: "left", vertical: "center", indent: 1},
            border: styles.normalCell.border
          };
        } else if (this.getRecapRowClass(row) === 'total-final-row') {
          cellStyle = { ...styles.totalRow, fill: { fgColor: { rgb: "FFFF00" } } };
        } else if (this.getRecapRowClass(row) === 'recap-section-total') {
          cellStyle = { ...styles.totalRow, fill: { fgColor: { rgb: "D9D9D9" } } };
        } else if (this.getRecapRowClass(row) === 'subtotal-row') {
          cellStyle = { ...styles.categoryRow, fill: { fgColor: { rgb: "FFFF00" } }};
        }

        if (this.isIndentedRow(row) && col.key === 'rubrique') {
          cellStyle.alignment = { ...cellStyle.alignment, indent: 2, horizontal: "left" };
        }

        if (col.type === 'number') {
          cellStyle.alignment = { ...cellStyle.alignment, horizontal: "right" };
          cellStyle.numFmt = '#,##0';
          cellValue = value !== undefined && value !== null ? Number(value) : 0;
          cellType = 'n';
          if (col.isPeriodic && !row.isTotal && !row.isCategory && !row.isTitle) {
            cellStyle.fill = { fgColor: { rgb: "B4D7F0" } };
          }
        } else if (col.type === 'percent') {
          cellStyle.alignment = { ...cellStyle.alignment, horizontal: "center" };
          cellStyle.numFmt = '0.00"%"';
          cellValue = value !== undefined && value !== null ? Number(value) / 100 : 0;
          cellType = 'n';
        } else if (col.key === 'rubrique') {
          cellStyle.alignment = { ...cellStyle.alignment, horizontal: "left" };
          if (row.isCategory || row.isTotal) {
            cellStyle.font = { ...cellStyle.font, bold: true };
          }
        } else {
          cellStyle.alignment = { ...cellStyle.alignment, horizontal: "center" };
        }

        ws[cellAddress] = {
          v: cellValue === 0 && cellType === 'n' ? 0 : (cellValue ?? (cellType === 'n' ? 0 : '-')),
          t: cellType,
          s: cellStyle
        };
      });
    });

    // Largeurs de colonnes
    ws['!cols'] = [
      { wch: 7 }, { wch: 9 }, { wch: 12 }, { wch: 50 }, { wch: 18 },
      { wch: 18 }, { wch: 12 }, { wch: 18 }, { wch: 18 }, { wch: 15 },
      { wch: 15 }, { wch: 15 }, { wch: 15 }
    ];

    ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
  }

  /**
   * Traite la liste des engagements pour y insérer les lignes de totaux mensuels.
   * La liste doit être triée par date en amont (ce qui est déjà fait côté backend).
   */
  private processEngagementsWithTotals(engagements: Engagement[]): EngagementTableRow[] {
    if (!engagements || engagements.length === 0) {
      return [];
    }

    const processedRows: EngagementTableRow[] = [];
    let cumulativeTotal = 0;
    // Note: getMonth() retourne 0 pour Janvier, 11 pour Décembre
    let currentMonth = this.getLocalDate(engagements[0].date).getMonth();

    for (const engagement of engagements) {
      const engagementDate = this.getLocalDate(engagement.date);
      const engagementMonth = engagementDate.getMonth();

      // Si on change de mois, on ajoute la ligne de total pour le mois qui vient de se terminer
      if (engagementMonth !== currentMonth) {
        // L'année du total est celle de la date de l'engagement *précédent*
        const previousEngagementIndex = processedRows.length - 1;
        const previousEngagementDate = this.getLocalDate(processedRows[previousEngagementIndex].date);

        processedRows.push({
          isTotal: true,
          // totalLabel: `TOTAL CUMUL ${this.getMonthName(currentMonth).toUpperCase()} ${previousEngagementDate.getFullYear()}`,
          totalLabel: "",
          montants: cumulativeTotal,
        } as EngagementTableRow);

        currentMonth = engagementMonth;
      }

      // Ajouter l'engagement courant à la liste et mettre à jour le total cumulé
      processedRows.push(engagement);
      cumulativeTotal += engagement.montants || 0;
    }

    // Ajouter la ligne de total pour le tout dernier mois de la liste
    const lastEngagementDate = this.getLocalDate(engagements[engagements.length - 1].date);
    processedRows.push({
      isTotal: true,
      // On vérifie si c'est le premier total qu'on insère pour ajuster le libellé
      totalLabel: processedRows.filter(r => r.isTotal).length === 0
          ? `TOTAL ${this.getMonthName(currentMonth).toUpperCase()} ${lastEngagementDate.getFullYear()}`
          : `TOTAL CUMUL ${this.getMonthName(currentMonth).toUpperCase()} ${lastEngagementDate.getFullYear()}`,
      montants: cumulativeTotal,
    } as EngagementTableRow);

    return processedRows;
  }

  /**
   * Helper pour obtenir un nom de mois à partir de son index (0-11)
   */
  private getMonthName(monthIndex: number): string {
    const mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    return mois[monthIndex];
  }

  /**
   * Helper pour convertir les différents formats de date en objet Date
   */
  private getLocalDate(dateValue: string | Date | number[] | undefined): Date {
    if (Array.isArray(dateValue)) {
      const [year, month, day] = dateValue;
      return new Date(year, month - 1, day);
    }
    return new Date(dateValue as string | Date);
  }
}
