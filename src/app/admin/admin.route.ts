import { Routes } from "@angular/router";
import {ORGANIGRAMME_ROUTES} from "@/app/admin/organigramme/organigramme.routes";
import {PtbaContainerComponent} from "@/app/admin/projet/main-ptba/ptba-container/ptba-container.component";

export const ADMIN_ROUTES: Routes = [

    {path: '', loadChildren: () => import('./agent/agent.route').then((mod) => mod.AGENT_ROUTES)},
    {path: '', loadChildren: () => import('./alerte/alerte.route').then((mod) => mod.ALERTE_ROUTES)},
    {path: '', loadChildren: () => import('./conge/conge.route').then((mod) => mod.CONGE_ROUTES)},
    {path: '', loadChildren: () => import('./projet/projet.routes').then((mod) => mod.PROJECT_ROUTES)},
    {path: '', loadChildren: () => import('./serviceExterieur/service-exterieur-route').then((mod) => mod.SERVICES_EXTERIEUR_ROUTES)},
    {path: '', loadChildren: () => import('./finance/finance.route').then((mod) => mod.FINANCE_ROUTES)},
    {path: "", loadChildren: () => import("./dashbord/dashbord.route").then((mod) => mod.DASHBORD_ROUTES),},
    {path: '', loadChildren: () => import('./document/document.route').then((mod) => mod.DOCUMENT_ROUTES)},
    {path: '', loadChildren: () => import('./controle/controle.route').then((mod) => mod.CONTROLE_ROUTES)},
    {path: '', loadChildren: () => import('./document/document.route').then((mod) => mod.DOCUMENT_ROUTES)},
    {path: '', loadChildren: () => import('./ordre-mission/ordre-mission.route').then((mod) => mod.ORDRE_MISSION_ROUTES)},
    {path: '', loadChildren: () => import('./workflow/work-flow.route').then((mod) => mod.WORK_FLOW_ROUTES)},
    {path: '', loadChildren: () => import('./referentiel/cadrelogiques/cadrelogiques.routes').then((mod) => mod.CADRE_LOGIQUE)},
    {path: '', loadChildren: () => import('./referentiel/referentiel.route').then((mod) => mod.REFERENTIEL_ROUTES)},
    {path: 'recrutement', loadChildren: () => import('./recrutement/recrutement.route').then((mod) => mod.RECRUTEMENT_ROUTES)},
    {path: '', loadChildren: () => import('./report/report.route').then((mod) => mod.REPORT_ROUTES)},
    {path: "", loadChildren: () => import("./courrier/courrier.route").then((mod) => mod.COURRIER_ROUTES)},
    {path: "", loadChildren: () => import("./organigramme/organigramme.routes").then((mod) => mod.ORGANIGRAMME_ROUTES)},
    {path: '', loadChildren: () => import('./fournisseur/fournisseur.route').then((mod) => mod.FOURNISSEUR_ROUTES)},
    {path: 'ptba', component: PtbaContainerComponent}
];
