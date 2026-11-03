// import { registerLocaleData } from '@angular/common';
// import { Routes } from '@angular/router';
// import { BaseComponent } from '@layouts/admin-layout/base/base.component';
// import localeFr from '@angular/common/locales/fr';
// import { LoginComponent } from '@views/auth/login/login.component';
// import { DepenseListComponent } from './admin/finance/depense-list/depense-list.component';
// // import { DepenseFormComponent } from './admin/finance/depense-form/depense-form.component';

import { registerLocaleData } from "@angular/common";
import { Routes } from "@angular/router";
import { BaseComponent } from "@layouts/admin-layout/base/base.component";
import localeFr from "@angular/common/locales/fr";

registerLocaleData(localeFr);

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/auth",
        pathMatch: "full",
    },
    {
        path: "auth",
        loadChildren: () => import("./views/auth/auth.routes"),
    },
    {
        path: "public",
        loadChildren: () =>
            import("./public/public.route").then((mod) => mod.PUBLIC_ROUTE),
    },
    {
        path: "admin",
        component: BaseComponent,
        // canActivateChild: [authGuard],
        children: [
            {
                path: "acces",
                loadChildren: () =>
                    import("./admin/admin.route").then((mod) => mod.ADMIN_ROUTES),
            },
            {
                path: "securite",
                loadChildren: () =>
                    import("./views/pages/securite/securite.route").then(
                        (mod) => mod.SECURITE_ROUTES
                    ),
            },
        ],
    },
];

