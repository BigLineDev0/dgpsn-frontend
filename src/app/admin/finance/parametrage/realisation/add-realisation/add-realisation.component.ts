import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { PlanComptableElementService } from '@/app/services/plan-comptable/plan-comptable-element.service';
import { Alertes } from '@/app/util/alerte';

@Component({
  selector: 'app-add-realisation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-realisation.component.html',
  styleUrl: './add-realisation.component.scss'
})
export class AddRealisationComponent implements OnInit {
  form!: FormGroup;

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() realisationToUpdate: any;
  @Input({ required: true }) rubriqueId!: number; // ID de la rubrique parent

  private planComptableService = inject(PlanComptableElementService);
  private modalService = inject(NgbModal);

  ngOnInit(): void {
    console.log("AddRealisationComponent initialisé");
    console.log("realisationToUpdate:", this.realisationToUpdate);
    console.log("rubriqueId (plan parent):", this.rubriqueId);
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

    console.log("Formulaire initialisé");
  }

  /**
   * Charger les données en mode modification
   */
  loadFields() {
    if (this.realisationToUpdate) {
      this.form.patchValue({
        code: this.realisationToUpdate.code,
        libelle: this.realisationToUpdate.libelle,
        commentaire: this.realisationToUpdate.commentaire
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
      type: 'REALISATION', 
      // parentId: this.rubriqueId  
       parentId: localStorage.getItem('rubriqueId'),
    };

    if (!this.realisationToUpdate) {
      this.create(formData);
    } else {
      this.update(formData);
    }
  }

  /**
   * Créer une nouvelle réalisation
   */
  create(formData: any) {
    this.planComptableService.createPlanComptableElement(formData).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess('Réalisation créée avec succès');
        this.emitSubmit();
        this.close();
      },
      error: (error) => {
        console.error("❌ Erreur création:", error);
        Alertes.alerteAddDanger(
          error?.error?.message || 'Erreur lors de la création de la réalisation'
        );
      }
    });
  }

  /**
   * Modifier une réalisation existante
   */
  update(formData: any) {
    this.planComptableService.updatePlanComptableElement(
      this.realisationToUpdate.id,
      formData
    ).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess('Réalisation modifiée avec succès');
        this.emitSubmit();
        this.close();
      },
      error: (error) => {
        console.error("❌ Erreur modification:", error);
        Alertes.alerteAddDanger(
          error?.error?.message || 'Erreur lors de la modification de la réalisation'
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