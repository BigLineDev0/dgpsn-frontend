import { Routes } from '@angular/router';
import { ListComptesComponent } from './list-comptes/list-comptes.component';
import { AddCompteComponent } from './add-compte/add-compte.component';
import { ListOperationsComponent } from './list-operations/list-operations.component';
import { AddOperationComponent } from './add-operation/add-operation.component';
// import { SituationTresorerieComponent } from './situation-tresorerie/situation-tresorerie.component';

export const TRESORERIE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list-comptes',
    pathMatch: 'full'
  },
  {
    path: 'list-comptes',
    component: ListComptesComponent,
    data: { title: 'Liste des Comptes Bancaires' }
  },
  {
    path: 'add-compte',
    component: AddCompteComponent,
    data: { title: 'Nouveau Compte Bancaire' }
  },
  {
    path: 'list-operations',
    component: ListOperationsComponent,
    data: { title: 'Liste des Opérations' }
  },
  {
    path: 'add-operation',
    component: AddOperationComponent,
    data: { title: 'Nouvelle Opération' }
  }
];
