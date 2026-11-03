import { Injectable, signal } from '@angular/core';

// === INTERFACES ===

export interface Base {
  id: string;
  code: string;
  libelle: string;
}

export interface BaseParametrage extends Base {
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


// === MOCK DE PARAMÉTRAGE FINANCE ===

export const PARAMETRAGE_FINANCE: IClasse[] = [
  // === CLASSE 7 : PRODUITS (RECETTES) ===
  {
    id: 'C7',
    code: '7',
    libelle: 'Produits (Recettes de fonctionnement)',
    commentaire: 'Regroupe les produits propres et subventions',
    comptes: [
      {
        id: 'C70',
        code: '70',
        libelle: 'Fonds propres',
        commentaire: 'Vente cahier de charges, produits financiers',
        sousComptes: [
          {
            id: 'SC701',
            code: '701',
            libelle: 'Fonds propres',
            commentaire: 'Fonds propres sont les produits propres et subventions',
            rubriques: [
              {
                id: 'R70101',
                code: '70101',
                libelle: 'Vente de biens',
                commentaire: '',
                realisations: [
                  { id: 'R70101A', code: 'RE70101298', libelle: 'Vente cahiers', commentaire: '' },
                  { id: 'R70101B', code: 'RE70101341', libelle: 'Vente fournitures', commentaire: '' },
              ]
              },
              {
                id: 'R70102',
                code: '70102',
                libelle: 'Produits financiers',
                commentaire: '',
                realisations: [
                  { id: 'R70102A', code: 'RE70102341', libelle: 'Intérêts bancaires', commentaire: '' },
                  { id: 'R70102B', code: 'RE70102342', libelle: 'Dividendes', commentaire: '' },
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'C71',
        code: '71',
        libelle: 'Subventions',
        commentaire: 'Subventions d’exploitation et internationales',
        sousComptes: [
          {
            id: 'SC711',
            code: '711',
            libelle: 'Subvention d’exploitation',
            commentaire: '',
            rubriques: [
              {
                id: 'R71101',
                code: '71101',
                libelle: 'Subvention nationale',
                commentaire: '',
                realisations: [
                  { id: 'R71101A', code: 'RE71101234', libelle: 'Subvention état', commentaire: '' },
                  { id: 'R71101B', code: 'RE71101235', libelle: 'Subvention municipalité', commentaire: '' },
                ]
              }
            ]
          },
          {
            id: 'SC712',
            code: '712',
            libelle: 'Subvention internationale',
            commentaire: '',
            rubriques: [
              {
                id: 'R71201',
                code: '71201',
                libelle: 'Subventions ONU / UNICEF / PAM',
                commentaire: '',
                realisations: [
                  { id: 'R71201A', code: 'RE71201234', libelle: 'UNICEF', commentaire: '' },
                  { id: 'R71201B', code: 'RE71201235', libelle: 'PAM', commentaire: '' },
                ]
              }
            ]
          }
        ]
      }
    ]
  },

// === CLASSE 6 : CHARGES (DÉPENSES) ===
{
  id: 'C6',
  code: '6',
  libelle: 'Charges (Dépenses de fonctionnement)',
  commentaire: 'Regroupe toutes les charges de l\'exercice',
  comptes: [
    {
      id: 'C60',
      code: '60',
      libelle: 'Matières et Fournitures',
      commentaire: '',
      sousComptes: [
        {
          id: 'SC601',
          code: '601',
          libelle: "Matériel et produits d'entretien",
          commentaire: '',
          rubriques: [
            {
              id: 'R60101',
              code: '60101',
              libelle: "Fournitures de bureau",
              commentaire: '',
              realisations: [
                { id: 'R60101A', code: 'RE60101234', libelle: "Achat papier et stylos", commentaire: '' },
                { id: 'R60101B', code: 'RE60101235', libelle: "Achat toner imprimante", commentaire: '' },
              ]
            },
            {
              id: 'R60102',
              code: '60102',
              libelle: "Consommables informatiques",
              commentaire: '',
              realisations: [
                { id: 'R60102A', code: 'RE60102234', libelle: "Cartouches d'encre", commentaire: '' },
                { id: 'R60102B', code: 'RE60102235', libelle: "CD / DVD vierges", commentaire: '' },
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'C61',
      code: '61',
      libelle: 'Autres achats',
      commentaire: '',
      sousComptes: [
        {
          id: 'SC611',
          code: '611',
          libelle: "Services externes",
          commentaire: '',
          rubriques: [
            {
              id: 'R61101',
              code: '61101',
              libelle: "Eau, électricité, carburant",
              commentaire: '',
              realisations: [
                { id: 'R61101A', code: 'RE61101234', libelle: "Factures eau", commentaire: '' },
                { id: 'R61101B', code: 'RE61101235', libelle: "Factures électricité", commentaire: '' },
                { id: 'R61101C', code: 'RE61101236', libelle: "Carburant véhicules", commentaire: '' },
              ]
            },
            // ✅ AJOUTER CETTE RUBRIQUE
            {
              id: 'R61102',
              code: '61102',
              libelle: "Transport et logistique",
              commentaire: '',
              realisations: [
                { id: 'R61102A', code: 'RE61102234', libelle: "Transport personnel", commentaire: '' },
                { id: 'R61102B', code: 'RE61102235', libelle: "Frais de port", commentaire: '' },
                { id: 'R61102C', code: 'RE61102236', libelle: "Maintenance véhicules", commentaire: '' },
              ]
            }
          ]
        }
      ]
    },
    // ✅ AJOUTER CE COMPTE 62
    {
      id: 'C62',
      code: '62',
      libelle: 'Services externes',
      commentaire: '',
      sousComptes: [
        {
          id: 'SC621',
          code: '621',
          libelle: "Services externes divers",
          commentaire: '',
          rubriques: [
            {
              id: 'R62101',
              code: '62101',
              libelle: "Assurances",
              commentaire: '',
              realisations: [
                { id: 'R62101A', code: 'RE62101234', libelle: "Assurance véhicules", commentaire: '' },
                { id: 'R62101B', code: 'RE62101235', libelle: "Assurance immobiliers", commentaire: '' },
                { id: 'R62101C', code: 'RE62101236', libelle: "Assurance RC", commentaire: '' },
              ]
            },
            {
              id: 'R62102',
              code: '62102',
              libelle: "Services informatiques et télécommunications",
              commentaire: '',
              realisations: [
                { id: 'R62102A', code: 'RE62102234', libelle: "Maintenance serveurs", commentaire: '' },
                { id: 'R62102B', code: 'RE62102235', libelle: "Abonnement internet", commentaire: '' },
                { id: 'R62102C', code: 'RE62102236', libelle: "Téléphonie", commentaire: '' },
              ]
            }
          ]
        }
      ]
    },
    // ✅ AJOUTER CE COMPTE 66
    {
      id: 'C66',
      code: '66',
      libelle: 'Charges de personnel',
      commentaire: '',
      sousComptes: [
        {
          id: 'SC661',
          code: '661',
          libelle: "Personnel et charges sociales",
          commentaire: '',
          rubriques: [
            {
              id: 'R66101',
              code: '66101',
              libelle: "Salaires et traitements",
              commentaire: '',
              realisations: [
                { id: 'R66101A', code: 'RE66101234', libelle: "Paie personnel", commentaire: '' },
              ]
            },
            {
              id: 'R66102',
              code: '66102',
              libelle: "Charges sociales et sécurité sociale",
              commentaire: '',
              realisations: [
                { id: 'R66102A', code: 'RE66102234', libelle: "Cotisations IPRES", commentaire: '' },
                { id: 'R66102B', code: 'RE66102235', libelle: "Cotisations CSS", commentaire: '' },
              ]
            }
          ]
        }
      ]
    }
  ]
},
    // === CLASSE  : CHARGES (DÉPENSES) ===
  {
    id: 'C2',
    code: '2',
    libelle: 'Investissements (Dépenses d\'investissement)',
    commentaire: 'Regroupe toutes les charges de l’exercice',
    comptes: [
      {
        id: 'C20',
        code: '20',
        libelle: 'Matières et Fournitures',
        commentaire: '',
        sousComptes: [
          {
            id: 'SC201',
            code: '201',
            libelle: "Matériel et produits d'entretien",
            commentaire: '',
            rubriques: [
              {
                id: 'R20101',
                code: '20101',
                libelle: "Fournitures de bureau",
                commentaire: '',
                realisations: [
                  { id: 'R20101A', code: 'RE60101234', libelle: "Achat papier et stylos", commentaire: '' },
                  { id: 'R20101B', code: 'RE60101235', libelle: "Achat toner imprimante", commentaire: '' },
                ]
              },
              {
                id: 'R20102',
                code: '20102',
                libelle: "Consommables informatiques",
                commentaire: '',
                realisations: [
                  { id: 'R20102A', code: 'RE60102234', libelle: "Cartouches d'encre", commentaire: '' },
                  { id: 'R20102B', code: 'RE60102235', libelle: "CD / DVD vierges", commentaire: '' },
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'C21',
        code: '21',
        libelle: 'Autres achats',
        commentaire: '',
        sousComptes: [
          {
            id: 'SC211',
            code: '211',
            libelle: "Services externes",
            commentaire: '',
            rubriques: [
              {
                id: 'R21101',
                code: '11401',
                libelle: "Eau, électricité, carburant",
                commentaire: '',
                realisations: [
                  { id: 'R21101A', code: 'RE21101234', libelle: "Factures eau", commentaire: '' },
                  { id: 'R21101B', code: 'RE21101235', libelle: "Factures électricité", commentaire: '' },
                  { id: 'R21101C', code: 'RE21101236', libelle: "Carburant véhicules", commentaire: '' },
                ]
              }
            ]
          }
        ]
      },
       {
        id: 'C22',
        code: '22',
        libelle: 'Autres achats',
        commentaire: '',
        sousComptes: [
          {
            id: 'SC221',
            code: '221',
            libelle: "Services externes",
            commentaire: '',
            rubriques: [
              {
                id: 'R21101',
                code: '21103',
                libelle: "Eau, électricité, carburant",
                commentaire: '',
                realisations: [
                  { id: 'R21101A', code: 'RE21101234', libelle: "Factures eau", commentaire: '' },
                  { id: 'R21101B', code: 'RE21101235', libelle: "Factures électricité", commentaire: '' },
                  { id: 'R21101C', code: 'RE21101236', libelle: "Carburant véhicules", commentaire: '' },
                ]
              }
            ]
          }
        ]
      },
       {
        id: 'C23',
        code: '23',
        libelle: 'Autres achats',
        commentaire: '',
        sousComptes: [
          {
            id: 'SC231',
            code: '231',
            libelle: "Services externes",
            commentaire: '',
            rubriques: [
              {
                id: 'R21101',
                code: '11101',
                libelle: "Eau, électricité, carburant",
                commentaire: '',
                realisations: [
                  { id: 'R21101A', code: 'RE21101234', libelle: "Factures eau", commentaire: '' },
                  { id: 'R21101B', code: 'RE21101235', libelle: "Factures électricité", commentaire: '' },
                  { id: 'R21101C', code: 'RE21101236', libelle: "Carburant véhicules", commentaire: '' },
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];


// === SERVICE MOCK ===

@Injectable({ providedIn: 'root' })
export class MockServiceVersion2 {
  private _parametrageFinance = signal<IClasse[]>(PARAMETRAGE_FINANCE);

  parametrageFinance = this._parametrageFinance.asReadonly();

  getAllClasse(): IClasse[] {
    return this._parametrageFinance();
  }

  getClasseByCode(code: string): IClasse | undefined {
    return this._parametrageFinance().find((c) => c.code === code);
  }

  getClasseById(id: string): IClasse | undefined {
    return this._parametrageFinance().find((c) => c.id === id);
  }

  getComptesByClasseId(classeId: string): ICompte[] {
    const classe = this.getClasseById(classeId);
    return classe?.comptes || [];
  }

  getCompteByCode(classeCode: string, compteCode: string): ICompte | undefined {
    const classe = this.getClasseByCode(classeCode);
    return classe?.comptes.find((c) => c.code === compteCode);
  }

  getCompteById(compteId: string , classeId: string): ICompte | undefined {
    const compte = this.getComptesByClasseId(classeId);
    return compte?.find((c) => c.id === compteId);
  }

  getAllSousComptesByCompteId(compteId: string, classeId: string): ISousCompte[] {
    const compte = this.getCompteById(compteId, classeId);
    return compte?.sousComptes || [];
  }



  getRubriquesByClasseCode(classeCode: string): IRubrique[] {
  const classe = this.getClasseByCode(classeCode);
  if (!classe) return [];

  return classe.comptes
    .flatMap((compte) => compte.sousComptes)
    .flatMap((sousCompte) => sousCompte.rubriques);
}

getSousCompteById(sousCompteId: string): ISousCompte | undefined {
  for (const classe of this._parametrageFinance()) {
    for (const compte of classe.comptes) {
      const sousCompte = compte.sousComptes.find(sc => sc.id === sousCompteId);
      if (sousCompte) return sousCompte;
    }
  }
  return undefined;
}


getAllRubriquesBySousCompteId(sousCompteId: string): IRubrique[] {
  const sousCompte = this.getSousCompteById(sousCompteId);
  return sousCompte?.rubriques || [];
}

  getAllRubriques(): IRubrique[] {
    return this._parametrageFinance()
      .flatMap((c) => c.comptes)
      .flatMap((co) => co.sousComptes)
      .flatMap((s) => s.rubriques);
  }

  /**
   * Récupère toutes les réalisations d'une rubrique spécifique
   * @param rubriqueId L'ID de la rubrique
   * @returns Un tableau de réalisations ou un tableau vide si aucune trouvée
   */
  getAllRealisationsByRubriqueId(rubriqueId: string): IRealisation[] {
    // Parcourir toutes les classes, comptes, sous-comptes et rubriques
    for (const classe of this._parametrageFinance()) {
      for (const compte of classe.comptes) {
        for (const sousCompte of compte.sousComptes) {
          const rubrique = sousCompte.rubriques.find(r => r.id === rubriqueId);
          if (rubrique) {
            return rubrique.realisations || [];
          }
        }
      }
    }
    return [];
  }
}
