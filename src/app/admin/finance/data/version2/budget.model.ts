//  === BASE COMMUNE ===
interface IBase {
  id: string;
  code: string;
  libelle: string;
  commentaire?: string;
}

// === REALISATION ET BUDGET ===

export interface Realisation extends IBase {
  montant: number;
  date: string | Date;
  fournisseur: string;
  numeroBon?: string;        // N° Bon
  numeroBE?: string;         // N° BE (Bon d'Engagement)
  numeroMandat?: string;      // N° Mandat
  description?: string;       // Description détaillée
}

export interface LigneBudgetaire extends IBase {
  montant: number;
  realisations: Realisation[];
}

export interface Budget extends IBase {
  montantInvestissement?: number;  // Nouveau champ pour les investissements
  montantRecette?: number;
  montantDepense?: number;
  montant?: number;
  annee: number;
  /**
   * @description Les lignes budgetaire des investissements(2), depenses(6) ou recettes(7)
   * @type {LigneBudgetaire[]}
   */
  lignes: LigneBudgetaire[];
}



// === PARAMÉTRAGE FINANCIER (HIÉRARCHIE GÉNÉRIQUE) ===

export interface BaseParametrage extends IBase {
  commentaire?: string;
}

export interface IRealisation extends BaseParametrage {}

export interface IRubrique extends BaseParametrage {
  realisations: IRealisation[];
}

export interface ISousCompte extends BaseParametrage {
  rubriques: IRubrique[];
}

export interface ICompte extends BaseParametrage {
  sousComptes: ISousCompte[];
}

export interface IClasse extends BaseParametrage {
  comptes: ICompte[];
}



function randomAmount(min = 100_000, max = 5_000_000): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomDate(start = new Date(2025, 0, 1), end = new Date(2025, 6, 30)): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateBonNumber(): string {
  return `BON-${Math.floor(Math.random() * 9000) + 1000}`;
}

function generateBENumber(): string {
  return `BE-2025-${Math.floor(Math.random() * 900) + 100}`;
}

function generateMandatNumber(): string {
  return `MAN-${Math.floor(Math.random() * 90000) + 10000}`;
}

export const MOCK_BUDGET_2025: Budget[] = [
  // BUDGET 2025
  {
    id: 'BUD-2025-01',
    code: 'BUD-2025-01',
    libelle: 'Budget Général 2025',
    annee: 2025,
    montantRecette: 60000000,
    montantDepense: 50000000,
    montantInvestissement: 38000000,
    lignes: [
      // ========== CLASSE 2 : IMMOBILISATIONS (INVESTISSEMENTS) ==========
      
      // Compte 21 : Immobilisations incorporelles
      {
        id: 'LIG-21101',
        code: '21101',
        libelle: 'Logiciels et licences informatiques',
        montant: 8000000,
        realisations: [
          { 
            id: 'R21101A', 
            code: 'RE21101A', 
            libelle: 'Acquisition licences Microsoft Office 365', 
            montant: randomAmount(2_000_000, 3_000_000), 
            date: randomDate(), 
            fournisseur: 'Microsoft Sénégal',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Licences Office 365 Entreprise pour 100 utilisateurs - abonnement annuel'
          },
          { 
            id: 'R21101B', 
            code: 'RE21101B', 
            libelle: 'Logiciel de gestion comptable et budgétaire', 
            montant: randomAmount(3_000_000, 4_000_000), 
            date: randomDate(), 
            fournisseur: 'Sage Afrique',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Logiciel Sage Comptabilité avec modules budget et reporting'
          },
          { 
            id: 'R21101C', 
            code: 'RE21101C', 
            libelle: 'Antivirus et sécurité informatique', 
            montant: randomAmount(1_000_000, 2_000_000), 
            date: randomDate(), 
            fournisseur: 'Kaspersky Lab',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Solution antivirus entreprise et pare-feu pour réseau'
          },
        ]
      },
      {
        id: 'LIG-21102',
        code: '21102',
        libelle: 'Brevets, marques et droits similaires',
        montant: 3000000,
        realisations: [
          { 
            id: 'R21102A', 
            code: 'RE21102A', 
            libelle: 'Dépôt de marques et brevets', 
            montant: randomAmount(1_500_000, 2_000_000), 
            date: randomDate(), 
            fournisseur: 'OAPI',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Enregistrement marques et brevets auprès de l\'OAPI'
          },
          { 
            id: 'R21102B', 
            code: 'RE21102B', 
            libelle: 'Droits d\'utilisation bases de données', 
            montant: randomAmount(800_000, 1_500_000), 
            date: randomDate(), 
            fournisseur: 'Data Provider Inc',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Droits accès bases de données spécialisées'
          },
        ]
      },

      // Compte 23 : Immobilisations en cours
      {
        id: 'LIG-23101',
        code: '23101',
        libelle: 'Construction en cours - Bâtiments',
        montant: 10000000,
        realisations: [
          { 
            id: 'R23101A', 
            code: 'RE23101A', 
            libelle: 'Construction nouveau siège - Phase 1', 
            montant: randomAmount(4_000_000, 6_000_000), 
            date: randomDate(), 
            fournisseur: 'BTP Constructions SA',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Travaux gros œuvre construction nouveau siège social'
          },
          { 
            id: 'R23101B', 
            code: 'RE23101B', 
            libelle: 'Construction nouveau siège - Phase 2', 
            montant: randomAmount(3_000_000, 5_000_000), 
            date: randomDate(), 
            fournisseur: 'BTP Constructions SA',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Travaux second œuvre et aménagements intérieurs'
          },
        ]
      },
      {
        id: 'LIG-23102',
        code: '23102',
        libelle: 'Installations techniques en cours',
        montant: 4000000,
        realisations: [
          { 
            id: 'R23102A', 
            code: 'RE23102A', 
            libelle: 'Installation système électrique et climatisation', 
            montant: randomAmount(2_000_000, 3_000_000), 
            date: randomDate(), 
            fournisseur: 'Electricité & Climat Sarl',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Installation tableau électrique et climatisation centrale'
          },
          { 
            id: 'R23102B', 
            code: 'RE23102B', 
            libelle: 'Installation réseau informatique structuré', 
            montant: randomAmount(1_000_000, 2_000_000), 
            date: randomDate(), 
            fournisseur: 'IT Solutions',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Câblage réseau, armoires de brassage et équipements actifs'
          },
        ]
      },

      // Compte 24 : Immobilisations financières
      {
        id: 'LIG-24101',
        code: '24101',
        libelle: 'Prêts et créances immobilisées',
        montant: 5000000,
        realisations: [
          { 
            id: 'R24101A', 
            code: 'RE24101A', 
            libelle: 'Prêt au personnel - Logement', 
            montant: randomAmount(2_000_000, 3_000_000), 
            date: randomDate(), 
            fournisseur: 'Personnel interne',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Prêts immobiliers accordés au personnel permanent'
          },
          { 
            id: 'R24101B', 
            code: 'RE24101B', 
            libelle: 'Avances et cautions versées', 
            montant: randomAmount(1_500_000, 2_500_000), 
            date: randomDate(), 
            fournisseur: 'Divers créanciers',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Cautions et garanties diverses (loyers, contrats)'
          },
        ]
      },
      {
        id: 'LIG-24102',
        code: '24102',
        libelle: 'Titres de participation et placements',
        montant: 8000000,
        realisations: [
          { 
            id: 'R24102A', 
            code: 'RE24102A', 
            libelle: 'Participation société filiale', 
            montant: randomAmount(4_000_000, 5_000_000), 
            date: randomDate(), 
            fournisseur: 'Société Filiale XYZ',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Acquisition parts sociales société filiale (30% capital)'
          },
          { 
            id: 'R24102B', 
            code: 'RE24102B', 
            libelle: 'Placements long terme - Obligations', 
            montant: randomAmount(2_500_000, 4_000_000), 
            date: randomDate(), 
            fournisseur: 'BRVM',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Acquisition obligations d\'État à 10 ans via BRVM'
          },
        ]
      },

      // ========== CLASSE 7 : PRODUITS (RECETTES) ==========
      
      // Compte 70 : Fonds propres
      {
        id: 'LIG-70101',
        code: '70101',
        libelle: 'Vente de biens',
        montant: 5000000,
        realisations: [
          { 
            id: 'R70101A', 
            code: 'RE70101A', 
            libelle: 'Vente cahiers', 
            montant: randomAmount(500_000, 1_500_000), 
            date: randomDate(), 
            fournisseur: 'Clients directs'
          },
          { 
            id: 'R70101B', 
            code: 'RE70101B', 
            libelle: 'Vente fournitures scolaires', 
            montant: randomAmount(500_000, 1_500_000), 
            date: randomDate(), 
            fournisseur: 'Clients directs'
          },
          { 
            id: 'R70101C', 
            code: 'RE70101C', 
            libelle: 'Vente équipements', 
            montant: randomAmount(500_000, 1_500_000), 
            date: randomDate(), 
            fournisseur: 'Clients directs'
          },
        ]
      },
      {
        id: 'LIG-70102',
        code: '70102',
        libelle: 'Produits financiers',
        montant: 2000000,
        realisations: [
          { 
            id: 'R70102A', 
            code: 'RE70102A', 
            libelle: 'Intérêts bancaires', 
            montant: randomAmount(200_000, 800_000), 
            date: randomDate(), 
            fournisseur: 'Banque Nationale'
          },
          { 
            id: 'R70102B', 
            code: 'RE70102B', 
            libelle: 'Revenus placements', 
            montant: randomAmount(200_000, 800_000), 
            date: randomDate(), 
            fournisseur: 'Fonds placement'
          },
        ]
      },

      // Compte 71 : Subventions
      {
        id: 'LIG-71101',
        code: '71101',
        libelle: 'Subvention nationale - État',
        montant: 30000000,
        realisations: [
          { 
            id: 'R71101A', 
            code: 'RE71101A', 
            libelle: 'Subvention État (1er versement)', 
            montant: randomAmount(10_000_000, 15_000_000), 
            date: randomDate(), 
            fournisseur: 'Ministère des Finances'
          },
          { 
            id: 'R71101B', 
            code: 'RE71101B', 
            libelle: 'Subvention État (2e versement)', 
            montant: randomAmount(10_000_000, 15_000_000), 
            date: randomDate(), 
            fournisseur: 'Ministère des Finances'
          },
        ]
      },
      {
        id: 'LIG-71102',
        code: '71102',
        libelle: 'Subvention nationale - Collectivités',
        montant: 8000000,
        realisations: [
          { 
            id: 'R71102A', 
            code: 'RE71102A', 
            libelle: 'Subvention Région', 
            montant: randomAmount(2_000_000, 4_000_000), 
            date: randomDate(), 
            fournisseur: 'Région'
          },
          { 
            id: 'R71102B', 
            code: 'RE71102B', 
            libelle: 'Subvention Municipalité', 
            montant: randomAmount(2_000_000, 4_000_000), 
            date: randomDate(), 
            fournisseur: 'Municipalité'
          },
        ]
      },
      {
        id: 'LIG-71201',
        code: '71201',
        libelle: 'Subvention internationale - UNICEF',
        montant: 10000000,
        realisations: [
          { 
            id: 'R71201A', 
            code: 'RE71201A', 
            libelle: 'Appui UNICEF - Programme éducation', 
            montant: randomAmount(3_000_000, 6_000_000), 
            date: randomDate(), 
            fournisseur: 'UNICEF'
          },
          { 
            id: 'R71201B', 
            code: 'RE71201B', 
            libelle: 'Appui UNICEF - Nutrition', 
            montant: randomAmount(3_000_000, 6_000_000), 
            date: randomDate(), 
            fournisseur: 'UNICEF'
          },
        ]
      },
      {
        id: 'LIG-71202',
        code: '71202',
        libelle: 'Subvention internationale - PAM',
        montant: 5000000,
        realisations: [
          { 
            id: 'R71202A', 
            code: 'RE71202A', 
            libelle: 'Appui PAM - Repas scolaires', 
            montant: randomAmount(2_000_000, 4_000_000), 
            date: randomDate(), 
            fournisseur: 'PAM'
          },
          { 
            id: 'R71202B', 
            code: 'RE71202B', 
            libelle: 'Appui PAM - Approvisionnemts', 
            montant: randomAmount(1_000_000, 2_000_000), 
            date: randomDate(), 
            fournisseur: 'PAM'
          },
        ]
      },

      // ========== CLASSE 6 : CHARGES (DÉPENSES) ==========

      // Compte 60 : Matières et Fournitures
      {
        id: 'LIG-60101',
        code: '60101',
        libelle: 'Fournitures de bureau',
        montant: 3000000,
        realisations: [
          { 
            id: 'R60101A', 
            code: 'RE60101A', 
            libelle: 'Achat papier et stylos', 
            montant: randomAmount(500_000, 1_000_000), 
            date: randomDate(), 
            fournisseur: 'Papeterie Express',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Fournitures papier A4, stylos et accessoires bureau'
          },
          { 
            id: 'R60101B', 
            code: 'RE60101B', 
            libelle: 'Achat toner imprimante', 
            montant: randomAmount(500_000, 1_000_000), 
            date: randomDate(), 
            fournisseur: 'Tech Solutions',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Cartouches toner et consommables imprimantes'
          },
          { 
            id: 'R60101C', 
            code: 'RE60101C', 
            libelle: 'Achat cahiers et blocs notes', 
            montant: randomAmount(500_000, 1_000_000), 
            date: randomDate(), 
            fournisseur: 'Papeterie Express',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Cahiers, blocs notes et registres'
          },
        ]
      },
      {
        id: 'LIG-60102',
        code: '60102',
        libelle: 'Consommables informatiques',
        montant: 2000000,
        realisations: [
          { 
            id: 'R60102A', 
            code: 'RE60102A', 
            libelle: "Cartouches d'encre", 
            montant: randomAmount(400_000, 800_000), 
            date: randomDate(), 
            fournisseur: 'Tech Solutions',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Cartouches d\'encre originales pour imprimantes'
          },
          { 
            id: 'R60102B', 
            code: 'RE60102B', 
            libelle: 'CD / DVD vierges', 
            montant: randomAmount(300_000, 600_000), 
            date: randomDate(), 
            fournisseur: 'Tech Solutions',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Supports CD-R et DVD-R vierges pour archivage'
          },
          { 
            id: 'R60102C', 
            code: 'RE60102C', 
            libelle: 'Clés USB et accessoires', 
            montant: randomAmount(300_000, 600_000), 
            date: randomDate(), 
            fournisseur: 'Tech Solutions',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Clés USB, disques durs externes et câbles'
          },
        ]
      },

      // Compte 61 : Autres achats et services
      {
        id: 'LIG-61101',
        code: '61101',
        libelle: 'Eau, électricité, carburant',
        montant: 15000000,
        realisations: [
          { 
            id: 'R61101A', 
            code: 'RE61101A', 
            libelle: 'Factures eau', 
            montant: randomAmount(2_000_000, 3_000_000), 
            date: randomDate(), 
            fournisseur: 'SONES',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Consommation eau courante trimestre'
          },
          { 
            id: 'R61101B', 
            code: 'RE61101B', 
            libelle: 'Factures électricité', 
            montant: randomAmount(3_000_000, 5_000_000), 
            date: randomDate(), 
            fournisseur: 'SENELEC',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Consommation électricité trimestre'
          },
          { 
            id: 'R61101C', 
            code: 'RE61101C', 
            libelle: 'Carburant véhicules service', 
            montant: randomAmount(2_000_000, 4_000_000), 
            date: randomDate(), 
            fournisseur: 'TotalEnergies',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Carburant gazole et essence pour flotte véhicules'
          },
          { 
            id: 'R61101D', 
            code: 'RE61101D', 
            libelle: 'Combustible chauffage', 
            montant: randomAmount(1_000_000, 2_000_000), 
            date: randomDate(), 
            fournisseur: 'Fournisseur combustibles',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Combustible pour système chauffage'
          },
        ]
      },
      {
        id: 'LIG-61102',
        code: '61102',
        libelle: 'Transport et logistique',
        montant: 8000000,
        realisations: [
          { 
            id: 'R61102A', 
            code: 'RE61102A', 
            libelle: 'Transport personnel', 
            montant: randomAmount(2_000_000, 3_000_000), 
            date: randomDate(), 
            fournisseur: 'SOTRACOM',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Transport quotidien du personnel'
          },
          { 
            id: 'R61102B', 
            code: 'RE61102B', 
            libelle: 'Frais de port et livraison', 
            montant: randomAmount(2_000_000, 3_000_000), 
            date: randomDate(), 
            fournisseur: 'Logistique Plus',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Frais livraison fournitures et équipements'
          },
          { 
            id: 'R61102C', 
            code: 'RE61102C', 
            libelle: 'Maintenance véhicules', 
            montant: randomAmount(1_000_000, 2_000_000), 
            date: randomDate(), 
            fournisseur: 'Atelier Auto',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Entretien et réparation parc automobile'
          },
        ]
      },

      // Compte 62 : Services externes
      {
        id: 'LIG-62101',
        code: '62101',
        libelle: 'Assurances',
        montant: 5000000,
        realisations: [
          { 
            id: 'R62101A', 
            code: 'RE62101A', 
            libelle: 'Assurance véhicules', 
            montant: randomAmount(1_500_000, 2_500_000), 
            date: randomDate(), 
            fournisseur: 'NSIA Assurances',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Prime assurance tous risques flotte véhicules'
          },
          { 
            id: 'R62101B', 
            code: 'RE62101B', 
            libelle: 'Assurance biens immobiliers', 
            montant: randomAmount(1_000_000, 2_000_000), 
            date: randomDate(), 
            fournisseur: 'ALLIANZ',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Assurance multirisque locaux et équipements'
          },
          { 
            id: 'R62101C', 
            code: 'RE62101C', 
            libelle: 'Assurance responsabilité civile', 
            montant: randomAmount(800_000, 1_500_000), 
            date: randomDate(), 
            fournisseur: 'NSIA Assurances',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Assurance responsabilité civile professionnelle'
          },
        ]
      },
      {
        id: 'LIG-62102',
        code: '62102',
        libelle: 'Services informatiques et télécommunications',
        montant: 3000000,
        realisations: [
          { 
            id: 'R62102A', 
            code: 'RE62102A', 
            libelle: 'Maintenance serveurs', 
            montant: randomAmount(800_000, 1_200_000), 
            date: randomDate(), 
            fournisseur: 'IT Solutions',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Contrat maintenance infrastructure IT'
          },
          { 
            id: 'R62102B', 
            code: 'RE62102B', 
            libelle: 'Abonnement internet', 
            montant: randomAmount(400_000, 800_000), 
            date: randomDate(), 
            fournisseur: 'Orange Senegal',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Abonnement fibre optique haut débit'
          },
          { 
            id: 'R62102C', 
            code: 'RE62102C', 
            libelle: 'Télécommunications (téléphone)', 
            montant: randomAmount(500_000, 1_000_000), 
            date: randomDate(), 
            fournisseur: 'Expresso',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Forfaits téléphonie mobile personnel'
          },
        ]
      },

      // Compte 66 : Charges de personnel
      {
        id: 'LIG-66101',
        code: '66101',
        libelle: 'Salaires et traitements',
        montant: 14000000,
        realisations: [
          { 
            id: 'R66101A', 
            code: 'RE66101A', 
            libelle: 'Paie du personnel permanent (avril)', 
            montant: randomAmount(4_000_000, 5_000_000), 
            date: randomDate(), 
            fournisseur: 'Trésor public',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Salaires mensuels personnel permanent avril'
          },
          { 
            id: 'R66101B', 
            code: 'RE66101B', 
            libelle: 'Paie du personnel permanent (mai)', 
            montant: randomAmount(4_000_000, 5_000_000), 
            date: randomDate(), 
            fournisseur: 'Trésor public',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Salaires mensuels personnel permanent mai'
          },
          { 
            id: 'R66101C', 
            code: 'RE66101C', 
            libelle: 'Paie du personnel permanent (juin)', 
            montant: randomAmount(4_000_000, 5_000_000), 
            date: randomDate(), 
            fournisseur: 'Trésor public',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Salaires mensuels personnel permanent juin'
          },
        ]
      },
      {
        id: 'LIG-66102',
        code: '66102',
        libelle: 'Charges sociales et sécurité sociale',
        montant: 2000000,
        realisations: [
          { 
            id: 'R66102A', 
            code: 'RE66102A', 
            libelle: 'Cotisations IPRES', 
            montant: randomAmount(800_000, 1_200_000), 
            date: randomDate(), 
            fournisseur: 'IPRES',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Cotisations retraite trimestre'
          },
          { 
            id: 'R66102B', 
            code: 'RE66102B', 
            libelle: 'Cotisations CSS', 
            montant: randomAmount(500_000, 1_000_000), 
            date: randomDate(), 
            fournisseur: 'CSS',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Cotisations sécurité sociale trimestre'
          },
        ]
      },
    ]
  },
  // BUDGET 2024
  // ========================================
  {
    id: 'BUD-2024-01',
    code: 'BUD-2024-01',
    libelle: 'Budget Général 2024',
    annee: 2024,
    montantRecette: 55000000,
    montantDepense: 46000000,
    montantInvestissement: 35000000,
    lignes: [
      // ========== CLASSE 2 : IMMOBILISATIONS (INVESTISSEMENTS) 2024 ==========
      
      {
        id: 'LIG-2024-21101',
        code: '21101',
        libelle: 'Logiciels et licences informatiques',
        montant: 7500000,
        realisations: [
          { 
            id: 'R2024-21101A', 
            code: 'RE2024-21101A', 
            libelle: 'Acquisition licences Microsoft Office 365', 
            montant: randomAmount(1_800_000, 2_800_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Microsoft Sénégal',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Licences Office 365 Entreprise pour 90 utilisateurs'
          },
          { 
            id: 'R2024-21101B', 
            code: 'RE2024-21101B', 
            libelle: 'Logiciel de gestion comptable et budgétaire', 
            montant: randomAmount(2_800_000, 3_800_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Sage Afrique',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Logiciel Sage Comptabilité - version 2024'
          },
          { 
            id: 'R2024-21101C', 
            code: 'RE2024-21101C', 
            libelle: 'Antivirus et sécurité informatique', 
            montant: randomAmount(900_000, 1_900_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Kaspersky Lab',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Solution antivirus entreprise'
          },
        ]
      },
      {
        id: 'LIG-2024-21102',
        code: '21102',
        libelle: 'Brevets, marques et droits similaires',
        montant: 2800000,
        realisations: [
          { 
            id: 'R2024-21102A', 
            code: 'RE2024-21102A', 
            libelle: 'Dépôt de marques et brevets', 
            montant: randomAmount(1_400_000, 1_900_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'OAPI',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Enregistrement marques auprès de l\'OAPI'
          },
          { 
            id: 'R2024-21102B', 
            code: 'RE2024-21102B', 
            libelle: 'Droits d\'utilisation bases de données', 
            montant: randomAmount(700_000, 1_400_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Data Provider Inc',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Droits accès bases de données'
          },
        ]
      },
      {
        id: 'LIG-2024-23101',
        code: '23101',
        libelle: 'Construction en cours - Bâtiments',
        montant: 9500000,
        realisations: [
          { 
            id: 'R2024-23101A', 
            code: 'RE2024-23101A', 
            libelle: 'Rénovation bureaux - Phase 1', 
            montant: randomAmount(3_800_000, 5_500_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'BTP Constructions SA',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Travaux rénovation bureaux administratifs'
          },
          { 
            id: 'R2024-23101B', 
            code: 'RE2024-23101B', 
            libelle: 'Rénovation bureaux - Phase 2', 
            montant: randomAmount(2_800_000, 4_500_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'BTP Constructions SA',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Finitions et aménagements'
          },
        ]
      },
      {
        id: 'LIG-2024-23102',
        code: '23102',
        libelle: 'Installations techniques en cours',
        montant: 3800000,
        realisations: [
          { 
            id: 'R2024-23102A', 
            code: 'RE2024-23102A', 
            libelle: 'Installation système électrique', 
            montant: randomAmount(1_900_000, 2_800_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Electricité & Climat Sarl',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Installation électrique bureaux'
          },
          { 
            id: 'R2024-23102B', 
            code: 'RE2024-23102B', 
            libelle: 'Installation réseau informatique', 
            montant: randomAmount(900_000, 1_900_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'IT Solutions',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Câblage réseau bureaux'
          },
        ]
      },
      {
        id: 'LIG-2024-24101',
        code: '24101',
        libelle: 'Prêts et créances immobilisées',
        montant: 4700000,
        realisations: [
          { 
            id: 'R2024-24101A', 
            code: 'RE2024-24101A', 
            libelle: 'Prêt au personnel - Logement', 
            montant: randomAmount(1_900_000, 2_800_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Personnel interne',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Prêts immobiliers personnel'
          },
          { 
            id: 'R2024-24101B', 
            code: 'RE2024-24101B', 
            libelle: 'Avances et cautions versées', 
            montant: randomAmount(1_400_000, 2_300_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Divers créanciers',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Cautions et garanties diverses'
          },
        ]
      },
      {
        id: 'LIG-2024-24102',
        code: '24102',
        libelle: 'Titres de participation et placements',
        montant: 7500000,
        realisations: [
          { 
            id: 'R2024-24102A', 
            code: 'RE2024-24102A', 
            libelle: 'Participation société filiale', 
            montant: randomAmount(3_800_000, 4_700_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Société Filiale XYZ',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Acquisition parts sociales 25%'
          },
          { 
            id: 'R2024-24102B', 
            code: 'RE2024-24102B', 
            libelle: 'Placements long terme - Obligations', 
            montant: randomAmount(2_300_000, 3_800_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'BRVM',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Obligations d\'État via BRVM'
          },
        ]
      },

      // ========== CLASSE 7 : PRODUITS (RECETTES) 2024 ==========
      
      {
        id: 'LIG-2024-70101',
        code: '70101',
        libelle: 'Vente de biens',
        montant: 8500000,
        realisations: [
          { 
            id: 'R2024-70101A', 
            code: 'RE2024-70101A', 
            libelle: 'Vente cahiers de charges', 
            montant: randomAmount(2_800_000, 3_800_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Diverses entreprises',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Vente documents appels d\'offres'
          },
          { 
            id: 'R2024-70101B', 
            code: 'RE2024-70101B', 
            libelle: 'Vente publications et documents', 
            montant: randomAmount(1_900_000, 2_800_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Public',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Vente documents et publications'
          },
          { 
            id: 'R2024-70101C', 
            code: 'RE2024-70101C', 
            libelle: 'Autres ventes', 
            montant: randomAmount(1_400_000, 2_300_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Divers',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Ventes diverses'
          },
        ]
      },
      {
        id: 'LIG-2024-70102',
        code: '70102',
        libelle: 'Produits financiers',
        montant: 4700000,
        realisations: [
          { 
            id: 'R2024-70102A', 
            code: 'RE2024-70102A', 
            libelle: 'Intérêts sur placements bancaires', 
            montant: randomAmount(1_900_000, 2_800_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Banque Atlantique',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Intérêts comptes à terme'
          },
          { 
            id: 'R2024-70102B', 
            code: 'RE2024-70102B', 
            libelle: 'Dividendes reçus', 
            montant: randomAmount(1_400_000, 2_300_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Société Filiale',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Dividendes participations'
          },
        ]
      },
      {
        id: 'LIG-2024-71101',
        code: '71101',
        libelle: 'Subvention nationale',
        montant: 28500000,
        realisations: [
          { 
            id: 'R2024-71101A', 
            code: 'RE2024-71101A', 
            libelle: 'Subvention État - Fonctionnement', 
            montant: randomAmount(14_250_000, 18_000_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Ministère des Finances',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Subvention fonctionnement annuelle'
          },
          { 
            id: 'R2024-71101B', 
            code: 'RE2024-71101B', 
            libelle: 'Subvention collectivités locales', 
            montant: randomAmount(9_500_000, 14_250_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Conseil Municipal',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Contribution municipale'
          },
        ]
      },
      {
        id: 'LIG-2024-71201',
        code: '71201',
        libelle: 'Subventions internationales',
        montant: 13300000,
        realisations: [
          { 
            id: 'R2024-71201A', 
            code: 'RE2024-71201A', 
            libelle: 'Subvention UNICEF', 
            montant: randomAmount(4_750_000, 6_650_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'UNICEF',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Programme éducation enfants'
          },
          { 
            id: 'R2024-71201B', 
            code: 'RE2024-71201B', 
            libelle: 'Subvention Union Européenne', 
            montant: randomAmount(3_800_000, 5_700_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Union Européenne',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Programme développement local'
          },
          { 
            id: 'R2024-71201C', 
            code: 'RE2024-71201C', 
            libelle: 'Subvention Banque Mondiale', 
            montant: randomAmount(2_850_000, 4_750_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Banque Mondiale',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Projet infrastructure'
          },
        ]
      },

      // ========== CLASSE 6 : CHARGES (DÉPENSES) 2024 ==========
      
      {
        id: 'LIG-2024-60101',
        code: '60101',
        libelle: 'Fournitures de bureau',
        montant: 4700000,
        realisations: [
          { 
            id: 'R2024-60101A', 
            code: 'RE2024-60101A', 
            libelle: 'Papeterie et consommables', 
            montant: randomAmount(1_900_000, 2_800_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Papeterie Moderne',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Fournitures bureau courantes'
          },
          { 
            id: 'R2024-60101B', 
            code: 'RE2024-60101B', 
            libelle: 'Matériel informatique petit équipement', 
            montant: randomAmount(1_400_000, 2_300_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Informatique Plus',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Souris, claviers, accessoires'
          },
        ]
      },
      {
        id: 'LIG-2024-60102',
        code: '60102',
        libelle: 'Consommables informatiques',
        montant: 3800000,
        realisations: [
          { 
            id: 'R2024-60102A', 
            code: 'RE2024-60102A', 
            libelle: 'Cartouches et toners', 
            montant: randomAmount(1_900_000, 2_800_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Bureau Services',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Cartouches imprimantes'
          },
          { 
            id: 'R2024-60102B', 
            code: 'RE2024-60102B', 
            libelle: 'Supports numériques', 
            montant: randomAmount(900_000, 1_900_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Informatique Plus',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Clés USB, disques durs externes'
          },
        ]
      },
      {
        id: 'LIG-2024-61101',
        code: '61101',
        libelle: 'Eau, électricité, carburant',
        montant: 9500000,
        realisations: [
          { 
            id: 'R2024-61101A', 
            code: 'RE2024-61101A', 
            libelle: 'Factures eau', 
            montant: randomAmount(900_000, 1_900_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'SDE',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Consommation eau annuelle'
          },
          { 
            id: 'R2024-61101B', 
            code: 'RE2024-61101B', 
            libelle: 'Factures électricité', 
            montant: randomAmount(2_850_000, 4_750_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'SENELEC',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Consommation électricité'
          },
          { 
            id: 'R2024-61101C', 
            code: 'RE2024-61101C', 
            libelle: 'Carburant véhicules service', 
            montant: randomAmount(2_850_000, 4_750_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'TotalEnergies',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Carburant parc automobile'
          },
        ]
      },
      {
        id: 'LIG-2024-61102',
        code: '61102',
        libelle: 'Transport et logistique',
        montant: 7500000,
        realisations: [
          { 
            id: 'R2024-61102A', 
            code: 'RE2024-61102A', 
            libelle: 'Transport personnel', 
            montant: randomAmount(1_900_000, 2_800_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'SOTRACOM',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Transport quotidien personnel'
          },
          { 
            id: 'R2024-61102B', 
            code: 'RE2024-61102B', 
            libelle: 'Frais de port et livraison', 
            montant: randomAmount(1_900_000, 2_800_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Logistique Plus',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Frais livraison fournitures'
          },
          { 
            id: 'R2024-61102C', 
            code: 'RE2024-61102C', 
            libelle: 'Maintenance véhicules', 
            montant: randomAmount(900_000, 1_900_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Atelier Auto',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Entretien parc automobile'
          },
        ]
      },
      {
        id: 'LIG-2024-62101',
        code: '62101',
        libelle: 'Assurances',
        montant: 4700000,
        realisations: [
          { 
            id: 'R2024-62101A', 
            code: 'RE2024-62101A', 
            libelle: 'Assurance véhicules', 
            montant: randomAmount(1_400_000, 2_300_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'NSIA Assurances',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Assurance flotte véhicules'
          },
          { 
            id: 'R2024-62101B', 
            code: 'RE2024-62101B', 
            libelle: 'Assurance biens immobiliers', 
            montant: randomAmount(950_000, 1_900_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'ALLIANZ',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Assurance multirisque locaux'
          },
          { 
            id: 'R2024-62101C', 
            code: 'RE2024-62101C', 
            libelle: 'Assurance responsabilité civile', 
            montant: randomAmount(750_000, 1_400_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'NSIA Assurances',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Assurance RC professionnelle'
          },
        ]
      },
      {
        id: 'LIG-2024-62102',
        code: '62102',
        libelle: 'Services informatiques et télécommunications',
        montant: 2800000,
        realisations: [
          { 
            id: 'R2024-62102A', 
            code: 'RE2024-62102A', 
            libelle: 'Maintenance serveurs', 
            montant: randomAmount(750_000, 1_100_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'IT Solutions',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Maintenance infrastructure IT'
          },
          { 
            id: 'R2024-62102B', 
            code: 'RE2024-62102B', 
            libelle: 'Abonnement internet', 
            montant: randomAmount(380_000, 750_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Orange Senegal',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Fibre optique haut débit'
          },
          { 
            id: 'R2024-62102C', 
            code: 'RE2024-62102C', 
            libelle: 'Télécommunications', 
            montant: randomAmount(470_000, 950_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'Expresso',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Forfaits téléphonie mobile'
          },
        ]
      },
      {
        id: 'LIG-2024-66101',
        code: '66101',
        libelle: 'Salaires et traitements',
        montant: 13000000,
        realisations: [
          { 
            id: 'R2024-66101A', 
            code: 'RE2024-66101A', 
            libelle: 'Paie personnel permanent (T1)', 
            montant: randomAmount(3_800_000, 4_700_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 2, 31)), 
            fournisseur: 'Trésor public',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Salaires trimestre 1'
          },
          { 
            id: 'R2024-66101B', 
            code: 'RE2024-66101B', 
            libelle: 'Paie personnel permanent (T2)', 
            montant: randomAmount(3_800_000, 4_700_000), 
            date: randomDate(new Date(2024, 3, 1), new Date(2024, 5, 30)), 
            fournisseur: 'Trésor public',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Salaires trimestre 2'
          },
          { 
            id: 'R2024-66101C', 
            code: 'RE2024-66101C', 
            libelle: 'Paie personnel permanent (T3)', 
            montant: randomAmount(3_800_000, 4_700_000), 
            date: randomDate(new Date(2024, 6, 1), new Date(2024, 8, 30)), 
            fournisseur: 'Trésor public',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Salaires trimestre 3'
          },
        ]
      },
      {
        id: 'LIG-2024-66102',
        code: '66102',
        libelle: 'Charges sociales et sécurité sociale',
        montant: 1900000,
        realisations: [
          { 
            id: 'R2024-66102A', 
            code: 'RE2024-66102A', 
            libelle: 'Cotisations IPRES', 
            montant: randomAmount(750_000, 1_100_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'IPRES',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Cotisations retraite annuelles'
          },
          { 
            id: 'R2024-66102B', 
            code: 'RE2024-66102B', 
            libelle: 'Cotisations CSS', 
            montant: randomAmount(470_000, 950_000), 
            date: randomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)), 
            fournisseur: 'CSS',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Cotisations sécurité sociale'
          },
        ]
      },
    ]
  },

  // ========================================
  // BUDGET 2023
  // ========================================
  {
    id: 'BUD-2023-01',
    code: 'BUD-2023-01',
    libelle: 'Budget Général 2023',
    annee: 2023,
    montantRecette: 50000000,
    montantDepense: 42000000,
    montantInvestissement: 32000000,
    lignes: [
      // ========== CLASSE 2 : IMMOBILISATIONS (INVESTISSEMENTS) 2023 ==========
      
      {
        id: 'LIG-2023-21101',
        code: '21101',
        libelle: 'Logiciels et licences informatiques',
        montant: 7000000,
        realisations: [
          { 
            id: 'R2023-21101A', 
            code: 'RE2023-21101A', 
            libelle: 'Acquisition licences Microsoft Office 365', 
            montant: randomAmount(1_600_000, 2_600_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Microsoft Sénégal',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Licences Office 365 pour 80 utilisateurs'
          },
          { 
            id: 'R2023-21101B', 
            code: 'RE2023-21101B', 
            libelle: 'Logiciel de gestion comptable', 
            montant: randomAmount(2_600_000, 3_600_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Sage Afrique',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Logiciel Sage Comptabilité 2023'
          },
          { 
            id: 'R2023-21101C', 
            code: 'RE2023-21101C', 
            libelle: 'Antivirus et sécurité', 
            montant: randomAmount(800_000, 1_800_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Kaspersky Lab',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Solution antivirus'
          },
        ]
      },
      {
        id: 'LIG-2023-21102',
        code: '21102',
        libelle: 'Brevets, marques et droits similaires',
        montant: 2500000,
        realisations: [
          { 
            id: 'R2023-21102A', 
            code: 'RE2023-21102A', 
            libelle: 'Dépôt de marques', 
            montant: randomAmount(1_300_000, 1_800_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'OAPI',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Enregistrement marques OAPI'
          },
          { 
            id: 'R2023-21102B', 
            code: 'RE2023-21102B', 
            libelle: 'Droits bases de données', 
            montant: randomAmount(600_000, 1_300_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Data Provider Inc',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Droits accès données'
          },
        ]
      },
      {
        id: 'LIG-2023-23101',
        code: '23101',
        libelle: 'Construction en cours - Bâtiments',
        montant: 9000000,
        realisations: [
          { 
            id: 'R2023-23101A', 
            code: 'RE2023-23101A', 
            libelle: 'Rénovation locaux - Phase 1', 
            montant: randomAmount(3_600_000, 5_200_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'BTP Constructions SA',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Travaux rénovation locaux'
          },
          { 
            id: 'R2023-23101B', 
            code: 'RE2023-23101B', 
            libelle: 'Rénovation locaux - Phase 2', 
            montant: randomAmount(2_600_000, 4_200_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'BTP Constructions SA',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Finitions rénovation'
          },
        ]
      },
      {
        id: 'LIG-2023-23102',
        code: '23102',
        libelle: 'Installations techniques en cours',
        montant: 3500000,
        realisations: [
          { 
            id: 'R2023-23102A', 
            code: 'RE2023-23102A', 
            libelle: 'Installation électrique', 
            montant: randomAmount(1_800_000, 2_600_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Electricité & Climat Sarl',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Installation électrique'
          },
          { 
            id: 'R2023-23102B', 
            code: 'RE2023-23102B', 
            libelle: 'Installation réseau', 
            montant: randomAmount(800_000, 1_800_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'IT Solutions',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Câblage réseau'
          },
        ]
      },
      {
        id: 'LIG-2023-24101',
        code: '24101',
        libelle: 'Prêts et créances immobilisées',
        montant: 4500000,
        realisations: [
          { 
            id: 'R2023-24101A', 
            code: 'RE2023-24101A', 
            libelle: 'Prêt personnel', 
            montant: randomAmount(1_800_000, 2_600_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Personnel interne',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Prêts personnel'
          },
          { 
            id: 'R2023-24101B', 
            code: 'RE2023-24101B', 
            libelle: 'Cautions versées', 
            montant: randomAmount(1_300_000, 2_100_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Divers créanciers',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Cautions diverses'
          },
        ]
      },
      {
        id: 'LIG-2023-24102',
        code: '24102',
        libelle: 'Titres de participation et placements',
        montant: 7000000,
        realisations: [
          { 
            id: 'R2023-24102A', 
            code: 'RE2023-24102A', 
            libelle: 'Participation société', 
            montant: randomAmount(3_600_000, 4_500_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Société Filiale XYZ',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Acquisition parts 20%'
          },
          { 
            id: 'R2023-24102B', 
            code: 'RE2023-24102B', 
            libelle: 'Placements obligations', 
            montant: randomAmount(2_100_000, 3_600_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'BRVM',
            numeroBon: generateBonNumber(),
            numeroBE: generateBENumber(),
            numeroMandat: generateMandatNumber(),
            description: 'Obligations État BRVM'
          },
        ]
      },

      // ========== CLASSE 7 : PRODUITS (RECETTES) 2023 ==========
      
      {
        id: 'LIG-2023-70101',
        code: '70101',
        libelle: 'Vente de biens',
        montant: 8000000,
        realisations: [
          { 
            id: 'R2023-70101A', 
            code: 'RE2023-70101A', 
            libelle: 'Vente cahiers de charges', 
            montant: randomAmount(2_600_000, 3_600_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Diverses entreprises',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Vente documents AO'
          },
          { 
            id: 'R2023-70101B', 
            code: 'RE2023-70101B', 
            libelle: 'Vente publications', 
            montant: randomAmount(1_800_000, 2_600_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Public',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Vente documents'
          },
          { 
            id: 'R2023-70101C', 
            code: 'RE2023-70101C', 
            libelle: 'Autres ventes', 
            montant: randomAmount(1_300_000, 2_100_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Divers',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Ventes diverses'
          },
        ]
      },
      {
        id: 'LIG-2023-70102',
        code: '70102',
        libelle: 'Produits financiers',
        montant: 4500000,
        realisations: [
          { 
            id: 'R2023-70102A', 
            code: 'RE2023-70102A', 
            libelle: 'Intérêts placements', 
            montant: randomAmount(1_800_000, 2_600_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Banque Atlantique',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Intérêts CAT'
          },
          { 
            id: 'R2023-70102B', 
            code: 'RE2023-70102B', 
            libelle: 'Dividendes reçus', 
            montant: randomAmount(1_300_000, 2_100_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Société Filiale',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Dividendes participations'
          },
        ]
      },
      {
        id: 'LIG-2023-71101',
        code: '71101',
        libelle: 'Subvention nationale',
        montant: 26000000,
        realisations: [
          { 
            id: 'R2023-71101A', 
            code: 'RE2023-71101A', 
            libelle: 'Subvention État', 
            montant: randomAmount(13_000_000, 16_500_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Ministère des Finances',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Subvention fonctionnement'
          },
          { 
            id: 'R2023-71101B', 
            code: 'RE2023-71101B', 
            libelle: 'Subvention collectivités', 
            montant: randomAmount(9_000_000, 13_000_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Conseil Municipal',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Contribution municipale'
          },
        ]
      },
      {
        id: 'LIG-2023-71201',
        code: '71201',
        libelle: 'Subventions internationales',
        montant: 11500000,
        realisations: [
          { 
            id: 'R2023-71201A', 
            code: 'RE2023-71201A', 
            libelle: 'Subvention UNICEF', 
            montant: randomAmount(4_300_000, 6_000_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'UNICEF',
            numeroBon: generateBonNumber(
              
              
            ),
            numeroBE: generateBENumber(
              
              
            ),
            numeroMandat: generateMandatNumber(
              
              
            ),
            description: 'Programme éducation'
          },
          { 
            id: 'R2023-71201B', 
            code: 'RE2023-71201B', 
            libelle: 'Subvention UE', 
            montant: randomAmount(3_600_000, 5_200_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Union Européenne',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Programme développement'
          },
          { 
            id: 'R2023-71201C', 
            code: 'RE2023-71201C', 
            libelle: 'Subvention Banque Mondiale', 
            montant: randomAmount(2_600_000, 4_300_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Banque Mondiale',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Projet infrastructure'
          },
        ]
      },

      // ========== CLASSE 6 : CHARGES (DÉPENSES) 2023 ==========
      
      {
        id: 'LIG-2023-60101',
        code: '60101',
        libelle: 'Fournitures de bureau',
        montant: 4500000,
        realisations: [
          { 
            id: 'R2023-60101A', 
            code: 'RE2023-60101A', 
            libelle: 'Papeterie', 
            montant: randomAmount(1_800_000, 2_600_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Papeterie Moderne',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Fournitures bureau'
          },
          { 
            id: 'R2023-60101B', 
            code: 'RE2023-60101B', 
            libelle: 'Matériel informatique', 
            montant: randomAmount(1_300_000, 2_100_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Informatique Plus',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Accessoires informatiques'
          },
        ]
      },
      {
        id: 'LIG-2023-60102',
        code: '60102',
        libelle: 'Consommables informatiques',
        montant: 3500000,
        realisations: [
          { 
            id: 'R2023-60102A', 
            code: 'RE2023-60102A', 
            libelle: 'Cartouches toners', 
            montant: randomAmount(1_800_000, 2_600_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Bureau Services',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Cartouches imprimantes'
          },
          { 
            id: 'R2023-60102B', 
            code: 'RE2023-60102B', 
            libelle: 'Supports numériques', 
            montant: randomAmount(800_000, 1_800_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Informatique Plus',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Clés USB disques'
          },
        ]
      },
      {
        id: 'LIG-2023-61101',
        code: '61101',
        libelle: 'Eau, électricité, carburant',
        montant: 9000000,
        realisations: [
          { 
            id: 'R2023-61101A', 
            code: 'RE2023-61101A', 
            libelle: 'Factures eau', 
            montant: randomAmount(800_000, 1_800_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'SDE',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Consommation eau'
          },
          { 
            id: 'R2023-61101B', 
            code: 'RE2023-61101B', 
            libelle: 'Factures électricité', 
            montant: randomAmount(2_600_000, 4_300_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'SENELEC',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Consommation électricité'
          },
          { 
            id: 'R2023-61101C', 
            code: 'RE2023-61101C', 
            libelle: 'Carburant', 
            montant: randomAmount(2_600_000, 4_300_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'TotalEnergies',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Carburant véhicules'
          },
        ]
      },
      {
        id: 'LIG-2023-61102',
        code: '61102',
        libelle: 'Transport et logistique',
        montant: 7000000,
        realisations: [
          { 
            id: 'R2023-61102A', 
            code: 'RE2023-61102A', 
            libelle: 'Transport personnel', 
            montant: randomAmount(1_800_000, 2_600_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'SOTRACOM',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Transport personnel'
          },
          { 
            id: 'R2023-61102B', 
            code: 'RE2023-61102B', 
            libelle: 'Frais livraison', 
            montant: randomAmount(1_800_000, 2_600_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Logistique Plus',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Frais livraison'
          },
          { 
            id: 'R2023-61102C', 
            code: 'RE2023-61102C', 
            libelle: 'Maintenance véhicules', 
            montant: randomAmount(800_000, 1_800_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Atelier Auto',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Entretien véhicules'
          },
        ]
      },
      {
        id: 'LIG-2023-62101',
        code: '62101',
        libelle: 'Assurances',
        montant: 4500000,
        realisations: [
          { 
            id: 'R2023-62101A', 
            code: 'RE2023-62101A', 
            libelle: 'Assurance véhicules', 
            montant: randomAmount(1_300_000, 2_100_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'NSIA Assurances',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Assurance véhicules'
          },
          { 
            id: 'R2023-62101B', 
            code: 'RE2023-62101B', 
            libelle: 'Assurance immobiliers', 
            montant: randomAmount(900_000, 1_800_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'ALLIANZ',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Assurance locaux'
          },
          { 
            id: 'R2023-62101C', 
            code: 'RE2023-62101C', 
            libelle: 'Assurance RC', 
            montant: randomAmount(700_000, 1_300_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'NSIA Assurances',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Assurance RC'
          },
        ]
      },
      {
        id: 'LIG-2023-62102',
        code: '62102',
        libelle: 'Services informatiques et télécommunications',
        montant: 2600000,
        realisations: [
          { 
            id: 'R2023-62102A', 
            code: 'RE2023-62102A', 
            libelle: 'Maintenance IT', 
            montant: randomAmount(700_000, 1_000_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'IT Solutions',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Maintenance IT'
          },
          { 
            id: 'R2023-62102B', 
            code: 'RE2023-62102B', 
            libelle: 'Internet', 
            montant: randomAmount(360_000, 700_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Orange Senegal',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Abonnement internet'
          },
          { 
            id: 'R2023-62102C', 
            code: 'RE2023-62102C', 
            libelle: 'Téléphonie', 
            montant: randomAmount(450_000, 900_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'Expresso',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Forfaits mobile'
          },
        ]
      },
      {
        id: 'LIG-2023-66101',
        code: '66101',
        libelle: 'Salaires et traitements',
        montant: 12000000,
        realisations: [
          { 
            id: 'R2023-66101A', 
            code: 'RE2023-66101A', 
            libelle: 'Paie T1 2023', 
            montant: randomAmount(3_600_000, 4_500_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 2, 31)), 
            fournisseur: 'Trésor public',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Salaires T1'
          },
          { 
            id: 'R2023-66101B', 
            code: 'RE2023-66101B', 
            libelle: 'Paie T2 2023', 
            montant: randomAmount(3_600_000, 4_500_000), 
            date: randomDate(new Date(2023, 3, 1), new Date(2023, 5, 30)), 
            fournisseur: 'Trésor public',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Salaires T2'
          },
          { 
            id: 'R2023-66101C', 
            code: 'RE2023-66101C', 
            libelle: 'Paie T3 2023', 
            montant: randomAmount(3_600_000, 4_500_000), 
            date: randomDate(new Date(2023, 6, 1), new Date(2023, 8, 30)), 
            fournisseur: 'Trésor public',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Salaires T3'
          },
        ]
      },
      {
        id: 'LIG-2023-66102',
        code: '66102',
        libelle: 'Charges sociales et sécurité sociale',
        montant: 1800000,
        realisations: [
          { 
            id: 'R2023-66102A', 
            code: 'RE2023-66102A', 
            libelle: 'Cotisations IPRES', 
            montant: randomAmount(700_000, 1_000_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'IPRES',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Cotisations retraite'
          },
          { 
            id: 'R2023-66102B', 
            code: 'RE2023-66102B', 
            libelle: 'Cotisations CSS', 
            montant: randomAmount(450_000, 900_000), 
            date: randomDate(new Date(2023, 0, 1), new Date(2023, 11, 31)), 
            fournisseur: 'CSS',
            numeroBon: generateBonNumber(
              
            ),
            numeroBE: generateBENumber(
              
            ),
            numeroMandat: generateMandatNumber(
              
            ),
            description: 'Cotisations CSS'
          },
        ]
      },
    ]
  }
];