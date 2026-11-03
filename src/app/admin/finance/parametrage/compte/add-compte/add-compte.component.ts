import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { PlanComptableElementService } from '@/app/services/plan-comptable/plan-comptable-element.service';
import { Alertes } from '@/app/util/alerte';

@Component({
  selector: 'app-add-compte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-compte.component.html',
  styleUrl: './add-compte.component.scss'
})
export class AddCompteComponent implements OnInit {
  form!: FormGroup;

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() compteToUpdate: any;
  @Input({ required: true }) classId!: number; // ID de la classe parent

  private planComptableService = inject(PlanComptableElementService);
  private modalService = inject(NgbModal);

  ngOnInit(): void {
    console.log("AddCompteComponent initialisé");
    console.log("compteToUpdate:", this.compteToUpdate);
    console.log("classId (plan parent):", this.classId);
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
    if (this.compteToUpdate) {
      console.log("Chargement compte pour modification:", this.compteToUpdate);

      this.form.patchValue({
        code: this.compteToUpdate.code,
        libelle: this.compteToUpdate.libelle,
        commentaire: this.compteToUpdate.commentaire
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
      type: 'COMPTE', 
      // parentId: this.classId ,
      parentId: localStorage.getItem("classeId")
    };

    console.log("Données à envoyer:", formData);

    if (!this.compteToUpdate) {
      this.create(formData);
    } else {
      this.update(formData);
    }
  }

  /**
   * Créer un nouveau compte
   */
  create(formData: any) {
    console.log("🔄 Création du compte...");

    this.planComptableService.createPlanComptableElement(formData).subscribe({
      next: (data) => {
        console.log("✅ Compte créé avec succès:", data);
        Alertes.alerteAddSuccess('Compte créé avec succès');
        this.emitSubmit();
        this.close();
      },
      error: (error) => {
        console.error("❌ Erreur création:", error);
        console.error("Détails erreur:", error.error);
        Alertes.alerteAddDanger(
          error?.error?.message || 'Erreur lors de la création du compte'
        );
      }
    });
  }

  /**
   * Modifier un compte existant
   */
  update(formData: any) {
    console.log("🔄 Modification du compte...");

    this.planComptableService.updatePlanComptableElement(
      this.compteToUpdate.id,
      formData
    ).subscribe({
      next: (data) => {
        console.log("✅ Compte modifié avec succès:", data);
        Alertes.alerteAddSuccess('Compte modifié avec succès');
        this.emitSubmit();
        this.close();
      },
      error: (error) => {
        console.error("❌ Erreur modification:", error);
        Alertes.alerteAddDanger(
          error?.error?.message || 'Erreur lors de la modification du compte'
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