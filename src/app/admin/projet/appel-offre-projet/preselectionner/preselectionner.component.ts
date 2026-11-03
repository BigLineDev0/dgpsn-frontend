import { Alertes } from '@/app/util/alerte';
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
import { PreselectionnedFileService } from 'src/app/services/preselectionnedFile/preselectionned-file.service';
import { RoutingAppelOffreProjetComponent } from '../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';
import { RoutingAppelOffreSuiteLancementComponent } from '../../routimg-projet/routing-appel-offre-suite-lancement/routing-appel-offre-suite-lancement.component';
import { FormPreselectionneComponent } from './form-preselectionne/form-preselectionne.component';
import { DocumentReceptionDossierComponent } from '../reception-dossier/document-reception-dossier/document-reception-dossier.component';

@Component({
  selector: 'app-preselectionner',
  templateUrl: './preselectionner.component.html',
  styleUrls: ['./preselectionner.component.scss'],
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
    RoutingAppelOffreSuiteLancementComponent,
    FormPreselectionneComponent,
   DocumentReceptionDossierComponent
  ]
})
export class PreselectionnerComponent implements OnInit {

  projetId: any;
  dossierToUpdate:any;
  pageOptions: any = {page: 0, size: 20};
  loadingIndicator:boolean=true;
  file!:File;
  preselectionToUpdate:any;
  datasource: any;
  lancement: any;
  libelle: any;
  winner:boolean=true
  lost:boolean=false
  displayedColumns: string[] = [

    'ref',
    'bidder',
    'time',
    'statut',
    'eval',
    'actions'
  ];
  marketId: any;
  constructor(
    private modalService: NgbModal,
    private preselectionnedService: PreselectionnedFileService
  ) {
  }

  ngOnInit() {
    this.libelle = localStorage.getItem('projetLibelle');
    let lancementItem:any = localStorage.getItem('marches');
    this.lancement = JSON.parse(lancementItem);
    this.getAllReceptionDossier();
  }




  getAllReceptionDossier(){
    this.pageOptions.passationMarketId=this.lancement.id
    console.log("idMarcheControl",this.lancement.id)
    this.preselectionnedService.readPreselectionnedfiles(this.pageOptions).subscribe({
      next:(value)=>{
        this.datasource=value
        console.log("preselectionDOssier",this.datasource)
      },
      error:()=>{

      },
      complete:()=>{

      }
    })
    this.loadingIndicator =false;

  }

  attribuer(appelOffre?:any, soumissionnaire?:any){
    Alertes.confirmAction(
      'Attribution',
      `Voulez-vous attribuer l'appel d'offre 	Acquisition de matériels roulants (un véhicule, un tricycle et cinq motos en trois lots au soumissionnaire SA MAJORS`,
      () => {
        this.preselectionToUpdate=appelOffre;
        console.log("je fais la mise a jour ",this.preselectionToUpdate)
        let form = {
          marketFileId: appelOffre.marketFileId,
          passationMarketId:appelOffre.passationMarketId,
          winner:true
        }
        this.preselectionnedService.updatePreselectionnedfile(appelOffre.id,form).subscribe({
          next:()=>{
            Alertes.alerteAddSuccess("Le marche a bien etait attribue")
          },
          error:()=>{

          },
          complete:()=>{
            this.getAllReceptionDossier()
          }
        })
        console.log("mise attribut",form)
      }
    );
  }
  openBasicModal(content: TemplateRef<any>, actor?: any) {
    this.preselectionToUpdate = actor;
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

  deleteFolderPreselected(preselectiondId: any) {
    Alertes.confirmAction(
      'Suppression',
      `Voulez-vous supprimé l\élement id ${preselectiondId}`,
      () => {
        this.preselectionnedService.deletePreselectionnedfile(preselectiondId).subscribe({
          next: (value) => Alertes.alerteDeleteSuccess(),
          error: (value) => Alertes.alerteAddDanger(value.error.message),
          complete: () =>
            this.getAllReceptionDossier(),
        });
      }
    );
  }


}
