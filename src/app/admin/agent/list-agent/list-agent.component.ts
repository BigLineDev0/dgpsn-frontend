import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgentService} from 'src/app/services/agent/agent.service';
import {Alertes} from 'src/app/util/alerte';
import {MatSortModule} from '@angular/material/sort';
import {DragDropModule} from '@angular/cdk/drag-drop';
import 'jspdf-autotable';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AddAgentComponent} from '../add-agent/add-agent.component';
import {SpinnerComponent} from '@/app/util/spinner/spinner.component';
import {FormatDatePipe} from '@core/pipe/format-date.pipe';
import {NgSelectModule} from '@ng-select/ng-select';
import {Authority} from "@/app/util/Authority";
import {HasAnyAuthorityDirective} from "@views/has-any-authority/has-any-authority.module";


@Component({
    selector: 'app-list-agent',
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        NgbModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        NgSelectModule,
        SpinnerComponent,
        MatSortModule,
        DragDropModule,
        AddAgentComponent,
        FormatDatePipe,
        MatIconModule,
        HasAnyAuthorityDirective
    ],
    templateUrl: './list-agent.component.html',
    styleUrls: ['./list-agent.component.scss'],
    standalone:true
})
export class ListAgentComponent implements OnInit {
        
    @Input() backdrumpDisplay: boolean = true;
    @Input() directionId!: number;
    datasource: any;
    annee:any
    loading = true;
    agentToUpdate: any;
    updateAgentModal!: TemplateRef<any>;
    referentielType: any;
    addAgentModal!: TemplateRef<any>;
    add = Authority.ADD_AGENT;
    updated = Authority.EDIT_AGENT;
    deleted = Authority.DELETE_AGENT;
    read = Authority.READ_AGENT;

    displayedColumns: string[] = [
      'matricule',
      'prenomNom',
      'dateCreation',
      'situationMatrimoniale',
      'adresse',
      'email',
      'poste',
      'telephone',
      // 'fonction',
      'direction',
      'actions'
    ];
  
    pageOptions: any = {
      page: 0,
      size: 20
    }

  constructor(
    private modalService: NgbModal,
    private route: Router,
    private agentService: AgentService,
   
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

  this.agentService.getAllAgents(pageOptions).subscribe({
    next: response => {
      if (response && response.content) {

        console.log("response.content",response.content)
        const filteredAgents = response.content.filter(
          (agent: any) => agent.prenom?.toLowerCase() !== 'administrateur'
        );
        
        this.datasource = {
          ...response,
          content: filteredAgents
        };
      } else {
        this.datasource = response;
      }
      this.loading = false;
    },
    error: err => {
      this.loading = false;
    },
    complete: () => (this.loading = false)
  });
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
  navigateRoute(id:any,url:any){
      localStorage.setItem("idAgent", id);

      console.log("test",id)
   this.route.navigateByUrl(url)
  }

}


