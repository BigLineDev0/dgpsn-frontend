import { Routes } from "@angular/router";
import { ConfigAlerteComponent } from "./config-alerte/config-alerte.component";
import { DetailsAlerteComponent } from "./details-alerte/details-alerte.component";
import { ListAlerteComponent } from "./list-alerte/list-alerte.component";
import { MainAlerteComponent } from "./main-alerte/main-alerte.component";

export const ALERTE_ROUTES: Routes = [
    { path: 'alerte', component: ConfigAlerteComponent },
  { path: 'main-alerte', component: MainAlerteComponent },
  { path: 'list-alerte', component: ListAlerteComponent },
  { path: 'config-alerte', component: ConfigAlerteComponent },
  { path: 'edit-alerte', component: ConfigAlerteComponent },
  { path: 'details-alerte', component: DetailsAlerteComponent }

    
];