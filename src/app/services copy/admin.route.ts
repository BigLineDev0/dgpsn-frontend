import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
    {path: '',loadChildren: () => import('./agent/agent.route').then((mod) => mod.AGENT_ROUTES)},
    {path: '',loadChildren: () => import('./alerte/alerte.route').then((mod) => mod.ALERTE_ROUTES)},
    {path: '',loadChildren: () => import('./conge/conge.route').then((mod) => mod.CONGE_ROUTES)},
];
