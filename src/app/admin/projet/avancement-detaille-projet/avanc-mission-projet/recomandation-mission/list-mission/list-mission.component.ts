import { RoutingAvancementProjetComponent } from '@/app/admin/projet/routimg-projet/routing-avancement-projet/routing-avancement-projet.component';
import { RecommendationService } from '@/app/services/recommendation/recommendation.service';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
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
import { StatutService } from 'src/app/services/statut/statut.service';
import { Alertes } from 'src/app/util/alerte';
import { Authority } from 'src/app/util/Authority';
import { ImageMediaProjetComponent } from '../../../avanc-mediatheque-projet/image-media-projet/image-media-projet.component';
import { VideoMediaProjetComponent } from '../../../avanc-mediatheque-projet/video-media-projet/video-media-projet.component';
import { FormMissionComponent } from '../form-mission/form-mission.component';
import {AgentRoutingComponent} from "@/app/admin/agent/agent-routing/agent-routing.component";

@Component({
  selector: 'app-list-mission',
  templateUrl: './list-mission.component.html',
  styleUrls: ['./list-mission.component.scss'],
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
   FormMissionComponent,
      AgentRoutingComponent
   ]
})
export class ListMissionComponent {


 // recommandations: any = [];
 pageOptions:any = {page:0 ,size:20};
 datasource:any;
 recomMission!: MatTableDataSource<any>;

 statuts = [];
 typerecommandation: any;
 currentPage = 0;
 basicModalCloseResult!: string;
 assignmentId!: string | null;
 issueLogId:any;
 recommandationEdit: any;
  libelleMission: any;
  recomandationlibelle: any;
 projetLibelle:any
 projetLibelles:any;
 add = "";
 read = "";
 update = "";
 delete = "";
 displayedColumns: string[] = [
  //  'issueLog',
   'libelle',
   'responsable',
   'deadline',
   'status',
   'action',
 ];
 loadingIndicator = true;
 showErrorMessage = false;
 constructor(
   private recommendationService: RecommendationService,
   private modalService: NgbModal,
   private statutService: StatutService
 ) {}

  ngOnInit(): void {
    this.recomandationlibelle = localStorage.getItem('recomandationlibelle');
   this.assignmentId = localStorage.getItem('assignmentId');
   this.issueLogId = localStorage.getItem('issueLogId');
  //  this.projetLibelles = localStorage.getItem('recomandationlibelle');
  //  console.log("this.projetLibelle",this.projetLibelle);
  
   this.projetLibelle = localStorage.getItem('projetLibelle');
   this.libelleMission = localStorage.getItem('libelleMission');
   this.projetLibelle =JSON.stringify(this.projetLibelle)
   this.readRecommendations();
   this.readStatus();
 }

  readRecommendations() {
    if (localStorage.getItem('typeRecommandation') === 'issuelog') {
      this.pageOptions.issueLogId = this.issueLogId;
    } else if (localStorage.getItem('typeRecommandation') === 'mission') { 
      this.pageOptions.assignmentId = this.assignmentId;
    }
  //  this.pageOptions.assignmentId = this.assignmentId;
  //   this.pageOptions.issueLogId = this.issueLogId;
    
   this.recommendationService
     .readRecommendations(this.pageOptions)
     .subscribe({
       next: (data) => {
         this.datasource = data;
         this.recomMission = data.content;
         this.showErrorMessage = false;
         this.loadingIndicator = false;
       },
       error: (err) => {
         console.log(err);
         this.loadingIndicator = false;
         this.showErrorMessage = true;
       },
     });
 }


 openBasicModal(content: TemplateRef<any>, recom?: any) {
   this.recommandationEdit = recom;
   this.modalService
     .open(content, { size: 'lg' })
     .result.then((result) => {
       this.basicModalCloseResult = 'Modal closed' + result;
     })
     .catch((res) => {});
 }

 readStatus() {
   this.statutService.readstatut().subscribe((data) => {
     this.statuts = data.content;
   });
 }

 close(value: boolean) {
   if(value) {
     this.modalService.dismissAll();
     this.readRecommendations();
   }
 }

 deleteRecommendations(id: any) {
   console.log(id);
   Alertes.confirmAction(
     'Suppression',
     'Voulez-vous vraiment executer cette action',
     () => {
       this.recommendationService
         .deleteRecommendation(id)
         .subscribe((data) => {
           this.readRecommendations();
         });
     }
   );
 }
paginate($event:any){
 this.pageOptions.page = $event -1;
 this.readRecommendations();
}
 doSearch(data: any) {
 this.pageOptions = data;
 this.pageOptions.page = 0;
 this.pageOptions.size = 20;
   this.readRecommendations();
 }

 getBadgeClass(statusCode: any): string {
  switch (statusCode) {
    case 'TER':
      return 'badge bg-success';
    case 'RBLOQUE':
      return 'badge bg-danger';
      case 'ENCOURSR':
        return 'badge  bg-secondary';
    default:
      return 'badge bg-primary';
  }
}
}
