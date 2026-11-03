import { Routes } from '@angular/router';
import { CandidatureComponent } from './candidature.component';
import { CandidatureDetailsComponent } from './candidature-details/candidature-details.component';

export  const CANDIDATURE_ROUTES : Routes = [
    {
        path: '',
        children: [
            /**
             * Candidature
             */
            { path: '', component: CandidatureComponent },
            { path: 'details', component: CandidatureDetailsComponent },


        ],
    },
]