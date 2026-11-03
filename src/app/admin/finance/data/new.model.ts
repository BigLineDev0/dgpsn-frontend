// ============================================================================
// ENUMS & TYPES DE BASE
// ============================================================================

export type TypeFlux = "DEPENSE" | "RECETTE";
export type TypeRubrique = "CHARGES" | "PRODUITS";
 export type typeBonEngagement = "INVESTISSEMENT" | "FONCTIONNEMENT";
 export type StatutBonEngagement = "EN_ATTENTE" | "VALIDE" | "REALISE" | "REJETE";

// ============================================================================
// INTERFACES DE BASE
// ============================================================================

/**
 * Interface de base commune à toutes les entités identifiables.
 */
export interface IBaseEntity {
  id: string;
  code: string;
  libelle: string;
}

// ============================================================================
// INTERFACES MÉTIER
// ============================================================================

/**
 * Dépense ou recette associée à une réalisation.
 */
export interface IDepenseRecette extends IBaseEntity {
  montant: number;
  date: string | Date;
  type: TypeFlux;
}

/**
 * Réalisation associée à une ou plusieurs dépenses/recettes.
 */
export interface IRealisation extends IBaseEntity {
  montant: number;
  date: string | Date;
  fournisseur?: string;
  depensesRecettes?: IDepenseRecette[];
}

/**
 * Ligne budgétaire contenant des réalisations.
 */
export interface ILigneBudgetaire extends IBaseEntity {
  montant: number;
  realisations?: IRealisation[];
  bonEngagements?: IBonEngagement[];
}

export interface IBonEngagement  {
  id: string;
  type: typeBonEngagement;
  numero_bon: string;
  date: string | Date;
  numero_BE: string;
  numero_mandat: string;
  description: string;
  montant: number;
  statut: StatutBonEngagement;
  facturesEtats?: string; // Ex: "salaires personnel contractuel DGPSN"
  ligneBudgetaireId?: string; 
}
/**
 * Rubrique budgétaire regroupant des lignes.
 */
export interface IRubrique extends IBaseEntity {
  type: TypeRubrique;
  montantBudgetaire: number;
  lignes?: ILigneBudgetaire[];
}

/**
 * Budget annuel regroupant des rubriques.
 */
export interface IBudget extends IBaseEntity {
  montantTotal: number;
  annee: string | Date;
  rubriques?: IRubrique[];
}



  // ============================================================================
  // MOCK DE DONNÉES
  // ============================================================================
  
  export const MOCK_BUDGET_NEW: IBudget = {
    id: "BUDG-2025-001",
    code: "7",
    libelle: "Budget Général 2025",
    montantTotal: 10800000,
    annee: "2025",
    rubriques: [
      {
        id: "RUB-001",
        code: "70040",
        libelle: "Charges de Fonctionnement",
        type: "CHARGES",
        montantBudgetaire: 8000000,
        lignes: [
          {
            id: "LIG-001",
            code: "60111",
            libelle: "Achat de fournitures de bureau",
            montant: 2500000,
            realisations: [
              {
                id: "REA-001",
                code: "REA-FB-01",
                libelle: "Achat de papier et stylos",
                montant: 500000,
                date: "2025-02-12",
                fournisseur: "Papeterie SENE BUREAU",
                depensesRecettes: [
                  {
                    id: "DEP-001",
                    code: "DEP-001",
                    libelle: "Facture Papeterie SENE BUREAU",
                    montant: 500000,
                    date: "2025-02-12",
                    type: "DEPENSE",
                  },
                ],
              },
              {
                id: "REA-002",
                code: "REA-FB-02",
                libelle: "Achat de toner imprimante",
                montant: 300000,
                date: "2025-04-05",
                fournisseur: "TECHNO OFFICE",
                depensesRecettes: [
                  {
                    id: "DEP-002",
                    code: "DEP-002",
                    libelle: "Facture Toner HP",
                    montant: 300000,
                    date: "2025-04-05",
                    type: "DEPENSE",
                  },
                ],
              },
            ],
             bonEngagements: [
            {
              id: "BE-001",
              type: "INVESTISSEMENT",
              numero_bon: "001151",
              date: "2025-01-22",
              numero_BE: "001",
              numero_mandat: "001",
              description: "salaires personnel contractuel DGPSN",
              montant: 15000000, // 15M FCFA
              statut: "VALIDE",
              facturesEtats: "salaires personnel contractuel DGPSN",
              ligneBudgetaireId: "LIG-FONCT-001"
            },
            {
              id: "BE-002",
              type: "FONCTIONNEMENT",
              numero_bon: "001151",
              date: "2025-01-22",
              numero_BE: "001",
              numero_mandat: "002",
              description: "personnel détachés janvier 2025",
              montant: 8500000, // 8.5M FCFA
              statut: "VALIDE",
              facturesEtats: "personnel détachés janvier 2025",
              ligneBudgetaireId: "LIG-FONCT-001"
            },
            {
              id: "BE-003",
              type: "INVESTISSEMENT",
              numero_bon: "001151",
              date: "2025-01-22",
              numero_BE: "001",
              numero_mandat: "003",
              description: "cotisations syndicat janvier 2025",
              montant: 500000, // 0.5M FCFA
              statut: "VALIDE",
              facturesEtats: "cotisations syndicat janvier 2025",
              ligneBudgetaireId: "LIG-FONCT-001"
            },
            {
              id: "BE-004",
              type: "FONCTIONNEMENT",
              numero_bon: "001158",
              date: "2025-02-24",
              numero_BE: "003",
              numero_mandat: "014",
              description: "salaires personnel contractuel DGPSN février 2025",
              montant: 15000000, // 15M FCFA
              statut: "VALIDE",
              facturesEtats: "salaires personnel contractuel DGPSN février 2025",
              ligneBudgetaireId: "LIG-FONCT-001"
            },
            {
              id: "BE-005",
              type: "INVESTISSEMENT",
              numero_bon: "001158",
              date: "2025-02-24",
              numero_BE: "003",
              numero_mandat: "015",
              description: "personnel détachés février 2025",
              montant: 8500000, // 8.5M FCFA
              statut: "VALIDE",
              facturesEtats: "personnel détachés février 2025",
              ligneBudgetaireId: "LIG-FONCT-001"
            }
          ],
          },
          {
            id: "LIG-002",
            code: "60112",
            libelle: "Frais d'entretien locaux",
            montant: 1500000,
            realisations: [
              {
                id: "REA-003",
                code: "REA-ENT-01",
                libelle: "Nettoyage et maintenance du siège",
                montant: 500000,
                date: "2025-03-18",
                fournisseur: "CLEAN SERVICE",
                depensesRecettes: [
                  {
                    id: "DEP-003",
                    code: "DEP-003",
                    libelle: "Contrat de nettoyage trimestriel",
                    montant: 500000,
                    date: "2025-03-18",
                    type: "DEPENSE",
                  },
                ],
              },
            ],
            bonEngagements: [
            {
              id: "BE-008",
              type: "FONCTIONNEMENT",
              numero_bon: "001151",
              date: "2025-01-22",
              numero_BE: "001",
              numero_mandat: "004",
              description: "ipres part employé janvier 2025",
              montant: 1200000, // 1.2M FCFA
              statut: "VALIDE",
              facturesEtats: "ipres part employé janvier 2025",
              ligneBudgetaireId: "LIG-FONCT-003"
            },
            {
              id: "BE-009",
              type: "INVESTISSEMENT",
              numero_bon: "001152",
              date: "2025-01-22",
              numero_BE: "001",
              numero_mandat: "008",
              description: "CSS Janvier 2025",
              montant: 950000, // 0.95M FCFA
              statut: "VALIDE",
              facturesEtats: "CSS Janvier 2025",
              ligneBudgetaireId: "LIG-FONCT-003"
            },
            {
              id: "BE-010",
              type: "INVESTISSEMENT",
              numero_bon: "001154",
              date: "2025-01-22",
              numero_BE: "001",
              numero_mandat: "010",
              description: "CFCE Janvier 2025",
              montant: 800000, // 0.8M FCFA
              statut: "VALIDE",
              facturesEtats: "CFCE Janvier 2025",
              ligneBudgetaireId: "LIG-FONCT-003"
            }
          ],
          },
        ],
      },
      {
        id: "RUB-002",
        code: "71",
        libelle: "Produits Divers",
        type: "PRODUITS",
        montantBudgetaire: 2800000,
        lignes: [
          {
            id: "LIG-003",
            code: "60113",
            libelle: "Recettes issues de prestations de services",
            montant: 2800000,
            realisations: [
              {
                id: "REA-004",
                code: "REA-REC-01",
                libelle: "Vente de services de formation",
                montant: 1500000,
                date: "2025-05-10",
                fournisseur: "CLIENT X",
                depensesRecettes: [
                  {
                    id: "REC-001",
                    code: "REC-001",
                    libelle: "Paiement client X",
                    montant: 1500000,
                    date: "2025-05-10",
                    type: "RECETTE",
                  },
                ],
              },
              {
                id: "REA-005",
                code: "REA-REC-02",
                libelle: "Consulting technique",
                montant: 1300000,
                date: "2025-07-22",
                fournisseur: "CLIENT Y",
                depensesRecettes: [
                  {
                    id: "REC-002",
                    code: "REC-002",
                    libelle: "Facture consulting client Y",
                    montant: 1300000,
                    date: "2025-07-22",
                    type: "RECETTE",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  


