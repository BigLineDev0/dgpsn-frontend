import {Component, OnInit, signal, TemplateRef, ViewChild} from '@angular/core';
import {NgbDropdownItem, NgbModal, NgbPagination, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { OrdreMissionService } from 'src/app/services/ordre-mission/ordre-mission.service';
import { RESPONSE_STATUS } from 'src/app/util/response-status';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TYPE_BORDEREAU} from "@/app/util/type-fiche";
import {Alertes} from "@/app/util/alerte";
import {SpinnerComponent} from "@/app/util/spinner/spinner.component";
import {CommonModule, DatePipe, NgClass, NgIf} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {
  CreateOrUpdateOrdreMissionComponent
} from "@/app/admin/ordre-mission/create-or-update-ordre-mission/create-or-update-ordre-mission.component";
import {ListDocumentComponent} from "@/app/admin/document/list-document/list-document.component";
import {MatIcon} from "@angular/material/icon";
import {MatRipple} from "@angular/material/core";
import {AgentRoutingComponent} from "@/app/admin/agent/agent-routing/agent-routing.component";
import { ModelOrdreMissionComponent } from '../model-ordre-mission/model-ordre-mission.component';
import {Authority} from "@/app/util/Authority";
import {HasAnyAuthorityDirective} from "@views/has-any-authority/has-any-authority.module";

export interface Document {
  id: number;
  nom: string;
  type: string;
}

export interface Agent {
  id: number;
  nom: string;
  prenom: string;
  matricule: string;
}

export interface OrdreMission {
  id: number;
  reference: string;
  dateDebut: string;
  typeOrdre: "exterieur" | "interieur";
  dateFin: string;
  objet: string;
  destination: string;
  statut: 'En attente' | 'Validé' | 'En cours' | 'Terminé' | 'Annulé';
  agent: Agent;
  moyenTransport: string;
  dateCreation: string;
  documents: Document[];
}


@Component({
  selector: 'app-list-ordre-mission',
  standalone:true,
  templateUrl: './list-ordre-mission.component.html',
  imports: [
    SpinnerComponent,
    NgIf,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatMenuTrigger,
    NgClass,
    MatRipple,
    NgbTooltip,
    MatRipple,
    MatMenu,
    NgbDropdownItem,
    MatRipple,
    MatIcon,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    NgbPagination,
    CreateOrUpdateOrdreMissionComponent,
    ListDocumentComponent,
    DatePipe,
    AgentRoutingComponent,
    CommonModule,
    ModelOrdreMissionComponent,
      HasAnyAuthorityDirective
  ],
  styleUrls: ['./list-ordre-mission.component.scss']
})
export class ListOrdreMissionComponent implements OnInit{
  @ViewChild('bordereauModal') bordereauModal!: TemplateRef<any>;

  bordereauForm!: FormGroup;
  analyseBordereau!: string;
  typeBordereauDRH: TYPE_BORDEREAU = TYPE_BORDEREAU.DRH;
  typeBordereauDG: TYPE_BORDEREAU = TYPE_BORDEREAU.DG;
  signataireBordereau!: string;
  curentRoute: any;
  nombrePiecesBordereau!: number;
  selectedTypeBordereau:any;
  ordreMission:any;

  //  

  allData = signal<OrdreMission[]>([]);

  file!: File;
  agentId: any;
  nomAgent: any;
  ordreMissionToUpdate: any;
  codeAgent: any;
  ordreMissionModel:any
  loadingIndicator = true;
  pageOptions: any = { page: 0, size: 5 };
  dataSource: any;
  documentPath: any;
  add =Authority.ADD_ORDRE_MISSION_AGENT;
  update =Authority.EDIT_ORDRE_MISSION_AGENT;
  deletes =Authority.DELETE_ORDRE_MISSION_AGENT;

  statut:any;
  basicModalCloseResult!: string;
  displayedColumns: string[] = [
    'typeOrdre',
    'objetMission',
    'destination',
    'itineraire',
    'dateDebut',
    'dateFin',
    'actions',
  ];
  datasource: any;
  agents: any;
  constructor(
    private readonly modalService: NgbModal,
     private readonly ordreMissionService: OrdreMissionService,
    private readonly router: Router
  ) {
  }

  ngOnInit() {
    this.getAllOrdreMission();
    this.curentRoute =this.router.url
  }
  openBorderauFormModal(content: TemplateRef<any>, typeBordereau: TYPE_BORDEREAU, ordreMission: any) {
    this.selectedTypeBordereau = typeBordereau;
    this.ordreMission = ordreMission;
    this.initBordereauForm();
    this.openBasicModal(content, 'md');
  }
  getBordereauProperties() {
    this.analyseBordereau = `BE transmettant un ${(this.bordereauForm.value.typeBordereau as String).toLowerCase()}
    portant .`;

    this.nombrePiecesBordereau = this.bordereauForm.value.nombrePieces;
    this.signataireBordereau = this.bordereauForm.value.signataire;

    this.modalService.open(this.bordereauModal, {size: 'xl', backdrop: 'static'}).result.then((result) => {
      this.modalService.dismissAll();
    })
  }

  initBordereauForm(){
    this.bordereauForm = new FormGroup({
      typeBordereau: new FormControl(null, Validators.required),
      nombrePieces: new FormControl(null, Validators.required),
      signataire: new FormControl(null, Validators.required)
    });
  }


   getAllOrdreMission() {
    this.loadingIndicator = true;
     let req = this.pageOptions;
     if (this.router.url === "/admin/acces/agent/mission"){
       req.agentId = localStorage.getItem("idAgent")

     }
     console.log('req',req)

    this.ordreMissionService.readOrdreMissions(req).subscribe({
      next: value => {
        // Mise à jour du signal avec les données du backend
        this.allData.set(value.payload || []);
        this.datasource = value;
        this.loadingIndicator = false;
        console.log("datasource", this.allData());
      },
      error: error => {
        console.error('Erreur lors du chargement des ordres de mission:', error);
        this.loadingIndicator = false;
        Alertes.errorPopPup('Erreur', 'Impossible de charger les ordres de mission');
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }

  getAllAgents() {
    this.loadingIndicator = false
  }

  openBasicModal(content: TemplateRef<any>, size?: any, agent?: any) {
    this.ordreMissionToUpdate = agent;
    this.ordreMissionModel = agent;
    console.log(' this.ordreMissionModel', this.ordreMissionModel);
    
    if(agent){
      this.statut=agent.statut
    }
    if (agent) {
      this.getAllOrdreMissionById(this.ordreMissionToUpdate.id)
    }
    this.agentId = agent?.id;
    this.modalService.open(content, { size: size, backdrop: 'static' }).result.then((result) => {

    }).catch((res) => {
    });
  }

  getAllOrdreMissionById(val: any) {
    this.loadingIndicator = false
    const orderMission = this.allData().find((item) => item.id === val);
    
    
    // this.ordreMissionService.readOrdreMission(val).subscribe({
    //   next: value => {
    //     this.agents = value.payload[0]?.agent
    //   },
    //   error: error => {

    //   }, complete: () => {

    //   }
    // })
   
  }

  getOrdreMission(id: any) {
    localStorage.setItem("idOrdreMission", id)

  }


  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllOrdreMission();
    }
  }

  checkPdf(document: any) {

    if (document?.path?.indexOf(".pdf") > 0) {
      return true;
    }
    return false;
  }


  getBadgeClass(affectation: any) {
    switch (affectation?.statut?.name) {
      case 'ACCEPTER':
        return 'badge text-bg-success';
      case 'REFUSER':
        return 'badge text-bg-danger';
      default:
        return 'badge text-bg-secondary';
    }

  }

  readFormat(file: string, format: string) {
    if (file.indexOf(format) > 0) {
      return false;
    }
    return true;
  }

  delete(agentId: any) {
    this.allData.set(this.allData().filter((item) => item.id !== agentId));
    // Alertes.confirmAction(
    //   'Voulez-vous supprimé ?',
    //   'Cet element sera definitivement supprimé',
    //   () => {
    //     this.ordreMissionService.deleteOrdreMission(agentId).subscribe({
    //       next: () => {
    //         Alertes.alerteDeleteSuccess();
    //         this.getAllOrdreMission();
    //       },
    //       error: (value) => {
    //         Alertes.alerteDeleteDanger(value.error.message)
    //       },
    //       complete: () => {

    //       },

    //     })
    //   }
    // );
  }

  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    this.getAllOrdreMission();
  }
  paginate($event: any) {
    this.loadingIndicator = true;
    this.pageOptions.page = $event - 1;
    this.getAllOrdreMission();
  }

  exportExcel() {
  }

  exportPdf() {

  }

  valider(ordreMissionId: any, status?: any) {
    const req = {
      statut: status
    }
    this.allData.set(this.allData().map((item) => item.id === ordreMissionId ? {...item, statut: status} : item));
    // console.log("test",req)
    // Alertes.confirmAction(
    //   'Voulez-vous vraiment valider l\'ordre de mission ?',
    //   'Cette ordre de mission sera definitivement validée',
    //   () => {
    //     this.ordreMissionService.ChangeStatutOrdreMission(ordreMissionId, req).subscribe({
    //       next: (value:any) => {
    //         if (value.status == RESPONSE_STATUS.OK) {
    //           Alertes.alerteValidSuccess();
    //         } else {
    //          // Alertes.alerteValidDanger(value.message)
    //          console.log("tes",value)
    //           Alertes.errorPopPup('Ajout échoué',value?.message)

    //         }
    //       },
    //      // error: (value: any) => Alertes.alerteUpdateDanger(value.message),
    //       //after check
    //       //(value: any) =>Alertes.errorPopPup('Ajout échoué',value?.message)
    //       complete: () => this.getAllOrdreMission()
    //     })
    //   }
    // );
  }


  openUrl(agent: any, url: any) {
    if (agent) {
      this.ordreMissionToUpdate = agent
    }
    this.router.navigateByUrl(url)
  }

  fileChange(event: any) {
    this.file = event.target.files[0];
  }

  protected readonly Number = Number;
}
