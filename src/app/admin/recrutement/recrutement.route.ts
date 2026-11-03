import { Routes } from "@angular/router";
import { ListeRecrutementComponent } from "./liste-recrutement/liste-recrutement.component";
import { MainSuiviRecrutementComponent } from "./suivi-recrutement/main-suivi-recrutement/main-suivi-recrutement.component";
import { CandidatureComponent } from "../../public/candidature/candidature.component";
import { CandidatureDetailsComponent } from "../../public/candidature/candidature-details/candidature-details.component";


export const RECRUTEMENT_ROUTES : Routes = [
    {
        path: '',
        component: ListeRecrutementComponent,
        data: { title: "Liste des recrutements" }
    },
     {
        path: 'suivi',
        component: MainSuiviRecrutementComponent,
        data: { title: "Liste des recrutements" }
    },
    {
        path: 'candidature',
        component: CandidatureComponent,
        data: { title: "Candidature en ligne" }
    },
    {
        path: 'candidature/specifique',
        component: CandidatureDetailsComponent,
        data: { title: "Détails de la candidature" }
    }
]