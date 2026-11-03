// src/app/models/candidat.model.ts

import {NotationDTO} from "@/app/services/candidat/NotationService";

export enum NiveauEtude {
    BFEM = 'BFEM',
    BAC = 'BAC',
    BAC_PLUS_2 = 'BAC+2',
    LICENCE = 'Licence',
    MASTER_I = 'Master I',
    MASTER_II = 'Master II',
    DOCTORAT = 'Doctorat',
    MAITRISE = 'Maitrise'
}

export enum ExperienceProfessionnelle {
    UN_AN = '1 an',
    DEUX_ANS = '2 ans',
    TROIS_ANS = '3 ans',
    QUATRE_ANS = '4 ans',
    CINQ_ANS = '5 ans',
}

export enum StatusCandidature {
    IN_PROGRESS = 'IN_PROGRESS',
    PRESELECTED_FOR_INTERVIEW = 'PRESELECTED_FOR_INTERVIEW',
    SELECTED_AFTER_INTERVIEW = 'SELECTED_AFTER_INTERVIEW',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED'
}

export interface CandidatDTO {
    id?: number;
    matricule?: string;
    prenom?: string;
    nom?: string;
    adresse?: string;
    salaireSouhaite?: number;
    niveauEtude?: NiveauEtude;
    experienceProfessionnelle?: ExperienceProfessionnelle;
    postePostule?: string;
    statusCandidature?: StatusCandidature;
    competences?: string[];
    cv?: string;
    notations? : NotationDTO[]
}