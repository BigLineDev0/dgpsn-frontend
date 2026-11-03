// add-operation/add-operation.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { Operation } from '../models/tresorerie.model';
import { Alertes } from '../../../../util/alerte';
import { MOCK_COMPTES } from '../mock-data/tresorerie-mock.data';

@Component({
  selector: 'app-add-operation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './add-operation.component.html',
  styleUrls: ['./add-operation.component.scss']
})
export class AddOperationComponent implements OnInit {
  operationForm!: FormGroup;
  loading = false;

  comptes: any[] = MOCK_COMPTES;
  
  typesOperation: any[] = [
    { name: 'VIREMENT', description: 'Virement' },
    { name: 'CHEQUE', description: 'Chèque' },
    { name: 'ESPECES', description: 'Espèces' },
    { name: 'PRELEVEMENT', description: 'Prélèvement' }
  ];

  projets: any[] = [
    { id: 1, code: 'PFS2024', libelle: 'Projet Filets Sociaux 2024-2027' },
    { id: 2, code: 'PPS2024', libelle: 'Programme Protection Sociale Universelle' }
  ];

  lignesBudgetaires: any[] = [
    { id: 1, code: 'LB001', libelle: 'Salaires et Traitements', montantBudget: 50000000 },
    { id: 2, code: 'LB002', libelle: 'Fournitures de Bureau', montantBudget: 5000000 },
    { id: 3, code: 'LB003', libelle: 'Bourses Familiales', montantBudget: 200000000 }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    this.route.queryParams.subscribe(params => {
      if (params['compteId']) {
        this.operationForm.patchValue({
          compteBancaireId: +params['compteId']
        });
      }
    });
  }

  initForm(): void {
    this.operationForm = this.fb.group({
      compteBancaireId: [null, Validators.required],
      typeOperation: ['', Validators.required],
      dateOperation: [new Date().toISOString().split('T')[0], Validators.required],
      dateValeur: [new Date().toISOString().split('T')[0]],
      sensOperation: ['', Validators.required],
      montant: [null, [Validators.required, Validators.min(0.01)]],
      libelle: ['', Validators.required],
      numeroReference: [''],
      numeroPiece: [''],
      beneficiaire: [''],
      projetId: [null],
      ligneBudgetaireId: [null],
      observations: ['']
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.operationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.operationForm.invalid) {
      Object.keys(this.operationForm.controls).forEach(key => {
        this.operationForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    
    // Simulation d'enregistrement
    setTimeout(() => {
      Alertes.alerteAddSuccess('Opération créée avec succès');
      this.loading = false;
      this.goBack();
    }, 1000);
  }

  goBack(): void {
    const compteId = this.operationForm.get('compteBancaireId')?.value;
    if (compteId) {
      this.router.navigate(['/admin/finance/tresorerie/list-operations'], {
        queryParams: { compteId }
      });
    } else {
      this.router.navigate(['/admin/finance/tresorerie/list-operations']);
    }
  }
}