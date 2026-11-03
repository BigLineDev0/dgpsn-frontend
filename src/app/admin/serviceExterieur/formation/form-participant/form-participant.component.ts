import { AgentService } from '@/app/services/agent/agent.service';
import { ParticipantService } from '@/app/services/participant/participant.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgbModalRef, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';

@Component({
  selector: 'app-form-participant',
  templateUrl: './form-participant.component.html',
  styleUrls: ['./form-participant.component.scss'],
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
export class FormParticipantComponent {
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() formationId: any;
  @Input() isSearch!: boolean;
  @Input() label!: string;
  @Input() modal!: NgbModalRef;
  @Input() participantToUpdate: any;



  statutOptions = [
    { name: 'NOUVELLE', description: 'Nouvelle' },
    { name: 'EN_COURS', description: 'En cours de traitement' },
    { name: 'TRAITEE', description: 'Traitée' },
    { name: 'REJETEE', description: 'Rejetée' }
  ];


  form!: FormGroup;
  employes: any[] = [];

  constructor(
      private participantService: ParticipantService,
      private employeService: AgentService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getEmployes();
    if (this.participantToUpdate) {
      this.loadFields();
    }
  }

  initForm() {
    this.form = this.fb.group({
      agentId: [ ''],
      dateInscription: [ '', Validators.required ],
      statut: [ '', Validators.required ],
      noteEvaluation: [ '', Validators.required ],
      certificatObtenu: [false, Validators.required],
      commentaires: [ ''],
    });
  }

  loadFields() {
    if (this.participantToUpdate !== undefined) {
      this.form.patchValue({
        agentId: this.participantToUpdate?.agent?.id || this.participantToUpdate?.agentId,
        dateInscription: Helper.editDate(this.participantToUpdate?.dateInscription),
        statut: this.participantToUpdate?.statut?.name || this.participantToUpdate?.statut,
        noteEvaluation: this.participantToUpdate?.noteEvaluation,
        certificatObtenu: this.participantToUpdate?.certificatObtenu || false,
        commentaires: this.participantToUpdate?.commentaires,
      });
    }
  }

  getEmployes() {
    this.employeService.getAllAgents().subscribe({
      next: (response) => {
        this.employes = response?.content || [];
        console.log('✅ Employés chargés:', this.employes);
      },
      error: (err) => {
        console.error('❌ Erreur chargement employés:', err);
      }
    });
  }

  save() {
    if (this.participantToUpdate === undefined) {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
    const participant = this.prepareParticipantData();
    console.log('📤 Création participant:', participant);

    this.participantService.addParticipant(participant).subscribe({
      next: (response) => {
        console.log('✅ Participant créé:', response);
        Alertes.alerteAddSuccess('Enregistrement réussi');
        this.emitSubmit();
      },
      error: (err) => {
        console.error('❌ Erreur création:', err);
        Alertes.alerteAddDanger(err.error?.message || 'Erreur lors de la création');
      },
      complete: () => {
        this.closeModal();
      }
    });
  }

  update() {
    const participant = this.prepareParticipantData();
    console.log('📤 Modification participant:', participant);

    this.participantService.updateParticipant(this.participantToUpdate.id, participant).subscribe({
      next: (response) => {
        console.log('✅ Participant modifié:', response);
        Alertes.alerteAddSuccess('Modification réussie');
        this.emitSubmit();
      },
      error: (err) => {
        console.error('❌ Erreur modification:', err);
        Alertes.alerteAddDanger(err.error?.message || 'Erreur lors de la modification');
      },
      complete: () => {
        this.closeModal();
      }
    });
  }

  prepareParticipantData() {
    const participant = { ...this.form.value };

    // ✅ Ajouter les champs requis
    participant.typeParticipant = "FORMATIONEXTERIEUR";
    participant.formationId = localStorage.getItem("formationId")!;

    // Convertir la date en ISO
    if (participant.dateInscription) {
      participant.dateInscription = new Date(participant.dateInscription).toISOString();
    }

    // Convertir le statut en objet
    if (participant.statut && typeof participant.statut === 'string') {
      const statutObj = this.statutOptions.find(s => s.name === participant.statut);
      if (statutObj) {
        participant.statut = { name: statutObj.name, description: statutObj.description };
      }
    }

    return participant;
  }

  doSearch() {
    const searchCriteria = {
      agentId: this.form.value.agentId,
      dateInscription: this.form.value.dateInscription,
      statut: this.form.value.statut,
      formationId: +this.formationId,
    };
    this.search.emit(searchCriteria);
    this.closeModal();
  }

  closeModal() {
    this.modal.close();
  }

  emitSubmit() {
    this.submit.emit(true);
  }

  close() {
    this.closeModal();
  }
}