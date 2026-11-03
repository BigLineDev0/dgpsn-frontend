export interface Depense {
  id: string;
  code: string;
  libelle: string;
  montant: number;
  date: Date | string;
  fournisseurBeneficiaire: string;
}

export interface LigneBudgetaire {
  id?: string;
  code: string;
  libelle: string;
  montant: number;
  date: Date | string;
  realisations?: number;
  depensesJournalieres?: Depense[];
}

interface RubriqueBudgetaire {
  id: string;
  code: string;
  libelle: string;
  montantBudgetaire: number;
  montantRealise: number;
  lignes: LigneBudgetaire[];
}

export interface Budget {
  id: string;
  code: string;
  libelle: string;
  montant: number;
  annee: Date | string;
  rubriques: RubriqueBudgetaire[];
}



// ---- MOCK DATA ----


export const MOCK_BUDGETS: Budget[] = [
  {
    id: "1",
    code: "BUD-604",
    libelle: "Budget de fonctionnement 2025",
    montant: 1324862000,
    annee: "2025",
    rubriques: [
      {
        id: "1",
        code: "604",
        libelle: "Transport de personnel",
        montantBudgetaire: 1324862000,
        montantRealise: 1323005656,
        lignes: [
          {
            code: "60411",
            libelle: "Achat denrées alimentaires",
            montant: 1300000000,  
            date: "2025",
            depensesJournalieres: [
              {
                id: "D-60411-2025-01-03-01",
                code: "60411-DA-001",
                libelle: "Achat riz 50kg",
                montant: 125000,
                date: "2025-01-03",

                fournisseurBeneficiaire: "SEN-Aliments SA"
              },
              {
                id: "D-60411-2025-01-05-01",
                code: "60411-DA-002",
                libelle: "Achat huile 20L",
                montant: 78000,
                date: "2025-01-05",
                fournisseurBeneficiaire: "Distrib Market"
              }
            ]
          },
          {
            code: "60412",
            libelle: "Achat de viande pour fêtes religieuses",
            montant: 0,
            date: "2025",
            depensesJournalieres: [
              {
                id: "D-60412-2025-06-15-01",
                code: "60412-VR-001",
                libelle: "Acompte achat moutons Tabaski",
                montant: 500000,
                date: "2025-06-15",
                fournisseurBeneficiaire: "Ferme Al Aman"
              }
            ]
          },
          {
            code: "60430",
            libelle: "Matériel et Produits d'entretien",
            montant: 1500000,
            date: "2025",
            realisations: 1497420,
            depensesJournalieres: [
              {
                id: "D-60430-2025-02-10-01",
                code: "60430-ENT-001",
                libelle: "Achat détergents et serpillières",
                montant: 95000,
                date: "2025-02-10",

                fournisseurBeneficiaire: "CleanPro Services"
              },
              {
                id: "D-60430-2025-03-02-01",
                code: "60430-ENT-002",
                libelle: "Recharge savon mains",
                montant: 28500,
                date: "2025-03-02",
                fournisseurBeneficiaire: "Supermarché City"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "2",
    code: "BUD-707",
    libelle: "Budget de fonctionnement 2026",
    montant: 2324862000,
    annee: "2026",
    rubriques: []
  }
];




export interface Rubrique {
  categorie: string;
  rubrique: string;
}

export const RUBRIQUES_CHARGE: Rubrique[] = [
  { categorie: 'ACHATS', rubrique: '60400 - Achat denrées alimentaires' },
  { categorie: 'ACHATS', rubrique: '60401 - Achat denrées alimentaires' },
  { categorie: 'ACHATS', rubrique: '60402 - Achat de viande pour fêtes religieuses' },
  { categorie: 'ACHATS', rubrique: '60403 - Matériel et Produits d’entretien' },
  { categorie: 'ACHATS', rubrique: '60404 - Fournitures de magasin' },
  { categorie: 'ACHATS', rubrique: '60405 - Fournitures de bureau' },
  { categorie: 'ACHATS', rubrique: '60406 - Consommables informatiques' },
  { categorie: 'ACHATS', rubrique: '60407 - Eau' },
  { categorie: 'ACHATS', rubrique: '60408 - Electricité' },
  { categorie: 'ACHATS', rubrique: '60400 - Carburant' },
  { categorie: 'ACHATS', rubrique: '60402 - Achat d’études et prestations de services' },
  { categorie: 'TRANSPORTS', rubrique: '60610 - Transport de personnel' },
  { categorie: 'TRANSPORTS', rubrique: '60610 - Frais de Poste et d’affranchissement' },
  { categorie: 'TRANSPORTS', rubrique: '60610 - Voyage et déplacement' },
  { categorie: 'TRANSPORTS', rubrique: '60610 - Manutention' },
  { categorie: 'TRANSPORTS', rubrique: '60610 - Loyers' },
  { categorie: 'TRANSPORTS', rubrique: '60610 - Entretien et réparations des biens immobiliers' },
  { categorie: 'TRANSPORTS', rubrique: '60610 - Maintenance matériel et mobilier de bureau' },
  { categorie: 'TRANSPORTS', rubrique: '60610 - Publicité et relations publiques' },
  { categorie: 'TRANSPORTS', rubrique: '60610 - Frais de téléphone et internet' },
  { categorie: 'TRANSPORTS', rubrique: '60610 - Honoraires' },
  { categorie: 'TRANSPORTS', rubrique: '60610 - Formation' },
  { categorie: 'TRANSPORTS', rubrique: '60610 - Redevances pour logiciels' },
  { categorie: 'TRANSPORTS', rubrique: '60610 - Frais de missions' },
  { categorie: 'IMPÔTS ET TAXES', rubrique: '60801 - Taxes sur appointements et salaires (cfce)' },
  { categorie: 'AUTRES CHARGES', rubrique: '60802 - Jetons de présence' },
  { categorie: 'AUTRES CHARGES', rubrique: '60803 - Dons et subventions' },
  { categorie: 'CHARGES DE PERSONNEL', rubrique: '60805 - Salaires' },
  { categorie: 'CHARGES DE PERSONNEL', rubrique: '60806 - Primes et indemnités' },
  { categorie: 'CHARGES DE PERSONNEL', rubrique: '60809 - Charges sociales' },
];



export const RUBRIQUES_PRODUITS: Rubrique[] = [
  { categorie: 'PRODUITS', rubrique: 'Fonds propres' },
  { categorie: 'PRODUITS', rubrique: "Subvention d'exploitation" },
  { categorie: 'PRODUITS', rubrique: 'Subvention versée par organismes internationaux' },
  { categorie: 'PRODUITS', rubrique: 'Report à nouveau' },
];