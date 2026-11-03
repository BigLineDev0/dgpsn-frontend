import { Injectable, signal } from '@angular/core';
import {
  IBudget,
  MOCK_BUDGET_NEW,
  StatutBonEngagement,
  IBonEngagement,
  typeBonEngagement,
} from './new.model';

@Injectable({ providedIn: 'root' })
export class NewMockService {
  calculateBudgetTauxExecution(budget: IBudget) {
    throw new Error('Method not implemented.');
  }
  private budgetsSig = signal<IBudget[]>([structuredClone(MOCK_BUDGET_NEW)]);

  // ---------- READ ----------
  listBudgets() {
    return this.budgetsSig.asReadonly();
  }

  getBudgetById(id: string): IBudget | undefined {
    return this.budgetsSig().find(b => b.id === id);
  }

  // ---------- BUDGET CRUD ----------
  addBudget(budget: IBudget) {
    this.budgetsSig.update(list => [structuredClone(budget), ...list]);
  }

  updateBudget(id: string, patch: Partial<IBudget>) {
    this.budgetsSig.update(list =>
      list.map(b => (b.id === id ? { ...b, ...patch } : b))
    );
  }

  deleteBudget(id: string) {
    this.budgetsSig.update(list => list.filter(b => b.id !== id));
  }

  getBudgetBycode(code : string) {
    return this.budgetsSig().find(b => b.code === code);
  }

  getLignesByCode(code : string) {
    const budget = this.getBudgetBycode(code);
    if (!budget) return [];
    return budget.rubriques?.map(r => r.lignes) ?? [];
  }

  getLignesByIdBudget(id: string) {
    const budget = this.getBudgetById(id);
    if (!budget) return [];
    return budget.rubriques?.map(r => r.lignes) ?? [];
  }


  allRealisationsByLigneCode(codeLigne : string) {
    const ligne = this.budgetsSig()
      .flatMap(b => (b.rubriques ?? []))
      .flatMap(r => (r.lignes ?? []))
      .find(l => l.code === codeLigne);
    return ligne?.realisations ?? [];
  }

  // ============================================================================
  // MÉTHODES POUR BONS D'ENGAGEMENT
  // ============================================================================

  /**
   * Récupère tous les bons d'engagement de tous les budgets
   */
  getAllBonEngagements(): IBonEngagement[] {
    const allBE: IBonEngagement[] = [];
    
    this.budgetsSig().forEach(budget => {
      budget.rubriques?.forEach(rubrique => {
        rubrique.lignes?.forEach(ligne => {
          if (ligne.bonEngagements && ligne.bonEngagements.length > 0) {
            allBE.push(...ligne.bonEngagements);
          }
        });
      });
    });

    return allBE;
  }

  /**
   * Récupère les bons d'engagement d'un budget spécifique
   */
  getBonEngagementsByBudgetId(budgetId: string): IBonEngagement[] {
    const budget = this.getBudgetById(budgetId);
    if (!budget) return [];

    const allBE: IBonEngagement[] = [];
    budget.rubriques?.forEach(rubrique => {
      rubrique.lignes?.forEach(ligne => {
        if (ligne.bonEngagements) {
          allBE.push(...ligne.bonEngagements);
        }
      });
    });

    return allBE;
  }

  /**
   * Récupère les bons d'engagement d'un budget par code
   */
  getBonEngagementsByBudgetCode(budgetCode: string): IBonEngagement[] {
    const budget = this.getBudgetBycode(budgetCode);
    if (!budget) return [];

    const allBE: IBonEngagement[] = [];
    budget.rubriques?.forEach(rubrique => {
      rubrique.lignes?.forEach(ligne => {
        if (ligne.bonEngagements) {
          allBE.push(...ligne.bonEngagements);
        }
      });
    });

    return allBE;
  }

  /**
   * Récupère un bon d'engagement par ID
   */
  getBonEngagementById(beId: string): IBonEngagement | undefined {
    const allBE = this.getAllBonEngagements();
    return allBE.find(be => be.id === beId);
  }

  /**
   * Filtre les BE par année
   */
  getBonEngagementsByAnnee(annee: string): IBonEngagement[] {
    const allBE = this.getAllBonEngagements();
    return allBE.filter(be => {
      const beYear = new Date(be.date).getFullYear();
      return beYear.toString() === annee;
    });
  }

  /**
   * Filtre les BE par type
   */
  getBonEngagementsByType(type: typeBonEngagement): IBonEngagement[] {
    const allBE = this.getAllBonEngagements();
    return allBE.filter(be => be.type === type);
  }

  /**
   * Filtre les BE par statut
   */
  getBonEngagementsByStatut(statut: StatutBonEngagement): IBonEngagement[] {
    const allBE = this.getAllBonEngagements();
    return allBE.filter(be => be.statut === statut);
  }

  /**
   * Filtre les BE par année et budget
   */
  getBonEngagementsByAnneeAndBudget(annee: string, budgetCode: string): IBonEngagement[] {
    const budgetBE = this.getBonEngagementsByBudgetCode(budgetCode);
    return budgetBE.filter(be => {
      const beYear = new Date(be.date).getFullYear();
      return beYear.toString() === annee;
    });
  }

  /**
   * Recherche dans les BE par terme
   */
  searchBonEngagements(searchTerm: string): IBonEngagement[] {
    const allBE = this.getAllBonEngagements();
    const term = searchTerm.toLowerCase();
    
    return allBE.filter(be =>
      be.numero_bon.toLowerCase().includes(term) ||
      be.numero_BE.toLowerCase().includes(term) ||
      be.description.toLowerCase().includes(term) ||
      be.numero_mandat.toLowerCase().includes(term) ||
      (be.facturesEtats && be.facturesEtats.toLowerCase().includes(term))
    );
  }

  /**
   * Ajoute un bon d'engagement à une ligne budgétaire
   */
  addBonEngagement(ligneBudgetaireId: string, bonEngagement: IBonEngagement): boolean {
    let added = false;

    this.budgetsSig.update(budgets => {
      return budgets.map(budget => {
        const updatedBudget = { ...budget };
        
        updatedBudget.rubriques = budget.rubriques?.map(rubrique => {
          const updatedRubrique = { ...rubrique };
          
          updatedRubrique.lignes = rubrique.lignes?.map(ligne => {
            if (ligne.id === ligneBudgetaireId) {
              added = true;
              return {
                ...ligne,
                bonEngagements: [
                  ...(ligne.bonEngagements || []),
                  { ...bonEngagement, ligneBudgetaireId }
                ]
              };
            }
            return ligne;
          });
          
          return updatedRubrique;
        });
        
        return updatedBudget;
      });
    });

    return added;
  }

  /**
   * Met à jour un bon d'engagement
   */
  updateBonEngagement(beId: string, patch: Partial<IBonEngagement>): boolean {
    let updated = false;

    this.budgetsSig.update(budgets => {
      return budgets.map(budget => {
        const updatedBudget = { ...budget };
        
        updatedBudget.rubriques = budget.rubriques?.map(rubrique => {
          const updatedRubrique = { ...rubrique };
          
          updatedRubrique.lignes = rubrique.lignes?.map(ligne => {
            const updatedLigne = { ...ligne };
            
            updatedLigne.bonEngagements = ligne.bonEngagements?.map(be => {
              if (be.id === beId) {
                updated = true;
                return { ...be, ...patch };
              }
              return be;
            });
            
            return updatedLigne;
          });
          
          return updatedRubrique;
        });
        
        return updatedBudget;
      });
    });

    return updated;
  }

  /**
   * Supprime un bon d'engagement
   */
  deleteBonEngagement(beId: string): boolean {
    let deleted = false;

    this.budgetsSig.update(budgets => {
      return budgets.map(budget => {
        const updatedBudget = { ...budget };
        
        updatedBudget.rubriques = budget.rubriques?.map(rubrique => {
          const updatedRubrique = { ...rubrique };
          
          updatedRubrique.lignes = rubrique.lignes?.map(ligne => {
            const updatedLigne = { ...ligne };
            const initialLength = ligne.bonEngagements?.length || 0;
            
            updatedLigne.bonEngagements = ligne.bonEngagements?.filter(be => be.id !== beId);
            
            if (updatedLigne.bonEngagements && updatedLigne.bonEngagements.length < initialLength) {
              deleted = true;
            }
            
            return updatedLigne;
          });
          
          return updatedRubrique;
        });
        
        return updatedBudget;
      });
    });

    return deleted;
  }

  /**
   * Change le statut d'un bon d'engagement
   */
  updateBonEngagementStatut(beId: string, nouveauStatut: StatutBonEngagement): boolean {
    return this.updateBonEngagement(beId, { statut: nouveauStatut });
  }

  /**
   * Récupère les BE d'une ligne budgétaire spécifique
   */
  getBonEngagementsByLigneId(ligneId: string): IBonEngagement[] {
    const ligne = this.budgetsSig()
      .flatMap(b => b.rubriques ?? [])
      .flatMap(r => r.lignes ?? [])
      .find(l => l.id === ligneId);
    
    return ligne?.bonEngagements ?? [];
  }

  // ============================================================================
  // MÉTHODES DE CALCUL POUR LES STATISTIQUES
  // ============================================================================

  /**
   * Calcule les statistiques d'une ligne budgétaire
   */
  // getStatistiquesLigne(ligneId: string) {
  //   const ligne = this.budgetsSig()
  //     .flatMap(b => b.rubriques ?? [])
  //     .flatMap(r => r.lignes ?? [])
  //     .find(l => l.id === ligneId);

  //   if (!ligne) {
  //     return {
  //       budgetAlloue: 0,
  //       totalRealisation: 0,
  //       creditDisponible: 0,
  //       tauxExecution: 0,
  //       nombreBE: 0,
  //       nombreBEValides: 0,
  //       nombreBEEnAttente: 0
  //     };
  //   }

  //   const totalRealisation = calculerTotalRealisation(ligne);
  //   const creditDisponible = calculerCreditDisponible(ligne);
  //   const tauxExecution = calculerTauxExecution(ligne);

  //   return {
  //     budgetAlloue: ligne.montant,
  //     totalRealisation,
  //     creditDisponible,
  //     tauxExecution,
  //     nombreBE: ligne.bonEngagements?.length || 0,
  //     nombreBEValides: ligne.bonEngagements?.filter(be => be.statut === 'VALIDE' || be.statut === 'REALISE').length || 0,
  //     nombreBEEnAttente: ligne.bonEngagements?.filter(be => be.statut === 'EN_ATTENTE').length || 0
  //   };
  // }

  /**
   * Récupère les statistiques globales des BE
   */
  getStatistiquesBonEngagements() {
    const allBE = this.getAllBonEngagements();
    
    return {
      nombreTotal: allBE.length,
      nombreValides: allBE.filter(be => be.statut === 'VALIDE').length,
      nombreRealises: allBE.filter(be => be.statut === 'REALISE').length,
      nombreEnAttente: allBE.filter(be => be.statut === 'EN_ATTENTE').length,
      nombreRejetes: allBE.filter(be => be.statut === 'REJETE').length,
      montantTotal: allBE.reduce((sum, be) => sum + be.montant, 0),
      montantValides: allBE.filter(be => be.statut === 'VALIDE').reduce((sum, be) => sum + be.montant, 0),
      montantRealises: allBE.filter(be => be.statut === 'REALISE').reduce((sum, be) => sum + be.montant, 0),
      montantEnAttente: allBE.filter(be => be.statut === 'EN_ATTENTE').reduce((sum, be) => sum + be.montant, 0),
    };
  }

  /**
   * Formate un montant en millions/milliards
   */
  formatMontant(montant: number): string {
    if (montant >= 1000000000) {
      return `${(montant / 1000000000).toFixed(2)} Mds FCFA`;
    }
    return `${(montant / 1000000).toFixed(1)}M FCFA`;
  }

  /**
   * Prépare les données pour export Excel
   */
  prepareExportBonEngagements(bonEngagements?: IBonEngagement[]) {
    const beToExport = bonEngagements || this.getAllBonEngagements();
    
    return beToExport.map(be => ({
      'N° Bon': be.numero_bon,
      'Date': new Date(be.date).toLocaleDateString('fr-FR'),
      'N° BE': be.numero_BE,
      'N° Mandat': be.numero_mandat,
      'Type': be.type,
      'Description': be.description,
      'Montant': be.montant,
      'Montant Formaté': this.formatMontant(be.montant),
      'Statut': this.getStatutLabel(be.statut),
      'Factures/États': be.facturesEtats || 'N/A'
    }));
  }

  /**
   * Obtient le label français d'un statut
   */
  private getStatutLabel(statut: StatutBonEngagement): string {
    const labels: Record<StatutBonEngagement, string> = {
      'VALIDE': 'Validé',
      'REALISE': 'Réalisé',
      'EN_ATTENTE': 'En attente',
      'REJETE': 'Rejeté'
    };
    return labels[statut];
  }
}