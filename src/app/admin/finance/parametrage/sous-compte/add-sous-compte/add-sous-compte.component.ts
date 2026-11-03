import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { PlanComptableElementService } from '@/app/services/plan-comptable/plan-comptable-element.service';
import { Alertes } from '@/app/util/alerte';

@Component({
  selector: 'app-add-sous-compte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-sous-compte.component.html',
  styleUrl: './add-sous-compte.component.scss'
})
export class AddSousCompteComponent implements OnInit {
  form!: FormGroup;

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() sousCompteToUpdate: any;
  @Input({ required: true }) compteId!: number; // ID du compte parent

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
    if (this.sousCompteToUpdate) {
         this.form.patchValue({
        code: this.sousCompteToUpdate.code,
        libelle: this.sousCompteToUpdate.libelle,
        commentaire: this.sousCompteToUpdate.commentaire
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
      type: 'SOUS_COMPTE',
      // parentId: this.compteId 
      parentId : localStorage.getItem("compteId")
    };
    if (!this.sousCompteToUpdate) {
      this.create(formData);
    } else {
      this.update(formData);
    }
  }

  /**
   * Créer un nouveau sous-compte
   */
  create(formData: any) {
    this.planComptableService.createPlanComptableElement(formData).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess('Sous-compte créé avec succès');
        this.emitSubmit();
        this.close();
      },
      error: (error) => {
        Alertes.alerteAddDanger(
          error?.error?.message || 'Erreur lors de la création du sous-compte'
        );
      }
    });
  }

  /**
   * Modifier un sous-compte existant
   */
  update(formData: any) {
    this.planComptableService.updatePlanComptableElement(
      this.sousCompteToUpdate.id,
      formData
    ).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess('Sous-compte modifié avec succès');
        this.emitSubmit();
        this.close();
      },
      error: (error) => {
        Alertes.alerteAddDanger(
          error?.error?.message || 'Erreur lors de la modification du sous-compte'
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