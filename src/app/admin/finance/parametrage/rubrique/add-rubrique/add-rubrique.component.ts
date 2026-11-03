import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { PlanComptableElementService } from '@/app/services/plan-comptable/plan-comptable-element.service';
import { Alertes } from '@/app/util/alerte';

@Component({
  selector: 'app-add-rubrique',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-rubrique.component.html',
  styleUrl: './add-rubrique.component.scss'
})
export class AddRubriqueComponent implements OnInit {
  form!: FormGroup;

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() rubriqueToUpdate: any;
  @Input({ required: true }) sousCompteId!: number; // ID du sous-compte parent

  private planComptableService = inject(PlanComptableElementService);
  private modalService = inject(NgbModal);

  ngOnInit(): void {
    this.initForm();
    this.loadFields();
  }

  /**
   * Initialiser le formulaire
   */
  initForm() {
    this.form = new FormGroup({
      code: new FormControl("", [
        Validators.required,
        Validators.maxLength(100)
      ]),
      libelle: new FormControl("", [
        Validators.required,
        Validators.maxLength(150)
      ]),
      commentaire: new FormControl("", [
        Validators.maxLength(255)
      ])
    });
  }

  /**
   * Charger les données en mode modification
   */
  loadFields() {
    if (this.rubriqueToUpdate) {
      this.form.patchValue({
        code: this.rubriqueToUpdate.code,
        libelle: this.rubriqueToUpdate.libelle,
        commentaire: this.rubriqueToUpdate.commentaire
      });
    }
  }

  /**
   * Sauvegarder (créer ou modifier)
   */
  save() {
    if (this.form.invalid) {
      this.markFormFieldsAsTouched();
      Alertes.alerteAddDanger('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const formData = {
      ...this.form.value,
      type: 'RUBRIQUE',     
      // parentId: this.sousCompteId  
      parentId:localStorage.getItem('sousCompteId'),
    };

    if (!this.rubriqueToUpdate) {
      this.create(formData);
    } else {
      this.update(formData);
    }
  }

  /**
   * Créer une nouvelle rubrique
   */
  create(formData: any) {
    this.planComptableService.createPlanComptableElement(formData).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess('Rubrique créée avec succès');
        this.emitSubmit();
        this.close();
      },
      error: (error) => {
        Alertes.alerteAddDanger(
          error?.error?.message || 'Erreur lors de la création de la rubrique'
        );
      }
    });
  }

  /**
   * Modifier une rubrique existante
   */
  update(formData: any) {
    this.planComptableService.updatePlanComptableElement(
      this.rubriqueToUpdate.id,
      formData
    ).subscribe({
      next: (data) => {
        console.log("✅ Rubrique modifiée avec succès:", data);
        Alertes.alerteAddSuccess('Rubrique modifiée avec succès');
        this.emitSubmit();
        this.close();
      },
      error: (error) => {
        console.error("❌ Erreur modification:", error);
        Alertes.alerteAddDanger(
          error?.error?.message || 'Erreur lors de la modification de la rubrique'
        );
      }
    });
  }

  /**
   * Marquer tous les champs comme touchés pour afficher les erreurs
   */
  markFormFieldsAsTouched() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  /**
   * Fermer le modal
   */
  close() {
    this.modalService.dismissAll();
  }

  /**
   * Émettre l'événement de soumission
   */
  emitSubmit() {
    this.submit.emit(true);
  }
}