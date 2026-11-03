// ==========================================
// DONNÉES MOCK - RAPPORTS FINANCIERS DGPSN
// ==========================================

export interface BudgetDataRow {
    [key: string]: any;
    classe?: string;
    compte?: string;
    sousCompte?: string;
    rubrique: string;
    isTotal?: boolean;
    isCategory?: boolean;
    isSubCategory?: boolean;
    budget2024?: number;
    budget2025?: number;
    // Données mensuelles
    janvier?: number;
    fevrier?: number;
    mars?: number;
    avril?: number;
    mai?: number;
    juin?: number;
    juillet?: number;
    aout?: number;
    septembre?: number;
    octobre?: number;
    novembre?: number;
    decembre?: number;
    // Données trimestrielles
    t1?: number;
    t2?: number;
    t3?: number;
    t4?: number;
    // Synthèse
    realisationsCumulees?: number;
    realisationsAu31032024?: number;
    tauxExecution?: number;
    niveauExecution?: number;
    resteARealiser?: number;
}

export interface Engagement {
    numBon: string;
    dateEngagement: Date;
    numBE: string;
    numMandat: string;
    factureEtat: string;
    montants: number;
    fournisseurBeneficiaire: string;
    servicesDGPSN: string;
    compte: string;
    date: Date;
}

// RECETTES DE FONCTIONNEMENT
export const MOCK_RECETTES_FONCTIONNEMENT: BudgetDataRow[] = [
    {
        compte: '70700',
        rubrique: 'Fonds propres (vente cahier de charges, produits financiers)',
        budget2024: 5000000,
        janvier: 300000,
        fevrier: 450000,
        mars: 520000,
        avril: 380000,
        mai: 410000,
        juin: 420000,
        juillet: 350000,
        aout: 390000,
        septembre: 410000,
        octobre: 0,
        novembre: 0,
        decembre: 0,
        t1: 1270000,
        t2: 1210000,
        t3: 1150000,
        t4: 0,
        realisationsCumulees: 3630000,
        tauxExecution: 73,
        resteARealiser: 1370000
    },
    {
        compte: '71810',
        rubrique: 'Subvention d\'exploitation',
        budget2024: 2877583305,
        janvier: 0,
        fevrier: 0,
        mars: 390467422,
        avril: 420000000,
        mai: 425000000,
        juin: 400000000,
        juillet: 0,
        aout: 0,
        septembre: 0,
        octobre: 0,
        novembre: 0,
        decembre: 0,
        t1: 390467422,
        t2: 1245000000,
        t3: 0,
        t4: 0,
        realisationsCumulees: 1635467422,
        tauxExecution: 57,
        resteARealiser: 1242115883
    },
    {
        compte: '71820',
        rubrique: 'Subvention versée par organismes internationaux (UNICEF, PAM, KR)',
        budget2024: 168856600,
        janvier: 0,
        fevrier: 0,
        mars: 0,
        avril: 0,
        mai: 20000000,
        juin: 18453417,
        juillet: 10000000,
        aout: 10000000,
        septembre: 0,
        octobre: 0,
        novembre: 0,
        decembre: 0,
        t1: 0,
        t2: 38453417,
        t3: 20000000,
        t4: 0,
        realisationsCumulees: 58453417,
        tauxExecution: 35,
        resteARealiser: 110403183
    },
    {
        rubrique: 'Report à nouveau',
        budget2024: 10371110126,
        janvier: 371110126,
        fevrier: 0,
        mars: 0,
        avril: 0,
        mai: 0,
        juin: 0,
        juillet: 10000000000,
        aout: 0,
        septembre: 0,
        octobre: 0,
        novembre: 0,
        decembre: 0,
        t1: 371110126,
        t2: 0,
        t3: 10000000000,
        t4: 0,
        realisationsCumulees: 10371110126,
        tauxExecution: 100,
        resteARealiser: 0
    },
    {
        rubrique: 'TOTAL RECETTES DE FONCTIONNEMENT',
        budget2024: 13422550031,
        janvier: 371410126,
        fevrier: 450000,
        mars: 390987422,
        avril: 420380000,
        mai: 445410000,
        juin: 418873417,
        juillet: 10010350000,
        aout: 10390000,
        septembre: 410000,
        octobre: 0,
        novembre: 0,
        decembre: 0,
        t1: 762847548,
        t2: 1284663417,
        t3: 10021150000,
        t4: 0,
        realisationsCumulees: 12068660965,
        tauxExecution: 90,
        resteARealiser: 1353889066,
        isTotal: true
    }
];

// DEPENSES DE FONCTIONNEMENT
export const MOCK_DEPENSES_FONCTIONNEMENT: BudgetDataRow[] = [
    {
        compte: '604',
        rubrique: 'Matières et Fournitures',
        budget2024: 10800000,
        janvier: 1200000,
        fevrier: 1150000,
        mars: 1300000,
        avril: 1400000,
        mai: 1350000,
        juin: 1264368,
        juillet: 1100000,
        aout: 900000,
        septembre: 0,
        t1: 3650000,
        t2: 4014368,
        t3: 2000000,
        t4: 0,
        realisationsCumulees: 10664368,
        tauxExecution: 99,
        resteARealiser: 135632,
        isCategory: true
    },
    {
        compte: '60430',
        rubrique: 'Matériel et Produits d\'entretien',
        budget2024: 800000,
        janvier: 100000,
        fevrier: 80000,
        mars: 90000,
        avril: 110000,
        mai: 95000,
        juin: 92054,
        juillet: 50000,
        aout: 50000,
        t1: 270000,
        t2: 297054,
        t3: 100000,
        t4: 0,
        realisationsCumulees: 667054,
        tauxExecution: 83,
        resteARealiser: 132946
    },
    {
        compte: '60471',
        rubrique: 'Fournitures de bureau',
        budget2024: 2500000,
        janvier: 350000,
        fevrier: 320000,
        mars: 380000,
        avril: 400000,
        mai: 370000,
        juin: 378886,
        juillet: 200000,
        aout: 100000,
        t1: 1050000,
        t2: 1148886,
        t3: 300000,
        t4: 0,
        realisationsCumulees: 2498886,
        tauxExecution: 100,
        resteARealiser: 1114
    },
    {
        compte: '605',
        rubrique: 'Autres achats',
        budget2024: 67000000,
        janvier: 1736500,
        fevrier: 2000000,
        mars: 3500000,
        avril: 2800000,
        mai: 3200000,
        juin: 3731444,
        t1: 7236500,
        t2: 9731444,
        t3: 0,
        t4: 0,
        realisationsCumulees: 16967944,
        tauxExecution: 25,
        resteARealiser: 50032056,
        isCategory: true
    },
    {
        compte: '614',
        rubrique: 'Transport de personnel',
        budget2024: 1500000,
        janvier: 300000,
        fevrier: 200000,
        mars: 200000,
        t1: 700000,
        t2: 0,
        t3: 0,
        t4: 0,
        realisationsCumulees: 700000,
        tauxExecution: 47,
        resteARealiser: 800000,
        isCategory: true
    }
];

// INVESTISSEMENTS
export const MOCK_INVESTISSEMENTS: BudgetDataRow[] = [
    {
        compte: '213',
        rubrique: 'Logiciels',
        budget2024: 25000000,
        realisationsAu31032024: 4705250,
        niveauExecution: 19,
        resteARealiser: 20294750,
        budget2025: 0,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        isCategory: true
    },
    {
        compte: '2130',
        rubrique: 'Acquisition logiciel et progiciel',
        budget2024: 25000000,
        realisationsAu31032024: 4705250,
        niveauExecution: 19,
        resteARealiser: 20294750,
        budget2025: 0,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0
    },
    {
        compte: '235',
        rubrique: 'Aménagement de bureau',
        budget2024: 50000000,
        realisationsAu31032024: 0,
        niveauExecution: 0,
        resteARealiser: 50000000,
        budget2025: 27683985,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        isCategory: true
    },
    {
        compte: '23500',
        rubrique: 'Aménagement de bureaux',
        budget2024: 50000000,
        realisationsAu31032024: 0,
        niveauExecution: 0,
        resteARealiser: 50000000,
        budget2025: 27683985,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0
    },
    {
        compte: '244',
        rubrique: 'Matériel et mobilier',
        budget2024: 86000000,
        realisationsAu31032024: 35214967,
        niveauExecution: 41,
        resteARealiser: 50785033,
        budget2025: 20000000,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        isCategory: true
    },
    {
        compte: '24410',
        rubrique: 'Matériels de bureau',
        budget2024: 15000000,
        realisationsAu31032024: 14742561,
        niveauExecution: 98,
        resteARealiser: 257439,
        budget2025: 6000000,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0
    },
    {
        compte: '24420',
        rubrique: 'Matériels informatiques',
        budget2024: 71000000,
        realisationsAu31032024: 20472406,
        niveauExecution: 29,
        resteARealiser: 50527594,
        budget2025: 7000000,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0
    },
    {
        compte: '24440',
        rubrique: 'Mobilier de bureau',
        budget2024: 0,
        realisationsAu31032024: 0,
        niveauExecution: 0,
        resteARealiser: 0,
        budget2025: 7000000,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0
    },
    {
        compte: '245',
        rubrique: 'Matériel de transport',
        budget2024: 70000000,
        realisationsAu31032024: 0,
        niveauExecution: 0,
        resteARealiser: 70000000,
        budget2025: 99874495,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        isCategory: true
    },
    {
        compte: '24510',
        rubrique: 'Matériels de transport',
        budget2024: 70000000,
        realisationsAu31032024: 0,
        niveauExecution: 0,
        resteARealiser: 70000000,
        budget2025: 99874495,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0
    }
];

// RÉCAPITULATIF INVESTISSEMENT
export const MOCK_RECAP_INVESTISSEMENT: BudgetDataRow[] = [
    // RECETTES
    {
        classe: '',
        compte: '',
        sousCompte: '121',
        rubrique: 'Report à nouveau',
        budget2024: 0,
        realisationsAu31032024: 0,
        niveauExecution: 0,
        resteARealiser: 0,
        budget2025: 0,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        isCategory: true
    },
    {
        classe: '',
        compte: '',
        sousCompte: '',
        rubrique: '12110 Report crédits',
        budget2024: 0,
        realisationsAu31032024: 0,
        niveauExecution: 0,
        resteARealiser: 0,
        budget2025: 0,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0
    },
    {
        classe: '',
        compte: '',
        sousCompte: '141',
        rubrique: 'subvention d\'équipement',
        budget2024: 0,
        realisationsAu31032024: 0,
        niveauExecution: 0,
        resteARealiser: 0,
        budget2025: 0,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        isCategory: true
    },
    {
        classe: '',
        compte: '',
        sousCompte: '',
        rubrique: '14114 Subvention d\'investissement',
        budget2024: 196000000,
        realisationsAu31032024: 100000000,
        niveauExecution: 51,
        resteARealiser: 96000000,
        budget2025: 147558480,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0
    },
    {
        classe: '',
        compte: '',
        sousCompte: '',
        rubrique: '14115 Crédit IDA (Projet d\'appui aux filets sociaux)',
        budget2024: 0,
        realisationsAu31032024: 0,
        niveauExecution: 0,
        resteARealiser: 0,
        budget2025: 0,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0
    },
    {
        classe: '',
        compte: '',
        sousCompte: '',
        rubrique: '14170 Subvention organismes internationaux (FNPS-ARRA-PAM-UNICEF)',
        budget2024: 35000000,
        realisationsAu31032024: 0,
        niveauExecution: 0,
        resteARealiser: 0,
        budget2025: 0,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0
    },
    {
        classe: '',
        compte: '',
        sousCompte: '',
        rubrique: 'TOTAL RECETTES D\'INVESTISSEMENT',
        budget2024: 231000000,
        realisationsAu31032024: 100000000,
        niveauExecution: 43,
        resteARealiser: 96000000,
        budget2025: 147558480,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        isTotal: true
    },
    // DEPENSES
    {
        classe: '2',
        compte: '',
        sousCompte: '',
        rubrique: 'DEPENSES D\'INVESTISSEMENT',
        budget2024: 0,
        realisationsAu31032024: 0,
        niveauExecution: 0,
        resteARealiser: 0,
        budget2025: 0,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        isCategory: true
    },
    {
        classe: '',
        compte: '21',
        sousCompte: '',
        rubrique: 'IMMOBILISATIONS INCORPORELLES',
        budget2024: 0,
        realisationsAu31032024: 0,
        niveauExecution: 0,
        resteARealiser: 0,
        budget2025: 0,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        isSubCategory: true
    },
    {
        classe: '',
        compte: '',
        sousCompte: '213',
        rubrique: 'Logiciels',
        budget2024: 25000000,
        realisationsAu31032024: 4705250,
        niveauExecution: 19,
        resteARealiser: 20294750,
        budget2025: 0,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        isCategory: true
    },
    {
        classe: '',
        compte: '',
        sousCompte: '',
        rubrique: '2130 Acquisition logiciel et progiciel',
        budget2024: 25000000,
        realisationsAu31032024: 4705250,
        niveauExecution: 19,
        resteARealiser: 20294750,
        budget2025: 0,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0
    },
    {
        classe: '',
        compte: '23',
        sousCompte: '',
        rubrique: 'BATIMENTS, INSTALLATIONS TECHNIQUES ET AGENCEMENTS',
        budget2024: 0,
        realisationsAu31032024: 0,
        niveauExecution: 0,
        resteARealiser: 0,
        budget2025: 0,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        isSubCategory: true
    },
    {
        classe: '',
        compte: '',
        sousCompte: '235',
        rubrique: 'Aménagement de bureau',
        budget2024: 50000000,
        realisationsAu31032024: 0,
        niveauExecution: 0,
        resteARealiser: 50000000,
        budget2025: 27683985,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        isCategory: true
    },
    {
        classe: '',
        compte: '',
        sousCompte: '',
        rubrique: '23500 Aménagement de bureaux',
        budget2024: 50000000,
        realisationsAu31032024: 0,
        niveauExecution: 0,
        resteARealiser: 50000000,
        budget2025: 27683985,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0
    },
    {
        classe: '',
        compte: '',
        sousCompte: '244',
        rubrique: 'Matériel et mobilier',
        budget2024: 86000000,
        realisationsAu31032024: 35214967,
        niveauExecution: 41,
        resteARealiser: 50785033,
        budget2025: 20000000,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        isCategory: true
    },
    {
        classe: '',
        compte: '',
        sousCompte: '',
        rubrique: '24410 Matériels de bureau',
        budget2024: 15000000,
        realisationsAu31032024: 14742561,
        niveauExecution: 98,
        resteARealiser: 257439,
        budget2025: 6000000,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0
    },
    {
        classe: '',
        compte: '',
        sousCompte: '',
        rubrique: '24420 Matériels informatiques',
        budget2024: 71000000,
        realisationsAu31032024: 20472406,
        niveauExecution: 29,
        resteARealiser: 50527594,
        budget2025: 7000000,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0
    },
    {
        classe: '',
        compte: '',
        sousCompte: '',
        rubrique: '24440 Mobilier de bureau',
        budget2024: 0,
        realisationsAu31032024: 0,
        niveauExecution: 0,
        resteARealiser: 0,
        budget2025: 7000000,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0
    },
    {
        classe: '',
        compte: '',
        sousCompte: '245',
        rubrique: 'Matériel de transport',
        budget2024: 70000000,
        realisationsAu31032024: 0,
        niveauExecution: 0,
        resteARealiser: 70000000,
        budget2025: 99874495,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        isCategory: true
    },
    {
        classe: '',
        compte: '',
        sousCompte: '',
        rubrique: '24510 Matériels de transport',
        budget2024: 70000000,
        realisationsAu31032024: 0,
        niveauExecution: 0,
        resteARealiser: 70000000,
        budget2025: 99874495,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0
    },
    {
        classe: '',
        compte: '',
        sousCompte: '',
        rubrique: 'SOUS TOTAL BUDGET INVESTISSEMENT',
        budget2024: 231000000,
        realisationsAu31032024: 39920217,
        niveauExecution: 17,
        resteARealiser: 191079783,
        budget2025: 147558480,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        isTotal: true
    },
    {
        classe: '',
        compte: '',
        sousCompte: '',
        rubrique: 'TOTAL DEPENSES D\'INVESTISSEMENT',
        budget2024: 231000000,
        realisationsAu31032024: 39920217,
        niveauExecution: 17,
        resteARealiser: 191079783,
        budget2025: 147558480,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        isTotal: true
    }
];

// ENGAGEMENTS
export const MOCK_ENGAGEMENTS: Engagement[] = [
    {
        numBon: '001151',
        dateEngagement: new Date('2025-01-22'),
        numBE: '001',
        numMandat: '001',
        factureEtat: 'salaires personnel contractuel DGPSN',
        montants: 46483360,
        fournisseurBeneficiaire: 'DIVERS BENEFICIAIRES',
        servicesDGPSN: 'CABINET',
        compte: '66110',
        date: new Date('2025-01-22')
    },
    {
        numBon: '001151',
        dateEngagement: new Date('2025-01-22'),
        numBE: '001',
        numMandat: '002',
        factureEtat: 'personnel détachés janvier 2025',
        montants: 20281163,
        fournisseurBeneficiaire: 'DIVERS BENEFICIAIRES',
        servicesDGPSN: 'CABINET',
        compte: '66110',
        date: new Date('2025-01-22')
    },
    {
        numBon: '001156',
        dateEngagement: new Date('2025-02-13'),
        numBE: '002',
        numMandat: '011',
        factureEtat: 'indemnités départ à la retraite Medou NDIOBA MBAYE',
        montants: 1109694,
        fournisseurBeneficiaire: 'DIVERS BENEFICIAIRES',
        servicesDGPSN: 'CABINET',
        compte: '66110',
        date: new Date('2025-02-13')
    },
    {
        numBon: '001158',
        dateEngagement: new Date('2025-02-24'),
        numBE: '003',
        numMandat: '014',
        factureEtat: 'salaires personnel contractuel DGPSN février 2025',
        montants: 46251389,
        fournisseurBeneficiaire: 'DIVERS BENEFICIAIRES',
        servicesDGPSN: 'CABINET',
        compte: '66110',
        date: new Date('2025-02-24')
    },
    {
        numBon: '001228',
        dateEngagement: new Date('2025-02-28'),
        numBE: '004',
        numMandat: '024',
        factureEtat: 'mise en charge des frais de deplacement des chauffeurs mutes',
        montants: 202359788,
        fournisseurBeneficiaire: 'DIVERS BENEFICIAIRES',
        servicesDGPSN: 'CABINET',
        compte: '61810',
        date: new Date('2025-02-28')
    }
];
