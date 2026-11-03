import {Routes} from '@angular/router';
import {ListProfileComponent} from "@views/pages/securite/profile/list-profile/list-profile.component";
import {ListUserComponent} from "@views/pages/securite/user/list-user/list-user.component";
import {ListLogComponent} from "@views/pages/securite/logs/list-log/list-log.component";
import { ConfigProfileComponent } from './profile/config-profile/config-profile.component';

export const SECURITE_ROUTES: Routes = [
    {
        path: 'profil',
        component: ListProfileComponent,
        data: {title: "Profil"}
    },
    {
        path: 'user',
        component: ListUserComponent,
        data: {title: "Utilisateurs"}
    },
    {
        path: 'journal',
        component: ListLogComponent,
        data: {title: "Journal"}
    },
      {
        path: 'config-profile',
        component: ConfigProfileComponent,
        data: {title: "Journal"}
    }
];
