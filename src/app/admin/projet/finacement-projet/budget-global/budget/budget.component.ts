import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { FinancementActivityService } from 'src/app/services/financementActivity/financement-activity.service';
import { MilestoneService } from 'src/app/services/milestone/milestone.service';
import { Authority } from 'src/app/util/Authority';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { ResponseApi } from 'src/app/util/response.model';
import Swal from "sweetalert2";
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { FormBudgetComponent } from '../../../composant-projet/budget/form-budget/form-budget.component';
import { RoutingFinancementComponent } from '../../routing-financement/routing-financement.component';
import { FormBugetComponent } from '../form-buget/form-buget.component';
import { SourceDeDonneesComponent } from '../source-de-donnees/source-de-donnees.component';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
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
    SpinnerComponent,
    FormBugetComponent,
    SourceDeDonneesComponent,
    RoutingFinancementComponent

  ]
})
export class BudgetComponent implements OnInit {
  @ViewChild('popoverTrigger') popoverTrigger!: ElementRef<any>;
  displayedColumns: string[] = [
    'libelle',
    'souceBudget',
    'estimatedAmount',
    'actualAmount',
    'comment',
    'actions'
  ];

  datasource:any;
  loading =true;
  comparaison:boolean=false;
  dates!: MatTableDataSource<any>;
  loadingIndicator = true;
  managementUnitId: any;
  projetlibelle:any;
  budgatToUpdate: any;
  sourceComparaison: any=[
    {montantReel:15000000000,montantPrevue:25000000000,colorReel:'text-success',colorPrevue:'text-success'},
    {montantReel:450000000,montantPrevue:500000000,colorReel:'text-danger',colorPrevue:'text-success'},
  ];
  pageOptions: any = {page: 0, size: 20};

  constructor(
    private budgetService: FinancementActivityService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.getProjectId();
    this.getAllBudget();

  }

  getProjectId() {
    this.managementUnitId = localStorage.getItem('managementUnitId')!;
    this.projetlibelle = localStorage.getItem('projetLibelle')!;
    console.log('managementUnit',this.managementUnitId)
  }

  getAllBudget(  ) {
    this.pageOptions.managementUnitId = this.managementUnitId;
    // console.log('this.pageOptions', this.pageOptions)
    this.budgetService.readAllBudget(this.pageOptions).subscribe(
      {
      next: response => {
        this.datasource = response;
        this.loadingIndicator = false;
      },
      error: err => {
        console.log(err);
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
  }
);
  }

  openBasicModal(content: TemplateRef<any>, budget?: any) {
    this.budgatToUpdate = budget;
    this.modalService
      .open(content, { size: 'lg' })
      .result.then((result) => {})
      .catch((res) => {});
  }
  openBasicModalGantt(content: TemplateRef<any>, date?: any) {
    this.budgatToUpdate = date;
    this.modalService
      .open(content, { size: 'xl' })
      .result.then((result) => {})
      .catch((res) => {});
  }
  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllBudget();
    }
  }
  charger(event: boolean) {
    // if (event) {
    //   setTimeout(() => {
        this.comparaison = true;
    //   }, 3000);
    // }
  }

  chargerFichier() {
    Swal.fire({
      title: 'Comparaison...',
      text: 'Comparaison des données en cours...',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    setTimeout(() => {
      Swal.close();
      this.comparaison = true;
      this.alertePop();
    }, 3000);

  }

  alertePop(){
    Swal.fire({
      title: 'Succès!',
      text: 'Les données ont été comparées avec succès. Vous pouvez maintenant consulter les résultats ou effectuer d\'autres actions.',
      icon: 'success',
      timer: 10000,
      timerProgressBar: true,
      showConfirmButton: true,
      allowOutsideClick: true,
    });
  }

  deleteBudget(budgetId: any) {
    Alertes.confirmAction(
      'Suppression',
      'Cet element sera definitivement supprimé',
      () => {
        this.budgetService.deleteBudget(budgetId).subscribe({
          next: value => Alertes.alerteDeleteSuccess('Budget'),
          error: value => Alertes.errorPopPup('Suppression échouée', value?.error?.message),
          complete: () => this.getAllBudget()
        });
      }
    );
  }

  doSearch(data: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.pageOptions.projectId = this.managementUnitId;
    this.pageOptions.libelle = data.libelle;
    this.pageOptions.predicatedDate = data.predicatedDate;
    this.pageOptions.readDate = data.readDate;
   this.getAllBudget();
    console.log("this.pageOptions.readDate", this.pageOptions.readDate);


  }

  openImportDate(content: TemplateRef<any>) {
    this.openBasicModal(content);
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllBudget();
  }
}
