import { Component, inject, signal, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbDropdownModule,
  NgbTooltipModule,
  NgbAccordionModule,
  NgbNavModule,
  NgbAlertModule,
  NgbPopoverModule,
} from '@ng-bootstrap/ng-bootstrap';

// Custom
import { FeatherIconDirective } from '@core/feather-icon/feather-icon.directive';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { AddBudgetComponent } from '../add-budget/add-budget.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import {
  FicheSyntheseBudgetComponent
} from "@/app/admin/finance/budgets/fiche-synthese-budget/fiche-synthese-budget.component";
import { FinancementBudgetService } from '@/app/services/financement-budget.service';
import { Alertes } from '@/app/util/alerte';
import { AddLignesChargesComponent } from '../charges/add-ligne-charge/add-lignes-charges.component';
import {Authority} from "@/app/util/Authority";

@Component({
  selector: 'app-list-budget',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbAlertModule,
    NgbPopoverModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
    MatPaginatorModule,
    MatSelectModule,
    MatRadioModule,
    FeatherIconDirective,
    SpinnerComponent,
    AddBudgetComponent,
    NgbAlertModule,
    HasAnyAuthorityDirective,
    NgbPopoverModule,
    AddBudgetComponent,
    AddLignesChargesComponent,
    FicheSyntheseBudgetComponent,
  ],
  templateUrl: './list-budget.component.html',
  styleUrl: './list-budget.component.scss',
})
export class ListBudgetComponent {
  //  @ViewChild('popoverTrigger') popoverTrigger!: ElementRef<any>;
  displayedColumns: string[] = ['code', 'libelle', 'montant', "montant_Engage",  'annee','actions'];
  dataSource: any;
  loadingIndicator = true;
  managementUnitId: any;
  budgetToUpdate?: any;
  projetlibelle: any;
  budgatToUpdate: any;
  pageOptions: any = { page: 0, size: 20 };
    add = Authority.ADD_BUDGET;
    update = Authority.EDIT_BUDGET;
    delete = Authority.DELETE_BUDGET;
    read = Authority.READ_BUDGET;

  readBptba =Authority.READ_PTBA;
  readFinancementBudget =Authority.READ_FINANCEMENT_BUDGET;
  suivisLigneBugetaire = Authority.SUIVIS_LIGNE_BUDGETAIRE



  constructor(
    private budgetService: FinancementBudgetService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllBudget();
  }


  getAllBudget() {
    this.budgetService.readAllBudgetDgpsn(this.pageOptions).subscribe({
      next: response => {
        this.dataSource = response;
        console.log("  this.dataSource", this.dataSource);

        this.loadingIndicator = false;
      },
      error: err => {
        console.log(err);
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }

  openBasicModal(content: TemplateRef<any>, budget?: any, size?: any) {
    this.budgetToUpdate = budget;
    this.modalService
      .open(content, { size: size })
      .result.then((result) => { })
      .catch((res) => { });
  }

  close(event: any) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllBudget();
    }
  }

  deleteBudget(budgetId: any) {
    Alertes.confirmAction(
      'Suppression',
      'Cet élément sera définitivement supprimé',
      () => {
        this.budgetService.deleteBudgetDgpsn(budgetId).subscribe({
          next: value => Alertes.alerteDeleteSuccess('Budget DGPSN'),
          error: value => Alertes.errorPopPup('Suppression échouée', value?.error?.message),
          complete: () => this.getAllBudget()
        });
      }
    );
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllBudget();
  }

  openBudgetDetails(budgetId: any) {
    localStorage.setItem('budgetId', budgetId)
    console.log("budgetId", budgetId);

    this.router.navigate(['/admin/acces/finance/budgets/details', budgetId]);
  }

    openAction(budgetId: any,projetLibelle:any,url:any) {
        localStorage.setItem("budgetId", budgetId);
        localStorage.setItem("budgetLibelle", projetLibelle);
        this.router.navigateByUrl("/admin/acces/"+url)
    }


  calculTotalMontant(montantDepense: number, montantRecette: number): number {
    return (montantDepense || 0) + (montantRecette || 0);
  }
}


