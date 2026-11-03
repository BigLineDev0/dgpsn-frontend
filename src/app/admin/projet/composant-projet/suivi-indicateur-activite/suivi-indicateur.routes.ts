import {Routes} from '@angular/router';
import {
    SuiviIndicateurActiviteComponent
} from "@/app/admin/projet/composant-projet/suivi-indicateur-activite/suivi-indicateur-activite.component";
import {
    ListeTacheComponent
} from "@/app/admin/projet/composant-projet/suivi-indicateur-activite/tache-indicateur/liste-tache/liste-tache.component";
import {
    ListSourceFinancementComponent
} from "@/app/admin/projet/composant-projet/suivi-indicateur-activite/source-financement-indicateur/list-source-financement/list-source-financement.component";
import {
    ListExecutionComponent
} from "@/app/admin/projet/composant-projet/suivi-indicateur-activite/execution-indicateur/list-execution/list-execution.component";

export const SUIVI_INDICATEUR_ROUTES: Routes = [
    { path: '', component: ListeTacheComponent },
    { path: 'tache', component: ListeTacheComponent },
    { path: 'source-financement', component: ListSourceFinancementComponent },
    { path: 'execution', component: ListExecutionComponent },

];
