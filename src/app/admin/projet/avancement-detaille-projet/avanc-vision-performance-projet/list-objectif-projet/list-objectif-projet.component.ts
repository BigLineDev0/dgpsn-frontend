import { ImpactObjetifService } from '@/app/services/impact-objectif/impact-objetif.service';
import { Alertes } from '@/app/util/alerte';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import {NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { FormPlanPassationProjetComponent } from '../../../appel-offre-projet/plan-passation/form-plan-passation-projet/form-plan-passation-projet.component';
import { RoutingAppelOffreProjetComponent } from '../../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';
import { RoutingAvancementProjetComponent } from '../../../routimg-projet/routing-avancement-projet/routing-avancement-projet.component';
import { FormObjectifProjetComponent } from '../form-objectif-projet/form-objectif-projet.component';


@Component({
  selector: 'app-list-objectif-projet',
  templateUrl: './list-objectif-projet.component.html',
  styleUrls: ['./list-objectif-projet.component.scss'],
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
   FormObjectifProjetComponent
  ]
})
export class ListObjectifProjetComponent implements OnInit{


  displayedColumns: string[] = [
    'code',
    'description',
    'actions'
  ];

  loadingIndicator = true;
  @Input() managementUnitId: any;
  objectifToUpdate: any;
  pageOptions: any = { page: 0, size: 10 };
  datasource: any;
  basicModalCloseResult!: string;

  url: any;
  // read = Authority.READ_IMAGE;
  // add = Authority.ADD_IMAGE;
  // edit = Authority.EDIT_IMAGE;
  // deletes =Authority.DELETE_IMAGE;

  // readVideo = Authority.READ_VIDEO;
  // addVideo  = Authority.ADD_VIDEO;
  // editVideo  = Authority.EDIT_VIDEO;
  // deleteVideos = Authority.DELETE_VIDEO;




  constructor(
    private impactObjetifService: ImpactObjetifService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAllImpact();

  }

  getAllImpact() {
    // this.pageOptions.managementUnitId = localStorage.getItem('managementUnitId');
    this.pageOptions.managementUnitId = localStorage.getItem('projetId');
    this.pageOptions.detailType = "OBJECTIVE"
    this.impactObjetifService.readAllImpactObjectif(this.pageOptions).subscribe({
      next: (value) => {
        this.datasource = value;
        this.loadingIndicator = false;
      },
      error: value => {
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }


  openDialog(content: TemplateRef<any>, modalSize: any, objectif?: any) {
    if(objectif){
      this.objectifToUpdate = objectif;
    }
    this.modalService.open(content, {size: modalSize, backdrop: 'static'}).result.then((result) => {

    }).catch((res) => {});
  }

  close(event: any) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllImpact();
    }
  }

  delete(id: any) {
    Alertes.confirmAction(
      'Suppression',
      'Voulez-vous vraiment executer cette action',
      () => {
        this.impactObjetifService.deleteImpactObjectif(id).subscribe((data) => {
          Alertes.alerteAddSuccess('Objectifs spécifiques');
          this.getAllImpact();
        });
      }
    );
  }

  doSearchImage(data?: any) {
    this.pageOptions = data;
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.getAllImpact();
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllImpact();
  }
}


