import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SharedModule } from 'primeng/api';
import { AgentService } from 'src/app/services/agent/agent.service';
import { Alertes } from 'src/app/util/alerte';

@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.scss'],
  standalone:true,
    imports: [
    CommonModule,
    SpinnerComponent,
    MaterialModule,
    SharedModule,
    NgbPaginationModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    HasAnyAuthorityDirective
  ],
})
export class ListAgentComponent implements OnInit {
    @Input() backdrumpDisplay: boolean = true;
    @Input() directionId!: number;
    datasource: any;
    loading = true;
    agentToUpdate: any;
    updateAgentModal!: TemplateRef<any>;
    referentielType: any;
    addAgentModal!: TemplateRef<any>;
    displayedColumns: string[] = [
      'matricule',
      'nom',
      'prenom',
      'adresse',
       'email',
      'telephone',
       'fonction',
       'direction',
      //  'structure',
       'actions'
    ];
  
    pageOptions: any = {
      page: 0,
      size: 20
    }

  constructor(
    private modalService: NgbModal,
    private agentService: AgentService
    ){

  }
  ngOnInit(): void {
    this.getReferentielType();
    this.getAllAgent(this.pageOptions);
  }

  getReferentielType() {
    this.referentielType = localStorage.getItem('referentielType')!;
    this.referentielType = JSON.parse(this.referentielType);
  }
  getAllAgent(pageOptions: any) {
    this.loading = true;
    console.log("directionId: ", this.directionId)
    if (this.directionId !== undefined && this.directionId !== -1) {
      this.pageOptions.directionId = this.directionId;
    }
    this.agentService.getAllAgents(pageOptions).subscribe({
      next: response => {
        this.datasource = response;
        this.loading = false;
      },
      error: response => {},
      complete: () => this.loading = false 
    })
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllAgent(this.pageOptions);
  }

  openBasicModal(content: TemplateRef<any>) {
    
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
    }).catch((res) => {});
  }

  doSearch(data:any){
    this.pageOptions=data;
    this.pageOptions.size=3;
    this.pageOptions.page=0;
    this.getAllAgent(this.pageOptions)
  }


  openDialog(content: TemplateRef<any>, modalSize: any, agent?: any) {
    this.agentToUpdate = agent;

    this.modalService.open(content, {size: modalSize, backdrop: 'static'}).result.then((result) => {

    }).catch((res) => {});
  }

  deleteLabel(agentId: any) {
    Alertes.confirmAction('Etes-vous sûr de vouloire supprimer ?',
      '',
      () =>  { 
        this.agentService.deleteAgent(agentId).subscribe({
          next: response => {},
          error: response => {},
          complete: () => {
            this.getAllAgent(this.pageOptions);
          }
        });
      }
    )
  }

  close(){
    this.modalService.dismissAll();
    this.getAllAgent(this.pageOptions);
  }
}


