export enum TYPE_BORDEREAU {
    DRH = "DRH",
    DG = "DG",
    DESICION = "DESICION"
}
export enum TYPE_LETTRE_TRANSMISSION {
    AVANCEMENT = "AVANCEMENT",
}

export enum DECRET_PRESIDENTIEL {
    DECRET_PRESIDENTIEL = "DECRET_PRESIDENTIEL",
}

export enum TYPE_PROJET {
    DECRET = "Décret",
    ARRETE = "Arrêté"
}

export enum TYPE_MINISTRE {
    SGG = "SGG",
    MFB = "MFB"
}

export enum TYPE_FICHE {
    BORDEREAU = "BORDEREAU",
    LETTRE_DE_TRANSMISSION = "LETTRE_DE_TRANSMISSION"
}


export interface FicheGenerate  {
    typeBordereau?: TYPE_BORDEREAU;
    typeLettreTransmission?: TYPE_LETTRE_TRANSMISSION;
}
