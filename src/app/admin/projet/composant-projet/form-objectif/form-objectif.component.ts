import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManangementUnitService } from '@/app/services/manangement-unit/manangement-unit.service';
import { Alertes } from '@/app/util/alerte';

@Component({
  selector: 'app-form-objectif',
  templateUrl: './form-objectif.component.html',
  styleUrls: ['./form-objectif.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class FormObjectifComponent implements OnInit {
  form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() objectifToUpdate: any;
  @Input() isSearch: boolean = false;
  @Input() budgetId: any;

  constructor(
      private readonly modalService: NgbModal,
      private readonly managementUnitService: ManangementUnitService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      code: new FormControl(null, Validators.required),
      libelle: new FormControl(null, Validators.required),
      description: new FormControl(null)
    });

    this.loadFields();
  }

  loadFields(): void {
    if (this.objectifToUpdate) {
      this.form.patchValue({
        code: this.objectifToUpdate.code,
        libelle: this.objectifToUpdate.name,
        description: this.objectifToUpdate.description
      });
    }
  }

  save(): void {
    const objectif = {
      nomenclature: this.form.value.code,
      name: this.form.value.libelle,
      description: this.form.value.description,
      type: 'OBJECTIF'
    };

    if (this.objectifToUpdate) {
      this.update(objectif);
    } else {
      this.create(objectif);
    }
  }

  create(objectif: any): void {
    objectif.budgetDgpsnId = this.budgetId;
    this.managementUnitService.createNode(objectif, 'OBJECTIF').subscribe({
      next: () => {
        Alertes.alerteAddSuccess('L\'objectif a été ajouté avec succès');
        this.close();
      },
      error: (error) => {
        Alertes.errorPopPup('Erreur', error?.error?.message || 'Une erreur est survenue');
        console.error('Error creating objectif:', error);
      }
    });
  }

  update(objectif: any): void {
    this.managementUnitService.updateProjet(this.objectifToUpdate.id, objectif).subscribe({
      next: () => {
        Alertes.alerteUpdateSuccess('L\'objectif a été mis à jour avec succès');
        this.close();
      },
      error: (error) => {
        Alertes.errorPopPup('Erreur', error?.error?.message || 'Une erreur est survenue');
        console.error('Error updating objectif:', error);
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
