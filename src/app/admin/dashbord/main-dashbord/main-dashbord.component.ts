import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgentDashbordComponent } from "../agent-dashbord/agent-dashbord.component";
import { CongeDashbordComponent } from "../conge-dashbord/conge-dashbord.component";
import { ProjetDashbordComponent } from "../projet-dashbord/projet-dashbord.component";
import { ServiceExterieurDashbordComponent } from "../service-exterieur-dashbord/service-exterieur-dashbord.component";
import { BudgetDashbordComponent } from "../budget-dashbord/budget-dashbord.component";
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {Authority} from "@/app/util/Authority";
import {HasAnyAuthorityDirective} from "@views/has-any-authority/has-any-authority.module";

@Component({
  selector: 'app-main-dashbord',
  imports: [
    CommonModule,
    RouterModule,
    AgentDashbordComponent,
    CongeDashbordComponent,
    ProjetDashbordComponent,
    ServiceExterieurDashbordComponent,
    BudgetDashbordComponent,
    NgbNavModule,
    HasAnyAuthorityDirective
  ],
  templateUrl: './main-dashbord.component.html',
  styleUrls: ['./main-dashbord.component.scss']
})
export class MainDashbordComponent implements OnInit {
  
  currentDashboard = 'agent'; 
  dashboardSteps = [
    {
      id: 'agent',
      title: 'Agents',
      description: 'Gestion des agents et statistiques',
      icon: 'feather icon-users',
      active: true,
      completed: true
    },
    {
      id: 'budget',
      title: 'Budget',
      description: 'Suivi financier et budgétaire',
      icon: 'feather icon-dollar-sign',
      active: false,
      completed: false
    },
    {
      id: 'conge',
      title: 'Congés',
      description: 'Gestion des absences et congés',
      icon: 'feather icon-briefcase',
      active: false,
      completed: false
    },
    {
      id: 'projet',
      title: 'Projets',
      description: 'Suivi des projets en cours',
      icon: 'feather icon-file-text',
      active: false,
      completed: false
    },
    {
      id: 'service',
      title: 'Services Ext.',
      description: 'Services externes et partenaires',
      icon: 'feather icon-globe',
      active: false,
      completed: false
    }
  ];

  readTdbAgent = Authority.READ_TDB_AGENT;
  readTdbBudget = Authority.READ_TDB_BUDGET;
  readTdbConge = Authority.READ_TDB_CONGE;
  readTdbService = Authority.READ_TDB_SERVICE;

  // currentDashboard: string = 'agent';

  ngOnInit(): void {}

  navigateToDashboard(dashboardId: string, index: number): void {
    this.dashboardSteps.forEach(step => step.active = false);
    this.dashboardSteps[index].active = true;
    this.markPreviousStepsAsCompleted(index);
    this.currentDashboard = dashboardId;
  }

  private markPreviousStepsAsCompleted(currentIndex: number): void {
    this.dashboardSteps.forEach((step, index) => {
      step.completed = index <= currentIndex;
    });
  }

  quickNavigateToDashboard(dashboardId: string): void {
    const targetIndex = this.dashboardSteps.findIndex(step => step.id === dashboardId);
    if (targetIndex !== -1) {
      this.navigateToDashboard(dashboardId, targetIndex);
    }
  }

  getActiveStep(): any {
    return this.dashboardSteps.find(step => step.active);
  }
}
