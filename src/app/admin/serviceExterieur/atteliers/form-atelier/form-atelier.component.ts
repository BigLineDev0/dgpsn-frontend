import { AgentService } from '@/app/services/agent/agent.service';
import { AtelierService } from '@/app/services/atelier/atelier.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgbModalRef, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';

@Component({
  selector: 'app-form-atelier',
  templateUrl: './form-atelier.component.html',
  styleUrls: ['./form-atelier.component.scss'],
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
export class FormAtelierComponent {
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() isSearch!: boolean;
  @Input() label!: string;
  @Input() modal!: NgbModalRef;
  @Input() atelierToUpdate: any;

  statutAtelier = [
    { name: 'NOUVELLE', description: 'Nouvelle' },
    { name: 'EN_COURS', description: 'En cours de traitement' },
    { name: 'TRAITEE', description: 'Traitée' },
    { name: 'REJETEE', description: 'Rejetée' },
  ];

  form!: FormGroup;
  agents: any[] = [];

  constructor(
      private atelierService: AtelierService,
      private employeService: AgentService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAgents();
    if (this.atelierToUpdate) {
      this.loadFields();
    }
  }

  initForm() {
    this.form = this.fb.group({
      titreAtelier: [ '', Validators.required ],
      theme: [ '', Validators.required ],
      objectif: [ '', Validators.required ],
      dateAtelier: [ '', Validators.required ],
      heurDebut: [ '', Validators.required],
      heurFin: [ '', Validators.required],
      lieu: [ '', Validators.required],
      nombreParticipantsMax: [ '', Validators.required ],
      agentId: [ '', Validators.required],
      coutOrganisation: [ '', Validators.required],
      statut: [ '', Validators.required],
    });
  }

  loadFields() {
    if (this.atelierToUpdate !== undefined) {
      this.form.patchValue({
        titreAtelier: this.atelierToUpdate?.titreAtelier,
        theme: this.atelierToUpdate?.theme,
        objectif: this.atelierToUpdate?.objectif,
        dateAtelier: Helper.editDate(this.atelierToUpdate?.dateAtelier),
        heurDebut: this.extractTime(this.atelierToUpdate?.heurDebut),
        heurFin: this.extractTime(this.atelierToUpdate?.heurFin),
        lieu: this.atelierToUpdate?.lieu,
        nombreParticipantsMax: this.atelierToUpdate?.nombreParticipantsMax,
        agentId: this.atelierToUpdate?.agentId?.id || this.atelierToUpdate?.agentId,
        coutOrganisation: this.atelierToUpdate?.coutOrganisation,
        statut: this.atelierToUpdate?.statut?.name || this.atelierToUpdate?.statut,
      });
    }
  }

  extractTime(isoString: string): string {
    if (!isoString) return '';
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  getAgents() {
    this.employeService.getAllAgents().subscribe({
      next: (response) => {
        this.agents = response.content;
        console.log('✅ Agents chargés:', this.agents);
      },
      error: (err) => {
        console.error('❌ Erreur chargement agents:', err);
      }
    });
  }

  save() {
    if (this.atelierToUpdate === undefined) {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
    const atelier = this.prepareAtelierData();
    console.log('📤 Création atelier:', atelier);

    this.atelierService.addAtelier(atelier).subscribe({
      next: (response) => {
        console.log('✅ Atelier créé:', response);
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
    const atelier = this.prepareAtelierData();
    console.log('📤 Modification atelier:', atelier);

    this.atelierService.updateAtelier(this.atelierToUpdate.id, atelier).subscribe({
      next: (response) => {
        console.log('✅ Atelier modifié:', response);
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

  prepareAtelierData() {
    const atelier = { ...this.form.value };

    // Convertir dateAtelier en ISO
    if (atelier.dateAtelier) {
      atelier.dateAtelier = new Date(atelier.dateAtelier).toISOString();
    }

    // Convertir heurDebut en ISO
    if (atelier.heurDebut) {
      const [h, m] = atelier.heurDebut.split(':');
      const dateDebut = new Date();
      dateDebut.setHours(+h, +m, 0, 0);
      atelier.heurDebut = dateDebut.toISOString();
    }

    // Convertir heurFin en ISO
    if (atelier.heurFin) {
      const [h, m] = atelier.heurFin.split(':');
      const dateFin = new Date();
      dateFin.setHours(+h, +m, 0, 0);
      atelier.heurFin = dateFin.toISOString();
    }

    // Convertir le statut en objet si nécessaire
    if (atelier.statut && typeof atelier.statut === 'string') {
      const statutObj = this.statutAtelier.find(s => s.name === atelier.statut);
      if (statutObj) {
        atelier.statut = { name: statutObj.name, description: statutObj.description };
      }
    }

    return atelier;
  }

  doSearch() {
    const searchCriteria = {
      titreAtelier: this.form.value.titreAtelier,
      theme: this.form.value.theme,
      lieu: this.form.value.lieu,
      statut: this.form.value.statut,
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