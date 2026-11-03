import { Routes } from '@angular/router';
import { MainBonengagementComponent } from './main-bonengagement/main-bonengagement.component';
import { SuiveInvestissementComponent } from './bonengagement/suive-investissement/suive-investissement.component';
import { SuiveFonctionnementComponent } from './bonengagement/suive-fonctionnement/suive-fonctionnement.component';

export const CONTROLE_ROUTES: Routes = [
    {
      path: 'controle',
      // suiviebudgetaire component
      children: [
        { path: 'suiviebudgets', component: MainBonengagementComponent },
          {
            path: 'bonengagement/suivie-investissement/:beId',
            component: SuiveInvestissementComponent
          },
          {
            path: 'bonengagement/suivie-fonctionnement/:beId',
            component: SuiveFonctionnementComponent
          }

      ],
    },
  ];
  
