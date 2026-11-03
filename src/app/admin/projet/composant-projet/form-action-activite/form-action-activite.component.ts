import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManangementUnitService } from '@/app/services/manangement-unit/manangement-unit.service';
import { StructureService } from '@/app/services/structure/structure.service';
import { Alertes } from '@/app/util/alerte';
import {NgOptionComponent, NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: 'app-form-action-activite',
  templateUrl: './form-action-activite.component.html',
  styleUrls: ['./form-action-activite.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectComponent, NgOptionComponent]
})
export class FormActionActiviteComponent implements OnInit {

  form!: FormGroup;

  @Output() itemEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() submit: EventEmitter<boolean> = new EventEmitter();  // AJOUT pour compatibilité
  @Output() search: EventEmitter<any> = new EventEmitter();

  @Input() item: any;
  @Input() parentId: any;
  @Input() type: 'ACTION' | 'ACTIVITY' | 'INDICATOR' = 'ACTION';
  @Input() view: boolean = false;
  @Input() isSearch: boolean = false;

  structures: any[] = [];
  loadingStructures: boolean = false;

  constructor(
      private readonly managementUnitService: ManangementUnitService,
      private readonly structureService: StructureService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadStructures();
    this.loadFields();
  }

  /**
   * Charger les structures depuis l'API
   */
  loadStructures(): void {
    this.loadingStructures = true;
    this.structureService.readStructures({ page: 0, size: 1000 }).subscribe({
      next: (response) => {
        this.structures = response.content || [];
        console.log('Structures chargées:', this.structures.length);
        this.loadingStructures = false;
      },
      error: (error) => {
        console.error('Error loading structures:', error);
        this.structures = [];
        this.loadingStructures = false;
      }
    });
  }

  initializeForm(): void {
    const validators = this.isSearch ? [] : [Validators.required];

    const formConfig: any = {
      code: new FormControl(null, validators),
      libelle: new FormControl(null, validators),
      description: new FormControl(null)
    };

    // Champs spécifiques pour ACTIVITY
    if (this.type === 'ACTIVITY') {
      formConfig.structuresResponsables = new FormControl([]);
      formConfig.actorsInvolved = new FormControl([]); // Liste de structures
      formConfig.annee = new FormControl(2025);
      formConfig.observations = new FormControl(null);
    }

    this.form = new FormGroup(formConfig);
  }

  loadFields(): void {
    if (this.item) {
      const values: any = {
        code: this.item.code,
        libelle: this.item.name || this.item.libelle,
        description: this.item.description
      };

      if (this.type === 'ACTIVITY') {
        // Charger les structures responsables (IDs uniquement)
        if (this.item.structuresResponsables) {
          values.structuresResponsables = this.item.structuresResponsables.map((s: any) => s.id);
        }

        // Charger les acteurs impliqués (IDs uniquement) - actorsInvolved est une liste de structures
        if (this.item.actorsInvolved) {
          values.actorsInvolved = this.item.actorsInvolved.map((s: any) => s.id);
        }

        values.annee = this.item.annee;
        values.observations = this.item.observations;
      }

      this.form.patchValue(values);
    }
  }

  save(): void {
    if (!this.form.valid && !this.isSearch) {
      console.log('Form invalid:', this.form.errors);
      return;
    }

    const data: any = {
      code: this.form.value.code,
      nomenclature: this.form.value.code,
      name: this.form.value.libelle,
      libelle: this.form.value.libelle,
      description: this.form.value.description,
      type: this.type
    };

    // Données spécifiques pour ACTIVITY
    if (this.type === 'ACTIVITY') {
      // Envoyer les IDs des structures responsables
      if (this.form.value.structuresResponsables && this.form.value.structuresResponsables.length > 0) {
        data.structuresResponsablesIds = this.form.value.structuresResponsables;
      }

      // Envoyer les IDs des acteurs impliqués (structures)
      if (this.form.value.actorsInvolved && this.form.value.actorsInvolved.length > 0) {
        data.actorsInvolvedIds = this.form.value.actorsInvolved;
      }

      data.annee = this.form.value.annee || 2025;
      data.observations = this.form.value.observations;
    }

    if (this.item?.id) {
      this.update(data);
    } else {
      this.create(data);
    }
  }

  create(data: any): void {
    data.parentId = this.parentId || this.item?.parent?.id;

    if (!data.parentId) {
      Alertes.errorPopPup('Erreur', 'Le parent est requis pour créer cet élément');
      console.error('parentId is missing');
      return;
    }

    const typeLabel = this.type === 'ACTION' ? 'action' : 'activité';

    console.log('Ajout via addNodeToTreeManagementUnit:', data);

    this.managementUnitService.addNodeToTreeManagementUnit(data.parentId, data).subscribe({
      next: (response) => {
        console.log('Réponse ajout:', response);
        Alertes.alerteAddSuccess(`L'${typeLabel} a été ajoutée avec succès`);
        this.close();
      },
      error: (error) => {
        Alertes.errorPopPup('Erreur', error?.error?.message || 'Une erreur est survenue');
        console.error(`Error creating ${this.type}:`, error);
      }
    });
  }

  update(data: any): void {
    const typeLabel = this.type === 'ACTION' ? 'action' : 'activité';

    this.managementUnitService.updateProjet(this.item.id, data).subscribe({
      next: () => {
        Alertes.alerteUpdateSuccess(`L'${typeLabel} a été mise à jour avec succès`);
        this.close();
      },
      error: (error) => {
        Alertes.errorPopPup('Erreur', error?.error?.message || 'Une erreur est survenue');
        console.error(`Error updating ${this.type}:`, error);
      }
    });
  }

  doSearch(): void {
    this.search.emit(this.form.value);
  }

  close(): void {
    this.itemEvent.emit(true);
    this.submit.emit(true);  // Émettre aussi submit pour compatibilité
  }
}
