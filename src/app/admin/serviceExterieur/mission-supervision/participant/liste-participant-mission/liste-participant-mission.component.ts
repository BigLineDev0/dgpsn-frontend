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
import { FormParticipantMissionComponent } from '../form-participant-mission/form-participant-mission.component';
import { ParticipantMissionService } from '@/app/services/participantMission/participant-mission.service';

@Component({
  selector: 'app-liste-participant-mission',
  templateUrl: './liste-participant-mission.component.html',
  styleUrls: ['./liste-participant-mission.component.scss'],
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
    NgSelectModule,
    HasAnyAuthorityDirective,
    SpinnerComponent,
    FormParticipantMissionComponent,
  ]
})
export class ListeParticipantMissionComponent {
  displayedColumns: string[] = [
    'idEmploye',
    'roleMission',
    'dateAssignation',
    'actions'
  ];

  datasource: any;
  loadingIndicator = true;
  missionId: any;
  participantMissionToUpdate: any;
  modalRef!: NgbModalRef;
  pageOptions: any = { page: 0, size: 20 };

  @Input() mission: any;

  constructor(
    private participantMissionService: ParticipantMissionService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getMissionId();
    this.getAllParticipantMissions();
  }

  getMissionId() {
    this.missionId = sessionStorage.getItem('missionId')!;
  }

  getAllParticipantMissions() {
    this.pageOptions.missionId = this.missionId;
    this.participantMissionService.readParticipantMissions(this.pageOptions).subscribe({
      next: (response) => {
        this.datasource = response;
        this.loadingIndicator = false;
      },
      error: (err) => {
        console.log(err);
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }

  openBasicModal(content: TemplateRef<any>, participant?: any) {
    this.participantMissionToUpdate = participant;
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }

  close(event: boolean) {
    if (event) {
      this.getAllParticipantMissions();
    }
  }

  doSearch(searchCriteria: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.pageOptions.missionId = this.missionId;
    this.pageOptions.idEmploye = searchCriteria.idEmploye;
    this.pageOptions.roleMission = searchCriteria.roleMission;
    this.pageOptions.dateAssignation = searchCriteria.dateAssignation;
    this.getAllParticipantMissions();
  }

  deleteParticipantMission(participantMissionId: any) {
    this.participantMissionService.deleteParticipantMission(participantMissionId).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Suppression réussie');
      },
      error: (err) => {
        Alertes.alerteAddDanger(err.error.message);
      },
      complete: () => {
        this.getAllParticipantMissions();
      }
    });
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllParticipantMissions();
  }
}