import { FormationExterieurService } from '@/app/services/formationExterieur/formation-exterieur.service';
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
  selector: 'app-form-formation-exterieur',
  templateUrl: './form-formation-exterieur.component.html',
  styleUrls: ['./form-formation-exterieur.component.scss'],
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
export class FormFormationExterieurComponent {
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() agentId: any;
  
  @Input() isSearch!: boolean;
  @Input() label!: string;
  @Input() modal!: NgbModalRef;
  @Input() formationToUpdate: any;

  form!: FormGroup;

  statutformationexterieur = [
    { name: 'NOUVELLE', description: 'Nouvelle' },
    { name: 'EN_COURS', description: 'En cours de traitementEn' },
    { name: 'TRAITEE', description: 'Traitée' },
    { name: 'REJETEE', description: 'Rejetée' },
  ];

  constructor(
    private formationService: FormationExterieurService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
     this.agentId = localStorage.getItem("idAgent")
    this.initForm();
    if (this.formationToUpdate) {
      this.editForm();
    }
  }

  initForm() {
    this.form = this.fb.group({
      titreFormation: [ '',Validators.required],
      organismeFormateur: [ '', Validators.required],
      lieu: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      dureeJours: ['', Validators.required],
      coutTotal: ['', Validators.required],
      devise: ['', Validators.required],
      nombreParticipants: [Validators.required],
      objectifs: ['', Validators.required],
      statut: ['', Validators.required],
    });
  }

  editForm() {
    this.form.patchValue({
      titreFormation: this.formationToUpdate?.titreFormation,
      organismeFormateur: this.formationToUpdate?.organismeFormateur,
      lieu: this.formationToUpdate?.lieu,
      dateDebut: Helper.editDate(this.formationToUpdate?.dateDebut),
      dateFin: Helper.editDate(this.formationToUpdate?.dateFin),
      dureeJours: this.formationToUpdate?.dureeJours,
      coutTotal: this.formationToUpdate?.coutTotal,
      devise: this.formationToUpdate?.devise,
      nombreParticipants: this.formationToUpdate?.nombreParticipants,
      objectifs: this.formationToUpdate?.objectifs,
      statut: this.formationToUpdate?.statut,
    });
  }

  save() {
    // Cloner les valeurs du formulaire
    const formation = { ...this.form.value, agentId: +this.agentId };

    // Conversion des dates en ISO string pour le backend
    if (formation.dateDebut) {
      const dateDebut = new Date(formation.dateDebut);
      formation.dateDebut = dateDebut.toISOString();
    }

    if (formation.dateFin) {
      const dateFin = new Date(formation.dateFin);
      formation.dateFin = dateFin.toISOString();
    }

    // Conversion du statut en objet {name, description} si nécessaire
    if (formation.statut && typeof formation.statut === 'string') {
      const statutObj = this.statutformationexterieur.find(
          (s) => s.name === formation.statut
      );
      if (statutObj) {
        formation.statut = { name: statutObj.name, description: statutObj.description };
      }
    }

    // Création ou modification
    if (!this.formationToUpdate) {
      this.formationService.addFormationExterieur(formation).subscribe({
        next: () => {
          Alertes.alerteAddSuccess('Enregistrement réussi');
          this.emitSubmit();
        },
        error: (err) => {
          Alertes.alerteAddDanger(err.error?.message || 'Erreur lors de la création');
        },
        complete: () => {
          this.closeModal();
        }
      });
    } else {
      this.formationService.updateFormationExterieur(this.formationToUpdate.id, formation).subscribe({
        next: () => {
          Alertes.alerteAddSuccess('Modification réussie');
          this.emitSubmit();
        },
        error: (err) => {
          Alertes.alerteAddDanger(err.error?.message || 'Erreur lors de la modification');
        },
        complete: () => {
          this.closeModal();
        }
      });
    }
  }


  create(formation: any) {
    console.log('📤 Création formation:', formation);
    this.formationService.addFormationExterieur(formation).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Enregistrement réussi');
        this.emitSubmit();
      },
      error: (err) => {
        Alertes.alerteAddDanger(err.error?.message || 'Erreur lors de la création');
      },
      complete: () => {
        this.closeModal();
      }
    });
  }


  update(formationId: any, formation: any) {
    console.log('📤 Modification formation:', formation);
    this.formationService.updateFormationExterieur(formationId, formation).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Modification réussie');
        this.emitSubmit();
      },
      error: (err) => {
        Alertes.alerteAddDanger(err.error?.message || 'Erreur lors de la modification');
      },
      complete: () => {
        this.closeModal();
      }
    });
  }
  close() {
    this.submit.emit(true);
    this.modal.close();
  }
  closeModal() {
    if (this.modal) {
      this.modal.close();
    }
  }

  emitSubmit() {
    this.submit.emit(true);
  }

  doSearch() {
    const searchCriteria = {
      titreFormation: this.form.value.titreFormation,
      organismeFormateur: this.form.value.organismeFormateur,
      dateDebut: this.form.value.dateDebut,
      statut: this.form.value.statut,
      agentId: +this.agentId,
    };
    this.submit.emit(true);
  }
}