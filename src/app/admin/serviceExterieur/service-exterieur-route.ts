import { Routes } from "@angular/router";
import { ProjetComponent } from "../projet/projet.component";
import { MainServiceExterieurComponent } from "./main-service-exterieur/main-service-exterieur.component";
import { ListeParticipantComponent } from "./formation/liste-participant/liste-participant.component";
import { ListeParticipantMissionComponent } from "./mission-supervision/participant/liste-participant-mission/liste-participant-mission.component";
import { ListeParticipantAtelierComponent } from "./atteliers/participant/liste-participant-atelier/liste-participant-atelier.component";

export const SERVICES_EXTERIEUR_ROUTES: Routes = [
    {
    path: 'services-exterieur', component: MainServiceExterieurComponent
    },
    {
    path: 'participant-formation', component: ListeParticipantComponent
    },
    {
    path: 'participant-mission', component:ListeParticipantMissionComponent
    },
     {
   // path: 'participant-attelier', component:ListeParticipantAtelierComponent
    path: 'participant-attelier', component:ListeParticipantComponent
    },
   

]