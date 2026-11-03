import { Routes } from "@angular/router";
import { MainCourrierComponent } from "./main-courrier/main-courrier.component";
import { ListCourrierArriverComponent } from "./courrier-arriver/list-courrier-arriver/list-courrier-arriver.component";
import { ListCourrierDepartComponent } from "./courrier-depart/list-courrier-depart/list-courrier-depart.component";
import { ArchiveCourrierComponent } from "./archive-courrier/archive-courrier/archive-courrier.component";

export const COURRIER_ROUTES: Routes = [
  {
    path: "courrier",
    children: [
      {
        path: "",
        redirectTo: "main-courrier",
        pathMatch: "full",
      },
      {
        path: "main-courrier",
        component: MainCourrierComponent,
      },
      {
        path: "courrier-arriver",
        component: ListCourrierArriverComponent,
      },
      {
        path: "courrier-depart",
        component: ListCourrierDepartComponent,
      },
      {
        path: "courrier-archives",
        component: ArchiveCourrierComponent,
      },
    ],
  },
];
