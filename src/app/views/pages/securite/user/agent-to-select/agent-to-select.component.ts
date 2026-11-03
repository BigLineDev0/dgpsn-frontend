import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
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
import {AgentService} from 'src/app/services/agent/agent.service';
import {RESPONSE_STATUS} from 'src/app/util/response-status';
import {ResponseApi} from 'src/app/util/response.model';
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {MatRadioButton} from "@angular/material/radio";

@Component({
    selector: 'app-agent-to-select',
    templateUrl: './agent-to-select.component.html',
    styleUrls: ['./agent-to-select.component.scss'],
    imports: [
        MatCard,
        NgIf,
        ReactiveFormsModule,
        NgbTooltip,
        MatCardContent,
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatRadioButton,
        MatCellDef,
        MatHeaderCellDef,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        NgbPagination
    ],
    standalone: true
})
export class AgentToSelectComponent implements OnInit {
    loading: boolean = true;
    selectAgent: any;
    datasource: any;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator = Object.create(null);
    @ViewChild(MatSort) sort!: MatSort;
    selectedMatriculeId: any
    pageOptions: any = {
        page: 0,
        size: 15
    }
    metadata: any
    @ViewChild(MatTable, {static: true}) table: MatTable<any> =
        Object.create(null);
    destroy$: Subject<boolean> = new Subject();
    @Input() modal: NgbActiveModal = new NgbActiveModal();
    @Input() isSexeF: boolean = true;
    displayedColumns: string[] = [
        '#',
        'matricule',
        'nom',
        'prenom',
        'telephone',
        'structure',
    ];

    constructor(private readonly agentService: AgentService) {
    }

    agentsSexeF: any
    dataSource: any
    formSearch: FormGroup = new FormGroup({});

    ngOnInit(): void {
        this.formSearch = new FormGroup({
            matricule: new FormControl(null),
            nom: new FormControl(''),
            prenom: new FormControl(''),
        })
        this.getAgent();
    }


    getAgent(): void {
        this.loading = true;
        this.pageOptions.allagents = true;
        this.agentService.getAllAgents(this.pageOptions).subscribe({
            next: (value) => {
                 console.log('value', value);
                // if (value.status === RESPONSE_STATUS.OK) {
                    this.metadata = value.metadata;
                    const agents = value.content;
                    console.log('agents', agents);

                    this.dataSource = agents;
                    this.loading = false;
                // }
            },
            error: () => {
                this.loading = false;
            }
        });
    }


    save() {
        this.modal.close({event: 'save', data: this.selectAgent});
    }

    close() {
        console.log('modal: ', this.modal);
        this.modal.close({event: 'Cancel'});
    }

    getSelected(agent: any) {
        this.selectAgent = agent;
        this.selectedMatriculeId = agent.id
    }

    paginate($event: any) {
        this.loading = true;
        this.pageOptions.page = $event - 1;
        this.getAgent();
    }

    doSearch(event?: any) {
        this.pageOptions.matricule = this.formSearch.value.matricule;
        this.pageOptions.nom = this.formSearch.value.nom;
        this.pageOptions.prenom = this.formSearch.value.prenom;
        this.getAgent();
    }

    protected readonly Number = Number;
}



