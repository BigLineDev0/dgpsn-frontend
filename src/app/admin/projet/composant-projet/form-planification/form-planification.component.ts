import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Alertes } from '@/app/util/alerte';
import {PlanificationService} from "@/app/services/planification/planification.service";

@Component({
  selector: 'app-form-planification',
  templateUrl: './form-planification.component.html',
  styleUrls: ['./form-planification.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule]
})
export class FormPlanificationComponent implements OnInit {

  form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() planningToUpdate: any;
  @Input() isSearch: boolean = false;
  @Input() activityId: any;
  @Input() label: string = 'Enregistrer';
  @Input() modal!: NgbModalRef;

  moisDisponibles: any[] = [];
  semainesDisponibles: any[] = [
    { value: 1, label: 'Semaine 1' },
    { value: 2, label: 'Semaine 2' },
    { value: 3, label: 'Semaine 3' },
    { value: 4, label: 'Semaine 4' }
  ];

  allMois: any[] = [
    { value: 1, label: 'Janvier' }, { value: 2, label: 'Février' }, { value: 3, label: 'Mars' },
    { value: 4, label: 'Avril' }, { value: 5, label: 'Mai' }, { value: 6, label: 'Juin' },
    { value: 7, label: 'Juillet' }, { value: 8, label: 'Août' }, { value: 9, label: 'Septembre' },
    { value: 10, label: 'Octobre' }, { value: 11, label: 'Novembre' }, { value: 12, label: 'Décembre' }
  ];

  constructor(private readonly planificationService: PlanificationService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadFields();
  }

  initializeForm(): void {
    const validators = this.isSearch ? [] : [Validators.required];

    this.form = new FormGroup({
      trimestre: new FormControl(null, validators),
      mois: new FormControl(null, validators),
      dateDebut: new FormControl(null, validators),
      dateFin: new FormControl(null, validators),
      statut: new FormControl('PLANIFIE'),
      semaines: new FormControl([]),
      commentaire: new FormControl(null)
    });
  }

  loadFields(): void {
    if (this.planningToUpdate) {
      this.form.patchValue({
        trimestre: this.planningToUpdate.trimestre,
        mois: this.planningToUpdate.mois,
        dateDebut: this.planningToUpdate.dateDebut,
        dateFin: this.planningToUpdate.dateFin,
        statut: this.planningToUpdate.statut || 'PLANIFIE',
        semaines: this.planningToUpdate.semaines || [],
        commentaire: this.planningToUpdate.commentaire
      });
      this.onTrimestreChange();
    }
  }

  onTrimestreChange(): void {
    const trimestre = this.form.get('trimestre')?.value;
    if (trimestre) {
      const ranges: any = {
        1: [1, 2, 3],
        2: [4, 5, 6],
        3: [7, 8, 9],
        4: [10, 11, 12]
      };
      const moisRange = ranges[trimestre] || [];
      this.moisDisponibles = this.allMois.filter(m => moisRange.includes(m.value));
    } else {
      this.moisDisponibles = [];
    }
  }

  save(): void {
    if (!this.form.valid) return;

    const planning = {
      activityId: this.activityId,
      trimestre: this.form.value.trimestre,
      mois: this.form.value.mois,
      dateDebut: this.form.value.dateDebut,
      dateFin: this.form.value.dateFin,
      statut: this.form.value.statut,
      semaines: this.form.value.semaines || [],
      commentaire: this.form.value.commentaire
    };

    if (this.planningToUpdate) {
      this.update(planning);
    } else {
      this.create(planning);
    }
  }

  create(planning: any): void {
    this.planificationService.createPlanification(planning).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Planification ajoutée avec succès');
        this.close();
      },
      error: (error) => {
        Alertes.errorPopPup('Erreur', error?.error?.message || 'Une erreur est survenue');
      }
    });
  }

  update(planning: any): void {
    this.planificationService.updatePlanification(this.planningToUpdate.id, planning).subscribe({
      next: () => {
        Alertes.alerteUpdateSuccess('Planification mise à jour avec succès');
        this.close();
      },
      error: (error) => {
        Alertes.errorPopPup('Erreur', error?.error?.message || 'Une erreur est survenue');
      }
    });
  }

  doSearch(): void {
    this.search.emit(this.form.value);
  }

  close(): void {
    this.submit.emit(true);
    if (this.modal) {
      this.modal.close();
    }
  }
}
