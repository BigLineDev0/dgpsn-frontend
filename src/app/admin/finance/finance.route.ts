import { Routes } from '@angular/router';
import { MainBudgetComponent } from './budgets/main-budget/main-budget.component';
import { DetailsBudgetComponent } from './budgets/details-budget/details-budget.component';
import { RealisationBudgetComponent } from './budgets/details-budget/realisation-budget/realisation-budget.component';
import { ListeClasseComponent } from './parametrage/classe/liste-classe/liste-classe.component';
import { ListeCompteComponent } from './parametrage/compte/liste-compte/liste-compte.component';
import { ListeSousCompteComponent } from './parametrage/sous-compte/liste-sous-compte/liste-sous-compte.component';
import { ListeRubriqueComponent } from './parametrage/rubrique/liste-rubrique/liste-rubrique.component';
import { ListeRealisationComponent } from './parametrage/realisation/liste-realisation/liste-realisation.component';
import { EtatBudgetComponent } from './budgets/etat-budget/etat-budget.component';
import { ListeBonengagementComponent } from '../controle/bonengagement/liste-bonengagement/liste-bonengagement.component';
import {ObjectifPtbaComponent} from "@/app/admin/projet/composant-projet/objectif-ptba/objectif-ptba.component";

export const FINANCE_ROUTES: Routes = [
    {
      path: 'finance',
      children: [
        /**
         * Budgets
         */
        { path: 'budgets', component: MainBudgetComponent },
        { path: 'budgets/details/:budgetId', component: DetailsBudgetComponent },
        { path: 'budgets/realisation', component: RealisationBudgetComponent },
         { path: 'budgets/details/bonengagement/liste', component: ListeBonengagementComponent },
        /**
         * Parametres
         */
        {path : 'parametres', component : ListeClasseComponent},
        {path : 'parametres/classe/:classId/compte', component : ListeCompteComponent},
        {path : 'parametres/classe/sous-compte', component : ListeSousCompteComponent},
        {path : 'parametres/classe/rubrique', component : ListeRubriqueComponent},
        {path : 'parametres/classe/compte/realisation', component : ListeRealisationComponent},
        /**
         * Etat budget
         */
        {path : 'etat-budget', component : EtatBudgetComponent},
        { path: 'budgets/objectifs', component: ObjectifPtbaComponent },


      ],
    },
  ];

