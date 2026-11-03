import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Alertes } from '@/app/util/alerte';
import { CandidatDTO } from '@/app/models/candidat.model';
import {CandidatService, RecrutementInfos} from '@/app/services/candidat/candidat.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

const niveauMapper: Record<string, string> = {
  'BFEM': 'BFEM',
  'BAC': 'BAC',
  'BAC_PLUS_2': 'BAC+2',
  'LICENCE': 'Licence',
  'MASTER_I': 'Master I',
  'MASTER_II': 'MASTER II',
  'DOCTORAT': 'Doctorat',
  'MAITRISE': 'Maîtrise',
};

const experienceMapper: Record<string, string> = {
  'UN_AN': '1 ans',
  'DEUX_ANS': '2 ans',
  'TROIS_ANS': '3 ans',
  'QUATRE_ANS': '4 ans',
  'CINQ_ANS': '5 ans',
  'PLUS_DE_CINQ_ANS': '+ 5 ans',
};

@Component({
  selector: 'app-form-candidat',
  templateUrl: './form-candidat.component.html',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, NgSelectModule,],
  styleUrls: ['./form-candidat.component.scss']
})
export class FormCandidatComponent implements OnInit {

  @Input() candidatToUpdate?: CandidatDTO;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  form!: FormGroup;

  niveaux = ['BFEM', 'BAC', 'BAC_PLUS_2', 'LICENCE', 'MASTER_I', 'MASTER_II', 'DOCTORAT', 'MAITRISE'];
  experiences = ['UN_AN', 'DEUX_ANS', 'TROIS_ANS', 'QUATRE_ANS', 'CINQ_ANS', 'PLUS_DE_CINQ_ANS'];

  constructor(private fb: FormBuilder, private candidatService: CandidatService, private modal: NgbModal) { }

  ngOnInit(): void {
    this.initForm();
    if (this.candidatToUpdate) {
      this.preloadFields();
    }
  }

  initForm() {
    this.form = this.fb.group({
      prenom: [null, Validators.required],
      nom: [null, Validators.required],
      adresse: [null, Validators.required],
      salaireSouhaite: [null],
      niveauEtude: [null, Validators.required],
      experienceProfessionnelle: [null],
      postePostule: [this.recrutements.libelle, Validators.required],
      competences: this.fb.array([]),
      cv: [null] // optionnel
    });
  }

  get recrutements(): RecrutementInfos {
      return this.candidatService.recrutement();
  }

  mapperNiveau(value: string): string {
      return niveauMapper[value] || value;
  }

  mapperExperience(value: string): string {
    return experienceMapper[value] || value;
  }

  get competences(): FormArray {
    return this.form.get('competences') as FormArray;
  }

  addCompetence(value: string = '') {
    this.competences.push(this.fb.control(value, Validators.required));
  }

  removeCompetence(index: number) {
    this.competences.removeAt(index);
  }

  preloadFields() {
    this.form.patchValue({
      prenom: this.candidatToUpdate?.prenom,
      nom: this.candidatToUpdate?.nom,
      adresse: this.candidatToUpdate?.adresse,
      salaireSouhaite: this.candidatToUpdate?.salaireSouhaite,
      niveauEtude: this.candidatToUpdate?.niveauEtude,
      experienceProfessionnelle: this.candidatToUpdate?.experienceProfessionnelle,
      postePostule: 'Développeur full stack' // toujours la valeur par défaut
    });

    this.candidatToUpdate?.competences?.forEach(c => this.addCompetence(c));
  }

  save() {
    if (this.candidatToUpdate) {
      this.updateCandidat();
    } else {
      this.createCandidat();
    }
  }

  createCandidat() {
    const dto: CandidatDTO = this.form.value;
    this.candidatService.saveCandidat(dto).subscribe({
      next: () => Alertes.alerteAddSuccess(),
      error: () => Alertes.alerteAddDanger(),
      complete: () => this.submit.emit(true)
    });

  }

  updateCandidat() {
    const dto: CandidatDTO = this.form.value;
    this.candidatService.updateCandidat(dto.id!,{id : dto.id, ...dto}).subscribe({
      next: () => Alertes.alerteUpdateSuccess(),
      error: () => Alertes.alerteAddDanger(),
      complete: () => this.submit.emit(true)
    });
  }

  close() {
    this.submit.emit(true);
  }
}
