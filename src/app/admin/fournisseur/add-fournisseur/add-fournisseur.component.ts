import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Alertes } from '@/app/util/alerte';
import { FournisseurService } from '@/app/services/fournisseur/fournisseur.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { LabelService } from '@/app/services/labelService/label-service';

@Component({
  selector: 'app-add-fournisseur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectComponent],
  templateUrl: './add-fournisseur.component.html',
  styleUrl: './add-fournisseur.component.scss'
})
export class AddFournisseurComponent implements OnInit {
    form!: FormGroup;
      categories: any[] = [];
      categorieFournisseurId: any[] = [];
  loadingCategories: boolean = false;
        loading = false;
      // categorieFournisseurId: any;
    @Output() submit: EventEmitter<boolean> = new EventEmitter();
    @Input() fournisseurToUpdate: any;
    private modalService = inject(NgbModal);
    constructor(private fournisseurService: FournisseurService,
           private labelService: LabelService  // ← Ajouté

    ) {}
  ngOnInit(): void {
    console.log("AddFournisseurComponent initialisé");
    console.log("fournisseurToUpdate:", this.fournisseurToUpdate);
    this.initForm();
        this.loadCategories();

    this.loadFields();
  }

  loadCategories() {
    console.log("Chargement des catégories fournisseur...");
    this.loadingCategories = true;
    
    // Paramètres identiques à ceux du recrutement
    const params = {
      page: 0,
      size: 1000,
      referentielType: 'CATEGORIE_FOURNISSEUR'
    };

    this.labelService.readLabels(params).subscribe({
      next: (response) => {
        console.log("✅ Réponse catégories:", response);
        
        // La structure de réponse est identique au recrutement
        this.categorieFournisseurId = response?.content || [];
        
        console.log("Catégories chargées:", this.categorieFournisseurId);
        this.loadingCategories = false;
      },
      error: (error) => {
        console.error("❌ Erreur lors du chargement des catégories:", error);
        Alertes.alerteAddDanger('Erreur lors du chargement des catégories');
        this.loadingCategories = false;
      }
    });
  }

  /**
   * Initialiser le formulaire
   */
  initForm() {
    this.form = new FormGroup({
      // Informations de base
      raisonSociale: new FormControl("", [
        Validators.maxLength(200)
      ]),
      codeFournisseur: new FormControl("", [
        Validators.required,
        Validators.maxLength(50)
      ]),
      
      // Identifiants fiscaux
      ninea: new FormControl(""),
      registreCommerce: new FormControl("", ),
      typeFournisseur: new FormControl("", [
        Validators.required
      ]),
      
      // Coordonnées
      telephone: new FormControl("", [
        Validators.required,
        Validators.maxLength(20)
      ]),
      email: new FormControl(""),
      adresse: new FormControl("", [
        Validators.required,
        Validators.maxLength(500)
      ]),
      statut: new FormControl("ACTIF", [
        Validators.required
      ]),
      
      // Informations bancaires
      banque: new FormControl(""),
      rib: new FormControl("", [
        Validators.maxLength(50)
      ]),
      
      // Catégorie et conditions
      categorieFournisseurId: new FormControl(""),
      delaiPaiement: new FormControl("", [
        Validators.min(0),
        Validators.max(365)
      ]),
      
      // Contact principal
      nomContact: new FormControl("", [
        Validators.maxLength(100)
      ]),
      fonctionContact: new FormControl("", [
        Validators.maxLength(100)
      ]),
      
      // Notes
      notes: new FormControl("", [
        Validators.maxLength(1000)
      ])
    });

    console.log("Formulaire initialisé");
  }

  /**
   * Charger les données en mode modification
   */
  loadFields() {
    if (this.fournisseurToUpdate) {
      console.log("Chargement fournisseur pour modification:", this.fournisseurToUpdate);

      this.form.patchValue({
        raisonSociale: this.fournisseurToUpdate.raisonSociale,
        codeFournisseur: this.fournisseurToUpdate.codeFournisseur,
        ninea: this.fournisseurToUpdate.ninea,
        registreCommerce: this.fournisseurToUpdate.registreCommerce,
        typeFournisseur: this.fournisseurToUpdate.typeFournisseur,
        telephone: this.fournisseurToUpdate.telephone,
        email: this.fournisseurToUpdate.email,
        adresse: this.fournisseurToUpdate.adresse,
        statut: this.fournisseurToUpdate.statut,
        banque: this.fournisseurToUpdate.banque,
        rib: this.fournisseurToUpdate.rib,
        categorieFournisseurId: this.fournisseurToUpdate.categorieFournisseurId,
        delaiPaiement: this.fournisseurToUpdate.delaiPaiement,
        nomContact: this.fournisseurToUpdate.nomContact,
        fonctionContact: this.fournisseurToUpdate.fonctionContact,
        notes: this.fournisseurToUpdate.notes
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

    const formData = this.form.value;

    if (!this.fournisseurToUpdate) {
      this.create(formData);
    } else {
      this.update(formData);
    }
  }

  /**
   * Créer un nouveau fournisseur
   */
  create(formData: any) {
    console.log("Création fournisseur:", formData);

    // TODO: Remplacez par votre service réel
    this.fournisseurService.createFournisseur(formData).subscribe({
      next: (data) => {
        console.log("✅ Fournisseur créé avec succès:", data);
        Alertes.alerteAddSuccess('Fournisseur créé avec succès');
        this.emitSubmit();
        this.close();
      },
      error: (error) => {
        console.error("❌ Erreur création:", error);
        Alertes.alerteAddDanger(
          error?.error?.message || 'Erreur lors de la création'
        );
      }
    });

    // Simulation pour la démo
    setTimeout(() => {
      Alertes.alerteAddSuccess('Fournisseur créé avec succès');
      this.emitSubmit();
      this.close();
    }, 500);
  }

  /**
   * Modifier un fournisseur existant
   */
  update(formData: any) {
    console.log("Modification fournisseur:", formData);

    // TODO: Remplacez par votre service réel
    this.fournisseurService.updateFournisseur(this.fournisseurToUpdate.id, formData).subscribe({
      next: (data) => {
        console.log("✅ Fournisseur modifié avec succès:", data);
        Alertes.alerteAddSuccess('Fournisseur modifié avec succès');
        this.emitSubmit();
        this.close();
      },
      error: (error) => {
        console.error("❌ Erreur modification:", error);
        Alertes.alerteAddDanger(
          error?.error?.message || 'Erreur lors de la modification'
        );
      }
    });

    // Simulation pour la démo
    setTimeout(() => {
      Alertes.alerteAddSuccess('Fournisseur modifié avec succès');
      this.emitSubmit();
      this.close();
    }, 500);
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