import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManangementUnitService } from '@/app/services/manangement-unit/manangement-unit.service';
import { Alertes } from '@/app/util/alerte';

@Component({
  selector: 'app-form-indicateur',
  templateUrl: './form-indicateur.component.html',
  styleUrls: ['./form-indicateur.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class FormIndicateurComponent implements OnInit {
  form!: FormGroup;

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();

  @Input() indicateurToUpdate: any;
  @Input() isSearch: boolean = false;
  @Input() activityId: any; // L'ID de l'activité parente

  constructor(
      private readonly modalService: NgbModal,
      private readonly managementUnitService: ManangementUnitService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadFields();
  }

  initializeForm(): void {
    const validators = this.isSearch ? [] : [Validators.required];

    this.form = new FormGroup({
      code: new FormControl(null, validators),
      libelle: new FormControl(null, validators)
    });
  }

  loadFields(): void {
    if (this.indicateurToUpdate) {
      this.form.patchValue({
        code: this.indicateurToUpdate.code,
        libelle: this.indicateurToUpdate.name || this.indicateurToUpdate.libelle
      });
    }
  }

  save(): void {
    if (!this.form.valid && !this.isSearch) {
      return;
    }

    const indicateur = {
      code: this.form.value.code,
      nomenclature: this.form.value.code,
      name: this.form.value.libelle,
      type: 'INDICATOR',
      parentId: this.activityId
    };

    if (this.indicateurToUpdate?.id) {
      this.update(indicateur);
    } else {
      this.create(indicateur);
    }
  }

  create(indicateur: any): void {
    if (!indicateur.parentId) {
      Alertes.errorPopPup('Erreur', 'L\'activité parente est requise');
      return;
    }

    this.managementUnitService.createNode(indicateur, 'INDICATOR').subscribe({
      next: () => {
        Alertes.alerteAddSuccess('L\'indicateur a été ajouté avec succès');
        this.close();
      },
      error: (error) => {
        Alertes.errorPopPup('Erreur', error?.error?.message || 'Une erreur est survenue');
        console.error('Error creating indicator:', error);
      }
    });
  }

  update(indicateur: any): void {
    this.managementUnitService.updateProjet(this.indicateurToUpdate.id, indicateur).subscribe({
      next: () => {
        Alertes.alerteUpdateSuccess('L\'indicateur a été mis à jour avec succès');
        this.close();
      },
      error: (error) => {
        Alertes.errorPopPup('Erreur', error?.error?.message || 'Une erreur est survenue');
        console.error('Error updating indicator:', error);
      }
    });
  }

  doSearch(): void {
    this.search.emit(this.form.value);
  }

  close(): void {
    this.submit.emit(true);
  }
}
