import { AgentService } from '@/app/services/agent/agent.service';
import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbAccordionModule, NgbActiveModal, NgbAlertModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { QuillModule } from 'ngx-quill';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agent-matricule',
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
        AgentMatriculeComponent
  ],
  templateUrl: './agent-matricule.component.html',
  styleUrl: './agent-matricule.component.scss'
})
export class AgentMatriculeComponent {
loading: boolean = true;
  selectAgent: any;
  datasource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
  Object.create(null);
  @ViewChild(MatSort) sort!: MatSort;
  selectedMatriculeId: any
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


  // getAgent(): void {
  //   this.loading = true;
  //   this.pageOptions.active = 'true';
  //   this.agentService.getAllAgents(this.pageOptions).subscribe({
  //     next: (value) => {
  //       // if (value.status === RESPONSE_STATUS.OK) {
  //         this.metadata = value.metadata;
  //         const agents = value.content;
  //           this.dataSource = agents;
  //           this.loading = false;
  //       // }
  //     },
  //     error: () => {
  //       this.loading = false;
  //     }
  //   });
  // }

getAgent(): void {
  this.loading = true;
  this.pageOptions.active = 'true';

  this.agentService.getAllAgents(this.pageOptions).subscribe({
    next: (value) => {
      // Vérifie que value.content existe
      if (value && value.content) {
        // 🔹 Filtrer les agents (exclure ceux dont le prénom est "Administrateur")
        const filteredAgents = value.content.filter(
          (agent: any) => agent.prenom?.toLowerCase() !== 'administrateur'
        );

        this.metadata = value.metadata;
        this.dataSource = filteredAgents;
      } else {
        this.dataSource = [];
      }

      this.loading = false;
    },
    error: () => {
      this.loading = false;
    }
  });
}

  save() {
    this.modal.close({ event: 'save', data: this.selectAgent });
  }

  close() {
    console.log('modal: ',this.modal);
    this.modal.close({ event: 'Cancel' });
  }

  getSelected(agent: any) {
    this.selectAgent = agent;
    this.selectedMatriculeId = agent.id
    console.log('this.selectedMatriculeId',this.selectedMatriculeId);
    console.log('this.selectAgent',this.selectAgent);

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

}



