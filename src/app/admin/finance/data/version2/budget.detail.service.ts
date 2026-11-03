import { Injectable } from '@angular/core';
import { Budget, LigneBudgetaire, Realisation } from './budget.model';

/**
 * Représente une réalisation cumulée par mois
 */
export interface RealisationMensuelle {
  mois: number; // 1-12
  moisLibelle: string; // Janvier, Février, etc.
  montantRealise: number;
  dateDebut: Date; // 1er du mois
  dateFin: Date; // Dernier jour du mois
}

/**
 * Représente les données d'une rubrique avec cumuls mensuels
 */
export interface RubriqueDetail {
  classe: string;
  compte: string;
  sousCompte: string;
  rubrique: string;
  libelle: string;
  montantBudget: number;
  
  // Réalisations cumulées par mois
  realisationsMensuelles: RealisationMensuelle[];
  
  // Synthèse globale
  totalRealise: number;
  tauxExecution: number; // en %
  resteARealiser: number;
  
  // Type de rubrique
  type: 'RECETTE' | 'DEPENSE';
}

/**
 * Représente une catégorie (Recettes ou Dépenses) avec ses rubriques
 */
export interface CategorieEtat {
  type: 'RECETTE' | 'DEPENSE';
  libelle: string;
  total: number;
  rubriques: RubriqueDetail[];
  
  // Totaux consolidés
  totalRealise: number;
  tauxExecution: number;
  resteARealiser: number;
}

/**
 * État complet du budget détaillé par mois et rubrique
 */
export interface EtatBudgetDetails {
  budgetId: string;
  budgetCode: string;
  budgetLibelle: string;
  annee: number;
  dateGeneration: Date;
  
  recettes: CategorieEtat;
  depenses: CategorieEtat;
  
  // Totaux globaux
  totalRecettesPrevu: number;
  totalDepensesPrevu: number;
  totalRecettesRealise: number;
  totalDepensesRealise: number;
  tauxExecutionRecettes: number;
  tauxExecutionDepenses: number;
}

const MOIS_NOMS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

@Injectable({
  providedIn: 'root',
})
export class BudgetDetailsService {
  constructor() {}

  /**
   * Obtient le dernier jour du mois
   */
  private getDernierjouduMois(annee: number, mois: number): number {
    return new Date(annee, mois, 0).getDate();
  }

  /**
   * Cumule les réalisations par mois pour une ligne budgétaire
   */
  private cumulerRealisationsMensuelles(
    realisations: Realisation[],
    annee: number
  ): RealisationMensuelle[] {
    const moisMap = new Map<number, number>();

    // Initialiser les 12 mois
    for (let m = 1; m <= 12; m++) {
      moisMap.set(m, 0);
    }

    // Accumuler les réalisations par mois
    for (const real of realisations) {
      const date = typeof real.date === 'string' ? new Date(real.date) : real.date;
      const mois = date.getMonth() + 1; // 1-12
      const anneeReal = date.getFullYear();

      // Ne considérer que les réalisations de l'année du budget
      if (anneeReal === annee) {
        moisMap.set(mois, (moisMap.get(mois) || 0) + real.montant);
      }
    }

    // Construire le tableau des réalisations mensuelles
    const result: RealisationMensuelle[] = [];
    for (let mois = 1; mois <= 12; mois++) {
      const montant = moisMap.get(mois) || 0;
      result.push({
        mois,
        moisLibelle: MOIS_NOMS[mois - 1],
        montantRealise: montant,
        dateDebut: new Date(annee, mois - 1, 1),
        dateFin: new Date(annee, mois, 0),
      });
    }

    return result;
  }

  /**
   * Détermine la classe (6 ou 7) à partir du code rubrique
   */
  private determinerClasse(code: string): string {
    return code.charAt(0); // Premier caractère: '6' ou '7'
  }

  /**
   * Détermine le compte à partir du code rubrique (ex: '70700' → '70')
   */
  private determinerCompte(code: string): string {
    return code.substring(0, 2);
  }

  /**
   * Détermine le sous-compte à partir du code rubrique (ex: '70700' → '707')
   */
  private determinerSousCompte(code: string): string {
    return code.substring(0, 3);
  }

  /**
   * Détermine le type (RECETTE ou DEPENSE) à partir de la classe
   */
  private determinerType(classe: string): 'RECETTE' | 'DEPENSE' {
    return classe === '7' ? 'RECETTE' : 'DEPENSE';
  }

  /**
   * Transforme une ligne budgétaire en rubrique détail
   */
  private transformerEnRubriqueDetail(ligne: LigneBudgetaire, annee: number): RubriqueDetail {
    const classe = this.determinerClasse(ligne.code);
    const compte = this.determinerCompte(ligne.code);
    const sousCompte = this.determinerSousCompte(ligne.code);
    const type = this.determinerType(classe);

    const realisationsMensuelles = this.cumulerRealisationsMensuelles(
      ligne.realisations || [],
      annee
    );

    const totalRealise = realisationsMensuelles.reduce(
      (sum, m) => sum + m.montantRealise,
      0
    );

    const tauxExecution = ligne.montant > 0 
      ? Math.round((totalRealise / ligne.montant) * 100)
      : 0;

    const resteARealiser = ligne.montant - totalRealise;

    return {
      classe,
      compte,
      sousCompte,
      rubrique: ligne.code,
      libelle: ligne.libelle,
      montantBudget: ligne.montant,
      realisationsMensuelles,
      totalRealise,
      tauxExecution,
      resteARealiser,
      type,
    };
  }

  /**
   * Génère l'état complet des détails budgétaires
   */
  genererEtatBudgetDetails(budget: Budget): EtatBudgetDetails {
    // Transformer toutes les lignes en rubriques détail
    const rubriques = (budget.lignes || []).map((ligne) =>
      this.transformerEnRubriqueDetail(ligne, budget.annee)
    );

    // Séparer recettes et dépenses
    const recettes = rubriques.filter((r) => r.type === 'RECETTE');
    const depenses = rubriques.filter((r) => r.type === 'DEPENSE');

    // Calculer les totaux pour les recettes
    const totalRecettesRealise = recettes.reduce((sum, r) => sum + r.totalRealise, 0);
    const tauxExecutionRecettes = budget.montantRecette > 0
      ? Math.round((totalRecettesRealise / budget.montantRecette) * 100)
      : 0;

    // Calculer les totaux pour les dépenses
    const totalDepensesRealise = depenses.reduce((sum, r) => sum + r.totalRealise, 0);
    const tauxExecutionDepenses = budget.montantDepense > 0
      ? Math.round((totalDepensesRealise / budget.montantDepense) * 100)
      : 0;

    // Construire les catégories
    const categorieRecettes: CategorieEtat = {
      type: 'RECETTE',
      libelle: 'TOTAL RECETTES DE FONCTIONNEMENT',
      total: budget.montantRecette,
      rubriques: recettes,
      totalRealise: totalRecettesRealise,
      tauxExecution: tauxExecutionRecettes,
      resteARealiser: budget.montantRecette - totalRecettesRealise,
    };

    const categorieDepenses: CategorieEtat = {
      type: 'DEPENSE',
      libelle: 'TOTAL DÉPENSES DE FONCTIONNEMENT',
      total: budget.montantDepense,
      rubriques: depenses,
      totalRealise: totalDepensesRealise,
      tauxExecution: tauxExecutionDepenses,
      resteARealiser: budget.montantDepense - totalDepensesRealise,
    };

    return {
      budgetId: budget.id,
      budgetCode: budget.code,
      budgetLibelle: budget.libelle,
      annee: budget.annee,
      dateGeneration: new Date(),
      recettes: categorieRecettes,
      depenses: categorieDepenses,
      totalRecettesPrevu: budget.montantRecette,
      totalDepensesPrevu: budget.montantDepense,
      totalRecettesRealise,
      totalDepensesRealise,
      tauxExecutionRecettes,
      tauxExecutionDepenses,
    };
  }

  /**
   * Obtient les réalisations cumulées jusqu'à une date spécifique
   */
  obtenirRealisationsJusquaDate(
    etat: EtatBudgetDetails,
    dateLimit: Date
  ): EtatBudgetDetails {
    const cumulPartiel = { ...etat };

    const filterMoisPartiel = (realisations: RealisationMensuelle[]) => {
      return realisations.map((m) => ({
        ...m,
        montantRealise: m.dateFin <= dateLimit ? m.montantRealise : 0,
      }));
    };

    const recalculerRubriques = (rubriques: RubriqueDetail[]) => {
      return rubriques.map((r) => {
        const realisationsMensuelles = filterMoisPartiel(r.realisationsMensuelles);
        const totalRealise = realisationsMensuelles.reduce(
          (sum, m) => sum + m.montantRealise,
          0
        );
        const tauxExecution = r.montantBudget > 0
          ? Math.round((totalRealise / r.montantBudget) * 100)
          : 0;

        return {
          ...r,
          realisationsMensuelles,
          totalRealise,
          tauxExecution,
          resteARealiser: r.montantBudget - totalRealise,
        };
      });
    };

    const recettesPartielles = recalculerRubriques(etat.recettes.rubriques);
    const depensesPartielles = recalculerRubriques(etat.depenses.rubriques);

    const totalRecettesRealise = recettesPartielles.reduce(
      (sum, r) => sum + r.totalRealise,
      0
    );
    const tauxExecutionRecettes = etat.totalRecettesPrevu > 0
      ? Math.round((totalRecettesRealise / etat.totalRecettesPrevu) * 100)
      : 0;

    const totalDepensesRealise = depensesPartielles.reduce(
      (sum, r) => sum + r.totalRealise,
      0
    );
    const tauxExecutionDepenses = etat.totalDepensesPrevu > 0
      ? Math.round((totalDepensesRealise / etat.totalDepensesPrevu) * 100)
      : 0;

    cumulPartiel.recettes = {
      ...etat.recettes,
      rubriques: recettesPartielles,
      totalRealise: totalRecettesRealise,
      tauxExecution: tauxExecutionRecettes,
      resteARealiser: etat.totalRecettesPrevu - totalRecettesRealise,
    };

    cumulPartiel.depenses = {
      ...etat.depenses,
      rubriques: depensesPartielles,
      totalRealise: totalDepensesRealise,
      tauxExecution: tauxExecutionDepenses,
      resteARealiser: etat.totalDepensesPrevu - totalDepensesRealise,
    };

    cumulPartiel.totalRecettesRealise = totalRecettesRealise;
    cumulPartiel.totalDepensesRealise = totalDepensesRealise;
    cumulPartiel.tauxExecutionRecettes = tauxExecutionRecettes;
    cumulPartiel.tauxExecutionDepenses = tauxExecutionDepenses;

    return cumulPartiel;
  }

  /**
   * Formate un montant en monnaie (CFA)
   */
  formatMontant(montant: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(montant);
  }

  /**
   * Formate un taux d'exécution avec symbole %
   */
  formatTaux(taux: number): string {
    return `${taux}%`;
  }
}