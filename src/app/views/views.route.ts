import {Routes} from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

export const VIEWS_ROUTES: Routes = [
    {
        path: 'auth',
        component: LoginComponent,
        data: {title: "Accueil"}

    },
    // {
    //     path: '',
    //     loadChildren: () => import('./demarche-administrative/demarche-administrative.route').then((mod) => mod.DEMARCHES_ADMINISTRATIVES_ROUTES),
    // },
    /////rjrjkj
    // {
    //     path: '',
    //     loadChildren: () => import('./base-juridique/base-juridique.route').then((mod) => mod.BASE_JURIDIQUE_ROUTES),
    // },
    // {
    //     path: '',
    //     loadChildren: () => import('./annuaire-juridique/annuaire-juridique.route').then((mod) => mod.ANNUAIRE_JURIDIQUE_ROUTES),
    // },
    // {
    //     path: '',
    //     loadChildren: () => import('./acces-au-droit/acces-au-droit.route').then((mod) => mod.ACCES_AU_DROIT_ROUTES),
    // },
    // {
    //     path: '',
    //     loadChildren: () =>
    //         import('./services/services.route').then((mod) => mod.SERVICES_ROUTES),
    // },
    // {
    //     path: '',
    //     loadChildren: () =>
    //         import('./blogs/blogs.route').then((mod) => mod.BLOGS_ROUTES),
    // },
    // {
    //     path: '',
    //     loadChildren: () =>
    //         import('./case-studies/case-studies.route').then((mod) => mod.CASE_STUDIES_ROUTES),
    // },
    // {
    //     path: '',
    //     loadChildren: () =>
    //         import('./other-pages/other-pages.route').then((mod) => mod.OTHER_PAGES_ROUTES),
    // },
];
