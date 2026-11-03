import { Injectable } from '@angular/core';
import { IRecette, IDepense, IDette, IMarche } from '../../data/cg/cg-data.model';

@Injectable({ providedIn: 'root' })
export class ControleGestionMockService {

  // Données Recettes (Conservées) [1]
  private recettes: IRecette[] = [
    // ... (Données de la source [1])
    { libelle: 'Transferts courants', servicesVotes2025: 2877583305, realisations30032025: null, realisations30062025: 1635467422, tauxRealisation: '57%', ecart: null, observations: "Ce montant représente les trois premières tranches de la subvention de l’Etat" },
    { libelle: 'Transferts en capital', servicesVotes2025: 147558480, realisations30032025: null, realisations30062025: 0, tauxRealisation: '0%', ecart: null, observations: "Les subventions d’investissement n’ont pas connu un début d’exécution" },
    { libelle: 'Fonds propres', servicesVotes2025: 5000000, realisations30032025: null, realisations30062025: 4105870, tauxRealisation: '82%', ecart: null, observations: "Ce montant provient de la vente des cahiers de charge et des produits financiers" },
    { libelle: 'Report à nouveau', servicesVotes2025: 10371110126, realisations30032025: null, realisations30062025: 10371110126, tauxRealisation: '100%', ecart: null, observations: 'destiné à la prise en charge du reversement des fonds non exécutés...' },
  ];

  // Données Dépenses (Conservées) [2]
  private depenses: IDepense[] = [
    // ... (Données de la source [2])
    { libelle: 'Charges à caractère général', budget2025: 2653438126, realisationsT1: 835746994, tr1: '31%', realisationsT2: 1197486853, tr2: '45%', realisationsT3: 1398176156, tr3: '53%', },
    { libelle: 'Charges de personnel', budget2025: 1441125505, realisationsT1: 300081240, tr1: '21%', realisationsT2: 588914752, tr2: '41%', realisationsT3: 774185629, tr3: '54%', },
    { libelle: 'TOTAL DEPENSES', budget2025: 4094563631, realisationsT1: 1135828234, tr1: '28%', realisationsT2: 1786401605, tr2: '44%', realisationsT3: 2172361785, tr3: '53%', },
  ];

  // Données Dettes (Instances) (Conservées, car le tableau reste) [7]
  private dettes: IDette[] = [
    // La liste complète des dettes est conservée pour les données sous-jacentes [7]
    { structure: 'BAEAUBAB', objetPaiement: 'Reliquat 2023', montantDu: null, observations: 'Attente facture définitive', statut: 'Attente Facture' },
    { structure: 'BAEAUBAB', objetPaiement: 'Livraisons 2024', montantDu: 28414, observations: 'Attente factures définitives', statut: 'Attente Facture' },
    // ... (Reste des 15 lignes de dettes basées sur [7])
    { structure: 'SENEGAL NUMERIQUE SA', objetPaiement: 'Contrat de services Sygec', montantDu: 4705250, observations: 'Contrat signé', statut: 'Contrat Signé' },
    { structure: 'PARADIS VOYAGES', objetPaiement: 'Frais de voyages (billets d\'avion)', montantDu: 373300, observations: 'Attente facture définitive', statut: 'Attente Facture' },
  ];



  // Données des marchés/dossiers (Synthèse des marchés) [3-6]
  private marches: IMarche[] = [
    { id: 1, dossier: 'Acquisition de Fournitures de bureau', situation: 'Engagé / Rejet pour correction (Non Facturé)', aFaire: 'Correction DAF', type: 'FINALISE' },
    { id: 2, dossier: 'Acquisition Consommables informatique', situation: 'Finalisé (Facturé)', aFaire: 'Paiement Distrimat', type: 'FINALISE' }, // Basé sur [5] Distrimat
    { id: 3, dossier: 'Nettoiement des locaux annexes', situation: 'Engagé et mandaté', aFaire: 'Paiement effectué', type: 'FINALISE' },
    { id: 4, dossier: "Acquisition de bouteille d’eau", situation: 'Engagé / Rejet pour correction', aFaire: 'Correction DAF', type: 'FINALISE' },
    { id: 5, dossier: "Acquisition de produit d’entretien", situation: 'Finalisé (Engagé)', aFaire: 'Paiement PBS', type: 'FINALISE' }, // Basé sur [5] PBS
    { id: 6, dossier: 'Avenant assurance maladie', situation: 'Engagé et mandaté', aFaire: 'Clôturé', type: 'FINALISE' },
    // Procédures en cours [8, 9]
    { id: 7, dossier: 'Acquisition de matériels informatiques de bureau', situation: 'Signature des notifications', aFaire: 'Notification aux attributaires', type: 'EN_COURS' },
    { id: 8, dossier: 'Recrutement consultant dématérialisation CG', situation: 'Évaluation en cours', aFaire: 'Finaliser évaluation', type: 'EN_COURS' },
    { id: 9, dossier: 'Recrutement consultant organisation Team Building', situation: 'Signature contrat', aFaire: 'Démarrage activité', type: 'EN_COURS' },
    { id: 10, dossier: 'Entretien et réparation parc automobile', situation: 'Signature contrat', aFaire: 'Démarrage prestation', type: 'EN_COURS' },
    { id: 11, dossier: 'Évaluation à mi-parcours opérationnalisation SNPS', situation: 'Procédure relancée (moins de 3 propositions)', aFaire: 'Relancer DP', type: 'EN_COURS' },
    { id: 12, dossier: 'Formation conduite sécuritaire préventive', situation: 'Phase évaluation', aFaire: 'Finaliser évaluation', type: 'EN_COURS' },
    // Procédures à lancer [10]
    { id: 13, dossier: 'DRPCO - Acquisition de catalogues et imprimés publicitaires', situation: 'Dossier disponible', aFaire: 'Transmission DG pour signature et Lancement de la procédure', type: 'A_LANCER' },
    { id: 14, dossier: 'DRPCS - Entretien, maintenance et réparation parc informatique', situation: 'Dossier disponible', aFaire: 'Transmission DG pour signature et Lancement de la procédure', type: 'A_LANCER' },
    { id: 15, dossier: 'DP - Recueil textes législatifs et réglementaires PS', situation: 'Demande de propositions disponible', aFaire: 'Transmission DG pour signature et Lancement de la procédure', type: 'A_LANCER' },

  ];

  constructor() {}

  getAllRecettes(): IRecette[] { return this.recettes; }
  getAllDepenses(): IDepense[] { return this.depenses; }
  getAllDettes(): IDette[] { return this.dettes; }
  getAllMarches(): IMarche[] { return this.marches; }
  
  // Suppression des méthodes get créances.
  
  getTotalRecettesExecutees(): number {
    return this.recettes.reduce((sum, r) => sum + r.realisations30062025, 0);
  }

  getTotalDepensesExecutees(): number {
    const totalDepenseRow = this.depenses.find(d => d.libelle === 'TOTAL DEPENSES');
    return totalDepenseRow ? totalDepenseRow.realisationsT2 : 0;
  }
  
  // Note: getTotalDettes() est retiré car le KPI associé est supprimé.
}