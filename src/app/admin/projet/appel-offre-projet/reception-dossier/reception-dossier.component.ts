import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, OnInit, TemplateRef} from '@angular/core';
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
import { MarketFolderService } from 'src/app/services/market-folder/market-folder.service';
import { Alertes } from 'src/app/util/alerte';
import { RoutingAppelOffreSuiteLancementComponent } from '../../routimg-projet/routing-appel-offre-suite-lancement/routing-appel-offre-suite-lancement.component';
import { FormReceptionDossierComponent } from './form-reception-dossier/form-reception-dossier.component';
import { DocumentReceptionDossierComponent } from './document-reception-dossier/document-reception-dossier.component';
import { EvaluationDossierComponent } from '../evaluation-dossier/evaluation-dossier.component';
import {FeatherIconDirective} from "@core/feather-icon/feather-icon.directive";

@Component({
  selector: 'app-reception-dossier',
  templateUrl: './reception-dossier.component.html',
  styleUrls: ['./reception-dossier.component.scss'],
  standalone:true,
  imports: [
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
    FormReceptionDossierComponent,
    DocumentReceptionDossierComponent,
    EvaluationDossierComponent,
    MatTreeModule,
    MatListModule,
    MatTooltipModule,
    MatButtonModule,
    SpinnerComponent,
    RoutingAppelOffreSuiteLancementComponent,
    FeatherIconDirective
  ]
})
export class ReceptionDossierComponent implements OnInit {

  projetId: any;
  dossierToUpdate:any;
  pageOptions: any = {page: 0, size: 20};
  loadingIndicator:boolean=true;
  file!:File;
  datasource: any;
  libelle: any = '';
  lancement: any;
  displayedColumns: string[] = [

    'ref',
    'bidder',
    'time',
    'statut',
    'eval',
    'comments',
    'actions'
  ];
  dossierId: any;
  constructor(
    private modalService: NgbModal,
    private marketFolderService:MarketFolderService
  ) {
  }

  ngOnInit() {
    this.libelle = localStorage.getItem('projetLibelle');
    let lancementItem:any = localStorage.getItem('lancement');
    this.lancement = JSON.parse(lancementItem);
    console.log("je test",this.lancement)
   this.getAllReceptionDossier();
  }

  getAllReceptionDossier(){
    this.pageOptions.passationMarketId=this.lancement.id
    this.marketFolderService.readFolderMarketPage(this.pageOptions).subscribe({
      next:(value)=>{
        this.datasource=value
        console.log("receptionDOssier",this.datasource)
      },
      error:()=>{

      },
      complete:()=>{

      }
    })
    this.loadingIndicator =false;

  }

  attribuer(appelOffre:any, soumissionnaire:any){
    Alertes.confirmAction(
      'Attribution',
      `Voulez-vous attribuer l'appel d'offre "${appelOffre}" a ${soumissionnaire}`,
      () => {
      }
    );
  }
  openBasicModal(content: TemplateRef<any>, actor?: any) {
    this.dossierToUpdate = actor;
    this.dossierId=actor?.id;
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
    }).catch((res) => {
    });
  }

  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllReceptionDossier();
    }
  }

  fileChange(event: any) {
    this.file = event.target.files[0];
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllReceptionDossier();
  }

  import() {

  }

  doSearch(data: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
  }

  deleteFolder(marketId: any) {
    Alertes.confirmAction(
      'Suppression',
      `Voulez-vous supprimé l\élement id ${marketId}`,
      () => {
        this.marketFolderService.deleteFolderMarket(marketId).subscribe({
          next: (value) => Alertes.alerteDeleteSuccess(),
          error: (value) => Alertes.alerteAddDanger(value.error.message),
          complete: () =>
            this.getAllReceptionDossier(),
        });
      }
    );
  }

}

