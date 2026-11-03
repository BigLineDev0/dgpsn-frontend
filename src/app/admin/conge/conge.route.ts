import { Routes } from "@angular/router";
import { MainDemandeComponent } from "./main-demande/main-demande.component";
import { ListDemandeComponent } from "./demande-conge/list-demande/list-demande.component";
import { ListCessationComponent } from "./cessation/list-cessation/list-cessation.component";

export const CONGE_ROUTES: Routes = [
    {
        path: 'list-conge',
        component: MainDemandeComponent,
        data: { title: "list-conge" }
    },
      {
        path: 'demande-conge',
        component: MainDemandeComponent,
        data: { title: "demande-conge" }
    },
      {path: 'prise-service', component: ListCessationComponent,
        data: { title: "prise-service" }
      },
    
];