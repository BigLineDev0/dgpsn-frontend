import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
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
import { SourceDeDonneesComponent } from '../../budget-global/source-de-donnees/source-de-donnees.component';
import { FormMobilisationComponent } from '../../mobilisation-financement/form-mobilisation/form-mobilisation.component';
import { RoutingFinancementComponent } from '../../routing-financement/routing-financement.component';
import { FormSourceComponent } from '../form-source/form-source.component';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss'],
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
    SpinnerComponent,
    SourceDeDonneesComponent,
    RoutingFinancementComponent,
    FormSourceComponent,

  ]
})
export class SourceComponent {
  @ViewChild('popoverTrigger') popoverTrigger!: ElementRef<any>;
  displayedColumns: string[] = [

    // 'jalon',
    'structure',
    'budget',
    'montant',
    'comment',
    'actions'
  ];
  datasource:any;
  loadingIndicator = true;
  managementUnitId: any;
  projetLibelle:any;
  sourceToUpdate: any;
  pageOptions: any = {page: 0, size: 20};
  file!: File;
  add="";
  update="";
  delete="";
  read="";
  export="";
  import="";
  comparaison:boolean=false;
  sourceComparaison: any=[
    {montantReel:219450000,budget:500000000,colorReel:'text-success',colorBudget:'text-success'},
    {montantReel:315000000,budget:500000000,colorReel:'text-success',colorBudget:'text-success'},
  ];

  constructor(
    private sourceService:FinancementActivityService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getProjectId();
    this.getAllSource();
    this.getProjetActivite();
  }
  getProjetActivite() {
    this.projetLibelle = localStorage.getItem('projetLibelle')!;
  }
  getProjectId() {
    this.managementUnitId = localStorage.getItem('managementUnitId')!;
  }

  getAllSource(  ) {
    this.pageOptions.managementUnitId = this.managementUnitId;
    this.sourceService.readAllSource(this.pageOptions).subscribe(
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

  openBasicModal(content: TemplateRef<any>, source?: any) {
    this.sourceToUpdate = source;
    this.modalService
      .open(content, { size: 'lg' })
      .result.then((result) => {})
      .catch((res) => {});
  }
  openBasicModalGantt(content: TemplateRef<any>, date?: any) {
    this.sourceToUpdate = date;
    this.modalService
      .open(content, { size: 'xl' })
      .result.then((result) => {})
      .catch((res) => {});
  }
  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllSource();
    }
  }

  deleteSource(sourceId: any) {
    Alertes.confirmAction(
      'Suppression',
      'Cet element sera definitivement supprimé',
      () => {
        this.sourceService.deleteSource(sourceId).subscribe({
          next: value => Alertes.alerteDeleteSuccess('Budget'),
          error: value => Alertes.errorPopPup('Suppression échouée', value?.error?.message),
          complete: () => this.getAllSource()
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
    this.getAllSource();
    console.log("this.pageOptions.readDate", this.pageOptions.readDate);


  }


  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllSource();
  }

}
