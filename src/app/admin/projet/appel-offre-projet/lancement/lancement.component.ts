import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, TemplateRef } from '@angular/core';
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
import { Router, ActivatedRoute } from '@angular/router';
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import * as saveAs from 'file-saver';
import { ListboxModule } from 'primeng/listbox';
import { MarketPassationService } from 'src/app/services/market-passation/market-passation.service';
import { Authority } from 'src/app/util/Authority';
import { Alertes } from 'src/app/util/alerte';
import { ResponseApi } from 'src/app/util/response.model';
import { FormLancementComponent } from './form-lancement/form-lancement.component';
import { EvaluationDossierComponent } from '../evaluation-dossier/evaluation-dossier.component';
import { RoutingAppelOffreProjetComponent } from '../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';
@Component({
  selector: 'app-lancement',
  templateUrl: './lancement.component.html',
  styleUrls: ['./lancement.component.scss'],
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
    FormLancementComponent,
    EvaluationDossierComponent,
    RoutingAppelOffreProjetComponent,
    EvaluationDossierComponent
   ]
})
export class LancementComponent {

  add = Authority.ADD_PLAN_DE_PASSATION_MARKET;
  deletes = Authority.DELETE_PLAN_DE_PASSATION_MARKET;
  edit = Authority.EDIT_PLAN_DE_PASSATION_MARKET;
  read = Authority.READ_PLAN_DE_PASSATION_MARKET;
 
  loadingIndicator = true;
  displayedColumns: string[] = [
    'reference',
    'libelle',
    'objet',
    'responsable',
    // 'lieu',
    'date_debut',
    // 'description',
    'actions'
  ];

  projetId: any;
  libelle: any;
  marketToUpdate: any;
  pageOptions: any = {
    page: 0,
    size: 20
  }
  pasationId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private marketPassationService: MarketPassationService,
    private modalService: NgbModal,
  ) {


  }



  datasource: any;


  ngOnInit(): void {
    this.libelle = localStorage.getItem('projetLibelle');
    this.getPlanPassationId();
    this.getAllMarket(this.pageOptions);
  }

  getPlanPassationId() {
    var recup = localStorage.getItem('passationPlanId')
    this.pasationId = JSON.stringify(recup)

  }

  getAllMarket(pageOptions: any) {
    const passationPlanId = JSON.parse(this.pasationId)
    pageOptions.passationPlanId=passationPlanId
    console.log("plan Bouna",passationPlanId)
    //pageOptions
  this.marketPassationService.readMarketPassations(pageOptions).subscribe({
    next:(value)=>{
       this.datasource=value
       console.log("allMarket",this.datasource)
    },
    error:(value)=>{

    }

  })
  this.loadingIndicator = false;
  }
  getCritereEvaluation(evaluation: any) {
    localStorage.setItem('evaluation', JSON.stringify(evaluation));
    this.router.navigateByUrl("/admin/acces/appel-offre/plan-de-passation/marches/critere-evaluation")
    console.log('evaluation:', evaluation)
  }
  getReceptionDossier(evaluation: any) {
    localStorage.setItem('lancement', JSON.stringify(evaluation));
    this.router.navigateByUrl("/admin/acces/appel-offre/plan-de-passation/marches/reception-dossier")
    // console.log('evaluation:', evaluation)
  }
  openPreselectionner(marches: any) {
    localStorage.setItem('marches', JSON.stringify(marches));
    this.router.navigateByUrl("/admin/acces/appel-offre/plan-de-passation/marches/preselectionne")
    // console.log('evaluation:', evaluation)
  }

  openBasicModal(content: TemplateRef<any>, activite?: any) {
    this.marketToUpdate = activite;
    this.modalService.open(content, { size: 'xl', backdrop: 'static' }).result.then((result) => {

    }).catch((res) => { });
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllMarket(this.pageOptions);
  }
  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllMarket(this.pageOptions);
    }
  }

  doSearch(data: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.getAllMarket(this.pageOptions);

  }

  deleteMarket(marketId: any) {
    Alertes.confirmAction(
      'Suppression',
      `Voulez-vous supprimé l\élement id ${marketId}`,
      () => {
        this.marketPassationService.deleteMarketPassation(marketId).subscribe({
          next: (value) => Alertes.alerteDeleteSuccess(),
          error: (value) => Alertes.alerteAddDanger(value.error.message),
          complete: () =>
            this.getAllMarket(this.pageOptions),
        });
      }
    );
  }
}
