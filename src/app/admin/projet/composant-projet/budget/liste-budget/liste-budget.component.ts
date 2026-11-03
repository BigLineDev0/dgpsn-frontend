import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal ,NgbModalRef, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { BudgetActivityService } from 'src/app/services/budget-activity.service';
import { Alertes } from 'src/app/util/alerte';
import { Authority } from 'src/app/util/Authority';
import { FormPlanPassationProjetComponent } from '../../../appel-offre-projet/plan-passation/form-plan-passation-projet/form-plan-passation-projet.component';
import { RoutingAppelOffreProjetComponent } from '../../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';
import { FormBudgetComponent } from '../form-budget/form-budget.component';

@Component({
  selector: 'app-liste-budget',
  templateUrl: './liste-budget.component.html',
  styleUrls: ['./liste-budget.component.scss'],
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
    FormBudgetComponent,

    SpinnerComponent,


  ]
})
export class ListeBudgetComponent {

  displayedColumns: string[] = [
    'libelle',
    // 'typeBudget',
    'montant',
    'dateAllocation',
    'comment',
    'actions'
  ];

  datasource:any;
@Input() activity:any;
 dates!: MatTableDataSource<any>;
  loadingIndicator = true;
  projetId: any;
  activite:any;
  budgetToUpdate: any;
  modalRef!: NgbModalRef;
  pageOptions: any = {page: 0, size: 20};
  file!: File;
  add= Authority.ADD_BUDGET;
  update=Authority.EDIT_BUDGET;
  delete= Authority.DELETE_BUDGET;
  read=Authority.READ_BUDGET;
  export="";
  import="";
  readBptba =Authority.READ_PTBA;
  readFinancementBudget =Authority.READ_FINANCEMENT_BUDGET;
  suivisLigneBugetaire = Authority.SUIVIS_LIGNE_BUDGETAIRE

  constructor(
    private budgetService: BudgetActivityService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getProjectId();
    this.getAllMilestoneOfProject();
    this.getProjetActivite();
  }

  getProjetActivite() {
    this.activite = sessionStorage.getItem('activite')!;
    this.activite = JSON.parse(this.activite);
  }

  getProjectId() {
    this.projetId = sessionStorage.getItem('projetId')!;
    console.log('projetIdList',this.projetId);
    
  }

  getAllMilestoneOfProject(  ) {
    this.pageOptions.projectId = this.activity;
    console.log('pageOptionslist',this.pageOptions);
    this.budgetService.readBudgetActivity(this.pageOptions).subscribe(
      {
      next: response => {
        this.datasource = response;
        console.log('this.datasource ', this.datasource );
        this.dates = response.content;
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
    this.budgetToUpdate = budget
   this.modalRef = this.modalService.open(content, { size: 'lg' })
  }

  close(event: boolean) {
    if (event) {
      // this.modalService.dismissAll();
      this.getAllMilestoneOfProject();
    }
  }

  deleteActivity(budgetId: any) {
    this.budgetService.deleteBudgetActivity(budgetId).subscribe({
      next: (value) => {
        Alertes.alerteAddSuccess('Suppression reussie');
      },
      error: (value) => {
        Alertes.alerteAddDanger(value.error.message);
      },
      complete: () => {
        this.getAllMilestoneOfProject();
      },
    });
  }

  doSearch(data: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.pageOptions.projectId = this.projetId;
    this.pageOptions.libelle = data.libelle;
    this.pageOptions.predicatedDate = data.predicatedDate;
    this.pageOptions.readDate = data.readDate;
    this.getAllMilestoneOfProject();
    console.log("this.pageOptions.readDate", this.pageOptions.readDate);
  
   
  }
  

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllMilestoneOfProject();
  }
}




