import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { AdministrativeReportComponent } from '../administrative-report/administrative-report.component';
import { FinancialReportComponent } from '../financial-report/financial-report.component';
import { PlanningReportComponent } from '../planning-report/planning-report.component';
import { ManagementControlReportComponent } from '../management-control-report/management-control-report.component';
import { DashboardReportComponent } from '../dashboard-report/dashboard-report.component';

@Component({
  selector: 'app-main-report',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    AdministrativeReportComponent,
    FinancialReportComponent,
    PlanningReportComponent,
    ManagementControlReportComponent,
    DashboardReportComponent
  ],
  templateUrl: './main-report.component.html',
  styleUrl: './main-report.component.scss'
})
export class MainReportComponent {
  selectedTabIndex = 0;

  tabs = [
    {
      label: 'Gestion Financière',
      icon: 'account_balance',
      component: 'financial'
    },
    {
      label: 'Gestion Administrative',
      icon: 'description',
      component: 'administrative'
    },
    {
      label: 'Planification',
      icon: 'event_note',
      component: 'planning'
    },
    {
      label: 'Contrôle de Gestion',
      icon: 'assessment',
      component: 'management'
    },
    // {
    //   label: 'Tableaux de Bord',
    //   icon: 'dashboard',
    //   component: 'dashboard'
    // }
  ];

  onTabChange(index: number): void {
    this.selectedTabIndex = index;
    console.log('Tab changed to:', this.tabs[index].label);
  }
}
