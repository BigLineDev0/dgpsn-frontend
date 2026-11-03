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
import { RoutingAppelOffreProjetComponent } from '../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';
import { EvaluationDossierComponent } from '../evaluation-dossier/evaluation-dossier.component';
import { FormLancementComponent } from '../lancement/form-lancement/form-lancement.component';
import { FormReceptionDossierComponent } from '../reception-dossier/form-reception-dossier/form-reception-dossier.component';

@Component({
  selector: 'app-attribution-marche',
  templateUrl: './attribution-marche.component.html',
  styleUrls: ['./attribution-marche.component.scss'],
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
    RoutingAppelOffreProjetComponent,
    FormReceptionDossierComponent
   ]
})
export class AttributionMarcheComponent implements OnInit{

  projetId: any;
  libelle: any;
  datasource: any;
  pageOptions: any = {page: 0, size: 20};
  loadingIndicator:boolean=true;
  displayedColumns: string[] = [
    'ref',
    'numero',
    'nom',
    'objet',
    'dateAttri',
    'note',
    'actions'
  ];

  constructor(
    private modalService: NgbModal

  ) {
  }

  ngOnInit() {
    this.libelle = localStorage.getItem('projetLibelle');
    this.getAllAttributionMarche();
  }

  getAllAttributionMarche(){
    this.datasource = {
      content: [
        {
          ref: "AO-123/2021",
          numero: "DOSS-SENE-004",
          nom: "Entreprise BuildPlus",
          objet: "Construction d'une école primaire",
          dateAttri: "2021-12-15",
          note: "Marché attribué après analyse des offres techniques et financières. Notification envoyée le 15/12/2021."
        },
        {
          ref: "AO-456/2021",
          numero: "DOSS-SENE-032",
          nom: "Services Experts",
          objet: "Audit comptable",
          dateAttri: "2021-11-03",
          note: "Entreprise retenue pour sa réactivité et ses tarifs compétitifs."
        },
        {
          ref: "AO-789/2022",
          numero: "PP-SENE-002",
          nom: "ImpressionsDéco",
          objet: "Impression de supports de communication",
          dateAttri: "2022-03-25",
          note: "Soumissionnaire le mieux-disant choisi, meilleure qualité d'impression."
        }
      ],
      totalElements:3,
    }
    this.loadingIndicator =false;

  }

  openBasicModal(content: TemplateRef<any>, actor?: any) {
    // this.receptionToUpdate = actor;
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
    }).catch((res) => {
    });
  }

  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllAttributionMarche();
    }
  }
  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllAttributionMarche();
  }

  doSearch(data: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
  }
}
