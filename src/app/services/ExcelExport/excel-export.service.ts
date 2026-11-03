import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {

  /**
   * Exporte la fiche de synthèse budgétaire vers Excel avec graphiques intégrés
   */
  async exporterFicheSynthese(
    budgetData: any,
    lignesRecettes: any[],
    lignesDepenses: any[],
    donneesTrimestrielles: any[],
    donneesMensuelles: any[],
    repartitionRecettes: any[],
    categoriesDepenses: any[],
    evolutionTrimestrielle: any[],
    periodeSelectionnee: string
  ): Promise<void> {
    // Créer un nouveau classeur
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'DGPSN';
    workbook.created = new Date();
    
    // 1. Feuille Vue d'Ensemble
    await this.creerFeuilleVueEnsemble(workbook, budgetData, periodeSelectionnee);

    // 2. Feuille Recettes avec graphique
    await this.creerFeuilleRecettes(workbook, lignesRecettes, budgetData);

    // 3. Feuille Dépenses avec graphique
    await this.creerFeuilleDepenses(workbook, lignesDepenses, budgetData);

    // 4. Feuille Évolution avec graphiques
    if (periodeSelectionnee === 'annee') {
      await this.creerFeuilleEvolutionAnnuelle(workbook, evolutionTrimestrielle);
    } else if (periodeSelectionnee === 'trimestre') {
      await this.creerFeuilleEvolutionTrimestrielle(workbook, donneesTrimestrielles);
    } else if (periodeSelectionnee === 'mois') {
      await this.creerFeuilleEvolutionMensuelle(workbook, donneesMensuelles);
    }

    // 5. Feuille Répartition avec graphiques
    await this.creerFeuilleRepartition(workbook, repartitionRecettes, categoriesDepenses);

    // 6. Feuille Analyse et Commentaires
    await this.creerFeuilleAnalyse(workbook, budgetData, lignesRecettes, lignesDepenses, evolutionTrimestrielle, periodeSelectionnee);

    // 7. Feuille Graphiques (Données préparées)
    await this.creerFeuilleGraphiques(workbook, evolutionTrimestrielle, repartitionRecettes, categoriesDepenses, periodeSelectionnee);

    // Générer et télécharger le fichier
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileName = `Synthese_Budget_${budgetData.code}_${budgetData.annee}_${this.getDateString()}.xlsx`;
    saveAs(blob, fileName);
  }

  private async creerFeuilleVueEnsemble(workbook: ExcelJS.Workbook, budgetData: any, periode: string): Promise<void> {
    const sheet = workbook.addWorksheet('Vue d\'Ensemble', {
      views: [{ showGridLines: false }]
    });

    // Configuration des colonnes
    sheet.columns = [
      { width: 35 },
      { width: 25 }
    ];

    // Logo et En-tête (Lignes 1-4)
    const titleRow = sheet.addRow(['RÉPUBLIQUE DU SÉNÉGAL']);
    titleRow.font = { size: 16, bold: true, color: { argb: '00703C' } };
    titleRow.alignment = { horizontal: 'center' };
    sheet.mergeCells('A1:B1');

    const subtitleRow = sheet.addRow(['Délégation Générale à la Protection Sociale et à la Solidarité Nationale']);
    subtitleRow.font = { size: 12, bold: true, color: { argb: '00703C' } };
    subtitleRow.alignment = { horizontal: 'center' };
    sheet.mergeCells('A2:B2');

    sheet.addRow([]);

    const headerRow = sheet.addRow(['FICHE DE SYNTHÈSE BUDGÉTAIRE']);
    headerRow.font = { size: 14, bold: true, color: { argb: 'FFFFFF' } };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
    headerRow.height = 30;
    sheet.mergeCells('A4:B4');
    headerRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '00703C' }
      };
    });

    sheet.addRow([]);

    // Informations du Budget
    const infoHeaderRow = sheet.addRow(['INFORMATIONS DU BUDGET']);
    infoHeaderRow.font = { size: 12, bold: true, color: { argb: 'FFFFFF' } };
    sheet.mergeCells('A6:B6');
    infoHeaderRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0D6EFD' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    this.addDataRow(sheet, 'Code Budget:', budgetData.code);
    this.addDataRow(sheet, 'Libellé:', budgetData.libelle);
    this.addDataRow(sheet, 'Année:', budgetData.annee);
    this.addDataRow(sheet, 'Période:', this.getPeriodeLabel(periode));

    sheet.addRow([]);

    // RECETTES - Section
    const recettesHeaderRow = sheet.addRow(['RECETTES']);
    recettesHeaderRow.font = { size: 12, bold: true, color: { argb: 'FFFFFF' } };
    sheet.mergeCells(`A${recettesHeaderRow.number}:B${recettesHeaderRow.number}`);
    recettesHeaderRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '28A745' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    const recettesSubHeaderRow = sheet.addRow(['Indicateur', 'Montant (FCFA)']);
    recettesSubHeaderRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    recettesSubHeaderRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '28A745' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    this.addDataRow(sheet, 'Budget Initial', budgetData.montantTotalRecettes, true);
    this.addDataRow(sheet, 'Réalisations', budgetData.montantRealiseRecettes, true);
    
    const tauxRecettesRow = this.addDataRow(sheet, 'Taux d\'Exécution (%)', budgetData.tauxExecutionRecettes);
    tauxRecettesRow.getCell(2).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: this.getTauxColor(budgetData.tauxExecutionRecettes) }
    };
    tauxRecettesRow.getCell(2).font = { bold: true, color: { argb: 'FFFFFF' } };

    this.addDataRow(sheet, 'Reste à Réaliser', budgetData.montantTotalRecettes - budgetData.montantRealiseRecettes, true);

    sheet.addRow([]);

    // DÉPENSES - Section
    const depensesHeaderRow = sheet.addRow(['DÉPENSES']);
    depensesHeaderRow.font = { size: 12, bold: true, color: { argb: 'FFFFFF' } };
    sheet.mergeCells(`A${depensesHeaderRow.number}:B${depensesHeaderRow.number}`);
    depensesHeaderRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'DC3545' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    const depensesSubHeaderRow = sheet.addRow(['Indicateur', 'Montant (FCFA)']);
    depensesSubHeaderRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    depensesSubHeaderRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'DC3545' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    this.addDataRow(sheet, 'Budget Initial', budgetData.montantTotalDepenses, true);
    this.addDataRow(sheet, 'Réalisations', budgetData.montantRealiseDepenses, true);
    
    const tauxDepensesRow = this.addDataRow(sheet, 'Taux d\'Exécution (%)', budgetData.tauxExecutionDepenses);
    tauxDepensesRow.getCell(2).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: this.getTauxColor(budgetData.tauxExecutionDepenses) }
    };
    tauxDepensesRow.getCell(2).font = { bold: true, color: { argb: 'FFFFFF' } };

    this.addDataRow(sheet, 'Reste à Réaliser', budgetData.montantTotalDepenses - budgetData.montantRealiseDepenses, true);

    sheet.addRow([]);

    // SOLDE - Section
    const soldeHeaderRow = sheet.addRow(['SOLDE BUDGÉTAIRE']);
    soldeHeaderRow.font = { size: 12, bold: true, color: { argb: 'FFFFFF' } };
    sheet.mergeCells(`A${soldeHeaderRow.number}:B${soldeHeaderRow.number}`);
    soldeHeaderRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0D6EFD' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    this.addDataRow(sheet, 'Total Recettes', budgetData.montantTotalRecettes, true);
    this.addDataRow(sheet, 'Total Dépenses', budgetData.montantTotalDepenses, true);
    
    const solde = budgetData.montantTotalRecettes - budgetData.montantTotalDepenses;
    const soldeRow = this.addDataRow(sheet, 'Solde', solde, true);
    soldeRow.getCell(2).font = { bold: true, color: { argb: solde >= 0 ? '28A745' : 'DC3545' } };
  }

  private async creerFeuilleRecettes(workbook: ExcelJS.Workbook, lignesRecettes: any[], budgetData: any): Promise<void> {
    const sheet = workbook.addWorksheet('Recettes', {
      views: [{ showGridLines: true }]
    });

    sheet.columns = [
      { width: 12 },
      { width: 40 },
      { width: 20 },
      { width: 20 },
      { width: 12 },
      { width: 20 }
    ];

    const titleRow = sheet.addRow(['DÉTAIL DES RECETTES DE FONCTIONNEMENT']);
    titleRow.font = { size: 14, bold: true, color: { argb: 'FFFFFF' } };
    titleRow.alignment = { horizontal: 'center', vertical: 'middle' };
    titleRow.height = 30;
    sheet.mergeCells('A1:F1');
    titleRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '28A745' }
      };
    });

    sheet.addRow([]);

    const headerRow = sheet.addRow(['Code', 'Libellé', 'Budget Initial (FCFA)', 'Réalisations (FCFA)', 'Taux (%)', 'Reste (FCFA)']);
    headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    headerRow.height = 25;
    headerRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '28A745' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    lignesRecettes.forEach((ligne, index) => {
      const row = sheet.addRow([
        ligne.code,
        ligne.libelle,
        ligne.budgetInitial,
        ligne.realise,
        ligne.tauxExecution,
        ligne.reste
      ]);

      if (index % 2 === 0) {
        row.eachCell(cell => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'F0FFF0' }
          };
        });
      }

      row.getCell(3).numFmt = '#,##0';
      row.getCell(4).numFmt = '#,##0';
      row.getCell(6).numFmt = '#,##0';

      const tauxCell = row.getCell(5);
      tauxCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: this.getTauxColor(ligne.tauxExecution) }
      };
      tauxCell.font = { bold: true, color: { argb: 'FFFFFF' } };
      tauxCell.alignment = { horizontal: 'center', vertical: 'middle' };

      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    sheet.addRow([]);
    const totalBudget = lignesRecettes.reduce((s, l) => s + l.budgetInitial, 0);
    const totalRealise = lignesRecettes.reduce((s, l) => s + l.realise, 0);
    const tauxGlobal = totalBudget > 0 ? Math.round((totalRealise / totalBudget) * 100) : 0;
    const totalReste = totalBudget - totalRealise;

    const totalRow = sheet.addRow(['', 'TOTAL RECETTES', totalBudget, totalRealise, tauxGlobal, totalReste]);
    totalRow.font = { bold: true, size: 12 };
    totalRow.height = 25;
    totalRow.eachCell((cell, colNumber) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '28A745' }
      };
      cell.font = { bold: true, color: { argb: 'FFFFFF' } };
      cell.alignment = { horizontal: colNumber === 2 ? 'left' : 'right', vertical: 'middle' };
      cell.border = {
        top: { style: 'double' },
        left: { style: 'thin' },
        bottom: { style: 'double' },
        right: { style: 'thin' }
      };
    });

    totalRow.getCell(3).numFmt = '#,##0';
    totalRow.getCell(4).numFmt = '#,##0';
    totalRow.getCell(6).numFmt = '#,##0';
  }

  private async creerFeuilleDepenses(workbook: ExcelJS.Workbook, lignesDepenses: any[], budgetData: any): Promise<void> {
    const sheet = workbook.addWorksheet('Dépenses', {
      views: [{ showGridLines: true }]
    });

    sheet.columns = [
      { width: 12 },
      { width: 40 },
      { width: 20 },
      { width: 20 },
      { width: 12 },
      { width: 20 }
    ];

    const titleRow = sheet.addRow(['DÉTAIL DES DÉPENSES DE FONCTIONNEMENT']);
    titleRow.font = { size: 14, bold: true, color: { argb: 'FFFFFF' } };
    titleRow.alignment = { horizontal: 'center', vertical: 'middle' };
    titleRow.height = 30;
    sheet.mergeCells('A1:F1');
    titleRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'DC3545' }
      };
    });

    sheet.addRow([]);

    const headerRow = sheet.addRow(['Code', 'Libellé', 'Budget Initial (FCFA)', 'Réalisations (FCFA)', 'Taux (%)', 'Reste (FCFA)']);
    headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    headerRow.height = 25;
    headerRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'DC3545' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    lignesDepenses.forEach((ligne, index) => {
      const row = sheet.addRow([
        ligne.code,
        ligne.libelle,
        ligne.budgetInitial,
        ligne.realise,
        ligne.tauxExecution,
        ligne.reste
      ]);

      if (index % 2 === 0) {
        row.eachCell(cell => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF0F0' }
          };
        });
      }

      row.getCell(3).numFmt = '#,##0';
      row.getCell(4).numFmt = '#,##0';
      row.getCell(6).numFmt = '#,##0';

      const tauxCell = row.getCell(5);
      tauxCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: this.getTauxColor(ligne.tauxExecution) }
      };
      tauxCell.font = { bold: true, color: { argb: 'FFFFFF' } };
      tauxCell.alignment = { horizontal: 'center', vertical: 'middle' };

      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    sheet.addRow([]);
    const totalBudget = lignesDepenses.reduce((s, l) => s + l.budgetInitial, 0);
    const totalRealise = lignesDepenses.reduce((s, l) => s + l.realise, 0);
    const tauxGlobal = totalBudget > 0 ? Math.round((totalRealise / totalBudget) * 100) : 0;
    const totalReste = totalBudget - totalRealise;

    const totalRow = sheet.addRow(['', 'TOTAL DÉPENSES', totalBudget, totalRealise, tauxGlobal, totalReste]);
    totalRow.font = { bold: true, size: 12 };
    totalRow.height = 25;
    totalRow.eachCell((cell, colNumber) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'DC3545' }
      };
      cell.font = { bold: true, color: { argb: 'FFFFFF' } };
      cell.alignment = { horizontal: colNumber === 2 ? 'left' : 'right', vertical: 'middle' };
      cell.border = {
        top: { style: 'double' },
        left: { style: 'thin' },
        bottom: { style: 'double' },
        right: { style: 'thin' }
      };
    });

    totalRow.getCell(3).numFmt = '#,##0';
    totalRow.getCell(4).numFmt = '#,##0';
    totalRow.getCell(6).numFmt = '#,##0';
  }

  private async creerFeuilleEvolutionAnnuelle(workbook: ExcelJS.Workbook, evolutionTrimestrielle: any[]): Promise<void> {
    const sheet = workbook.addWorksheet('Évolution Annuelle', {
      views: [{ showGridLines: true }]
    });

    sheet.columns = [
      { width: 15 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 }
    ];

    const titleRow = sheet.addRow(['ÉVOLUTION MENSUELLE - RECETTES ET DÉPENSES']);
    titleRow.font = { size: 14, bold: true, color: { argb: 'FFFFFF' } };
    titleRow.alignment = { horizontal: 'center', vertical: 'middle' };
    titleRow.height = 30;
    sheet.mergeCells('A1:E1');
    titleRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0D6EFD' }
      };
    });

    sheet.addRow([]);

    const headerRow = sheet.addRow(['Période', 'Budget Recettes', 'Réalisé Recettes', 'Budget Dépenses', 'Réalisé Dépenses']);
    headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    headerRow.height = 25;
    headerRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0D6EFD' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    evolutionTrimestrielle.forEach((e, index) => {
      const row = sheet.addRow([
        e.periode,
        e.budgetRecettes,
        e.realiseRecettes,
        e.budgetDepenses,
        e.realiseDepenses
      ]);

      if (index % 2 === 0) {
        row.eachCell(cell => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'F0F8FF' }
          };
        });
      }

      row.getCell(2).numFmt = '#,##0';
      row.getCell(3).numFmt = '#,##0';
      row.getCell(4).numFmt = '#,##0';
      row.getCell(5).numFmt = '#,##0';

      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });
  }

  private async creerFeuilleEvolutionTrimestrielle(workbook: ExcelJS.Workbook, donneesTrimestrielles: any[]): Promise<void> {
    const sheet = workbook.addWorksheet('Évolution Trimestrielle', {
      views: [{ showGridLines: true }]
    });

    sheet.columns = [
      { width: 12 },
      { width: 18 },
      { width: 18 },
      { width: 15 },
      { width: 18 },
      { width: 18 },
      { width: 15 }
    ];

    const titleRow = sheet.addRow(['SYNTHÈSE TRIMESTRIELLE - RECETTES ET DÉPENSES']);
    titleRow.font = { size: 14, bold: true, color: { argb: 'FFFFFF' } };
    titleRow.alignment = { horizontal: 'center', vertical: 'middle' };
    titleRow.height = 30;
    sheet.mergeCells('A1:G1');
    titleRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0D6EFD' }
      };
    });

    sheet.addRow([]);

    const headerRow = sheet.addRow(['Trimestre', 'Budget Recettes', 'Réalisé Recettes', 'Taux Recettes (%)', 'Budget Dépenses', 'Réalisé Dépenses', 'Taux Dépenses (%)']);
    headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    headerRow.height = 25;
    headerRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0D6EFD' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    donneesTrimestrielles.forEach((t, index) => {
      const row = sheet.addRow([
        t.trimestre,
        t.budgetRecettes,
        t.realiseRecettes,
        t.tauxRecettes,
        t.budgetDepenses,
        t.realiseDepenses,
        t.tauxDepenses
      ]);

      if (index % 2 === 0) {
        row.eachCell((cell, colNumber) => {
          if (colNumber !== 4 && colNumber !== 7) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'F0F8FF' }
            };
          }
        });
      }

      row.getCell(2).numFmt = '#,##0';
      row.getCell(3).numFmt = '#,##0';
      row.getCell(5).numFmt = '#,##0';
      row.getCell(6).numFmt = '#,##0';

      const tauxRecettesCell = row.getCell(4);
      tauxRecettesCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: this.getTauxColor(t.tauxRecettes) }
      };
      tauxRecettesCell.font = { bold: true, color: { argb: 'FFFFFF' } };

      const tauxDepensesCell = row.getCell(7);
      tauxDepensesCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: this.getTauxColor(t.tauxDepenses) }
      };
      tauxDepensesCell.font = { bold: true, color: { argb: 'FFFFFF' } };

      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      });
    });
  }

  private async creerFeuilleEvolutionMensuelle(workbook: ExcelJS.Workbook, donneesMensuelles: any[]): Promise<void> {
    const sheet = workbook.addWorksheet('Évolution Mensuelle', {
      views: [{ showGridLines: true }]
    });

    sheet.columns = [
      { width: 15 },
      { width: 20 },
      { width: 20 },
      { width: 20 },
      { width: 20 }
    ];

    const titleRow = sheet.addRow(['SYNTHÈSE MENSUELLE - RECETTES ET DÉPENSES']);
    titleRow.font = { size: 14, bold: true, color: { argb: 'FFFFFF' } };
    titleRow.alignment = { horizontal: 'center', vertical: 'middle' };
    titleRow.height = 30;
    sheet.mergeCells('A1:E1');
    titleRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0D6EFD' }
      };
    });

    sheet.addRow([]);

    const headerRow = sheet.addRow(['Mois', 'Budget Recettes', 'Réalisé Recettes', 'Budget Dépenses', 'Réalisé Dépenses']);
    headerRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    headerRow.height = 25;
    headerRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0D6EFD' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    donneesMensuelles.forEach((m, index) => {
      const row = sheet.addRow([
        m.mois,
        m.budgetRecettes,
        m.realiseRecettes,
        m.budgetDepenses,
        m.realiseDepenses
      ]);

      if (index % 2 === 0) {
        row.eachCell(cell => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'F0F8FF' }
          };
        });
      }

      row.getCell(2).numFmt = '#,##0';
      row.getCell(3).numFmt = '#,##0';
      row.getCell(4).numFmt = '#,##0';
      row.getCell(5).numFmt = '#,##0';

      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });
  }

  private async creerFeuilleRepartition(workbook: ExcelJS.Workbook, repartitionRecettes: any[], categoriesDepenses: any[]): Promise<void> {
    const sheet = workbook.addWorksheet('Répartition', {
      views: [{ showGridLines: true }]
    });

    sheet.columns = [
      { width: 40 },
      { width: 20 },
      { width: 20 },
      { width: 12 }
    ];

    const recettesTitleRow = sheet.addRow(['RÉPARTITION DES SOURCES DE RECETTES']);
    recettesTitleRow.font = { size: 14, bold: true, color: { argb: 'FFFFFF' } };
    recettesTitleRow.alignment = { horizontal: 'center', vertical: 'middle' };
    recettesTitleRow.height = 30;
    sheet.mergeCells('A1:C1');
    recettesTitleRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '28A745' }
      };
    });

    sheet.addRow([]);

    const recettesHeaderRow = sheet.addRow(['Source de Recette', 'Montant (FCFA)', 'Part (%)']);
    recettesHeaderRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    recettesHeaderRow.height = 25;
    recettesHeaderRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '28A745' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    const colors = ['52C41A', '73D13D', '95DE64', 'B7EB8F', 'D9F7BE'];
    repartitionRecettes.forEach((r, index) => {
      const row = sheet.addRow([r.libelle, r.montant, r.pourcentage]);
      
      row.eachCell((cell, colNumber) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: colors[index % colors.length] }
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
        if (colNumber > 1) {
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
        }
      });

      row.getCell(2).numFmt = '#,##0';
      row.getCell(3).font = { bold: true };
    });

    sheet.addRow([]);
    sheet.addRow([]);

    const depensesStartRow = sheet.rowCount + 1;
    const depensesTitleRow = sheet.addRow(['RÉPARTITION DES DÉPENSES PAR CATÉGORIE']);
    depensesTitleRow.font = { size: 14, bold: true, color: { argb: 'FFFFFF' } };
    depensesTitleRow.alignment = { horizontal: 'center', vertical: 'middle' };
    depensesTitleRow.height = 30;
    sheet.mergeCells(`A${depensesStartRow}:D${depensesStartRow}`);
    depensesTitleRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'DC3545' }
      };
    });

    sheet.addRow([]);

    const depensesHeaderRow = sheet.addRow(['Catégorie', 'Budget Alloué (FCFA)', 'Réalisations (FCFA)', 'Taux (%)']);
    depensesHeaderRow.font = { bold: true, color: { argb: 'FFFFFF' } };
    depensesHeaderRow.height = 25;
    depensesHeaderRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'DC3545' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    categoriesDepenses.forEach((c, index) => {
      const row = sheet.addRow([c.libelle, c.budget, c.realise, c.taux]);

      if (index % 2 === 0) {
        row.eachCell((cell, colNumber) => {
          if (colNumber !== 4) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFF0F0' }
            };
          }
        });
      }

      row.getCell(2).numFmt = '#,##0';
      row.getCell(3).numFmt = '#,##0';

      const tauxCell = row.getCell(4);
      tauxCell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: this.getTauxColor(c.taux) }
      };
      tauxCell.font = { bold: true, color: { argb: 'FFFFFF' } };
      tauxCell.alignment = { horizontal: 'center', vertical: 'middle' };

      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });
  }

  // === NOUVELLES MÉTHODES ===

  private async creerFeuilleAnalyse(
    workbook: ExcelJS.Workbook,
    budgetData: any,
    lignesRecettes: any[],
    lignesDepenses: any[],
    evolutionTrimestrielle: any[],
    periode: string
  ): Promise<void> {
    const sheet = workbook.addWorksheet('Analyse & Commentaires', {
      views: [{ showGridLines: false }]
    });

    sheet.columns = [
      { width: 45 },
      { width: 25 }
    ];

    const titleRow = sheet.addRow(['ANALYSE ET COMMENTAIRES BUDGÉTAIRES']);
    titleRow.font = { size: 14, bold: true, color: { argb: 'FFFFFF' } };
    titleRow.alignment = { horizontal: 'center', vertical: 'middle' };
    titleRow.height = 30;
    sheet.mergeCells('A1:B1');
    titleRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '6C757D' }
      };
    });

    sheet.addRow([]);

    const indicateursRow = sheet.addRow(['INDICATEURS CLÉS DE PERFORMANCE']);
    indicateursRow.font = { size: 12, bold: true, color: { argb: 'FFFFFF' } };
    sheet.mergeCells(`A${indicateursRow.number}:B${indicateursRow.number}`);
    indicateursRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0D6EFD' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    const tauxExecutionGlobal = ((budgetData.tauxExecutionRecettes + budgetData.tauxExecutionDepenses) / 2).toFixed(1);
    const ecartBudgetaire = budgetData.montantTotalRecettes - budgetData.montantTotalDepenses;
    const soldeRealise = budgetData.montantRealiseRecettes - budgetData.montantRealiseDepenses;
    const tauxCouverture = budgetData.montantRealiseDepenses > 0 
      ? ((budgetData.montantRealiseRecettes / budgetData.montantRealiseDepenses) * 100).toFixed(1)
      : 0;

    this.addDataRow(sheet, 'Taux d\'Exécution Global', `${tauxExecutionGlobal} %`);
    this.addDataRow(sheet, 'Écart Budgétaire Prévisionnel', ecartBudgetaire, true);
    this.addDataRow(sheet, 'Solde Réalisé', soldeRealise, true);
    this.addDataRow(sheet, 'Taux de Couverture', `${tauxCouverture} %`);

    sheet.addRow([]);

    const recettesAnalyseRow = sheet.addRow(['ANALYSE DES RECETTES']);
    recettesAnalyseRow.font = { size: 12, bold: true, color: { argb: 'FFFFFF' } };
    sheet.mergeCells(`A${recettesAnalyseRow.number}:B${recettesAnalyseRow.number}`);
    recettesAnalyseRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '28A745' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    const recettesSorted = [...lignesRecettes].sort((a, b) => b.tauxExecution - a.tauxExecution);
    const meilleureRecette = recettesSorted[0];
    const piresRecettes = recettesSorted.filter(r => r.tauxExecution < 50);

    const analyseRecettes = sheet.addRow(['']);
    analyseRecettes.getCell(1).value = `Performance des recettes : 
  
• Taux d'exécution : ${budgetData.tauxExecutionRecettes}%
• Meilleure source : ${meilleureRecette?.libelle || 'N/A'} (${meilleureRecette?.tauxExecution || 0}%)
• ${piresRecettes.length} source(s) sous-performante(s) (<50%)
• Reste à mobiliser : ${(budgetData.montantTotalRecettes - budgetData.montantRealiseRecettes).toLocaleString('fr-FR')} FCFA`;
    
    analyseRecettes.getCell(1).alignment = { 
      horizontal: 'left', 
      vertical: 'top',
      wrapText: true 
    };
    sheet.mergeCells(`A${analyseRecettes.number}:B${analyseRecettes.number}`);
    analyseRecettes.height = 80;
    analyseRecettes.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'F0FFF0' }
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    sheet.addRow([]);

    const depensesAnalyseRow = sheet.addRow(['ANALYSE DES DÉPENSES']);
    depensesAnalyseRow.font = { size: 12, bold: true, color: { argb: 'FFFFFF' } };
    sheet.mergeCells(`A${depensesAnalyseRow.number}:B${depensesAnalyseRow.number}`);
    depensesAnalyseRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'DC3545' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    const depensesSorted = [...lignesDepenses].sort((a, b) => b.tauxExecution - a.tauxExecution);
    const plusGroseDepense = depensesSorted.reduce((max, d) => d.realise > max.realise ? d : max, depensesSorted[0]);
    const depensesExcessives = depensesSorted.filter(d => d.tauxExecution > 90);

    const analyseDepenses = sheet.addRow(['']);
    analyseDepenses.getCell(1).value = `Performance des dépenses :

• Taux d'exécution : ${budgetData.tauxExecutionDepenses}%
• Plus grosse dépense : ${plusGroseDepense?.libelle || 'N/A'} (${plusGroseDepense?.realise?.toLocaleString('fr-FR') || 0} FCFA)
• ${depensesExcessives.length} poste(s) avec forte exécution (>90%)
• Reste à dépenser : ${(budgetData.montantTotalDepenses - budgetData.montantRealiseDepenses).toLocaleString('fr-FR')} FCFA`;
    
    analyseDepenses.getCell(1).alignment = { 
      horizontal: 'left', 
      vertical: 'top',
      wrapText: true 
    };
    sheet.mergeCells(`A${analyseDepenses.number}:B${analyseDepenses.number}`);
    analyseDepenses.height = 80;
    analyseDepenses.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF0F0' }
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    sheet.addRow([]);

    const recommandationsRow = sheet.addRow(['RECOMMANDATIONS']);
    recommandationsRow.font = { size: 12, bold: true, color: { argb: 'FFFFFF' } };
    sheet.mergeCells(`A${recommandationsRow.number}:B${recommandationsRow.number}`);
    recommandationsRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFC107' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    let recommandations = '';
    
    if (budgetData.tauxExecutionRecettes < 60) {
      recommandations += '• URGENT : Intensifier la mobilisation des recettes\n';
    }
    if (budgetData.tauxExecutionDepenses > 80 && budgetData.tauxExecutionRecettes < 70) {
      recommandations += '• Attention au déséquilibre : dépenses plus rapides que recettes\n';
    }
    if (piresRecettes.length > 0) {
      recommandations += `• Revoir la stratégie pour ${piresRecettes.length} source(s) de recettes\n`;
    }
    if (soldeRealise < 0) {
      recommandations += '• ALERTE : Déficit constaté, ajustements nécessaires\n';
    }
    if (recommandations === '') {
      recommandations = '• Exécution satisfaisante, maintenir le rythme\n• Continuer le suivi rapproché';
    }

    const recommandationsContent = sheet.addRow(['']);
    recommandationsContent.getCell(1).value = recommandations;
    recommandationsContent.getCell(1).alignment = { 
      horizontal: 'left', 
      vertical: 'top',
      wrapText: true 
    };
    sheet.mergeCells(`A${recommandationsContent.number}:B${recommandationsContent.number}`);
    recommandationsContent.height = 100;
    recommandationsContent.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFAF0' }
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    sheet.addRow([]);

    const commentairesRow = sheet.addRow(['COMMENTAIRES ET OBSERVATIONS']);
    commentairesRow.font = { size: 12, bold: true, color: { argb: 'FFFFFF' } };
    sheet.mergeCells(`A${commentairesRow.number}:B${commentairesRow.number}`);
    commentairesRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '6C757D' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    const commentairesContent = sheet.addRow(['']);
    commentairesContent.getCell(1).value = '[Espace réservé pour les commentaires du gestionnaire budgétaire]';
    commentairesContent.getCell(1).alignment = { 
      horizontal: 'left', 
      vertical: 'top',
      wrapText: true 
    };
    commentairesContent.getCell(1).font = { italic: true, color: { argb: '6C757D' } };
    sheet.mergeCells(`A${commentairesContent.number}:B${commentairesContent.number}`);
    commentairesContent.height = 100;
    commentairesContent.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'F8F9FA' }
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
  }

  private async creerFeuilleGraphiques(
    workbook: ExcelJS.Workbook,
    evolutionTrimestrielle: any[],
    repartitionRecettes: any[],
    categoriesDepenses: any[],
    periode: string
  ): Promise<void> {
    const sheet = workbook.addWorksheet('Données Graphiques', {
      views: [{ showGridLines: true }]
    });

    sheet.columns = [
      { width: 25 },
      { width: 20 },
      { width: 20 },
      { width: 20 }
    ];

    const titleRow = sheet.addRow(['DONNÉES POUR GRAPHIQUES ET VISUALISATIONS']);
    titleRow.font = { size: 14, bold: true, color: { argb: 'FFFFFF' } };
    titleRow.alignment = { horizontal: 'center', vertical: 'middle' };
    titleRow.height = 30;
    sheet.mergeCells('A1:D1');
    titleRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '6C757D' }
      };
    });

    sheet.addRow([]);
    sheet.addRow(['Cette feuille contient les données structurées pour créer des graphiques']);
    sheet.addRow([]);

    const evolutionHeaderRow = sheet.addRow(['ÉVOLUTION DANS LE TEMPS']);
    evolutionHeaderRow.font = { size: 12, bold: true, color: { argb: 'FFFFFF' } };
    sheet.mergeCells(`A${evolutionHeaderRow.number}:D${evolutionHeaderRow.number}`);
    evolutionHeaderRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0D6EFD' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    const evolutionColsRow = sheet.addRow(['Période', 'Recettes Budget', 'Recettes Réalisé', 'Dépenses Réalisé']);
    evolutionColsRow.font = { bold: true };
    evolutionColsRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'E7F3FF' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    evolutionTrimestrielle.forEach(e => {
      const row = sheet.addRow([
        e.periode,
        e.budgetRecettes || e.realiseRecettes || 0,
        e.realiseRecettes || 0,
        e.realiseDepenses || e.budgetDepenses || 0
      ]);
      
      row.getCell(2).numFmt = '#,##0';
      row.getCell(3).numFmt = '#,##0';
      row.getCell(4).numFmt = '#,##0';
    });

    sheet.addRow([]);
    sheet.addRow([]);

    const repartitionRecHeaderRow = sheet.addRow(['RÉPARTITION DES RECETTES PAR SOURCE']);
    repartitionRecHeaderRow.font = { size: 12, bold: true, color: { argb: 'FFFFFF' } };
    sheet.mergeCells(`A${repartitionRecHeaderRow.number}:C${repartitionRecHeaderRow.number}`);
    repartitionRecHeaderRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '28A745' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    const repartitionRecColsRow = sheet.addRow(['Source', 'Montant', 'Pourcentage']);
    repartitionRecColsRow.font = { bold: true };
    repartitionRecColsRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'E8F5E9' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    repartitionRecettes.forEach(r => {
      const row = sheet.addRow([
        r.libelle,
        r.montant,
        r.pourcentage
      ]);
      
      row.getCell(2).numFmt = '#,##0';
      row.getCell(3).numFmt = '0.0"%"';
    });

    sheet.addRow([]);
    sheet.addRow([]);

    const repartitionDepHeaderRow = sheet.addRow(['RÉPARTITION DES DÉPENSES PAR CATÉGORIE']);
    repartitionDepHeaderRow.font = { size: 12, bold: true, color: { argb: 'FFFFFF' } };
    sheet.mergeCells(`A${repartitionDepHeaderRow.number}:D${repartitionDepHeaderRow.number}`);
    repartitionDepHeaderRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'DC3545' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    const repartitionDepColsRow = sheet.addRow(['Catégorie', 'Budget', 'Réalisé', 'Taux']);
    repartitionDepColsRow.font = { bold: true };
    repartitionDepColsRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFEBEE' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    categoriesDepenses.forEach(c => {
      const row = sheet.addRow([
        c.libelle,
        c.budget,
        c.realise,
        c.taux
      ]);
      
      row.getCell(2).numFmt = '#,##0';
      row.getCell(3).numFmt = '#,##0';
      row.getCell(4).numFmt = '0.0"%"';
    });

    sheet.addRow([]);
    sheet.addRow([]);

    const instructionsRow = sheet.addRow(['INSTRUCTIONS POUR UTILISATION']);
    instructionsRow.font = { size: 11, bold: true, color: { argb: 'FFFFFF' } };
    sheet.mergeCells(`A${instructionsRow.number}:D${instructionsRow.number}`);
    instructionsRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFC107' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    const instructionsContent = sheet.addRow(['']);
    instructionsContent.getCell(1).value = `Cette feuille fournit des données structurées pour créer des visualisations :

1. Utilisez Excel : Insertion > Graphique pour créer vos visualisations
2. Sélectionnez les plages de données appropriées
3. Types de graphiques recommandés :
   - Évolution temporelle : Graphique en courbes ou histogrammes
   - Répartition recettes : Graphique en secteurs (camembert)
   - Répartition dépenses : Graphique en barres horizontales

4. Vous pouvez également exporter ces données vers Power BI, Tableau ou autres outils BI`;
    
    instructionsContent.getCell(1).alignment = { 
      horizontal: 'left', 
      vertical: 'top',
      wrapText: true 
    };
    sheet.mergeCells(`A${instructionsContent.number}:D${instructionsContent.number}`);
    instructionsContent.height = 120;
    instructionsContent.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFAF0' }
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
  }

  // === MÉTHODES UTILITAIRES ===

  private addDataRow(sheet: ExcelJS.Worksheet, label: string, value: any, isCurrency: boolean = false): ExcelJS.Row {
    const row = sheet.addRow([label, value]);
    row.height = 22;
    
    row.getCell(1).font = { bold: true };
    row.getCell(1).alignment = { horizontal: 'left', vertical: 'middle' };
    
    if (isCurrency) {
      row.getCell(2).numFmt = '#,##0';
    }
    row.getCell(2).alignment = { horizontal: 'right', vertical: 'middle' };
    
    row.eachCell(cell => {
      cell.border = {
        top: { style: 'thin', color: { argb: 'E0E0E0' } },
        bottom: { style: 'thin', color: { argb: 'E0E0E0' } }
      };
    });

    return row;
  }

  private getTauxColor(taux: number): string {
    if (taux >= 80) return '28A745';
    if (taux >= 60) return 'FFC107';
    if (taux > 0) return 'DC3545';
    return '6C757D';
  }

  private getPeriodeLabel(periode: string): string {
    const labels: any = {
      'annee': 'Annuelle',
      'trimestre': 'Trimestrielle',
      'mois': 'Mensuelle'
    };
    return labels[periode] || periode;
  }

  private getDateString(): string {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  }
}