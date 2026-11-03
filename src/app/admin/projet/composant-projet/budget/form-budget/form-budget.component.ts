import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModalRef, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { BudgetActivityService } from 'src/app/services/budget-activity.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { FormPlanPassationProjetComponent } from '../../../appel-offre-projet/plan-passation/form-plan-passation-projet/form-plan-passation-projet.component';
import { RoutingAppelOffreProjetComponent } from '../../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';
import { LabelService } from '@/app/services/labelService/label-service';
import { configLabelName } from '@/app/util/configlabel';


@Component({
selector: 'app-form-budget',
templateUrl: './form-budget.component.html',
styleUrls: ['./form-budget.component.scss'],
  standalone:true,
  imports:[
     CommonModule,
    NgbTooltipModule,
    NgbDropdownModule,
    MatIconModule,
    // FeatherIconModule,
    NgbTooltipModule,
    MatTableModule,
    SpinnerComponent,
    NgbPaginationModule,
    MatMenuModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatStepperModule,
    NgbNavModule,
    NgbProgressbarModule,
    ListboxModule,
    FormsModule,
    NgbCarouselModule,
    // NgGanttEditorModule,
    NgbTimepickerModule,
    NgbPopoverModule,
    NgbDatepickerModule,
    MatCheckboxModule,
    // ProgrammeModule,
    // NgApexchartsModule,
    // DocumentModule,
    MatRippleModule,
    HasAnyAuthorityDirective,
    // TdbProjetSepecifiqueModule,
    // FoncierePubliqueModule,
    MatTreeModule,
    MatListModule,
    MatTooltipModule,
    MatButtonModule,

  ]
})
export class FormBudgetComponent {

@Output() submit: EventEmitter<boolean> = new EventEmitter();
@Input() activityId: any
@Output() search: EventEmitter<any> = new EventEmitter();

@Input() isSearch!: boolean;
availableYears: { value: number }[] = [];
@Input() label!: string;
@Input() modal!: NgbModalRef;
@Input() projetId: any;
typeBudget: any;

@Input() budgetToUpdate: any;

budgets: any;

form!: FormGroup;

constructor(
  private budgetService: BudgetActivityService,
  private labelService:LabelService,private fb:FormBuilder,
) { }

ngOnInit(): void {
  // this.getProjetId();
  this.initForm();
  this.getTypeBudget();
    if(this.budgetToUpdate != undefined) {
    this.editForm();
  }
  this.availableYears = this.generateYears();
}

initForm() {
  this.form = this.fb.group(
    {
      // typeBudgetId:[],
      year:[],
      amount:[],
      label:[],
      comment:[],
      // Sources de financement
      sourceEtat: [0],
      sourceUctf: [0],
      sourceUnicef: [0],
      sourceOit: [0],
      sourceUe: [0],
      sourcePam: [0],
      sourcePpadh: [0],
      sourceFao: [0],
    }
  );
}

editForm() {
  // this.form.get('typeBudgetId')?.setValue(this.budgetToUpdate?.typeBudget.id);
  this.form.get('allocation')?.setValue(Helper.editDate(this.budgetToUpdate?.allocation));
  this.form.get('amount')?.setValue(this.budgetToUpdate?.amount);
  this.form.get('comment')?.setValue(this.budgetToUpdate?.comment);
}

// getProjetId(){
//   this.projetId = sessionStorage.getItem('projetId');
//   console.log('projetId',  this.projetId);
// }

save() {
  const budget = this.form.value;
  console.log('budget',  budget);
  budget.projetId = +this.activityId;

  console.log('BUDGET',  budget);

  if(this.budgetToUpdate === undefined) {
    this.create(budget);
  } else {

    this.update(this.budgetToUpdate.id, budget);
  }

}

create(budget: any) {
  this.budgetService.createBudgetActivity(budget).subscribe({
    next: value => {
      Alertes.alerteAddSuccess('Enregistrement reussi');
    },
    error: value => {
      Alertes.alerteAddDanger(value.error.message)
    },
    complete: () => {
      this.close();
    }
  })
}

update(budgetId: any, budget: any) {
  this.budgetService.updateBudgetActivity(budgetId, budget).subscribe({
    next: value => {
      Alertes.alerteAddSuccess('Modification reussi');
    },
    error: value => {
      Alertes.alerteAddDanger(value.error.message)
    },
    complete: () => {
      this.close();
    }
  });
}
getTypeBudget() {
  this.labelService.readReferentielLabel(configLabelName.TYPE_BUDGET).subscribe({
    next: response => { 
      // console.log("REsponseLabel",response)
      this.typeBudget= response.body?.content;
      console.log("REsponseLabel", this.typeBudget)
    
    }
  })
}
close() {
  this.submit.emit(true);
  this.modal.close()
}

doSearch() {
  const budget: any = {
  libelle :this.form.value.libelle,
  predicatedDate :this.form.value.predicatedDate,
  readDate:this.form.value.readDate,
  projetId: +this.projetId,
};
  // console.log(budget);
  this.search.emit(budget);
}

generateYears(): { value: number }[] {
  const listYears: { value: number }[] = [];
  const dateActu: Date = new Date();
  for (let year = dateActu.getFullYear(); year >= 1960; year--) {
    listYears.push({ value: year });
  }
  return listYears;
}
}

