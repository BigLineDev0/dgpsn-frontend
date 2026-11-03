import { Injectable, signal } from '@angular/core';
import { Budget, LigneBudgetaire, MOCK_BUDGET_2025, Realisation } from './budget.model';




@Injectable({ providedIn: 'root' })
export class BudgetService {
  // private budgetsSig = signal<Budget[]>([structuredClone(MOCK_BUDGET_2025)]);
  private budgetsSig = signal<Budget[]>(structuredClone(MOCK_BUDGET_2025));

  // ---------- READ ----------
  allBudgets() {
    return this.budgetsSig.asReadonly();
  }

  getBudgetById(id: string): Budget | undefined {
    return this.budgetsSig().find(b => b.id === id);
  }


  allRubriquesFilterInClass(keyCode : string) : LigneBudgetaire[] {
    // load all budget 
    const budgets = this.allBudgets();
    // filter all rubriques in class
    const rubriques = budgets().flatMap(b => b.lignes ?? []);
    // return rubriques classes ie 7 or 6
    return rubriques.filter(r => r.code.startsWith(keyCode));
  }

  allRealisationsFilterInLigne(keyCode : string) : Realisation[] {
    // load all budget 
    const budgets = this.allBudgets();
    // filter all rubriques in class
    const rubriquesFilter = budgets().flatMap(b => b.lignes ?? []).filter(r => r.code.startsWith(keyCode));
    // return rubriques classes ie 7 or 6 or 2
    const realisations = rubriquesFilter.flatMap(r => r.realisations ?? []);
    return realisations;
  }
  // ---------- BUDGET CRUD ----------
  addBudget(budget: Budget) {
    this.budgetsSig.update(list => [structuredClone(budget), ...list]);
  }

  updateBudget(id: string, patch: Partial<Budget>) {
    this.budgetsSig.update(list =>
      list.map(b => (b.id === id ? { ...b, ...patch } : b))
    );
  }

  deleteBudget(id: string) {
    this.budgetsSig.update(list => list.filter(b => b.id !== id));
  }

  addLigneToBudgetByCode(budgetCode: string, ligne: LigneBudgetaire) {
    this.budgetsSig.update(list =>
      list.map(b => {
        if (b.code !== budgetCode) return b;
        const existsIdx = b.lignes.findIndex(l => l.code === ligne.code);
        if (existsIdx >= 0) {
          const updated = [...b.lignes];
          // Mettre à jour le montant et libellé si nécessaire, conserver les réalisations existantes
          const prev = updated[existsIdx];
          updated[existsIdx] = {
            ...prev,
            libelle: ligne.libelle ?? prev.libelle,
            montant: ligne.montant,
          };
          return { ...b, lignes: updated };
        }
        return { ...b, lignes: [structuredClone(ligne), ...b.lignes] };
      })
    );
  }

  getBudgetBycode(code : string) {
    return this.budgetsSig().find(b => b.code === code);
  } 


//   // ETAT BUDGET
//   getEtatMensuel(budgetId: string) {
//   const budget = this.getBudgetById(budgetId);
//   if (!budget) return [];

//   return budget.lignes.map(ligne => {
//     const totalRealisations = ligne.realisations.reduce(
//       (sum, r) => sum + (r.montant || 0),
//       0
//     );

//     const tauxExecution = ligne.montant
//       ? Math.round((totalRealisations / ligne.montant) * 100)
//       : 0;

//     const resteARealiser = ligne.montant - totalRealisations;

//     // Regrouper les réalisations par mois
//     const realisationsParMois: Record<string, number> = {};
//     ligne.realisations.forEach(r => {
//       const date = new Date(r.date);
//       const mois = date.toLocaleString('fr-FR', { month: 'long' });
//       realisationsParMois[mois] =
//         (realisationsParMois[mois] || 0) + r.montant;
//     });

//     return {
//       code: ligne.code,
//       libelle: ligne.libelle,
//       montantBudget: ligne.montant,
//       realisationsParMois,
//       totalRealisations,
//       tauxExecution,
//       resteARealiser,
//     };
//   });
// }

// Dans ton budget.service.ts, remplace la méthode getEtatMensuel par celle-ci :

getEtatMensuel(budgetId: string) {
  const budget = this.getBudgetById(budgetId);
  if (!budget) return [];

  const months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];

  return budget.lignes.map(ligne => {
    const totalRealisations = ligne.realisations.reduce(
      (sum, r) => sum + (r.montant || 0),
      0
    );

    const tauxExecution = ligne.montant
      ? Math.round((totalRealisations / ligne.montant) * 100)
      : 0;

    const resteARealiser = ligne.montant - totalRealisations;

    // Regrouper les réalisations par mois
    const realisationsParMois: Record<string, number> = {};
    
    ligne.realisations.forEach(r => {
      let date: Date;
      
      // Gérer les dates string ou Date
      if (typeof r.date === 'string') {
        date = new Date(r.date);
      } else {
        date = r.date;
      }
      
      // Vérifier que la date est valide
      if (isNaN(date.getTime())) {
        console.warn(`Date invalide pour réalisation ${r.id}:`, r.date);
        return;
      }
      
      // Obtenir le mois (0-11) et le convertir en nom français
      const moisIndex = date.getMonth();
      const moisName = months[moisIndex];
      
      // Additionner les montants par mois
      realisationsParMois[moisName] = 
        (realisationsParMois[moisName] || 0) + (r.montant || 0);
    });

    return {
      code: ligne.code,
      libelle: ligne.libelle,
      montantBudget: ligne.montant,
      realisationsParMois,
      totalRealisations,
      tauxExecution,
      resteARealiser,
    };
  });
}


}