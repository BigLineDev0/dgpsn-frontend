export interface CompteBancaire {
  id?: number;
  numeroCompte: string;
  libelleCompte: string;
  banque: Banque;
  typeCompte: TypeCompte;
  devise: string;
  soldeInitial: number;
  soldeActuel: number;
  dateOuverture: Date;
  statut: StatutCompte;
  projet?: Projet;
  bailleur?: Bailleur;
  isCompteDesigne: boolean;
  rib?: string;
  iban?: string;
  swift?: string;
  observations?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Banque {
  id?: number;
  code: string;
  libelle: string;
  adresse?: string;
  telephone?: string;
  email?: string;
}

export interface TypeCompte {
  name: string;
  description: string;
}

export interface StatutCompte {
  name: string; // ACTIF, INACTIF, CLOTURE
  description: string;
}

export interface Projet {
  id: number;
  code: string;
  libelle: string;
}

export interface Bailleur {
  id: number;
  code: string;
  libelle: string;
  sigle?: string;
}

export interface Operation {
  id?: number;
  compteBancaire: CompteBancaire;
  dateOperation: Date;
  dateValeur: Date;
  typeOperation: TypeOperation;
  sensOperation: 'DEBIT' | 'CREDIT';
  montant: number;
  libelle: string;
  numeroReference?: string;
  numeroPiece?: string;
  beneficiaire?: string;
  projet?: Projet;
  ligneBudgetaire?: LigneBudgetaire;
  statut: StatutOperation;
  observations?: string;
  pieceJustificative?: string;
  createdBy?: string;
  createdAt?: Date;
  validatedBy?: string;
  validatedAt?: Date;
}

export interface TypeOperation {
  name: string;
  description: string;
}

export interface StatutOperation {
  name: string; // BROUILLON, EN_ATTENTE, VALIDE, REJETE
  description: string;
}

export interface LigneBudgetaire {
  id: number;
  code: string;
  libelle: string;
  montantBudget: number;
}

export interface RapprochementBancaire {
  id?: number;
  compteBancaire: CompteBancaire;
  dateRapprochement: Date;
  periodeDebut: Date;
  periodeFin: Date;
  soldeReleveBancaire: number;
  soldeComptable: number;
  ecart: number;
  statut: StatutRapprochement;
  observations?: string;
  documentReleve?: string;
  lignesRapprochement?: LigneRapprochement[];
  validatedBy?: string;
  validatedAt?: Date;
}

export interface LigneRapprochement {
  id?: number;
  operation: Operation;
  surReleve: boolean;
  enComptabilite: boolean;
  rapproche: boolean;
  ecart?: number;
}

export interface StatutRapprochement {
  name: string; // EN_COURS, VALIDE, REJETE
  description: string;
}

export interface SituationTresorerie {
  date: Date;
  soldeTotalDisponible: number;
  soldeParCompte: {
    compte: CompteBancaire;
    solde: number;
  }[];
  soldeParDevise: {
    devise: string;
    montant: number;
  }[];
  soldeParProjet: {
    projet: Projet;
    montant: number;
  }[];
  evolutionMensuelle: {
    mois: string;
    entrees: number;
    sorties: number;
    solde: number;
  }[];
}

export interface PlanTresorerie {
  id?: number;
  libelle: string;
  periodeDebut: Date;
  periodeFin: Date;
  statut: StatutPlan;
  lignesPlan: LignePlanTresorerie[];
  createdBy?: string;
  createdAt?: Date;
}

export interface LignePlanTresorerie {
  id?: number;
  periode: Date;
  encaissementsPrevisionnels: number;
  decaissementsPrevisionnels: number;
  soldeDebut: number;
  soldeFin: number;
  encaissementsReels?: number;
  decaissementsReels?: number;
  ecartEncaissements?: number;
  ecartDecaissements?: number;
}

export interface StatutPlan {
  name: string;
  description: string;
}

export interface DashboardTresorerie {
  soldeTotalDisponible: number;
  nombreComptes: number;
  totalEntreesMois: number;
  totalSortiesMois: number;
  comptesParType: { type: string; nombre: number; solde: number }[];
  evolutionMensuelle: { mois: string; entrees: number; sorties: number }[];
  topProjets: { projet: string; montant: number }[];
  alertes: {
    comptesNonRapprochesCe30Jours: number;
    operationsEnAttente: number;
    comptesNegatifs: number;
  };
}
