import {Component, OnInit, TemplateRef, ViewChild, AfterViewInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgentService} from 'src/app/services/agent/agent.service';
import {Alertes} from 'src/app/util/alerte';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {CdkDragDrop, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import {saveAs} from "file-saver";
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx-js-style';
import {lastValueFrom} from 'rxjs';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AddAgentComponent} from '../add-agent/add-agent.component';
import {EditAgentComponent} from '../edit-agent/edit-agent.component';
import {HttpClientModule} from '@angular/common/http';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';


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
        // NgSelectModule,
        // PaysModule,
        SpinnerComponent,
        MatSortModule,
        DragDropModule,
        AddAgentComponent,
    ],
    templateUrl: './list-agent.component.html',
    styleUrls: ['./list-agent.component.scss'],
    standalone:true
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
    private route: Router,
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

  // 🔹 Simule une réponse de l'API
  this.datasource = {
    payload: [
      {
        id: 1,
        matricule: "AGT-001",
        nom: "Diop",
        prenom: "Aminata",
        adresse: "Dakar, Plateau",
        email: "aminata.diop@mairie.sn",
        telephone: "77 123 45 67",
        fonction: { libelle: "Secrétaire administrative" },
        direction: { libelle: "Direction des Ressources Humaines" }
      },
      {
        id: 2,
        matricule: "AGT-002",
        nom: "Ndoye",
        prenom: "Cheikh",
        adresse: "Thiès, Nord Foire",
        email: "cheikh.ndoye@mairie.sn",
        telephone: "78 222 11 33",
        fonction: { libelle: "Chargé de communication" },
        direction: { libelle: "Direction de la Communication" }
      },
      {
        id: 3,
        matricule: "AGT-003",
        nom: "Fall",
        prenom: "Fatou",
        adresse: "Saint-Louis, Sor",
        email: "fatou.fall@mairie.sn",
        telephone: "76 987 65 43",
        fonction: { libelle: "Comptable" },
        direction: { libelle: "Direction Financière" }
      },
      {
        id: 4,
        matricule: "AGT-004",
        nom: "Ba",
        prenom: "Moussa",
        adresse: "Kaolack, Léona",
        email: "moussa.ba@mairie.sn",
        telephone: "77 456 78 90",
        fonction: { libelle: "Chef de service logistique" },
        direction: { libelle: "Direction de la Logistique" }
      },
      {
        id: 5,
        matricule: "AGT-005",
        nom: "Sarr",
        prenom: "Khady",
        adresse: "Ziguinchor, Lyndiane",
        email: "khady.sarr@mairie.sn",
        telephone: "70 555 66 77",
        fonction: { libelle: "Assistante RH" },
        direction: { libelle: "Direction des Ressources Humaines" }
      }
    ],
    totalElements: 5
  };

  console.log("response: ", this.datasource);
  this.loading = false;
    // this.loading = true;
    // if (this.directionId !== undefined && this.directionId !== -1) {
    //   this.pageOptions.directionId = this.directionId;
    // }
    // this.agentService.getAllAgents(pageOptions).subscribe({
    //   next: response => {
    //     this.datasource = response;
    //     console.log("response: ", response);
        
    //     this.loading = false;
    //   },
    //   error: response => {},
    //   complete: () => this.loading = false 
    // })
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
    localStorage.setItem(id,'idAgent')
   this.route.navigateByUrl(url)
  }
}


