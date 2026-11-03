// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { ProjetRoutingModule } from './projet-routing.module';
// import { ProjetComponent } from './projet.component';
// import { FormProjetsComponent } from './form-projets/form-projets.component';
// import {
//   NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule,
//   NgbDropdownModule,
//   NgbNavModule,
//   NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule,
//   NgbTooltipModule
// } from "@ng-bootstrap/ng-bootstrap";
// import {MatIconModule} from "@angular/material/icon";
// import {FeatherIconModule} from "../../../core/feather-icon/feather-icon.module";
// import {MatTableModule} from "@angular/material/table";
// import {SpinnerModule} from "../../../util/spinner/spinner.module";
// import {MatMenuModule} from "@angular/material/menu";
// import {NgSelectModule} from "@ng-select/ng-select";
// import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import {MatStepperModule} from "@angular/material/stepper";
// import { ParametrageProjetComponent } from './parametrage-projet/parametrage-projet.component';
// import { ParamActiviteComponent } from './parametrage-projet/param-activite/param-activite.component';
// import { RoutingConfigProjetComponent } from './routimg-projet/routing-config-projet/routing-config-projet.component';
// import { ParamJalonProjetComponent } from './parametrage-projet/param-jalon-projet/param-jalon-projet.component';
// import { ParamUgpProjetComponent } from './parametrage-projet/param-ugp-projet/param-ugp-projet.component';
// import { DiagrammeGanttJalonProjetComponent } from './parametrage-projet/param-jalon-projet/diagramme-gantt-jalon-projet/diagramme-gantt-jalon-projet.component';
// import { ParamActeurProjetComponent } from './parametrage-projet/param-acteur-projet/param-acteur-projet.component';
// import { ParamIndicateurProjetComponent } from './parametrage-projet/param-indicateur-projet/param-indicateur-projet.component';
// import { ParamStructureTutelleProjetComponent } from './parametrage-projet/param-structure-tutelle-projet/param-structure-tutelle-projet.component';
// import { ParamStructureExecutionProjetComponent } from './parametrage-projet/param-structure-execution-projet/param-structure-execution-projet.component';
// import { ParamZoneInterventionProjetComponent } from './parametrage-projet/param-zone-intervention-projet/param-zone-intervention-projet.component';
// import { FormZoneInterventionProjetComponent } from './parametrage-projet/param-zone-intervention-projet/form-zone-intervention-projet/form-zone-intervention-projet.component';
// import { FormUgpProjetComponent } from './parametrage-projet/param-ugp-projet/form-ugp-projet/form-ugp-projet.component';
// import { FormStructureTutelleProjetComponent } from './parametrage-projet/param-structure-tutelle-projet/form-structure-tutelle-projet/form-structure-tutelle-projet.component';
// import { FormStructureExecutionProjetComponent } from './parametrage-projet/param-structure-execution-projet/form-structure-execution-projet/form-structure-execution-projet.component';
// import { FormJalonProjetComponent } from './parametrage-projet/param-jalon-projet/form-jalon-projet/form-jalon-projet.component';
// import { FormActeurProjetComponent } from './parametrage-projet/param-acteur-projet/form-acteur-projet/form-acteur-projet.component';
// import {ListboxModule} from "primeng/listbox";
// import { AvancementDetailleProjetComponent } from './avancement-detaille-projet/avancement-detaille-projet.component';
// import { AvancIndicateurProjetComponent } from './avancement-detaille-projet/avanc-indicateur-projet/avanc-indicateur-projet.component';
// import { AvancRisqueProjetComponent } from './avancement-detaille-projet/avanc-risque-projet/avanc-risque-projet.component';
// import { AvancProblemeProjetComponent } from './avancement-detaille-projet/avanc-probleme-projet/avanc-probleme-projet.component';
// import { AvancStatutProjetComponent } from './avancement-detaille-projet/avanc-statut-projet/avanc-statut-projet.component';
// import { AvancEtatProjetComponent } from './avancement-detaille-projet/avanc-etat-projet/avanc-etat-projet.component';
// import { AvancDocumentProjetComponent } from './avancement-detaille-projet/avanc-document-projet/avanc-document-projet.component';
// import { AvancMediathequeProjetComponent } from './avancement-detaille-projet/avanc-mediatheque-projet/avanc-mediatheque-projet.component';
// import { AvancMissionProjetComponent } from './avancement-detaille-projet/avanc-mission-projet/avanc-mission-projet.component';
// import { RoutingProjetComponent } from './routimg-projet/routing-projet.component';
// import { RoutingAvancementProjetComponent } from './routimg-projet/routing-avancement-projet/routing-avancement-projet.component';
// import { FormDocumentProjetComponent } from './avancement-detaille-projet/avanc-document-projet/form-document-projet/form-document-projet.component';
// import { FormEtatProjetComponent } from './avancement-detaille-projet/avanc-etat-projet/form-etat-projet/form-etat-projet.component';
// import { FormMissionProjetComponent } from './avancement-detaille-projet/avanc-mission-projet/form-mission-projet/form-mission-projet.component';
// import { FormProblemeProjetComponent } from './avancement-detaille-projet/avanc-probleme-projet/form-probleme-projet/form-probleme-projet.component';
// import { FormRisqueProjetComponent } from './avancement-detaille-projet/avanc-risque-projet/form-risque-projet/form-risque-projet.component';
// import { FormStatutProjetComponent } from './avancement-detaille-projet/avanc-statut-projet/form-statut-projet/form-statut-projet.component';
// import {
//   FormIndicateurAvancProjetComponent
// } from "./avancement-detaille-projet/avanc-indicateur-projet/form-indicateur-avanc-projet/form-indicateur-avanc-projet.component";
// import { ImageMediaProjetComponent } from './avancement-detaille-projet/avanc-mediatheque-projet/image-media-projet/image-media-projet.component';
// import { VideoMediaProjetComponent } from './avancement-detaille-projet/avanc-mediatheque-projet/video-media-projet/video-media-projet.component';
// import { FormImageProjetComponent } from './avancement-detaille-projet/avanc-mediatheque-projet/image-media-projet/form-image-projet/form-image-projet.component';
// import { FormVideoProjetComponent } from './avancement-detaille-projet/avanc-mediatheque-projet/video-media-projet/form-video-projet/form-video-projet.component';
// import { ReadVideoProjetComponent } from './avancement-detaille-projet/avanc-mediatheque-projet/video-media-projet/read-video-projet/read-video-projet.component';
// import { ReadImageProjetComponent } from './avancement-detaille-projet/avanc-mediatheque-projet/image-media-projet/read-image-projet/read-image-projet.component';
// import {PipeModule} from "../../../util/pipe/pipe.module";
// import {
// FormIndicateurProjetComponent
// } from "./parametrage-projet/param-indicateur-projet/form-indicateur-projet/form-indicateur-projet.component";
// import {NgGanttEditorModule} from "ng-gantt";
// import { AppelOffreProjetComponent } from './appel-offre-projet/appel-offre-projet.component';
// import { PlanPassationComponent } from './appel-offre-projet/plan-passation/plan-passation.component';
// import { LancementComponent } from './appel-offre-projet/lancement/lancement.component';
// import { ReceptionDossierComponent } from './appel-offre-projet/reception-dossier/reception-dossier.component';
// import { EvaluationDossierComponent } from './appel-offre-projet/evaluation-dossier/evaluation-dossier.component';
// import { AttributionMarcheComponent } from './appel-offre-projet/attribution-marche/attribution-marche.component';
// import { RoutingAppelOffreProjetComponent } from './routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';
// import { RoutingFinancementComponent } from './finacement-projet/routing-financement/routing-financement.component';
// import { BesoinComponent } from './finacement-projet/besoin-financement/besoin/besoin.component';
// import { BudgetComponent } from './finacement-projet/budget-global/budget/budget.component';
// import { ExecutionComponent } from './finacement-projet/execution-financement/execution/execution.component';
// import { MobilisationComponent } from './finacement-projet/mobilisation-financement/mobilisation/mobilisation.component';
// import { SourceComponent } from './finacement-projet/source-fincement/source/source.component';
// import { FormBesoinComponent } from './finacement-projet/besoin-financement/form-besoin/form-besoin.component';
// import { FormBugetComponent } from './finacement-projet/budget-global/form-buget/form-buget.component';
// import { FormExecutionComponent } from './finacement-projet/execution-financement/form-execution/form-execution.component';
// import { FormMobilisationComponent } from './finacement-projet/mobilisation-financement/form-mobilisation/form-mobilisation.component';
// import { FormSourceComponent } from './finacement-projet/source-fincement/form-source/form-source.component';
// import { FormPlanPassationProjetComponent } from './appel-offre-projet/plan-passation/form-plan-passation-projet/form-plan-passation-projet.component';
// import { FormReceptionDossierComponent } from './appel-offre-projet/reception-dossier/form-reception-dossier/form-reception-dossier.component';
// import { DocumentReceptionDossierComponent } from './appel-offre-projet/reception-dossier/document-reception-dossier/document-reception-dossier.component';
// import { FormLancementComponent } from './appel-offre-projet/lancement/form-lancement/form-lancement.component';
// import { FormCritereEvaluationComponent } from './appel-offre-projet/lancement/form-critere-evaluation/form-critere-evaluation.component';
// import { ListCritereEvaluationComponent } from './appel-offre-projet/lancement/list-critere-evaluation/list-critere-evaluation.component';
// import { RoutingAppelOffreSuiteLancementComponent } from './routimg-projet/routing-appel-offre-suite-lancement/routing-appel-offre-suite-lancement.component';

// import { DocumentComponent } from './finacement-projet/document/document/document.component';
// import { FormDocumentComponent } from './finacement-projet/document/form-document/form-document.component';
// import { PreselectionnerComponent } from './appel-offre-projet/preselectionner/preselectionner.component';
// import { FormPreselectionneComponent } from './appel-offre-projet/preselectionner/form-preselectionne/form-preselectionne.component';
// import {MatCheckboxModule} from "@angular/material/checkbox";
// import { AvancVisionPerformanceProjetComponent } from './avancement-detaille-projet/avanc-vision-performance-projet/avanc-vision-performance-projet.component';
// import { FormVisionPerformanceProjetComponent } from './avancement-detaille-projet/avanc-vision-performance-projet/form-vision-performance-projet/form-vision-performance-projet.component';
// import { ListImpactAttenduProjetComponent } from './avancement-detaille-projet/avanc-vision-performance-projet/list-impact-attendu-projet/list-impact-attendu-projet.component';
// import { FormImpactAttenduProjetComponent } from './avancement-detaille-projet/avanc-vision-performance-projet/form-impact-attendu-projet/form-impact-attendu-projet.component';
// import { ListObjectifProjetComponent } from './avancement-detaille-projet/avanc-vision-performance-projet/list-objectif-projet/list-objectif-projet.component';
// import { FormObjectifProjetComponent } from './avancement-detaille-projet/avanc-vision-performance-projet/form-objectif-projet/form-objectif-projet.component';
// import {DocumentPdfComponent} from "./document-pdf/document-pdf.component";
// import {FicheSyntheseComponent} from "./fiche-synthese/fiche-synthese.component";
// import { ParamPartenaireProjetComponent } from './parametrage-projet/param-partenaire-projet/param-partenaire-projet.component';
// import { FormPartenaireProjetComponent } from './parametrage-projet/param-partenaire-projet/form-partenaire-projet/form-partenaire-projet.component';
// import { EsgProjetComponent } from './esg-projet/esg-projet.component';
// import { EnvironnementalProjetComponent } from './esg-projet/environnemental-projet/environnemental-projet.component';
// import { SocialProjetComponent } from './esg-projet/social-projet/social-projet.component';
// import { GouvernanceProjetComponent } from './esg-projet/gouvernance-projet/gouvernance-projet.component';
// import { RoutingEsgProjetComponent } from './routimg-projet/routing-esg-projet/routing-esg-projet.component';
// import { ListeImpactsEnvirProjetComponent } from './esg-projet/environnemental-projet/impact-envir-projet/liste-impacts-envir-projet/liste-impacts-envir-projet.component';
// import { FormImpactsEnvirProjetComponent } from './esg-projet/environnemental-projet/impact-envir-projet/form-impacts-envir-projet/form-impacts-envir-projet.component';
// import { FormIndicateurEnvirProjetComponent } from './esg-projet/environnemental-projet/indicateur-envir-projet/form-indicateur-envir-projet/form-indicateur-envir-projet.component';
// import { ListeIndicateurEnvirProjetComponent } from './esg-projet/environnemental-projet/indicateur-envir-projet/liste-indicateur-envir-projet/liste-indicateur-envir-projet.component';
// import { ListeConformitesEnvirProjetComponent } from './esg-projet/environnemental-projet/conformites-envir-projet/liste-conformites-envir-projet/liste-conformites-envir-projet.component';
// import { FormConformitesEnvirProjetComponent } from './esg-projet/environnemental-projet/conformites-envir-projet/form-conformites-envir-projet/form-conformites-envir-projet.component';
// import { ListeImpactSocialProjetComponent } from './esg-projet/social-projet/impact-social-projet/liste-impact-social-projet/liste-impact-social-projet.component';
// import { FormImpactSocialProjetComponent } from './esg-projet/social-projet/impact-social-projet/form-impact-social-projet/form-impact-social-projet.component';
// import { FormIndicateurSocialProjetComponent } from './esg-projet/social-projet/indicateur-social-projet/form-indicateur-social-projet/form-indicateur-social-projet.component';
// import { ListeIndicateurSocialProjetComponent } from './esg-projet/social-projet/indicateur-social-projet/liste-indicateur-social-projet/liste-indicateur-social-projet.component';
// import { ListeConformitesSocialProjetComponent } from './esg-projet/social-projet/conformites-social-projet/liste-conformites-social-projet/liste-conformites-social-projet.component';
// import { FormConformitesSocialProjetComponent } from './esg-projet/social-projet/conformites-social-projet/form-conformites-social-projet/form-conformites-social-projet.component';
// import { ListeImpactsGouvProjetComponent } from './esg-projet/gouvernance-projet/impact-gouvernance-projet/liste-impacts-gouv-projet/liste-impacts-gouv-projet.component';
// import { FormImpactsGouvProjetComponent } from './esg-projet/gouvernance-projet/impact-gouvernance-projet/form-impacts-gouv-projet/form-impacts-gouv-projet.component';
// import { ListeIndicateurGouvProjetComponent } from './esg-projet/gouvernance-projet/indicateur-gouvernance-projet/liste-indicateur-gouv-projet/liste-indicateur-gouv-projet.component';
// import { FormIndicateurGouvProjetComponent } from './esg-projet/gouvernance-projet/indicateur-gouvernance-projet/form-indicateur-gouv-projet/form-indicateur-gouv-projet.component';
// import { FormConformitesGouvProjetComponent } from './esg-projet/gouvernance-projet/conformites-gouvernance-projet/form-conformites-gouv-projet/form-conformites-gouv-projet.component';
// import { ListeConformitesGouvProjetComponent } from './esg-projet/gouvernance-projet/conformites-gouvernance-projet/liste-conformites-gouv-projet/liste-conformites-gouv-projet.component';
// import {ProgrammeModule} from "../programme/programme.module";
// import { DocumentsProjetComponent } from './documents-projet/documents-projet.component';
// import {NgApexchartsModule} from "ng-apexcharts";
// import { ListMissionComponent } from './avancement-detaille-projet/avanc-mission-projet/recomandation-mission/list-mission/list-mission.component';
// import { FormMissionComponent } from './avancement-detaille-projet/avanc-mission-projet/recomandation-mission/form-mission/form-mission.component';
// import { DocumentModule } from '../document/document.module';
// import { FormProjetEntrepriseComponent } from './projet-entreprise/form-projet-entreprise/form-projet-entreprise.component';
// import { ListProjetEntrepriseComponent } from './projet-entreprise/list-projet-entreprise/list-projet-entreprise.component';
// import { SourceDeDonneesComponent } from './finacement-projet/budget-global/source-de-donnees/source-de-donnees.component';
// import {MatRippleModule} from "@angular/material/core";
// import {
//   SourceDeDonneesAvancComponent
// } from "./avancement-detaille-projet/source-de-donnees-avanc/source-de-donnees-avanc.component";
// import { TdbProjetSepecifiqueModule } from '../dashboard/tdb-projet-sepecifique/tdb-projet-sepecifique.module';
// import { HasAnyAuthorityDirective } from '../has-any-authority/has-any-authority.module';
// import {
//   ListEvaluationActeurProjetComponent
// } from "./parametrage-projet/param-acteur-projet/evaluation-acteur-projet/list-evaluation-acteur/list-evaluation-acteur-projet.component";
// import {
//   InfosActeurModalProjetComponent
// } from "./parametrage-projet/param-acteur-projet/evaluation-acteur-projet/infos-acteur-modal/infos-acteur-modal-projet.component";
// import {
//   FormActeurEvaluationProjetComponent
// } from "./parametrage-projet/param-acteur-projet/evaluation-acteur-projet/form-acteur-evaluation/form-acteur-evaluation-projet.component";
// import { UploadImageProjetComponent } from './upload-image-projet/upload-image-projet.component';
// import { FoncierePubliqueModule } from '../fonciere-publique/fonciere-publique.module';
// import { ListParamComposantComponent } from './parametrage-projet/param-composant/list-param-composant/list-param-composant.component';
// import { FormParamComposantComponent } from './parametrage-projet/param-composant/form-param-composant/form-param-composant.component';
// import { AvancFinancementComponent } from './avancement-detaille-projet/avanc-financement/avanc-financement/avanc-financement.component';
// import { ComposantProjetComponent } from './composant-projet/composant-projet/composant-projet.component';
// import {MatTreeModule} from "@angular/material/tree";
// import {MatListModule} from "@angular/material/list";
// import {MatTooltipModule} from "@angular/material/tooltip";
// import {MatButtonModule} from "@angular/material/button";
// import {FormComposantComponent} from "./composant-projet/form-composant/form-composant.component";
// import {ProjetActionsComponent} from "./composant-projet/composant-actions/projet-actions.component";
// import { FormBudgetComponent } from './composant-projet/budget/form-budget/form-budget.component';
// import { ListeBudgetComponent } from './composant-projet/budget/liste-budget/liste-budget.component';
// import { ListeDepenseComponent } from './composant-projet/depense/liste-depense/liste-depense.component';
// import { FormDepenseComponent } from './composant-projet/depense/form-depense/form-depense.component';
// import { FormResultatComponent } from './composant-projet/form-resultat/form-resultat/form-resultat.component';
// import { FormProduitComponent } from './composant-projet/form-produit/form-produit/form-produit.component';
// import { FormActiviteComponent } from './composant-projet/form-activite/form-activite/form-activite.component';
// import { FianancmentGlobalComponent } from './avancement-detaille-projet/fianancment-global/fianancment-global.component';

// @NgModule({
//   declarations: [
//     ProjetComponent,
//     FormProjetsComponent,
//     ParametrageProjetComponent,
//     ParamActiviteComponent,
//     RoutingConfigProjetComponent,
//     ParamJalonProjetComponent,
//     ParamUgpProjetComponent,
//     DiagrammeGanttJalonProjetComponent,
//     ParamActeurProjetComponent,
//     ParamIndicateurProjetComponent,
//     ParamStructureTutelleProjetComponent,
//     ParamStructureExecutionProjetComponent,
//     ParamZoneInterventionProjetComponent,
//     FormZoneInterventionProjetComponent,
//     FormUgpProjetComponent,
//     FormStructureTutelleProjetComponent,
//     FormStructureExecutionProjetComponent,
//     FormJalonProjetComponent,
//     FormIndicateurProjetComponent,
//     FormActeurProjetComponent,
//     AvancementDetailleProjetComponent,
//     AvancIndicateurProjetComponent,
//     AvancRisqueProjetComponent,
//     AvancProblemeProjetComponent,
//     AvancStatutProjetComponent,
//     AvancEtatProjetComponent,
//     AvancDocumentProjetComponent,
//     AvancMediathequeProjetComponent,
//     AvancMissionProjetComponent,
//     RoutingProjetComponent,
//     RoutingAvancementProjetComponent,
//     FormDocumentProjetComponent,
//     FormEtatProjetComponent,
//     FormMissionProjetComponent,
//     FormProblemeProjetComponent,
//     FormRisqueProjetComponent,
//     FormStatutProjetComponent,
//     ImageMediaProjetComponent,
//     VideoMediaProjetComponent,
//     FormImageProjetComponent,
//     FormVideoProjetComponent,
//     ReadVideoProjetComponent,
//     ReadImageProjetComponent,
//     FormIndicateurAvancProjetComponent,
//     AppelOffreProjetComponent,
//     PlanPassationComponent,
//     LancementComponent,
//     ReceptionDossierComponent,
//     EvaluationDossierComponent,
//     AttributionMarcheComponent,
//     RoutingAppelOffreProjetComponent,
//     RoutingFinancementComponent,
//     BesoinComponent,
//     FormBesoinComponent,
//     BudgetComponent,
//     FormBugetComponent,
//     ExecutionComponent,
//     FormExecutionComponent,
//     MobilisationComponent,
//     FormMobilisationComponent,
//     FormSourceComponent,
//     SourceComponent,
//     FormPlanPassationProjetComponent,
//     FormReceptionDossierComponent,
//     DocumentReceptionDossierComponent,
//     FormLancementComponent,
//     FormCritereEvaluationComponent,
//     ListCritereEvaluationComponent,
//     RoutingAppelOffreSuiteLancementComponent,
//     DocumentComponent,
//     FormDocumentComponent,
//     PreselectionnerComponent,
//     FormPreselectionneComponent,
//     AvancVisionPerformanceProjetComponent,
//     FormVisionPerformanceProjetComponent,
//     ListImpactAttenduProjetComponent,
//     FormImpactAttenduProjetComponent,
//     ListObjectifProjetComponent,
//     FormObjectifProjetComponent,
//     DocumentPdfComponent,
//     FicheSyntheseComponent,
//     ParamPartenaireProjetComponent,
//     FormPartenaireProjetComponent,
//     EsgProjetComponent,
//     EnvironnementalProjetComponent,
//     SocialProjetComponent,
//     GouvernanceProjetComponent,
//     RoutingEsgProjetComponent,
//     ListeImpactsEnvirProjetComponent,
//     FormImpactsEnvirProjetComponent,
//     FormIndicateurEnvirProjetComponent,
//     ListeIndicateurEnvirProjetComponent,
//     ListeConformitesEnvirProjetComponent,
//     FormConformitesEnvirProjetComponent,
//     ListeImpactSocialProjetComponent,
//     FormImpactSocialProjetComponent,
//     FormIndicateurSocialProjetComponent,
//     ListeIndicateurSocialProjetComponent,
//     ListeConformitesSocialProjetComponent,
//     FormConformitesSocialProjetComponent,
//     ListeImpactsGouvProjetComponent,
//     FormImpactsGouvProjetComponent,
//     ListeIndicateurGouvProjetComponent,
//     FormIndicateurGouvProjetComponent,
//     FormConformitesGouvProjetComponent,
//     ListeConformitesGouvProjetComponent,
//     DocumentsProjetComponent,
//     ListMissionComponent,
//     FormMissionComponent,
//     FormProjetEntrepriseComponent,
//     ListProjetEntrepriseComponent,
//     SourceDeDonneesComponent,
//     SourceDeDonneesAvancComponent,
//     ListEvaluationActeurProjetComponent,
//     InfosActeurModalProjetComponent,
//     FormActeurEvaluationProjetComponent,
//     UploadImageProjetComponent,
//     ListParamComposantComponent,
//     FormParamComposantComponent,
//     AvancFinancementComponent,
//     ComposantProjetComponent,
//     FormComposantComponent,
//     ProjetActionsComponent,
//     FormBudgetComponent,
//     ListeBudgetComponent,
//     ListeDepenseComponent,
//     FormDepenseComponent,
//     FormResultatComponent,
//     FormProduitComponent,
//     FormActiviteComponent,
//     FianancmentGlobalComponent

//   ],
//   imports: [
//     CommonModule,
//     ProjetRoutingModule,
//     NgbTooltipModule,
//     NgbDropdownModule,
//     MatIconModule,
//     FeatherIconModule,
//     NgbTooltipModule,
//     MatTableModule,
//     SpinnerModule,
//     NgbPaginationModule,
//     MatMenuModule,
//     NgbAccordionModule,
//     NgSelectModule,
//     ReactiveFormsModule,
//     MatStepperModule,
//     NgbNavModule,
//     NgbProgressbarModule,
//     ListboxModule,
//     FormsModule,
//     PipeModule,
//     NgbCarouselModule,
//     NgGanttEditorModule,
//     NgbTimepickerModule,
//     NgbPopoverModule,
//     NgbDatepickerModule,
//     MatCheckboxModule,
//     ProgrammeModule,
//     NgApexchartsModule,
//     DocumentModule,
//     MatRippleModule,
//     HasAnyAuthorityDirective,
//     TdbProjetSepecifiqueModule,
//     FoncierePubliqueModule,
//     MatTreeModule,
//     MatListModule,
//     MatTooltipModule,
//     MatButtonModule
//   ],
//   exports:[
//     FicheSyntheseComponent
//   ]
// })
// export class ProjetModule { }
