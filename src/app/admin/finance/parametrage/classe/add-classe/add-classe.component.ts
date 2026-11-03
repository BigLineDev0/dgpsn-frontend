import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { PlanComptableElementService } from '@/app/services/plan-comptable/plan-comptable-element.service';
import { Alertes } from '@/app/util/alerte';

@Component({
  selector: 'app-add-classe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-classe.component.html',
  styleUrl: './add-classe.component.scss'
})
export class AddParametrageComponent implements OnInit {
  form!: FormGroup;

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() classeToUpdate: any;

  private planComptableService = inject(PlanComptableElementService);
  private modalService = inject(NgbModal);

  ngOnInit(): void {
    console.log("AddParametrageComponent initialisé");
    console.log("classeToUpdate:", this.classeToUpdate);
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
    if (this.classeToUpdate) {
      console.log("Chargement classe pour modification:", this.classeToUpdate);

      this.form.patchValue({
        code: this.classeToUpdate.code,
        libelle: this.classeToUpdate.libelle,
        commentaire: this.classeToUpdate.commentaire
      });
    }
  }

  /**
   * Sauvegarder (créer ou modifier)
   */
  save() {
    const form = this.form.value
      form.type = 'CLASSE';
    if (!this.classeToUpdate) {
      this.create(form);
    } else {
      this.update(form);
    }
  }

  /**
   * Créer une nouvelle classe
   */
  create(formm:any) {
  

    this.planComptableService.createPlanComptableElement(formm).subscribe({
      next: (data) => {
        console.log("✅ Classe créée avec succès:", data);
        Alertes.alerteAddSuccess('Classe créée avec succès');
        this.emitSubmit();
        this.close();
      },
      error: (error) => {
        console.error("❌ Erreur création:", error);
        console.error("Détails erreur:", error.error);
        Alertes.alerteAddDanger(
          error?.error?.message || 'Erreur lors de la création'
        );
      }
    });
  }

  /**
   * Modifier une classe existante
   */
  update(formm:any) {
  
    this.planComptableService.updatePlanComptableElement(this.classeToUpdate.id,formm).subscribe({
      next: (data) => {
        console.log("✅ Classe modifiée avec succès:", data);
        Alertes.alerteAddSuccess('Classe modifiée avec succès');
        this.emitSubmit();
        this.close();
      },
      error: (error) => {
      
        Alertes.alerteAddDanger(
          error?.error?.message || 'Erreur lors de la modification'
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