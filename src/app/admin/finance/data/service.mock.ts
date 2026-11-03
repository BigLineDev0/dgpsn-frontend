

import { Injectable, signal, computed } from '@angular/core';
import { Budget, LigneBudgetaire, MOCK_BUDGETS, Depense } from './data.mock';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private budgetsSignal = signal<Budget[]>(MOCK_BUDGETS);

  budgets = this.budgetsSignal.asReadonly();

  getBudgetById(id: string) {
    return computed(() =>
      this.budgetsSignal().find(b => b.id === id)
    );
  }

  getCodeBudget(id: string) {
    return computed(() => {
        const code = this.budgetsSignal().find(b => b.id === id)?.code;
        return code?.[0];
    });
  }

  getRubriqueById(budgetId: string, rubriqueId: string) {
    return computed(() => {
      const budget = this.budgetsSignal().find(b => b.id === budgetId);
      return budget?.rubriques.find(r => r.id === rubriqueId);
    });
  }

  getLigneByCode(budgetId: string, rubriqueId: string, ligneCode: string) {
    return computed(() => {
      const budget = this.budgetsSignal().find(b => b.id === budgetId);
      const rubrique = budget?.rubriques.find(r => r.id === rubriqueId);
      return rubrique?.lignes.find(l => l.code === ligneCode);
    });
  }

  calculateTauxExecution(realise: number, budgetaire: number): number {
    if (budgetaire === 0) return 0;
    return Math.round((realise / budgetaire) * 100);
  }

  calculateResteARealiser(budgetaire: number, realise: number): number {
    return budgetaire - realise;
  }

  calculateBudgetTauxExecution(budget: Budget): number {
    const totalBudgetaire = budget.rubriques.reduce((sum, r) => sum + r.montantBudgetaire, 0);
    const totalRealise = budget.rubriques.reduce((sum, r) => sum + r.montantRealise, 0);
    return this.calculateTauxExecution(totalRealise, totalBudgetaire);
  }

  calculateLigneTotalRealise(ligne: LigneBudgetaire): number {
    if (ligne.realisations !== undefined) {
      return ligne.realisations;
    }
    return ligne.depensesJournalieres?.reduce((sum, d) => sum + d.montant, 0) || 0;
  }

  // --- CRUD METHODS ---
  addBudget(budget: Budget): void {
    this.budgetsSignal.update((list) => [budget, ...list]);
  }

  updateBudget(updated: Budget): void {
    this.budgetsSignal.update((list) =>
      list.map((b) => (b.id === updated.id ? { ...b, ...updated } : b))
    );
  }

  deleteBudget(id: string): void {
    this.budgetsSignal.update((list) => list.filter((b) => b.id !== id));
  }

  // --- SEARCH ---
  searchBudgets(criteria: Partial<Pick<Budget, 'code' | 'libelle' | 'montant' | 'annee'>>): Budget[] {
    const { code, libelle, montant, annee } = criteria;
    const q = (v: unknown) => (v ?? '').toString().toLowerCase();
    return this.budgetsSignal().filter((b) => {
      const byCode = code ? q(b.code).includes(q(code)) : true;
      const byLibelle = libelle ? q(b.libelle).includes(q(libelle)) : true;
      const byMontant = typeof montant === 'number' && !Number.isNaN(montant) ? b.montant === montant : true;
      const byAnnee = annee ? q(b.annee) === q(annee) : true;
      return byCode && byLibelle && byMontant && byAnnee;
    });
  }

  // --- RUBRIQUES ---
  addRubrique(budgetId: string, rubrique: any): void {
    this.budgetsSignal.update((list) =>
      list.map((b) => {
        if (b.id !== budgetId) return b;
        const newRubrique = this.computeRubriqueTotals({ ...rubrique });
        return { ...b, rubriques: [newRubrique, ...b.rubriques] };
      })
    );
  }

  updateRubrique(budgetId: string, rubriqueId: string, patch: Partial<any>): void {
    this.budgetsSignal.update((list) =>
      list.map((b) => {
        if (b.id !== budgetId) return b;
        const rubriques = b.rubriques.map((r) => {
          if (r.id !== rubriqueId) return r;
          const updated = { ...r, ...patch } as any;
          return this.computeRubriqueTotals(updated);
        });
        return { ...b, rubriques };
      })
    );
  }

  deleteRubrique(budgetId: string, rubriqueId: string): void {
    this.budgetsSignal.update((list) =>
      list.map((b) =>
        b.id === budgetId ? { ...b, rubriques: b.rubriques.filter((r) => r.id !== rubriqueId) } : b
      )
    );
  }

  // --- LIGNES ---
  addLigne(budgetId: string, rubriqueId: string, ligne: LigneBudgetaire): void {
    this.budgetsSignal.update((list) =>
      list.map((b) => {
        if (b.id !== budgetId) return b;
        const rubriques = b.rubriques.map((r) => {
          if (r.id !== rubriqueId) return r;
          const lignes = [ligne, ...r.lignes];
          const updated = this.computeRubriqueTotals({ ...r, lignes });
          return updated as any;
        });
        return { ...b, rubriques };
      })
    );
  }

  updateLigne(
    budgetId: string,
    rubriqueId: string,
    ligneCode: string,
    patch: Partial<LigneBudgetaire>
  ): void {
    this.budgetsSignal.update((list) =>
      list.map((b) => {
        if (b.id !== budgetId) return b;
        const rubriques = b.rubriques.map((r) => {
          if (r.id !== rubriqueId) return r;
          const lignes = r.lignes.map((l) => (l.code === ligneCode ? { ...l, ...patch } : l));
          const updated = this.computeRubriqueTotals({ ...r, lignes });
          return updated as any;
        });
        return { ...b, rubriques };
      })
    );
  }

  deleteLigne(budgetId: string, rubriqueId: string, ligneCode: string): void {
    this.budgetsSignal.update((list) =>
      list.map((b) => {
        if (b.id !== budgetId) return b;
        const rubriques = b.rubriques.map((r) => {
          if (r.id !== rubriqueId) return r;
          const lignes = r.lignes.filter((l) => l.code !== ligneCode);
          const updated = this.computeRubriqueTotals({ ...r, lignes });
          return updated as any;
        });
        return { ...b, rubriques };
      })
    );
  }

  // --- DEPENSES ---
  addDepense(
    budgetId: string,
    rubriqueId: string,
    ligneCode: string,
    depense: Depense
  ): void {
    this.budgetsSignal.update((list) =>
      list.map((b) => {
        if (b.id !== budgetId) return b;
        const rubriques = b.rubriques.map((r) => {
          if (r.id !== rubriqueId) return r;
          const lignes = r.lignes.map((l) => {
            if (l.code !== ligneCode) return l;
            const depenses = [depense, ...(l.depensesJournalieres ?? [])];
            const updatedLigne: LigneBudgetaire = { ...l, depensesJournalieres: depenses };
            return updatedLigne;
          });
          const updated = this.computeRubriqueTotals({ ...r, lignes });
          return updated as any;
        });
        return { ...b, rubriques };
      })
    );
  }

  deleteDepense(
    budgetId: string,
    rubriqueId: string,
    ligneCode: string,
    depenseId: string
  ): void {
    this.budgetsSignal.update((list) =>
      list.map((b) => {
        if (b.id !== budgetId) return b;
        const rubriques = b.rubriques.map((r) => {
          if (r.id !== rubriqueId) return r;
          const lignes = r.lignes.map((l) => {
            if (l.code !== ligneCode) return l;
            const depenses = (l.depensesJournalieres ?? []).filter((d) => d.id !== depenseId);
            const updatedLigne: LigneBudgetaire = { ...l, depensesJournalieres: depenses };
            return updatedLigne;
          });
          const updated = this.computeRubriqueTotals({ ...r, lignes });
          return updated as any;
        });
        return { ...b, rubriques };
      })
    );
  }

  // --- Helpers ---
  private computeRubriqueTotals(rubrique: any): any {
    const totalBudgetaire = (rubrique.lignes ?? []).reduce(
      (sum: number, l: LigneBudgetaire) => sum + (l.montant || 0),
      0
    );
    const totalRealise = (rubrique.lignes ?? []).reduce(
      (sum: number, l: LigneBudgetaire) => sum + this.calculateLigneTotalRealise(l),
      0
    );
    return {
      ...rubrique,
      montantBudgetaire: totalBudgetaire,
      montantRealise: totalRealise,
    };
  }
}
