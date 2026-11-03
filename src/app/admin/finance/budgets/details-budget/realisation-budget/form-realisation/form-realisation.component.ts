import { Component, EventEmitter, input, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { NgbTooltipModule, NgbDropdownModule, NgbPaginationModule, NgbAccordionModule, NgbNavModule, NgbProgressbarModule, NgbCarouselModule, NgbTimepickerModule, NgbPopoverModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { FinancementActivityService } from 'src/app/services/financementActivity/financement-activity.service';
import { Alertes } from 'src/app/util/alerte';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { RealisationService } from '@/app/services/realisation/realisation.service';
import { PlanService } from '@/app/services/plan-compte/plan.service';
import { Fournisseurs } from '../realisation-budget.component';

@Component({
  selector: 'app-form-realisation',
  templateUrl: './form-realisation.component.html',
  styleUrls: ['./form-realisation.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgbTooltipModule,
    NgbDropdownModule,
    MatIconModule,
    MatTableModule,
    NgbPaginationModule,
    MatMenuModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbProgressbarModule,
    ListboxModule,
    FormsModule,
    NgbCarouselModule,
    NgbTimepickerModule,
    NgbPopoverModule,
    NgbDatepickerModule,
    MatButtonModule,
    HasAnyAuthorityDirective,
    SpinnerComponent,
  ]
})
export class FormRealisationComponent implements OnInit, OnChanges {
  form!: FormGroup;
  @Input() isSearch!: boolean;
  @Input() realisationToUpdate: any;
  @Input() label!: string;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  ligneBudgetaireList: any[] = [];
  realisationsLibelle!: any;
  realisationId: any;
  @Input() fournisseursInput!: Fournisseurs[];

  constructor(
    private fb: FormBuilder,
    private realisationService: RealisationService,
    private planComptable: PlanService
  ) {}

  ngOnInit(): void {
    this.realisationId = localStorage.getItem('realisationId');
    console.log('FOURNISSEUR', this.fournisseursInput);
    console.log('REALISATION TO UPDATE (ngOnInit)', this.realisationToUpdate);
    
    this.initForm();
    this.getRealisationConfig(this.realisationId);
    
    if (this.realisationToUpdate) {
      this.loadFields();
    } else if (!this.isSearch) {
      this.addRealisation();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Détecter les changements de realisationToUpdate
    if (changes['realisationToUpdate'] && !changes['realisationToUpdate'].firstChange) {
      console.log('REALISATION TO UPDATE (ngOnChanges)', this.realisationToUpdate);
      
      if (this.form && this.realisationToUpdate) {
        this.realisations.clear();
        this.loadFields();
      }
    }
  }

  initForm() {
    this.form = this.fb.group({
      ligneBudgetaireId: [''],
      realisations: this.fb.array([]),
      code: [''],
      realisationsId: [''],
      montant: [],
      date: [''],
      fournisseurId: [''],
      facture: [''],
      numeroBon: [''],
      numeroBE: [''],
      numeroMandat: [''],
      description: ['']
    });
  }

  get realisations(): FormArray {
    return this.form.get('realisations') as FormArray;
  }

  addRealisation() {
    const realisationForm = this.fb.group({
      code: [''],
      realisationsId: [''],
      montant: [],
      date: [''],
      fournisseurId: [''],
      facture: [''],
      numeroBon: [''],
      numeroBE: [''],
      numeroMandat: [''],
      description: ['']
    });
    this.realisations.push(realisationForm);
  }

  removeRealisation(index: number) {
    if (this.realisations.length > 1) {
      this.realisations.removeAt(index);
    }
  }

  loadFields() {
    console.log('=== LOAD FIELDS ===');
    console.log('realisationToUpdate:', this.realisationToUpdate);
    
    if (this.realisationToUpdate !== undefined && this.realisationToUpdate !== null) {

      this.realisations.clear();
      
      let dateValue = this.realisationToUpdate.date;
      if (dateValue) {
        if (typeof dateValue === 'string') {
          dateValue = dateValue.split('T')[0];
        } else if (dateValue instanceof Date) {
          dateValue = dateValue.toISOString().split('T')[0];
        }
      }

      const realisationForm = this.fb.group({
        code: [this.realisationToUpdate.realisations?.code || ''],
        realisationsId: [this.realisationToUpdate.realisations?.id || ''],
        montant: [this.realisationToUpdate.montant || null],
        date: [dateValue || ''],
        fournisseurId: [this.realisationToUpdate.fournisseurId || ''],
        facture: [this.realisationToUpdate.facture || ''],
        numeroBon: [this.realisationToUpdate.numeroBon || ''],
        numeroBE: [this.realisationToUpdate.numeroBE || ''],
        numeroMandat: [this.realisationToUpdate.numeroMandat || ''],
        description: [this.realisationToUpdate.description || '']
      });
      
      this.realisations.push(realisationForm);
      
      console.log('FormArray après chargement:', this.realisations.value);
            if (this.isSearch) {
        this.form.patchValue({
          code: this.realisationToUpdate.realisations?.code || '',
          montant: this.realisationToUpdate.montant || null,
          date: dateValue || '',
          fournisseurId: this.realisationToUpdate.fournisseurId || '',
          numeroBon: this.realisationToUpdate.numeroBon || '',
          numeroBE: this.realisationToUpdate.numeroBE || '',
          numeroMandat: this.realisationToUpdate.numeroMandat || '',
          description: this.realisationToUpdate.description || '',
          ligneBudgetaireId: this.realisationToUpdate.ligneBudgetaire?.id || ''
        });
      }
    }
  }

  save() {
    console.log('=== SAVE ===');
    console.log('Form valid:', this.form.valid);
    console.log('Form value:', this.form.value);
    console.log('Realisations array:', this.realisations.value);

    if (!this.form.valid) {
      Alertes.alerteAddDanger('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const ligneBudgetaireId = localStorage.getItem('lignebudgetId');
    const realisations = this.realisations.value.map((realisation: any) => ({
      ...realisation,
      ligneBudgetaireId
    }));

    if (this.realisationToUpdate === undefined || this.realisationToUpdate === null) {
      if (realisations.length === 1) {
        this.create(realisations[0]);
      } else {
        this.createMultiple(realisations);
      }
    } else {
      console.log('Mode UPDATE - ID:', this.realisationToUpdate.id);
      this.update(this.realisationToUpdate.id, realisations[0]);
    }
  }

  create(realisation: any) {
    console.log('CREATE:', realisation);
    this.realisationService.createRealisation(realisation).subscribe({
      next: value => {
        Alertes.alerteAddSuccess('Enregistrement réussi');
      },
      error: value => {
        console.error('Erreur création:', value);
        Alertes.alerteAddDanger(value.error?.message || 'Erreur lors de l\'enregistrement');
      },
      complete: () => {
        this.close();
      }
    });
  }

  createMultiple(realisations: any[]) {
    console.log('CREATE MULTIPLE:', realisations);
    this.realisationService.createMultipleRealisation(realisations).subscribe({
      next: value => {
        Alertes.alerteAddSuccess('Enregistrement réussi');
      },
      error: value => {
        console.error('Erreur création multiple:', value);
        Alertes.alerteAddDanger(value.error?.message || 'Erreur lors de l\'enregistrement');
      },
      complete: () => {
        this.close();
      }
    });
  }

  update(realisationId: any, realisationRequest: any) {
    console.log('UPDATE ID:', realisationId);
    console.log('UPDATE DATA:', realisationRequest);
    
    this.realisationService.updateRealisation(realisationId, realisationRequest).subscribe({
      next: value => {
        Alertes.alerteAddSuccess('Modification réussie');
      },
      error: value => {
        console.error('Erreur modification:', value);
        Alertes.alerteAddDanger(value.error?.message || 'Erreur lors de la modification');
      },
      complete: () => {
        this.close();
      }
    });
  }

  close() {
    this.submit.emit(true);
  }

  doSearch() { }

  getRealisationConfig(realisationsId: any) {
    if (!realisationsId) return;
    
    this.planComptable.getRealisationConfig(realisationsId).subscribe({
      next: (value: any) => {
        this.realisationsLibelle = value.body;
        console.log('Realisations libellé chargés:', this.realisationsLibelle);
      },
      error: (err) => {
        console.error('Erreur chargement réalisations:', err);
      }
    });
  }
}