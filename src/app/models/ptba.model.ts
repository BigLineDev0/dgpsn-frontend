export interface PtbaTrimester {
    janvier: boolean;
    fevrier: boolean;
    mars: boolean;
    avril: boolean;
    mai: boolean;
    juin: boolean;
    juillet: boolean;
    aout: boolean;
    septembre: boolean;
    octobre: boolean;
    novembre: boolean;
    decembre: boolean;
}

export interface PtbaFundingSources {
    sources: { [bailleur: string]: number }; // Map dynamique
}

export interface PtbaActivity {
    id: number;
    objectif: string;
    objectifCode: string;
    action: string;
    actionCode: string;
    activite: string;
    activiteCode: string;
    indicateurs?: string;
    taches?: string;
    trimestre1: PtbaTrimester;
    trimestre2: PtbaTrimester;
    trimestre3: PtbaTrimester;
    trimestre4: PtbaTrimester;
    acteurResponsable?: string;
    acteurImplique?: string;
    coutCFA: number;
    sourcesFinancement: PtbaFundingSources;
    sourcesVerification?: string;
    observations?: string;
}

export interface PtbaResponse {
    projetId: number;
    projetCode: string;
    projetName: string;
    annee: number;
    activities: PtbaActivity[];
    bailleurs: string[]; // Liste dynamique des bailleurs
    totauxParObjectif: { [objectif: string]: number };
    totauxParAction: { [action: string]: number };
    totalGeneral: number;
    totauxSourcesFinancement: { [bailleur: string]: number };
    structure?: string;
    responsable?: string;
}

export interface PtbaFilters {
    trimestre: string;
    mois: string;
    action: string;
    acteurResponsable: string;
    sourceFinancement: string;
    searchText: string;
}
