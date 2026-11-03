// mock-data/tresorerie-mock.data.ts
import { CompteBancaire, DashboardTresorerie, Operation } from '../models/tresorerie.model';

export const MOCK_COMPTES: CompteBancaire[] = [
  {
    id: 1,
    numeroCompte: '00111222333444',
    libelleCompte: 'Compte Principal DGPSN',
    banque: {
      id: 1,
      code: 'SGBS',
      libelle: 'Société Générale de Banques au Sénégal',
      adresse: 'Avenue Léopold Sédar Senghor, Dakar',
      telephone: '+221 33 839 55 00',
      email: 'contact@sgbs.sn'
    },
    typeCompte: {
      name: 'COURANT',
      description: 'Compte Courant'
    },
    devise: 'FCFA',
    soldeInitial: 50000000,
    soldeActuel: 45750000,
    dateOuverture: new Date('2023-01-15'),
    statut: {
      name: 'ACTIF',
      description: 'Actif'
    },
    isCompteDesigne: false,
    rib: '00111222333444',
    iban: 'SN08 SG001 11222 33344 40000',
    swift: 'SGBSSNDAXXX',
    observations: 'Compte principal pour les opérations courantes',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2025-01-10')
  },
  {
    id: 2,
    numeroCompte: '00555666777888',
    libelleCompte: 'Compte Désigné - Projet Filets Sociaux',
    banque: {
      id: 2,
      code: 'CBAO',
      libelle: 'CBAO Groupe Attijariwafa Bank',
      adresse: '1, Place de l\'Indépendance, Dakar',
      telephone: '+221 33 839 90 00',
      email: 'info@cbao.sn'
    },
    typeCompte: {
      name: 'COMPTE_DESIGNE',
      description: 'Compte Désigné'
    },
    devise: 'FCFA',
    soldeInitial: 500000000,
    soldeActuel: 387500000,
    dateOuverture: new Date('2023-06-20'),
    statut: {
      name: 'ACTIF',
      description: 'Actif'
    },
    projet: {
      id: 1,
      code: 'PFS2024',
      libelle: 'Projet Filets Sociaux 2024-2027'
    },
    bailleur: {
      id: 1,
      code: 'BM',
      libelle: 'Banque Mondiale',
      sigle: 'BM'
    },
    isCompteDesigne: true,
    rib: '00555666777888',
    iban: 'SN08 CBAO0 55566 67778 88000',
    swift: 'CBAOSNDA',
    observations: 'Compte désigné pour les ressources du projet filets sociaux financé par la Banque Mondiale',
    createdAt: new Date('2023-06-20'),
    updatedAt: new Date('2025-01-12')
  },
  {
    id: 3,
    numeroCompte: '00999888777666',
    libelleCompte: 'Compte Épargne - Réserves',
    banque: {
      id: 1,
      code: 'SGBS',
      libelle: 'Société Générale de Banques au Sénégal',
      adresse: 'Avenue Léopold Sédar Senghor, Dakar',
      telephone: '+221 33 839 55 00',
      email: 'contact@sgbs.sn'
    },
    typeCompte: {
      name: 'EPARGNE',
      description: 'Compte Épargne'
    },
    devise: 'FCFA',
    soldeInitial: 100000000,
    soldeActuel: 102500000,
    dateOuverture: new Date('2024-01-10'),
    statut: {
      name: 'ACTIF',
      description: 'Actif'
    },
    isCompteDesigne: false,
    rib: '00999888777666',
    iban: 'SN08 SG009 99888 77766 60000',
    swift: 'SGBSSNDAXXX',
    observations: 'Compte épargne pour les réserves stratégiques',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2025-01-08')
  },
  {
    id: 4,
    numeroCompte: '00123456789012',
    libelleCompte: 'Compte Désigné - Programme Protection Sociale',
    banque: {
      id: 3,
      code: 'BICIS',
      libelle: 'BICIS - Banque Internationale pour le Commerce et l\'Industrie du Sénégal',
      adresse: 'Boulevard Djily Mbaye, Dakar',
      telephone: '+221 33 839 90 90',
      email: 'contact@bicis.sn'
    },
    typeCompte: {
      name: 'COMPTE_DESIGNE',
      description: 'Compte Désigné'
    },
    devise: 'FCFA',
    soldeInitial: 250000000,
    soldeActuel: 198750000,
    dateOuverture: new Date('2024-03-15'),
    statut: {
      name: 'ACTIF',
      description: 'Actif'
    },
    projet: {
      id: 2,
      code: 'PPS2024',
      libelle: 'Programme Protection Sociale Universelle'
    },
    bailleur: {
      id: 2,
      code: 'AFD',
      libelle: 'Agence Française de Développement',
      sigle: 'AFD'
    },
    isCompteDesigne: true,
    rib: '00123456789012',
    iban: 'SN08 BICI0 12345 67890 12000',
    swift: 'BICISNDAXXX',
    observations: 'Compte pour le programme de protection sociale universelle',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2025-01-13')
  },
  {
    id: 5,
    numeroCompte: '00777888999000',
    libelleCompte: 'Compte Opérationnel - Bourses Familiales',
    banque: {
      id: 2,
      code: 'CBAO',
      libelle: 'CBAO Groupe Attijariwafa Bank',
      adresse: '1, Place de l\'Indépendance, Dakar',
      telephone: '+221 33 839 90 00',
      email: 'info@cbao.sn'
    },
    typeCompte: {
      name: 'COURANT',
      description: 'Compte Courant'
    },
    devise: 'FCFA',
    soldeInitial: 75000000,
    soldeActuel: 62340000,
    dateOuverture: new Date('2024-05-01'),
    statut: {
      name: 'ACTIF',
      description: 'Actif'
    },
    isCompteDesigne: false,
    rib: '00777888999000',
    iban: 'SN08 CBAO0 77788 89990 00000',
    swift: 'CBAOSNDA',
    observations: 'Compte dédié aux versements des bourses familiales',
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2025-01-11')
  }
];
// ✅ NOUVELLES DONNÉES: Opérations mockées
export const MOCK_OPERATIONS: Operation[] = [
  {
    id: 1,
    compteBancaire: MOCK_COMPTES[0],
    dateOperation: new Date('2025-01-10'),
    dateValeur: new Date('2025-01-10'),
    typeOperation: {
      name: 'VIREMENT',
      description: 'Virement'
    },
    sensOperation: 'CREDIT',
    montant: 5000000,
    libelle: 'Décaissement tranche 1 - Budget 2025',
    numeroReference: 'VIR20250110001',
    numeroPiece: 'MP-2025-001',
    beneficiaire: 'DGPSN',
    statut: {
      name: 'VALIDE',
      description: 'Validé'
    },
    observations: 'Versement budgétaire trimestriel',
    createdBy: 'Admin',
    createdAt: new Date('2025-01-10'),
    validatedBy: 'Directeur Financier',
    validatedAt: new Date('2025-01-10')
  },
  {
    id: 2,
    compteBancaire: MOCK_COMPTES[0],
    dateOperation: new Date('2025-01-09'),
    dateValeur: new Date('2025-01-09'),
    typeOperation: {
      name: 'CHEQUE',
      description: 'Chèque'
    },
    sensOperation: 'DEBIT',
    montant: 2500000,
    libelle: 'Paiement fournitures de bureau',
    numeroReference: 'CHQ0012345',
    numeroPiece: 'FC-2025-045',
    beneficiaire: 'PAPETERIE MODERNE',
    statut: {
      name: 'VALIDE',
      description: 'Validé'
    },
    observations: 'Achat fournitures Q1 2025',
    createdBy: 'Agent Comptable',
    createdAt: new Date('2025-01-09'),
    validatedBy: 'Chef Service',
    validatedAt: new Date('2025-01-09')
  },
  {
    id: 3,
    compteBancaire: MOCK_COMPTES[0],
    dateOperation: new Date('2025-01-08'),
    dateValeur: new Date('2025-01-08'),
    typeOperation: {
      name: 'VIREMENT',
      description: 'Virement'
    },
    sensOperation: 'DEBIT',
    montant: 15000000,
    libelle: 'Paiement salaires personnel - Janvier 2025',
    numeroReference: 'VIR20250108002',
    numeroPiece: 'SAL-2025-01',
    beneficiaire: 'PERSONNEL DGPSN',
    statut: {
      name: 'VALIDE',
      description: 'Validé'
    },
    observations: 'Salaires du mois de janvier',
    createdBy: 'RH',
    createdAt: new Date('2025-01-08'),
    validatedBy: 'DG',
    validatedAt: new Date('2025-01-08')
  },
  {
    id: 4,
    compteBancaire: MOCK_COMPTES[0],
    dateOperation: new Date('2025-01-05'),
    dateValeur: new Date('2025-01-05'),
    typeOperation: {
      name: 'PRELEVEMENT',
      description: 'Prélèvement'
    },
    sensOperation: 'DEBIT',
    montant: 350000,
    libelle: 'Frais bancaires - Décembre 2024',
    numeroReference: 'PREL20250105',
    numeroPiece: 'FB-2024-12',
    beneficiaire: 'SGBS',
    statut: {
      name: 'VALIDE',
      description: 'Validé'
    },
    observations: 'Frais de tenue de compte',
    createdBy: 'Système',
    createdAt: new Date('2025-01-05'),
    validatedBy: 'Auto',
    validatedAt: new Date('2025-01-05')
  },
  {
    id: 5,
    compteBancaire: MOCK_COMPTES[0],
    dateOperation: new Date('2025-01-03'),
    dateValeur: new Date('2025-01-03'),
    typeOperation: {
      name: 'VIREMENT',
      description: 'Virement'
    },
    sensOperation: 'CREDIT',
    montant: 3000000,
    libelle: 'Remboursement avance mission',
    numeroReference: 'VIR20250103003',
    numeroPiece: 'RMB-2025-002',
    beneficiaire: 'DGPSN',
    statut: {
      name: 'EN_ATTENTE',
      description: 'En Attente'
    },
    observations: 'En attente de validation',
    createdBy: 'Agent Comptable',
    createdAt: new Date('2025-01-03')
  },
  {
    id: 6,
    compteBancaire: MOCK_COMPTES[0],
    dateOperation: new Date('2024-12-28'),
    dateValeur: new Date('2024-12-28'),
    typeOperation: {
      name: 'CHEQUE',
      description: 'Chèque'
    },
    sensOperation: 'DEBIT',
    montant: 8500000,
    libelle: 'Paiement loyers trimestre Q4 2024',
    numeroReference: 'CHQ0012340',
    numeroPiece: 'FC-2024-198',
    beneficiaire: 'SCI IMMOBILIER',
    statut: {
      name: 'VALIDE',
      description: 'Validé'
    },
    observations: 'Loyers bureaux octobre-décembre',
    createdBy: 'Agent Comptable',
    createdAt: new Date('2024-12-28'),
    validatedBy: 'DAF',
    validatedAt: new Date('2024-12-28')
  },
  {
    id: 7,
    compteBancaire: MOCK_COMPTES[0],
    dateOperation: new Date('2024-12-20'),
    dateValeur: new Date('2024-12-20'),
    typeOperation: {
      name: 'VIREMENT',
      description: 'Virement'
    },
    sensOperation: 'DEBIT',
    montant: 4200000,
    libelle: 'Paiement prestataire informatique',
    numeroReference: 'VIR20241220004',
    numeroPiece: 'FC-2024-185',
    beneficiaire: 'TECH SOLUTIONS SARL',
    statut: {
      name: 'VALIDE',
      description: 'Validé'
    },
    observations: 'Maintenance système informatique',
    createdBy: 'Service IT',
    createdAt: new Date('2024-12-20'),
    validatedBy: 'Chef Service',
    validatedAt: new Date('2024-12-20')
  }
];
export const MOCK_DASHBOARD: DashboardTresorerie = {
  soldeTotalDisponible: 796840000,
  nombreComptes: 5,
  totalEntreesMois: 125000000,
  totalSortiesMois: 98500000,
  comptesParType: [
    { type: 'Compte Courant', nombre: 2, solde: 108090000 },
    { type: 'Compte Désigné', nombre: 2, solde: 586250000 },
    { type: 'Compte Épargne', nombre: 1, solde: 102500000 }
  ],
  evolutionMensuelle: [
    { mois: 'Octobre 2024', entrees: 95000000, sorties: 87000000 },
    { mois: 'Novembre 2024', entrees: 110000000, sorties: 92000000 },
    { mois: 'Décembre 2024', entrees: 105000000, sorties: 89000000 },
    { mois: 'Janvier 2025', entrees: 125000000, sorties: 98500000 }
  ],
  topProjets: [
    { projet: 'Projet Filets Sociaux', montant: 387500000 },
    { projet: 'Protection Sociale Universelle', montant: 198750000 }
  ],
  alertes: {
    comptesNonRapprochesCe30Jours: 0,
    operationsEnAttente: 3,
    comptesNegatifs: 0
  }
};

// Mock pour la réponse paginée
export const MOCK_RESPONSE = {
  payload: MOCK_COMPTES,
  metadata: {
    totalElements: 5,
    totalPages: 1,
    currentPage: 0,
    pageSize: 10
  }
};