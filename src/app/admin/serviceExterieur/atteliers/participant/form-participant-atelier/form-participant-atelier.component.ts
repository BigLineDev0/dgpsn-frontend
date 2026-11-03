import { AgentService } from '@/app/services/agent/agent.service';
import { ParticipantAtelierService } from '@/app/services/participant-attelier/participant-atelier.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgbModalRef, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import {ParticipantService} from "@/app/services/participant/participant.service";

@Component({
  selector: 'app-form-participant-atelier',
  templateUrl: './form-participant-atelier.component.html',
  styleUrls: ['./form-participant-atelier.component.scss'],
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
export class FormParticipantAtelierComponent {
  @Output() submit: EventEmitter<boolean | any> = new EventEmitter();
  @Input() atelierId: any;
  @Input() isSearch!: boolean;
  @Input() label!: string;
  @Input() modal!: NgbModalRef;
  @Input() participantAtelierToUpdate: any;

  form!: FormGroup;
  employes: any[] = [];

  constructor(
    private participantAtelierService: ParticipantService,
    private employeService: AgentService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getEmployes();
    if (this.participantAtelierToUpdate) {
      this.editForm();
    }
  }

  initForm() {
    this.form = this.fb.group({
      idEmploye: [],
      dateInscription: [],
      statutPresence: [],
      evaluation: [],
    });
  }

  editForm() {
    this.form.patchValue({
      idEmploye: this.participantAtelierToUpdate?.idEmploye,
      dateInscription: Helper.editDate(this.participantAtelierToUpdate?.dateInscription),
      statutPresence: this.participantAtelierToUpdate?.statutPresence,
      evaluation: this.participantAtelierToUpdate?.evaluation,
    });
  }

  getEmployes() {
    this.employeService.getAllAgents().subscribe({
      next: (response) => {
        this.employes = response?.content
      },
      error: (err) => {
        console.error('Error fetching employes:', err);
      }
    });
  }

  save() {
    const participantAtelier = this.form.value;
    participantAtelier.typeParticipant= "ATELIER"
    participantAtelier.atelierId = localStorage.getItem("atelierId");

    if (!this.participantAtelierToUpdate) {
      this.create(participantAtelier);
    } else {
      this.update(this.participantAtelierToUpdate.id, participantAtelier);
    }
  }

  create(participant: any) {
    this.participantAtelierService.addParticipant(participant).subscribe({
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

  update(participantAtelierId: any, participantAtelier: any) {
    this.participantAtelierService.updateParticipant(participantAtelierId, participantAtelier).subscribe({
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
      dateInscription: this.form.value.dateInscription,
      statutPresence: this.form.value.statutPresence,
      atelierId: +this.atelierId,
    };
    this.submit.emit(searchCriteria);
  }
}