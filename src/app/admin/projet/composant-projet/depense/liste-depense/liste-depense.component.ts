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
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbModalRef, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { DepenseService } from 'src/app/services/depense/depense.service';
import { Alertes } from 'src/app/util/alerte';
import { FormPlanPassationProjetComponent } from '../../../appel-offre-projet/plan-passation/form-plan-passation-projet/form-plan-passation-projet.component';
import { RoutingAppelOffreProjetComponent } from '../../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';
import { FormDepenseComponent } from '../form-depense/form-depense.component';

@Component({
  selector: 'app-liste-depense',
  templateUrl: './liste-depense.component.html',
  styleUrls: ['./liste-depense.component.scss'],
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
    FormDepenseComponent,

  ]
})
export class ListeDepenseComponent {
displayedColumns: string[] = [
    'label',
    'category',
    'typeDepense',
    'budget',
    'date',
    'montant',
    // 'unitAmount',
    // 'quantity',
    // 'total',
    'comment',
    'actions'
  ];
  datasource:any;
  loading =true;
    modalRef!: NgbModalRef;
  
  // getAllActivite(pageOptions: any) {
  //   setTimeout(() => {
  //     this.datasource = this.data
  //     this.loading = false
  //   }, 500);
  // }

  @Input() activity:any;
 dates!: MatTableDataSource<any>;
  loadingIndicator = true;
  projetId: any;
  activite: any;
depenseToUpdate: any;
  pageOptions: any = {page: 0, size: 20, };
  file!: File;
 

  constructor(
    private  depenseService: DepenseService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getProjectId();
    this.getAllMilestoneOfProject();
    this.getProjetActivite();
  }

  getProjetActivite() {
    this.activite = localStorage.getItem('activite')!;
    this.activite = JSON.parse(this.activite);
  }
  getProjectId() {
    this.projetId = sessionStorage.getItem('projetId')!;
  }

  getAllMilestoneOfProject(  ) {
    this.pageOptions.projectId = this.activity;
    this.depenseService.readDepense(this.pageOptions).subscribe(
      {
      next: response => {
        console.log('Response',response);
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

  openBasicModal(content: TemplateRef<any>, depense?: any) {
    this.depenseToUpdate = depense;
    sessionStorage.setItem('projetId', this.activity);
    this.modalRef = this.modalService
      .open(content, { size: 'lg' })
  }

  close(event: boolean) {
    if (event) {
      // this.modalService.dismissAll();
      this.getAllMilestoneOfProject();
    }
  }

  deleteDate(milestoneId: any) {
    this.depenseService.deleteDepense(milestoneId).subscribe({
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





