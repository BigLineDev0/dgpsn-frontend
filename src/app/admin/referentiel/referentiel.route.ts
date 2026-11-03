import { Routes } from "@angular/router";
import { ListAgentComponent } from "../agent/list-agent/list-agent.component";
import { ListCategoriebudgetaireComponent } from "./categoriebudgetaire/list-categoriebudgetaire/list-categoriebudgetaire.component";
import { ConfigLabelComponent } from "./config-label/config-label.component";
import { ListDepartementComponent } from "./departement/list-departement/list-departement.component";
import { ListDepenseComponent } from "./depense/list-depense/list-depense.component";
import { ListFormejuridiqueComponent } from "./formejuridique/list-formejuridique/list-formejuridique.component";
import { ListIndicateurComponent } from "./indicateur/list-indicateur/list-indicateur.component";
import { ListNaturedelarecetteComponent } from "./naturedelarecette/list-naturedelarecette/list-naturedelarecette.component";
import { ListNaturedepenseComponent } from "./naturedepense/list-naturedepense/list-naturedepense.component";
import { ListNatureSpecifiqueComponent } from "./natureSpecifique/list-nature-specifique/list-nature-specifique.component";
import { ListPeriodeComponent } from "./periode/list-periode/list-periode.component";
import { ListPeriodiciteComponent } from "./periodicite/list-periodicite/list-periodicite.component";
import { ListPlangeoComponent } from "./plan-geographique/list-plangeo/list-plangeo.component";
import { ListProcedurenominationComponent } from "./procedurenomination/list-procedurenomination/list-procedurenomination.component";
import { ReferentielComponent } from "./referentiel.component";
import { ListRisqueComponent } from "./risque/list-risque/list-risque.component";
import { ListeRoleComponent } from "./role/liste-role/liste-role.component";
import { ListSecteuractiviteComponent } from "./secteuractivite/list-secteuractivite/list-secteuractivite.component";
import { ListSousCategorieComponent } from "./sous-categorie/list-sous-categorie/list-sous-categorie.component";
import { ListSousSecteurComponent } from "./sous-secteur/list-sous-secteur/list-sous-secteur.component";
import { ListStatusComponent } from "./status/list-status/list-status.component";
import { ListStructureComponent } from "./structure/list-structure/list-structure.component";
import { ListTypeagComponent } from "./typeag/list-typeag/list-typeag.component";
import { ListTypedvaluationComponent } from "./typedvaluation/list-typedvaluation/list-typedvaluation.component";
import { ListTypeRequeteComponent } from "./typeRequete/list-type-requete/list-type-requete.component";
import { ListTypereunionComponent } from "./typereunion/list-typereunion/list-typereunion.component";
import { ListTypecontatComponent } from "./typecontrat/list-typecontat/list-typecontat.component";
import { ListCaracteristiqueComponent } from "./caracteristique/list-caracteristique/list-caracteristique.component";
import { TypeCaracteristqueComponent } from "../type-caracteristque/type-caracteristque.component";
import { ListCategorieDocumentComponent } from "./config-document-category/list-categorie-document/list-categorie-document.component";
import { ListReferentielDocumentComponent } from "./config-document-category/list-referentiel-document/list-referentiel-document.component";

export const REFERENTIEL_ROUTES: Routes = [
{
    path: 'referentiel',
    component: ReferentielComponent
  },
  {
    path: 'simple',
    component: ReferentielComponent
  },
  {
    path: 'config-label',
    component: ConfigLabelComponent
  },
  {
    path: 'indicateur',
    component: ListIndicateurComponent
  },
  {
    path: 'agent',
    component: ListAgentComponent

  },
  {
    path: 'role',
    component: ListeRoleComponent

  },
  {

    path: 'status',
    component: ListStatusComponent
  },
  {
    path: 'plan-geographique',
    component: ListPlangeoComponent
  },
  {
    path: 'structure',
    component: ListStructureComponent
  },
  {
    path: 'natureSpecifique',
    component: ListNatureSpecifiqueComponent
  },

  {
    path: 'sousCategorie',
    component: ListSousCategorieComponent
  },

  {
    path: 'sousSecteur',
    component: ListSousSecteurComponent
  },
  {
    path: 'depense',
    component: ListDepenseComponent
  },
  {
    path: 'requete',
    component: ListTypeRequeteComponent
  },
  {
    path: 'secteuractivite',
    component: ListSecteuractiviteComponent
  },
  {
    path: 'formejuridique',
    component: ListFormejuridiqueComponent
  },
  // {
  //   path: 'region',
  //   component: ListRegionComponent
  // },
  {
    path: 'departement',
    component: ListDepartementComponent
  },
  {
    path: 'typeag',
    component: ListTypeagComponent
  },
  {
    path: 'procedurenomination',
    component: ListProcedurenominationComponent
  },
  {
    path: 'typereunion',
    component: ListTypereunionComponent
  },
  {
    path: 'categoriebudgetaire',
    component: ListCategoriebudgetaireComponent
  },
  {
    path: 'periode',
    component: ListPeriodeComponent
  },
  {
    path: 'periodicite',
    component: ListPeriodiciteComponent
  },
  {
    path: 'naturedelarecette',
    component: ListNaturedelarecetteComponent
  },
  {
    path: 'naturedepense',
    component: ListNaturedepenseComponent
  },
  {
    path: 'typedvaluation',
    component: ListTypedvaluationComponent
  },
  {
    path: 'risque',
    component: ListRisqueComponent
  },
   {
    path: 'list-typecontat',
    component: ListTypecontatComponent
   },
    {
    path: 'list-caracteristique',
    component: ListCaracteristiqueComponent
   },

    {
    path: 'type-caracteristque',
    component: TypeCaracteristqueComponent
   },
  {
    path: 'categorie-document',
    component: ListCategorieDocumentComponent
  },
   {
    path: 'categorie',
    component: ListReferentielDocumentComponent
  },

];
