import { Alertes } from '@/app/util/alerte';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FeatherIconDirective } from '@core/feather-icon/feather-icon.directive';
import {
  NgbAccordionModule,
  NgbAlertModule,
  NgbDropdownModule,
  NgbNavModule,
  NgbPaginationModule,
  NgbPopoverModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { NewMockService } from '../../data/newmock.service';
import { Budget } from '../../data/version2/budget.model';
import { FinancementBudgetService } from '@/app/services/financement-budget.service';

@Component({
  selector: 'app-add-budget',
  standalone: true,
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbDropdownModule,
    MatTabsModule,
    NgbAccordionModule,
    MatDialogModule,
    MatTableModule,
    NgbTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatRippleModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatButtonModule,
    MatRadioModule,
    NgbNavModule,
    MatCardModule,
    FormsModule,
    MatPaginatorModule,
    MatSelectModule,
    NgbAlertModule,
    HasAnyAuthorityDirective,
    NgbPopoverModule,
    FeatherIconDirective,
  ],
  templateUrl: './add-budget.component.html',
  styleUrl: './add-budget.component.scss',
})
export class AddBudgetComponent {
  form!: FormGroup;
   availableYears: { value: number }[] = [];
  @Input() managementUnitId: any;
  @Input() isSearch!: boolean;
  @Input() budgetToUpdate: any;
  @Input() label!: string;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private financementService: FinancementBudgetService
  ) {}

  ngOnInit(): void {
     this.availableYears = this.generateYears();
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      code: [''],
      libelle: [''],
      montant: [],
      annee: []
    });
    this.loadFields();
  }

  loadFields() {
    if (this.budgetToUpdate !== undefined) {
      this.form.get('code')?.setValue(this.budgetToUpdate.code);
      this.form.get('libelle')?.setValue(this.budgetToUpdate.libelle);
      this.form.get('montant')?.setValue(this.budgetToUpdate.montant);
      this.form.get('annee')?.setValue(this.budgetToUpdate.annee);
    }
  }



  save() {
    const budget = this.form.value;
      if (this.budgetToUpdate === undefined) {
      this.create(budget);
    } else {
      this.update(this.budgetToUpdate.id, budget);
    }
  }

  create(budget: any) {
    this.financementService.createBudgetDgpsn(budget).subscribe({
      next: value => {
        Alertes.alerteAddSuccess('Enregistrement réussi');
      },
      error: value => {
        Alertes.errorPopPup('Erreur :',value.error.message);
      },
      complete: () => {
        this.close();
      }
    });
  }

  update(budgetId: any, budgetRequest: any) {
    this.financementService.updateBudgetDgpsn(budgetId, budgetRequest).subscribe({
      next: value => {
        Alertes.alerteAddSuccess('Modification réussie');
      },
      error: value => {
        Alertes.alerteAddDanger(value.error.message);
      },
      complete: () => {
        this.close();
      }
    });
  }

  close() {
    this.submit.emit(true);
  }
    generateYears(): { value: number }[] {
    const listYears: { value: number }[] = [];
    const dateActu: Date = new Date();
    for (let year = dateActu.getFullYear(); year >= 1960; year--) {
      listYears.push({ value: year });
    }
    return listYears;
  }

  doSearch() {}
}