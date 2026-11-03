import { Routes } from "@angular/router";

export const PUBLIC_ROUTE: Routes = [
    {
        path: "recrutement",
        loadChildren: () =>
            import("./recrutement/recrutement.route").then((mod) => mod.RECRUTEMENT_ROUTES),
    },
    {
        path: "candidature",
        loadChildren: () =>
            import("./candidature/candidature.route").then((mod) => mod.CANDIDATURE_ROUTES),
    },
];
