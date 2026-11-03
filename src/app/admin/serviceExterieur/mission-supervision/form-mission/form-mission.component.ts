import { AgentService } from '@/app/services/agent/agent.service';
import { MissionService } from '@/app/services/mission/mission.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgbModalRef, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';

@Component({
  selector: 'app-form-mission',
  templateUrl: './form-mission.component.html',
  styleUrls: ['./form-mission.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
  ]
})
export class FormMissionComponent {
  @Output() submit: EventEmitter<boolean | any> = new EventEmitter();
  @Input() projetId: any;
  @Input() isSearch!: boolean;
  @Input() label!: string;
  @Input() modal!: NgbModalRef;
  @Input() missionToUpdate: any;

  form!: FormGroup;
  employes: any[] = [];

  constructor(
    private missionService: MissionService,
    private employeService: AgentService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getEmployes();
    if (this.missionToUpdate) {
      this.editForm();
    }
  }

  initForm() {
    this.form = this.fb.group({
      numeroOrdreMission: [],
      typeMission: [],
      objet: [],
      lieuDestination: [],
      dateDebut: [],
      dateFin: [],
      dureeJours: [],
      budgetAlloue: [],
      devise: [],
      idResponsableMission: [],
      statut: [],
      rapportDisponible: [false],
      dateRapport: [],
    });
  }

  editForm() {
    this.form.patchValue({
      numeroOrdreMission: this.missionToUpdate?.numeroOrdreMission,
      typeMission: this.missionToUpdate?.typeMission,
      objet: this.missionToUpdate?.objet,
      lieuDestination: this.missionToUpdate?.lieuDestination,
      dateDebut: Helper.editDate(this.missionToUpdate?.dateDebut),
      dateFin: Helper.editDate(this.missionToUpdate?.dateFin),
      dureeJours: this.missionToUpdate?.dureeJours,
      budgetAlloue: this.missionToUpdate?.budgetAlloue,
      devise: this.missionToUpdate?.devise,
      idResponsableMission: this.missionToUpdate?.idResponsableMission,
      statut: this.missionToUpdate?.statut,
      rapportDisponible: this.missionToUpdate?.rapportDisponible,
      dateRapport: Helper.editDate(this.missionToUpdate?.dateRapport),
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
    const mission = this.form.value;
    mission.projetId = +this.projetId;

    if (!this.missionToUpdate) {
      this.create(mission);
    } else {
      this.update(this.missionToUpdate.id, mission);
    }
  }

  create(mission: any) {
    this.missionService.addMission(mission).subscribe({
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

  update(missionId: any, mission: any) {
    this.missionService.updateMission(missionId, mission).subscribe({
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
      numeroOrdreMission: this.form.value.numeroOrdreMission,
      typeMission: this.form.value.typeMission,
      lieuDestination: this.form.value.lieuDestination,
      statut: this.form.value.statut,
      projetId: +this.projetId,
    };
    this.submit.emit(searchCriteria);
  }
}