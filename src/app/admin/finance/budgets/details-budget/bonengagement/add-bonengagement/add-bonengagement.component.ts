import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IBonEngagement, ILigneBudgetaire, MOCK_BUDGET_NEW, StatutBonEngagement, typeBonEngagement } from '@/app/admin/finance/data/new.model';
import { Alertes } from '@/app/util/alerte';

@Component({
  selector: 'app-add-bonengagement',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  templateUrl: './add-bonengagement.component.html',
  styleUrl: './add-bonengagement.component.scss'
})
export class AddBonengagementComponent implements OnInit {
  
  @Input() beToUpdate?: IBonEngagement;
  @Input() isSearch: boolean = false;
  @Output() submit = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<any>();

  form!: FormGroup;
  lignesBudgetaires: ILigneBudgetaire[] = [];
  
  typesOptions: { value: typeBonEngagement; label: string }[] = [
    { value: 'INVESTISSEMENT', label: 'Investissement' },
    { value: 'FONCTIONNEMENT', label: 'Fonctionnement' }
  ];

  statutsOptions: { value: StatutBonEngagement; label: string }[] = [
    { value: 'EN_ATTENTE', label: 'En attente' },
    { value: 'VALIDE', label: 'Validé' },
    { value: 'REALISE', label: 'Réalisé' },
    { value: 'REJETE', label: 'Rejeté' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadLignesBudgetaires();
    this.initForm();
    
    if (this.beToUpdate) {
      this.populateForm();
    }
  }

  /**
   * Charge les lignes budgétaires depuis le mock
   */
  loadLignesBudgetaires() {
    this.lignesBudgetaires = [];
    
    if (MOCK_BUDGET_NEW.rubriques) {
      MOCK_BUDGET_NEW.rubriques.forEach(rubrique => {
        if (rubrique.lignes) {
          this.lignesBudgetaires.push(...rubrique.lignes);
        }
      });
    }
  }

  /**
   * Initialise le formulaire
   */
  initForm() {
    if (this.isSearch) {
      // Formulaire de recherche (tous les champs optionnels)
      this.form = this.fb.group({
        type: [''],
        numero_bon: [''],
        numero_BE: [''],
        numero_mandat: [''],
        description: [''],
        statut: [''],
        ligneBudgetaireId: ['']
      });
    } else {
      // Formulaire d'ajout/modification
      this.form = this.fb.group({
        type: ['', Validators.required],
        numero_bon: ['', Validators.required],
        date: ['', Validators.required],
        numero_BE: ['', Validators.required],
        numero_mandat: ['', Validators.required],
        description: ['', [Validators.required, Validators.minLength(10)]],
        montant: ['', [Validators.required, Validators.min(1)]],
        statut: ['EN_ATTENTE', Validators.required],
        facturesEtats: [''],
        ligneBudgetaireId: ['', Validators.required]
      });
    }
  }

  /**
   * Remplit le formulaire avec les données à modifier
   */
  populateForm() {
    if (this.beToUpdate) {
      this.form.patchValue({
        type: this.beToUpdate.type,
        numero_bon: this.beToUpdate.numero_bon,
        date: this.formatDateForInput(this.beToUpdate.date),
        numero_BE: this.beToUpdate.numero_BE,
        numero_mandat: this.beToUpdate.numero_mandat,
        description: this.beToUpdate.description,
        montant: this.beToUpdate.montant,
        statut: this.beToUpdate.statut,
        facturesEtats: this.beToUpdate.facturesEtats,
        ligneBudgetaireId: this.beToUpdate.ligneBudgetaireId
      });
    }
  }

  /**
   * Formate une date pour l'input HTML
   */
  formatDateForInput(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  /**
   * Sauvegarde le bon d'engagement
   */
  save() {
    if (this.form.valid) {
      const formData = this.form.value;
      
      const newBE: IBonEngagement = {
        id: this.beToUpdate?.id || `BE-${Date.now()}`,
        type: formData.type,
        numero_bon: formData.numero_bon,
        date: formData.date,
        numero_BE: formData.numero_BE,
        numero_mandat: formData.numero_mandat,
        description: formData.description,
        montant: parseFloat(formData.montant),
        statut: formData.statut,
        facturesEtats: formData.facturesEtats,
        ligneBudgetaireId: formData.ligneBudgetaireId
      };

      console.log('Bon d\'engagement à sauvegarder:', newBE);
      
      // TODO: Appel API pour sauvegarder
      // this.bonEngagementService.create(newBE).subscribe(...)
      
      if (this.beToUpdate) {
        Alertes.alerteUpdateSuccess();
      } else {
        Alertes.alerteAddSuccess('Bon d\'engagement créé avec succès');
      }
      
      this.submit.emit(true);
    } else {
      Alertes.errorPopPup('Erreur', 'Veuillez remplir tous les champs obligatoires');
      this.markFormGroupTouched(this.form);
    }
  }

  /**
   * Effectue une recherche
   */
  doSearch() {
    const searchData = this.form.value;
    console.log('Recherche avec:', searchData);
    this.search.emit(searchData);
  }

  /**
   * Ferme le modal
   */
  close() {
    this.submit.emit(false);
  }

  /**
   * Marque tous les champs comme touchés pour afficher les erreurs
   */
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Récupère le libellé d'une ligne budgétaire
   */
  getLigneBudgetaireLabel(ligne: ILigneBudgetaire): string {
    return `${ligne.code} - ${ligne.libelle} (${this.formatMontant(ligne.montant)})`;
  }

  /**
   * Formate un montant
   */
  formatMontant(montant: number): string {
    if (montant >= 1000000000) {
      return `${(montant / 1000000000).toFixed(2)} Mds FCFA`;
    }
    return `${(montant / 1000000).toFixed(1)}M FCFA`;
  }
}