import { Routes } from '@angular/router';
import { ListAgentComponent } from './list-agent/list-agent.component';
import {ListOrdreMissionComponent} from "@/app/admin/ordre-mission/list-ordre-mission/list-ordre-mission.component";
import {ListDemandeComponent} from "@/app/admin/conge/demande-conge/list-demande/list-demande.component";
import {MainDemandeComponent} from "@/app/admin/conge/main-demande/main-demande.component";
import {
    ListeFormationExterieurComponent
} from "@/app/admin/serviceExterieur/formation/liste-formation-exterieur/liste-formation-exterieur.component";
import { GestionContratComponent } from './gestion-contrat/gestion-contrat.component';

export const AGENT_ROUTES: Routes = [
    {
        path: 'list-agents',
        component: ListAgentComponent,
        data: { title: "list-agents" }
    },


    {
        path: 'agent/mission',
        component: ListOrdreMissionComponent,
        data: { title: "list-ordre-mission" }
    },
    {
        path: 'agent/conge',
        component: MainDemandeComponent,
        data: { title: "list-conge" }
    },

    {
        path: 'agent/formation',
        component: ListeFormationExterieurComponent,
        data: { title: "list-formation-exterieur" }
    },
     {
        path: 'agent/contrat',
        component: GestionContratComponent,
        data: { title: "list-contrat" }
    },

];
