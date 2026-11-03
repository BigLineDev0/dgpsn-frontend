import { Routes } from '@angular/router';
import { MainOrganigrammeComponent } from './main-organigramme/main-organigramme.component';

export const ORGANIGRAMME_ROUTES: Routes = [
  {
    path: 'organigramme',
    component: MainOrganigrammeComponent,
    title: 'Organigramme'
  }
];
