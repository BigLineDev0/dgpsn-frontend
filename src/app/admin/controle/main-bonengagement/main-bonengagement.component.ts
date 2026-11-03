


import { AgentService } from '@/app/services/agent/agent.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef, NgbModal, NgbAccordionModule, NgbAlertModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FeatherIconDirective } from '@core/feather-icon/feather-icon.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { QuillModule } from 'ngx-quill';
import { ListeBonengagementComponent } from '../bonengagement/liste-bonengagement/liste-bonengagement.component';
import { StatistiqueComponent } from '../statistique/statistique.component';
import { AuditComponent } from '../audit/audit.component';
import { RisqueComponent } from '../risque/risque.component';

@Component({
  selector: 'app-main-bonengagement',
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbDropdownModule,
    MatTabsModule,
    NgbAccordionModule,
    MatDialogModule,
    MatTableModule,
    NgbTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatRippleModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatButtonModule,
    QuillModule,
    MatRadioModule,
    NgbNavModule,
    MatCardModule,
    FormsModule,
    MatPaginatorModule,
    MatSelectModule,
    NgbAlertModule,
    HasAnyAuthorityDirective,
    NgbPopoverModule,
     ListeBonengagementComponent,
     StatistiqueComponent,
     AuditComponent,
     RisqueComponent,
  ],
  templateUrl: './main-bonengagement.component.html',
  styleUrl: './main-bonengagement.component.scss'
})
export class MainBonengagementComponent {
  documentId: any;
  agent: any;
  etat: string = '';
  modalRef!: NgbModalRef;
  datasource: any;
  isCongeAgentRoute: boolean = false;
  isCongeMaternite: any;
  active: number = 1; 
  pageOptions: any = { page: 0, size: 10 };

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private agentService: AgentService,
  ) { }

  ngOnInit(): void {
    this.getAgent();
    this.isCongeAgentRoute = this.router.url === '/liste-agents/suivie/conge';
    this.isCongeMaternite = this.router.url === '/liste-agents/main-conge';
  }

  getAgent() {
    this.agentService.getAllAgents(localStorage.getItem('idAgent')).subscribe({
      next: response => {
        this.agent = response?.payload;
        console.log('AGENT', this.agent);
      },
      error: err => {
        console.error('Error fetching agent:', err);
      }
    });
  }

  activeMenuForAgentProfile(): boolean {
    const hideMenu = localStorage.getItem('hideSuiviMenu');
    return hideMenu === 'true' ? false : true;
  }
}