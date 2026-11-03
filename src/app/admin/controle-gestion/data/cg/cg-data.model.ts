export interface IRecette {
  libelle: string;
  servicesVotes2025: number;
  realisations30032025: number | null;
  realisations30062025: number;
  tauxRealisation: string; 
  ecart: number | null;
  observations: string;
}

export interface IDepense {
  libelle: string;
  budget2025: number;
  realisationsT1: number; // Au 30-03-2025
  tr1: string;
  realisationsT2: number; // Au 30-06-2025
  tr2: string;
  realisationsT3: number; // Au 01-09-2025
  tr3: string;
}

/** 
 * IDette est conservée, car le tableau Dettes (Instances) reste, 
 * mais la colonne Montant Dû et les Observations sont conservées [7].
 */
export interface IDette {
  structure: string;
  objetPaiement: string;
  montantDu: number | null; // Le montant dû est basé sur [7]
  observations: string;
  statut: string; // Dérivé pour l'affichage du statut
}

// L'interface ICreance n'est plus pertinente pour le contenu affiché, mais le modèle la garderait souvent.
// Par souci de clarté dans cette réponse, je la supprime du contexte d'usage.

export interface IMarche {
  id: number;
  dossier: string;
  situation: string;
  aFaire: string;
  type: 'FINALISE' | 'EN_COURS' | 'A_LANCER';
}