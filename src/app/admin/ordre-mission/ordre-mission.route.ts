import { Routes } from '@angular/router';
import {ListOrdreMissionComponent} from "@/app/admin/ordre-mission/list-ordre-mission/list-ordre-mission.component";
import { AgentOrdreMissionComponent } from './agent-ordre-mission/agent-ordre-mission.component';

export const ORDRE_MISSION_ROUTES: Routes = [
    {
        path: 'ordre-mission',
        component: ListOrdreMissionComponent,
        data: { title: "Ordre de mission" }
    },
    {
        path: 'agent-ordre-mission',
        component: AgentOrdreMissionComponent,
        data: { title: "Ordre de mission" }
    },
];
