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
import { CritereMarketService } from 'src/app/services/critere-market/critere-market.service';
import { Alertes } from 'src/app/util/alerte';
import { ResponseApi } from 'src/app/util/response.model';
import { FormRisqueProjetComponent } from '../../../avancement-detaille-projet/avanc-risque-projet/form-risque-projet/form-risque-projet.component';
import { RoutingAvancementProjetComponent } from '../../../routimg-projet/routing-avancement-projet/routing-avancement-projet.component';
import { FormCritereEvaluationComponent } from '../form-critere-evaluation/form-critere-evaluation.component';
import { RoutingAppelOffreSuiteLancementComponent } from '../../../routimg-projet/routing-appel-offre-suite-lancement/routing-appel-offre-suite-lancement.component';
@Component({
  selector: 'app-list-critere-evaluation',
  templateUrl: './list-critere-evaluation.component.html',
  styleUrls: ['./list-critere-evaluation.component.scss'],
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
   FormCritereEvaluationComponent,
    RoutingAppelOffreSuiteLancementComponent
   ]
})
export class ListCritereEvaluationComponent {

  displayedColumns: string[] = [
    //'lancement',
    'critere',
    'valeur',
    'ponderation',
    'actions'
  ];
  loadingIndicator = true;
  projetId: any;
  libelle: any;
  critereToUpdate: any;
  pageOptions: any = {
    page: 0,
    size: 20
  }
  marketId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private critereMarketService: CritereMarketService,
  ) {


  }

  data: any = {
    content: [

      {
        critere: "Expérience et Références",
        valeurAttendue: "Démonstration de réalisations antérieures similaires",
        ponderation: 20
      },
      {
        critere: "Capacité Technique",
        valeurAttendue: "Expertise technique démontrée",
        ponderation: 15
      },
      {
        critere: "Capacité Financière",
        valeurAttendue: "Capacité à financer et gérer le projet",
        ponderation: 10
      },
      {
        critere: "Conformité aux Spécifications",
        valeurAttendue: "Conformité aux spécifications et exigences de l'appel d'offres",
        ponderation: 25
      },
      {
        critere: "Délais de Livraison",
        valeurAttendue: "Capacité à respecter les délais de livraison",
        ponderation: 15
      },
      {
        critere: "Budget",
        valeurAttendue: "Proposition compétitive par rapport aux concurrents",
        ponderation: 15
      }


    ],
    totalElements: 20,
  };

  datasource: any;

  loading = true;

  ngOnInit(): void {
    this.libelle = localStorage.getItem('projetLibelle');
    this.getMarketId();
    this.getCritereMarket(this.pageOptions);
  }

  getMarketId() {
    this.marketId = localStorage.getItem('evaluation')
    console.log(this.marketId)
  }
  getCritereMarket(pageOptions: any) {
    pageOptions.passationMarketId = this.marketId
    this.critereMarketService.readCritereMarketPage(pageOptions).subscribe({
      next: value => {
        this.datasource = value
        console.log("critereMarket", this.datasource)
      },
      error: value => {
        Alertes.alerteAddDanger(value.error.message)

      },
      complete: () => {

      }
    })
    this.loadingIndicator = false;
  }

  openBasicModal(content: TemplateRef<any>, activite?: any) {
    console.log("clike",)
    //console.log("layeTest",this.getIndexOfElement(activite))
    if (activite !== undefined || null) {
      activite.index = this.getIndexOfElement(activite);
      this.critereToUpdate = activite;

    }

    this.critereToUpdate = activite;

    this.modalService.open(content, { size: 'xl', backdrop: 'static' }).result.then((result) => {

    }).catch((res) => { });
  }

  getIndexOfElement(element: any): number {
    return this.datasource.content.indexOf(element);
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getCritereMarket(this.pageOptions);
  }
  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      this.getCritereMarket(this.pageOptions);
    }
  }

  doSearch(data: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.getCritereMarket(this.pageOptions);

  }

  deleteCritereMarket(marketId: any) {
    Alertes.confirmAction(
      'Suppression',
      `Voulez-vous supprimé l\élement id ${marketId}`,
      () => {
        this.critereMarketService.deleteCritereMarket(marketId).subscribe({
          next: (value) => Alertes.alerteDeleteSuccess(),
          error: (value) => Alertes.alerteAddDanger(value.error.message),
          complete: () =>
            this.getCritereMarket(this.pageOptions),
        });
      }
    );
  }
}
