import { AgentService } from '@/app/services/agent/agent.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { Router } from '@angular/router';
import { NgbModalRef, NgbModal, NgbAccordionModule, NgbAlertModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { QuillModule } from 'ngx-quill';
import { ListeAtelierComponent } from '../atteliers/liste-atelier/liste-atelier.component';
import { ListeFormationExterieurComponent } from '../formation/liste-formation-exterieur/liste-formation-exterieur.component';

@Component({
  selector: 'app-main-service-exterieur',
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
    ListeAtelierComponent,
    ListeFormationExterieurComponent
  ],
  standalone:true,
  templateUrl: './main-service-exterieur.component.html',
  styleUrl: './main-service-exterieur.component.scss'
})
export class MainServiceExterieurComponent {
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

}
