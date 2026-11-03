import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModal, NgbModalRef, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { Alertes } from 'src/app/util/alerte';
import { FormMissionComponent } from '../form-mission/form-mission.component';
import { MissionService } from '@/app/services/mission/mission.service';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-mission',
  templateUrl: './liste-mission.component.html',
  styleUrls: ['./liste-mission.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    NgbTooltipModule,
    NgbPaginationModule,
     MatMenuModule,
    NgSelectModule,
    HasAnyAuthorityDirective,
    SpinnerComponent,
    FormMissionComponent,
  ]
})
export class ListeMissionComponent {
  displayedColumns: string[] = [
    'numeroOrdreMission',
    'typeMission',
    'objet',
    'lieuDestination',
    'dateDebut',
    'dateFin',
    'dureeJours',
    'budgetAlloue',
    'idResponsableMission',
    'statut',
    'rapportDisponible',
    'dateRapport',
    'actions'
  ];

  datasource: any;
  loadingIndicator = false;
  projetId: any;
  missionToUpdate: any;
  modalRef!: NgbModalRef;
  pageOptions: any = { page: 0, size: 20 };

  @Input() projet: any;

  constructor(
    private missionService: MissionService,
    private modalService: NgbModal,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getProjetId();
    this.getAllMissions();
  }

  getProjetId() {
    this.projetId = sessionStorage.getItem('projetId')!;
  }

  getAllMissions() {
    this.datasource ={
  "content": [
    {
      "id": 1,
      "numeroOrdreMission": "M-2025-001",
      "typeMission": "Supervision de terrain",
      "objet": "Suivi de la mise en œuvre du projet agricole dans la région de Thiès",
      "lieuDestination": "Thiès",
      "dateDebut": "2025-03-10",
      "dateFin": "2025-03-15",
      "dureeJours": 5,
      "budgetAlloue": 450000,
      "idResponsableMission": {
        "id": 12,
        "nomComplet": "Fatou Diouf"
      },
      "statut": "Terminée",
      "rapportDisponible": true,
      "dateRapport": "2025-03-20"
    },
    {
      "id": 2,
      "numeroOrdreMission": "M-2025-002",
      "typeMission": "Mission de formation",
      "objet": "Atelier de renforcement de capacités en gestion budgétaire",
      "lieuDestination": "Dakar",
      "dateDebut": "2025-04-05",
      "dateFin": "2025-04-08",
      "dureeJours": 3,
      "budgetAlloue": 320000,
      "idResponsableMission": {
        "id": 8,
        "nomComplet": "Mamadou Ndiaye"
      },
      "statut": "Planifiée",
      "rapportDisponible": false,
      "dateRapport": null
    },
    {
      "id": 3,
      "numeroOrdreMission": "M-2025-003",
      "typeMission": "Mission d’évaluation",
      "objet": "Évaluation des performances du programme d’appui aux collectivités locales",
      "lieuDestination": "Saint-Louis",
      "dateDebut": "2025-05-02",
      "dateFin": "2025-05-09",
      "dureeJours": 7,
      "budgetAlloue": 600000,
      "idResponsableMission": {
        "id": 5,
        "nomComplet": "Aminata Sarr"
      },
      "statut": "En cours",
      "rapportDisponible": false,
      "dateRapport": null
    },
    {
      "id": 4,
      "numeroOrdreMission": "M-2025-004",
      "typeMission": "Mission de supervision",
      "objet": "Vérification de l’état d’avancement des chantiers dans la région de Kaolack",
      "lieuDestination": "Kaolack",
      "dateDebut": "2025-06-12",
      "dateFin": "2025-06-16",
      "dureeJours": 4,
      "budgetAlloue": 380000,
      "idResponsableMission": {
        "id": 10,
        "nomComplet": "Ousmane Ba"
      },
      "statut": "Annulée",
      "rapportDisponible": false,
      "dateRapport": null
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 20
  },
  "totalElements": 4,
  "totalPages": 1,
  "last": true
}

    // this.pageOptions.projetId = this.projetId;
    // this.missionService.readMissions(this.pageOptions).subscribe({
    //   next: (response) => {
    //     this.datasource = response;
    //     this.loadingIndicator = false;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     this.loadingIndicator = false;
    //   },
    //   complete: () => {
    //     this.loadingIndicator = false;
    //   }
    // });
  }

  openBasicModal(content: TemplateRef<any>, mission?: any) {
    this.missionToUpdate = mission;
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }

  close(event: boolean) {
    if (event) {
      this.getAllMissions();
    }
  }

  doSearch(searchCriteria: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.pageOptions.projetId = this.projetId;
    this.pageOptions.numeroOrdreMission = searchCriteria.numeroOrdreMission;
    this.pageOptions.typeMission = searchCriteria.typeMission;
    this.pageOptions.lieuDestination = searchCriteria.lieuDestination;
    this.pageOptions.statut = searchCriteria.statut;
    this.getAllMissions();
  }

  deleteMission(missionId: any) {
    this.missionService.deleteMission(missionId).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Suppression réussie');
      },
      error: (err) => {
        Alertes.alerteAddDanger(err.error.message);
      },
      complete: () => {
        this.getAllMissions();
      }
    });
  }
openUrl(id:any, url:any){
 this.router.navigateByUrl(url)
}
  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllMissions();
  }
}