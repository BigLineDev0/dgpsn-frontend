import { AgentService } from '@/app/services/agent/agent.service';
import { ParticipantMissionService } from '@/app/services/participantMission/participant-mission.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgbModalRef, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';

@Component({
  selector: 'app-form-participant-mission',
  templateUrl: './form-participant-mission.component.html',
  styleUrls: ['./form-participant-mission.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbTooltipModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class FormParticipantMissionComponent {
  @Output() submit: EventEmitter<boolean | any> = new EventEmitter();
  @Input() missionId: any;
  @Input() isSearch!: boolean;
  @Input() label!: string;
  @Input() modal!: NgbModalRef;
  @Input() participantMissionToUpdate: any;

  form!: FormGroup;
  employes: any[] = [];

  constructor(
    private participantMissionService: ParticipantMissionService,
    private employeService: AgentService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getEmployes();
    if (this.participantMissionToUpdate) {
      this.editForm();
    }
  }

  initForm() {
    this.form = this.fb.group({
      idEmploye: [],
      roleMission: [],
      dateAssignation: [],
    });
  }

  editForm() {
    this.form.patchValue({
      idEmploye: this.participantMissionToUpdate?.idEmploye,
      roleMission: this.participantMissionToUpdate?.roleMission,
      dateAssignation: Helper.editDate(this.participantMissionToUpdate?.dateAssignation),
    });
  }

  getEmployes() {
    this.employeService.getAllAgents().subscribe({
      next: (response) => {
        this.employes = response.body?.content || response;
      },
      error: (err) => {
        console.error('Error fetching employes:', err);
      }
    });
  }

  save() {
    const participantMission = this.form.value;
    participantMission.missionId = +this.missionId;

    if (!this.participantMissionToUpdate) {
      this.create(participantMission);
    } else {
      this.update(this.participantMissionToUpdate.id, participantMission);
    }
  }

  create(participantMission: any) {
    this.participantMissionService.addParticipantMission(participantMission).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Enregistrement réussi');
      },
      error: (err) => {
        Alertes.alerteAddDanger(err.error.message);
      },
      complete: () => {
        this.close();
      }
    });
  }

  update(participantMissionId: any, participantMission: any) {
    this.participantMissionService.updateParticipantMission(participantMissionId, participantMission).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Modification réussie');
      },
      error: (err) => {
        Alertes.alerteAddDanger(err.error.message);
      },
      complete: () => {
        this.close();
      }
    });
  }

  close() {
    this.submit.emit(true);
    this.modal.close();
  }

  doSearch() {
    const searchCriteria = {
      idEmploye: this.form.value.idEmploye,
      roleMission: this.form.value.roleMission,
      dateAssignation: this.form.value.dateAssignation,
      missionId: +this.missionId,
    };
    this.submit.emit(searchCriteria);
  }
}