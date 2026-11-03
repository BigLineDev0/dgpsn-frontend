import { Routes } from '@angular/router';
import {InscriptionComponent} from "@/app/public/recrutement/inscription/inscription.component";

export  const RECRUTEMENT_ROUTES : Routes = [
    {
        path: 'recrutement',
        children: [
            /**
             * Budgets
             */
            { path: 'inscription', component: InscriptionComponent },


        ],
    },
]