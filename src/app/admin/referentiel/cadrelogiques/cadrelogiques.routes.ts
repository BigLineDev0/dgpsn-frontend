import { Routes } from "@angular/router";
import { ListCadrelogiqueComponent } from "./list-cadrelogique/list-cadrelogique.component";

export const CADRE_LOGIQUE: Routes = [
  {
    path: '',
    component: ListCadrelogiqueComponent
  },
  {
    path: 'cadrelogique',
    component: ListCadrelogiqueComponent
  },

]

