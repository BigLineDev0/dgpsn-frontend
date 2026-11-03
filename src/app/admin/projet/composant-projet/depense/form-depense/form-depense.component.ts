import { LabelService } from '@/app/services/labelService/label-service';
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
import { DepenseService } from 'src/app/services/depense/depense.service';
import { TypeDepenseService } from 'src/app/services/typeDepense/type-depense.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { RoutingAppelOffreProjetComponent } from '../../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';

@Component({
  selector: 'app-form-depense',
  templateUrl: './form-depense.component.html',
  styleUrls: ['./form-depense.component.scss'],
    standalone:true,
  imports:[
     CommonModule,
    NgbTooltipModule,
    NgbDropdownModule,
    MatIconModule,
    // FeatherIconModule,
    NgbTooltipModule,
    MatTableModule,
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
export class FormDepenseComponent {
@Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() modal!: NgbModalRef;
  @Output() search: EventEmitter<any> = new EventEmitter();

  @Input() isSearch!: boolean;

  @Input() label!: string;

  @Input() projetId: any;

  @Input() depenseToUpdate: any;
  typedepense: any;
  listeTypeRequete: any;
  categorieDepense: any;
  typecategory: any;
  depense: any;
  budgets:any

  form!: FormGroup;

  constructor(
    private depenseService: DepenseService,
    private labelService: LabelService,
    private typeDepense: TypeDepenseService,
    private budgetService : BudgetActivityService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.projetId = sessionStorage.getItem('projetId');
    console.log("this.projetId", this.projetId)
    this.initForm();
    this.getTypeDepense();
    this.getCategories();
    this.getBudgets();
    if (this.depenseToUpdate != undefined) {
      this.editForm();
    }
  }

  initForm() {
    this.form = this.fb.group({
      label: [''],
      date: [''],
      unitAmount: [''],
      quantity: [''],
      totalAmount: [],
      budgetId: [],
      comment: [''],
      categorieDepenseId: [''],
      typeDepenseId: [''],
    });
  }

  editForm() {
    this.form
      .get('date')
      ?.setValue(Helper.editDate(this.depenseToUpdate?.date));
    this.form.get('label')?.setValue(this.depenseToUpdate?.label);
    this.form.get('unitAmount')?.setValue(this.depenseToUpdate?.unitAmount);
    this.form.get('quantity')?.setValue(this.depenseToUpdate?.quantity);
    this.form.get('totalAmount')?.setValue(this.depenseToUpdate?.totalAmount);
    this.form
      .get('categorieDepenseId')
      ?.setValue(this.depenseToUpdate?.categorieDepense?.id);
    this.form
      .get('typeDepenseId')
      ?.setValue(this.depenseToUpdate?.typeDepense?.id);
    this.form.get('comment')?.setValue(this.depenseToUpdate?.comment);
  }

  save() {
    const depenseRequest = this.form.value;
    depenseRequest.projetId = +this.projetId;

    console.log("DTO: ", depenseRequest)
    if (this.depenseToUpdate === undefined) {
      this.create(depenseRequest);
    } else {
      this.update(this.depenseToUpdate.id, depenseRequest);
    }
  }

  create(depenseRequest: any) {
    this.depenseService.createDepense(depenseRequest).subscribe({
      next: (value) => {
        Alertes.alerteAddSuccess('Enregistrement reussi');
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.error.message);
      },
      complete: () => {
        this.close();
      },
    });
  }

  update(depenseRequestId: any, depenseRequest: any) {
    this.depenseService
      .updateDepense(depenseRequestId, depenseRequest)
      .subscribe({
        next: (value) => {
          Alertes.alerteAddSuccess('Modification reussi');
        },
        error: (error) => {
          Alertes.alerteAddDanger(error.error.message);
        },
        complete: () => {
          this.close();
        },
      });
  }

  close() {
    this.submit.emit(true);
    this.modal.close();
  }

  doSearch() {
    const depenseRequest: any = {
      libelle: this.form.value.libelle,
      predicatedDate: this.form.value.predicatedDate,
      readDate: this.form.value.readDate,
      projetId: +this.projetId,
    };
    this.search.emit(depenseRequest);
  }

  showDepense() {
    const formMultiple = this.form.value;
    const multiple = formMultiple.unitAmount * formMultiple.quantity;
    this.form.patchValue({
      totalAmount: multiple,
    });
  }

  filterdepense(id: any, typeDepenses: any) {
    return typeDepenses.filter((typeDep: any) => {
      return typeDep.categorieDepense.id === id;
    });
  }

  onTypeChange(id: any) {
    this.typedepense = [];
    this.typedepense = this.filterdepense(id, this.listeTypeRequete);
  }

  getTypeDepense() {
    this.typeDepense.readTypeDepense().subscribe({
      next: (response) => {
        this.listeTypeRequete = response?.content;
      },
    });
  }

  getBudgets(  ) {
    let req:any = {
      page: 1,
      size: 10,
      sort: 'id,desc'
    };
    this.budgetService.readBudgetActivity(req).subscribe(
      {
      next: response => {
        this.budgets = response.content
        console.log("responseBudget",response);
        
      },
     
  }
);
  }
  getCategories() {
    let req = { page: 0, size: 20, referentielType: 'CATEGORY_DEPENSE' };
    this.labelService.readLabels(req).subscribe({
      next: (response) => {
        this.typecategory = response.content;
      },
    });
  }
}
