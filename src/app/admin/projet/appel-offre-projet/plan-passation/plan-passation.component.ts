import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";

import {Router} from "@angular/router";
import { PlanPassationService } from 'src/app/services/plan-passation/plan-passation.service';
import { Authority } from 'src/app/util/Authority'
import { RoutingAppelOffreProjetComponent } from '../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { FormPlanPassationProjetComponent } from './form-plan-passation-projet/form-plan-passation-projet.component';
import { Alertes } from '@/app/util/alerte';
import { CommonModule } from '@angular/common';
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
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';

@Component({
  selector: 'app-plan-passation',
  templateUrl: './plan-passation.component.html',
  styleUrls: ['./plan-passation.component.scss'],
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
    RoutingAppelOffreProjetComponent,
    SpinnerComponent,
    FormPlanPassationProjetComponent,

  ]
})
export class PlanPassationComponent implements OnInit{

  projetId: any;
  libelle:any;
  planToUpdate:any;
  pageOptions: any = {page: 0, size: 20};
  file!: File;
  loadingIndicator = true;
  datasource: any;
  displayedColumns: string[] = [
    'ref',
    'libelle',
    'lancement',
    'actions'
  ];

    add = Authority.ADD_PLAN_DE_PASSATION;
    read = Authority.READ_PLAN_DE_PASSATION;
    deletes = Authority.DELETE_PLAN_DE_PASSATION;
    edit = Authority.EDIT_PLAN_DE_PASSATION;
  managementUnitId: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private planpassaionservice: PlanPassationService

  ) {
  }

  ngOnInit() {
    this.libelle = localStorage.getItem('projetLibelle');
    this.getManagementUnitId();
    this.getAllPlanOfProjet();
  }

  getManagementUnitId(){
    this.managementUnitId =localStorage.getItem("projetId")
   }
  getAllPlanOfProjet(){
    const req={
      page:0,
      size:20,
      managementUnitId:this.managementUnitId
    }

    this.planpassaionservice.readPlanPassations(req).subscribe({
      next: (value) => {
        this.datasource = value;
        console.log("source",this.datasource)
      },
      error: (value) => Alertes.alerteAddDanger(value.error.message),

    });
    this.loadingIndicator = false;

  }

  openBasicModal(content: TemplateRef<any>, actor?: any) {
    this.planToUpdate = actor;
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
    }).catch((res) => {});
  }

  close(event: boolean){
    if(event){
      this.modalService.dismissAll();
      this.getAllPlanOfProjet();
    }
  }


  fileChange(event: any){
    this.file = event.target.files[0];
  }
  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllPlanOfProjet();
  }

  import(){

  }
  doSearch(data: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
  }

  openMarche(value?:any){
      this.router.navigateByUrl("/admin/acces/appel-offre/plan-de-passation/marches")
      localStorage.setItem("passationPlanId",JSON.stringify(value.id));
      console.log("idPlanPassation",value.id)
  }

  delete(marketId: any) {
    Alertes.confirmAction(
      'Suppression',
      `Voulez-vous supprimé l\élement id ${marketId}`,
      () => {
        this.planpassaionservice.deletePlanPassation(marketId).subscribe({
          next: (value) => Alertes.alerteDeleteSuccess(),
          error: (value) => Alertes.alerteAddDanger(value.error.message),
          complete: () =>
            this.getAllPlanOfProjet(),
        });
      }
    );
  }
}
