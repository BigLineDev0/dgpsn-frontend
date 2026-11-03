import { CriticityService } from '@/app/services/criticity/criticity.service';
import { NatureService } from '@/app/services/nature/nature.service';
import { RiskService } from '@/app/services/risk/risk.service';
import { StatutService } from '@/app/services/statut/statut.service';
import { Alertes } from '@/app/util/alerte';
import { ResponseApi } from '@/app/util/response.model';
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
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { Router } from '@angular/router';
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { RoutingAvancementProjetComponent } from '../../routimg-projet/routing-avancement-projet/routing-avancement-projet.component';
import { ImageMediaProjetComponent } from '../avanc-mediatheque-projet/image-media-projet/image-media-projet.component';
import { VideoMediaProjetComponent } from '../avanc-mediatheque-projet/video-media-projet/video-media-projet.component';
import { FormRisqueProjetComponent } from './form-risque-projet/form-risque-projet.component';



@Component({
  selector: 'app-avanc-risque-projet',
  templateUrl: './avanc-risque-projet.component.html',
  styleUrls: ['./avanc-risque-projet.component.scss'],
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
    RoutingAvancementProjetComponent,
    FormRisqueProjetComponent
   ]
})
export class AvancRisqueProjetComponent implements OnInit {
  displayedColumns: string[] = [
    'libelle',
    'nature',
    'probabilite',
    'criticite' ,
    'statut',
    'actions',

  ];

  RisqueResquests!: MatTableDataSource<any>;
  loading = true;
  showErrorMessage= false;
  reorderable = true;
  // ColumnMode = ColumnMode;
  showConsulter!: boolean;
  hideshowParametrage!: boolean;
  @Input() projetId: any;
  datasource:any;
  pageOptions: any = {page:0,size:20}
  basicModalCloseResult!: string;
  statuts: any;
  natures: any;
  criticities: any;
  riskToUpdate: any;
  libelle: any;
  file!: File;
  data: any = {
    content: [

      {
        "libelle":"riisque financier",
        "indicatorProjet":{
          "indicator": {"libelle":"Indicateur 1"}
        },
        "criticity":{"libelle":"12"},
        "status":{"libelle":"En cours"},
        "nature":{"libelle":"Financier"},
        "probability":"90",
        "valueReched":"80",
      },
    ],
    totalElements: 3,
  };
  // add = Authority.ADD_RISK;
  // deletes = Authority.DELETE_RISK;
  // edit = Authority.EDIT_RISK;
  // read = Authority.READ_RISK;
  // import = Authority.IMPORT_RISK;
  // export = Authority.EXPORT_RISK;
  // readprobleme = Authority.PROBLEME_RISK;
  // readrecommendation = Authority.RECOMMENDATION_RISK;

  constructor(private riskService: RiskService,
              private modalService: NgbModal,
              private statutService: StatutService,
              private natureService: NatureService,
              private criticityService: CriticityService,
              private router: Router) { }

  ngOnInit(): void {
    this.readRisks();
    this.libelle = localStorage.getItem('projetLibelle');
  }

  readRisks(){
    // this.pageOptions.projetId = this.projetId;
    this.pageOptions.projetId = localStorage.getItem('projetId');
    this.riskService.readRisks(this.pageOptions).subscribe({
        next: response => {
          this.datasource = response;
          this.RisqueResquests = response.content;
          console.log("liste des risks ", response)
          this.showErrorMessage = false;
          this.loading = false;
        },
        error: err => {
          console.log(err);
          this.loading = false;
          this.showErrorMessage = true;
        },
        complete: () => {
          this.loading = false;
        }
      }
    )
  }

  openBasicModal(content: TemplateRef<any>, riskToUpdate?: any) {
    this.riskToUpdate = riskToUpdate;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }

  readStatus(){
    this.statutService.readstatut().subscribe(data=>{
      this.statuts = data.content;

    })
  }
  readNatures(){
    this.natureService.readnatures().subscribe(data=>{
      this.natures = data.content;
    })
  }

  readCriticities(){
    this.criticityService.readcriticities().subscribe(data=>{
      this.criticities = data.content;
    })
  }

  navigateToRecommandation(riskId: any,riskrecomandationlibelle: any){
    let recLib = "Risque : "+riskrecomandationlibelle;
    localStorage.setItem('recomandationlibelle', recLib);
    localStorage.setItem("typeRecommandation", "risk");
    localStorage.setItem("riskId", riskId)
    this.router.navigateByUrl("/projet/avancement-detaille/risque/recomandation")
  }

  close(value: boolean) {
    if(value) {
      this.modalService.dismissAll();
      this.readRisks();
    }
  }

  deleteRisk(riskId: any) {
    Alertes.confirmAction(
      'Suppression',
      `Voulez-vous supprimé l'élément id ${riskId}`,
      () => {
        this.riskService.deleteRisk(riskId).subscribe({
          next: value => Alertes.alerteDeleteSuccess('Risque'),
          error: value => Alertes.alerteDeleteDanger(value.error.message),
          complete: () => this.readRisks()
        })
      }
    )
  }

  paginate($event:any){
    this.pageOptions.page =$event -1;
    this.readRisks()
  }
  doSearch(data: any) {

    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    this.readRisks()
  }
  fileChange(event: any){
    this.file = event.target.files[0];
  }

  importRisk() {
    // this.riskService.importrisk(this.file, this.projetId).subscribe({
    //   next: value => {
    //     Alertes.alerteAddSuccess();
    //     this.close(true)
    //   }
    // })
  }

  exportExcel(){
    this.riskService.exportRiskToExcel();
  }

  getBadge(value:any){
    switch(value){
      case 'ELEVE':
        return 'badge bg-success';
      case 'MOYEN':
        return 'badge bg-secondary';
      default:
        return 'badge bg-danger';
    }
  }

}
