// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { ProjetComponent } from './projet.component';
// import {ParametrageProjetComponent} from "./parametrage-projet/parametrage-projet.component";
// import {ParamUgpProjetComponent} from "./parametrage-projet/param-ugp-projet/param-ugp-projet.component";
// import {ParamJalonProjetComponent} from "./parametrage-projet/param-jalon-projet/param-jalon-projet.component";
// // import {ParamZoneInterventionProjetComponent} from "./parametrage-projet/param-zone-intervention-projet/param-zone-intervention-projet.component";
// import {
//   ParamStructureTutelleProjetComponent
// } from "./parametrage-projet/param-structure-tutelle-projet/param-structure-tutelle-projet.component";
// import {
//   ParamStructureExecutionProjetComponent
// } from "./parametrage-projet/param-structure-execution-projet/param-structure-execution-projet.component";
// import {
//   ParamIndicateurProjetComponent
// } from "./parametrage-projet/param-indicateur-projet/param-indicateur-projet.component";
// import {
//   AvancIndicateurProjetComponent
// } from "./avancement-detaille-projet/avanc-indicateur-projet/avanc-indicateur-projet.component";
// import {
//   AvancDocumentProjetComponent
// } from "./avancement-detaille-projet/avanc-document-projet/avanc-document-projet.component";
// import {AvancEtatProjetComponent} from "./avancement-detaille-projet/avanc-etat-projet/avanc-etat-projet.component";
// import {
//   AvancMediathequeProjetComponent
// } from "./avancement-detaille-projet/avanc-mediatheque-projet/avanc-mediatheque-projet.component";
// import {
//   AvancMissionProjetComponent
// } from "./avancement-detaille-projet/avanc-mission-projet/avanc-mission-projet.component";
// import {
//   AvancProblemeProjetComponent
// } from "./avancement-detaille-projet/avanc-probleme-projet/avanc-probleme-projet.component";
// import {
//   AvancStatutProjetComponent
// } from "./avancement-detaille-projet/avanc-statut-projet/avanc-statut-projet.component";
// import {
//   AvancRisqueProjetComponent
// } from "./avancement-detaille-projet/avanc-risque-projet/avanc-risque-projet.component";
// // import { DiagrammeGanttJalonProjetComponent } from './parametrage-projet/param-jalon-projet/diagramme-gantt-jalon-projet/diagramme-gantt-jalon-projet.component';
// import {AppelOffreProjetComponent} from "./appel-offre-projet/appel-offre-projet.component";

// import { BudgetComponent } from './finacement-projet/budget-global/budget/budget.component';
// import { SourceComponent } from './finacement-projet/source-fincement/source/source.component';
// import { BesoinComponent } from './finacement-projet/besoin-financement/besoin/besoin.component';
// import { MobilisationComponent } from './finacement-projet/mobilisation-financement/mobilisation/mobilisation.component';
// import { ExecutionComponent } from './finacement-projet/execution-financement/execution/execution.component';

// import {PlanPassationComponent} from "./appel-offre-projet/plan-passation/plan-passation.component";
// import {LancementComponent} from "./appel-offre-projet/lancement/lancement.component";
// import {ReceptionDossierComponent} from "./appel-offre-projet/reception-dossier/reception-dossier.component";
// import {EvaluationDossierComponent} from "./appel-offre-projet/evaluation-dossier/evaluation-dossier.component";
// import {AttributionMarcheComponent} from "./appel-offre-projet/attribution-marche/attribution-marche.component";
// import { ListCritereEvaluationComponent } from './appel-offre-projet/lancement/list-critere-evaluation/list-critere-evaluation.component';
// import { DocumentComponent } from './finacement-projet/document/document/document.component';
// import {PreselectionnerComponent} from "./appel-offre-projet/preselectionner/preselectionner.component";
// import {
//   AvancVisionPerformanceProjetComponent
// } from "./avancement-detaille-projet/avanc-vision-performance-projet/avanc-vision-performance-projet.component";
// import {
//   ParamPartenaireProjetComponent
// } from "./parametrage-projet/param-partenaire-projet/param-partenaire-projet.component";
// import {EnvironnementalProjetComponent} from "./esg-projet/environnemental-projet/environnemental-projet.component";
// import {SocialProjetComponent} from "./esg-projet/social-projet/social-projet.component";
// import {GouvernanceProjetComponent} from "./esg-projet/gouvernance-projet/gouvernance-projet.component";
// import { ListMissionComponent } from './avancement-detaille-projet/avanc-mission-projet/recomandation-mission/list-mission/list-mission.component';
// import {
//   ListEvaluationActeurProjetComponent
// } from "./parametrage-projet/param-acteur-projet/evaluation-acteur-projet/list-evaluation-acteur/list-evaluation-acteur-projet.component";
// import {
//   ListParamComposantComponent
// } from "./parametrage-projet/param-composant/list-param-composant/list-param-composant.component";
// import {
//   AvancFinancementComponent
// } from "./avancement-detaille-projet/avanc-financement/avanc-financement/avanc-financement.component";
// import {ComposantProjetComponent} from "./composant-projet/composant-projet/composant-projet.component";



// const routes: Routes = [
//   { path: '', component: ProjetComponent },
//   { path: 'list', component: ProjetComponent },
//   { path: 'byprogramme/:id', component: ProjetComponent },
//   { path: 'parametrage', component: ParametrageProjetComponent },
//   { path: 'parametrage/ugp', component: ParamUgpProjetComponent },
//   { path: 'parametrage/jalons', component: ParamJalonProjetComponent },
//   // { path: 'parametrage/zone-intervention', component: ParamZoneInterventionProjetComponent },
//   { path: 'parametrage/structure-tutelle', component: ParamStructureTutelleProjetComponent },
//   { path: 'parametrage/structure-execution', component: ParamStructureExecutionProjetComponent },
//   { path: 'parametrage/indicateur', component: ParamIndicateurProjetComponent },
//   { path: 'parametrage/acteur', component: ParamActeurProjetComponent },
//   { path: 'parametrage/acteur/evaluation', component: ListEvaluationActeurProjetComponent },
//   { path: 'parametrage/partenaires', component: ParamPartenaireProjetComponent },
//   { path: 'parametrage/composant', component: ListParamComposantComponent },
//   { path: 'avancement-detaille/indicateur', component: AvancIndicateurProjetComponent },
//   { path: 'avancement-detaille/document', component: AvancDocumentProjetComponent },
//   { path: 'avancement-detaille/etat', component: AvancEtatProjetComponent },
//   { path: 'avancement-detaille/mediatheque', component: AvancMediathequeProjetComponent },
//   { path: 'avancement-detaille/mission', component: AvancMissionProjetComponent},
//   { path: 'avancement-detaille/probleme', component: AvancProblemeProjetComponent},
//   { path: 'avancement-detaille/statut', component: AvancStatutProjetComponent},
//   { path: 'avancement-detaille/risque', component: AvancRisqueProjetComponent},
//   { path: 'avancement-detaille/vision-performance', component: AvancVisionPerformanceProjetComponent},
//   {path: 'composant', component: ComposantProjetComponent},
//   // { path: 'avancement-detaille/financement', component: AvancFinancementComponent},
//   { path: 'appel-offre', component: AppelOffreProjetComponent},
//   {path: 'recomandation-mission', component:ListMissionComponent},
//   {path: 'recomandation-probleme', component:ListMissionComponent},
//   { path: 'budget-config', component: BudgetComponent},
//   { path: 'source-config', component: SourceComponent},
//   { path: 'besoin-config', component: BesoinComponent},
//   { path: 'mobilisation-config', component: MobilisationComponent},
//   { path: 'execution-config', component: ExecutionComponent},
//   { path: 'document-config', component: DocumentComponent},
//   { path: 'appel-offre/plan-de-passation', component: PlanPassationComponent},
//   { path: 'appel-offre/plan-de-passation/marches', component: LancementComponent},
//   { path: 'appel-offre/plan-de-passation/marches/preselectionne', component: PreselectionnerComponent},
//   { path: 'appel-offre/plan-de-passation/marches/reception-dossier', component: ReceptionDossierComponent},
//   { path: 'appel-offre/evaluation-dossier', component: EvaluationDossierComponent},
//   { path: 'appel-offre/atribution-marche', component: AttributionMarcheComponent},
//   { path: 'appel-offre/plan-de-passation/marches/critere-evaluation', component: ListCritereEvaluationComponent},
//   { path: 'esg/environnemental', component: EnvironnementalProjetComponent},
//   { path: 'esg/social', component: SocialProjetComponent},
//   { path: 'esg/gouvernance', component: GouvernanceProjetComponent},
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class ProjetRoutingModule { }
