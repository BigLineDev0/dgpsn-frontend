// add-compte/add-compte.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CompteBancaire } from '../models/tresorerie.model';
import { Alertes } from '../../../../util/alerte';

@Component({
  selector: 'app-add-compte',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './add-compte.component.html',
  styleUrls: ['./add-compte.component.scss']
})
export class AddCompteComponent implements OnInit {
  compteForm!: FormGroup;
  loading = false;

  // Données mockées
  banques: any[] = [
    { id: 1, code: 'SGBS', libelle: 'Société Générale de Banques au Sénégal' },
    { id: 2, code: 'CBAO', libelle: 'CBAO Groupe Attijariwafa Bank' },
    { id: 3, code: 'BICIS', libelle: 'BICIS - Banque Internationale pour le Commerce et l\'Industrie du Sénégal' }
  ];

  typesCompte: any[] = [
    { name: 'COURANT', description: 'Compte Courant' },
    { name: 'EPARGNE', description: 'Compte Épargne' },
    { name: 'COMPTE_DESIGNE', description: 'Compte Désigné' }
  ];

  devises: string[] = ['FCFA', 'EUR', 'USD'];

  projets: any[] = [
    { id: 1, code: 'PFS2024', libelle: 'Projet Filets Sociaux 2024-2027' },
    { id: 2, code: 'PPS2024', libelle: 'Programme Protection Sociale Universelle' }
  ];

  bailleurs: any[] = [
    { id: 1, code: 'BM', libelle: 'Banque Mondiale', sigle: 'BM' },
    { id: 2, code: 'AFD', libelle: 'Agence Française de Développement', sigle: 'AFD' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.compteForm = this.fb.group({
      numeroCompte: ['', [Validators.required, Validators.minLength(10)]],
      libelleCompte: ['', [Validators.required, Validators.minLength(3)]],
      banqueId: [null, Validators.required],
      typeCompte: ['', Validators.required],
      devise: ['FCFA', Validators.required],
      soldeInitial: [0, [Validators.required, Validators.min(0)]],
      dateOuverture: [new Date(), Validators.required],
      isCompteDesigne: [false],
      projetId: [null],
      bailleurId: [null],
      rib: [''],
      iban: [''],
      swift: [''],
      observations: ['']
    });

    // Observer les changements du checkbox compte désigné
    this.compteForm.get('isCompteDesigne')?.valueChanges.subscribe(isDesigne => {
      if (isDesigne) {
        this.compteForm.get('projetId')?.setValidators(Validators.required);
        this.compteForm.get('bailleurId')?.setValidators(Validators.required);
      } else {
        this.compteForm.get('projetId')?.clearValidators();
        this.compteForm.get('bailleurId')?.clearValidators();
        this.compteForm.patchValue({ projetId: null, bailleurId: null });
      }
      this.compteForm.get('projetId')?.updateValueAndValidity();
      this.compteForm.get('bailleurId')?.updateValueAndValidity();
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.compteForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Ce champ est requis';
    }
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Minimum ${minLength} caractères requis`;
    }
    if (field?.hasError('min')) {
      return 'La valeur doit être positive';
    }
    return '';
  }

  onSubmit(): void {
    if (this.compteForm.invalid) {
      Object.keys(this.compteForm.controls).forEach(key => {
        this.compteForm.get(key)?.markAsTouched();
      });
      Alertes.alerteAddDanger('Veuillez remplir tous les champs obligatoires');
      return;
    }

    this.loading = true;
    
    const formValue = this.compteForm.value;
    const newCompte: CompteBancaire = {
      ...formValue,
      soldeActuel: formValue.soldeInitial,
      statut: { name: 'ACTIF', description: 'Actif' },
      banque: this.banques.find(b => b.id === formValue.banqueId),
      typeCompte: this.typesCompte.find(t => t.name === formValue.typeCompte),
      projet: formValue.projetId ? this.projets.find(p => p.id === formValue.projetId) : undefined,
      bailleur: formValue.bailleurId ? this.bailleurs.find(b => b.id === formValue.bailleurId) : undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Simulation d'enregistrement
    setTimeout(() => {
      console.log('Nouveau compte:', newCompte);
      Alertes.alerteAddSuccess('Compte bancaire créé avec succès');
      this.loading = false;
      this.goBack();
    }, 1500);
  }

  resetForm(): void {
    this.compteForm.reset({
      devise: 'FCFA',
      soldeInitial: 0,
      dateOuverture: new Date(),
      isCompteDesigne: false
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/finance/tresorerie/list-comptes']);
  }
}