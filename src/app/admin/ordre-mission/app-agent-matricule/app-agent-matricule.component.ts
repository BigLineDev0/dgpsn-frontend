import {Component, Input, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable
} from '@angular/material/table';
import {NgbActiveModal, NgbPagination, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {ResponseApi} from 'src/app/util/response.model';
import {AgentService} from 'src/app/services/agent/agent.service';
import {RESPONSE_STATUS} from 'src/app/util/response-status';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
    selector: 'app-app-agent-matricule',
    templateUrl: './app-agent-matricule.component.html',
    imports: [
        NgbPagination,
        MatCard,
        ReactiveFormsModule,
        NgIf,
        NgbTooltip,
        MatCardContent,
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatCheckbox,
        MatTooltip,
        MatCellDef,
        MatHeaderCellDef,
        MatHeaderRow,
        MatRow,
        MatHeaderRowDef,
        MatRowDef
    ],
    styleUrls: ['./app-agent-matricule.component.scss']
})
export class AppAgentMatriculeComponent {
 loading: boolean = true;
   datasource: any;
   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
   Object.create(null);
   @ViewChild(MatSort) sort!: MatSort;
   selectedMatriculeId: any
   selectedAgents: any[] = []; 
   pageOptions: any = {
     page: 0,
     size: 5
   }
   metadata:any
   @ViewChild(MatTable, { static: true }) table: MatTable<any> =
     Object.create(null);
   destroy$: Subject<boolean> = new Subject();
   @Input() modal!: NgbActiveModal;
   @Input() isSexeF: boolean = true;
   displayedColumns: string[] = [
     '#',
     'matricule',
     'nom',
     'prenom',
     'fonction',
   ];
   constructor(private agentService: AgentService) { }
   agentsSexeF : any
   dataSource : any
   formSearch!: FormGroup;
   ngOnInit(): void {
      this.formSearch = new FormGroup({
             matricule: new FormControl(null),
   })
     this.getAgent();
   }
 
 
   getAgent(): void {
     this.loading = true;
     this.pageOptions.allagents = true;
     this.agentService.getAllAgents(this.pageOptions).subscribe({
       next: (value) => {
        //  if (value.status === RESPONSE_STATUS.OK) {
        console.log('liste agent',value);
           this.metadata = value.metadata;
           const agents = value.content;
             this.dataSource = agents;
             this.loading = false;
        //  }
       },
       error: () => {
         this.loading = false;
       }
     });
   }
   
   
  save() {
    this.modal.close({ event: 'save', data: this.selectedAgents });
  }
  
 
   close() {
     console.log('modal: ',this.modal);
     this.modal.close({ event: 'Cancel' });
   }
 
  getSelected(agent: any) {
    const index = this.selectedAgents.findIndex((selected) => selected.id === agent.id);
    if (index > -1) {
      // Si l'agent est déjà sélectionné, on le retire
      this.selectedAgents.splice(index, 1);
      this.selectedMatriculeId = agent.id
    } else {
      // Sinon, on l'ajoute à la liste
      this.selectedAgents.push(agent);
      this.selectedMatriculeId.push(agent.id)
    }
    console.log('Agents sélectionnés:', this.selectedAgents);
  }
  
   paginate($event: any) {
     this.loading = true;
     this.pageOptions.page = $event - 1;
     this.getAgent();
   }
   
   doSearch(event?: any) {
     this.pageOptions.matricule = this.formSearch.value.matricule;
     this.getAgent();
   }
   isSelected(agent: any): boolean {
    return this.selectedAgents.some((selected) => selected.id === agent.id);
  }

    protected readonly Number = Number;
}
 
 
