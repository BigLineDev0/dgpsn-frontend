import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import { AssignmentService } from '@/app/services/assignment/assignment.service';
import { Alertes } from '@/app/util/alerte';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { RoutingAvancementProjetComponent } from '../../routimg-projet/routing-avancement-projet/routing-avancement-projet.component';
import { FormRisqueProjetComponent } from '../avanc-risque-projet/form-risque-projet/form-risque-projet.component';
import { FormMissionComponent } from './recomandation-mission/form-mission/form-mission.component';
import { FormMissionProjetComponent } from './form-mission-projet/form-mission-projet.component';


@Component({
  selector: 'app-avanc-mission-projet',
  templateUrl: './avanc-mission-projet.component.html',
  styleUrls: ['./avanc-mission-projet.component.scss'],
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
    FormMissionProjetComponent
   ]
})
export class AvancMissionProjetComponent implements OnInit {
  @Input() projetId: any;
  pageOptions: any = {page:0 , size:10 }
  datasource: any;
  missions!: MatTableDataSource<any>;
  missionToUpdate: any;
  assignmentToview: any;
  libelle: any;
  file!: File;
  loading = true;
  showErrorMessage = false;
  // add = Authority.ADD_ASSIGNMENT;
  // readassignmentrecommendation = Authority.READ_ASSIGNMENT_RECOMMENDATION;
  // readassignmentissuelog = Authority.READ_ASSIGNMENT_ISSUE_LOG;
  // read = Authority.READ_ASSIGNMENT;
  // update = Authority.EDIT_ASSIGNMENT;
  // import = Authority.IMPORT_ASSIGNMENT;
  // export = Authority.EXPORT_ASSIGNMENT;
  // delete = Authority.DELETE_ASSIGNMENT;
  data: any = {
    content: [
      {
        "assignmentType":{"libelle":"Financier"},
        "structureExecution":{"nom":"MEPC"},
        "endDate":"01-01-2003",
        "startDate":"01-01-2004",
        "libelle":"Mission de reconnaissance",
      },
    ],
    totalElements: 3,
  };
  displayedColumns: string[] = [
    'libelle',
    'startDate',
    'endDate',
    'assignmentType',
    'structureExecution',
    'action',
  ];
  constructor(
    private assignmentService: AssignmentService,
    private modalService: NgbModal, private router: Router
  ) { }

  ngOnInit(): void {
    this.readAssignments();
    this.libelle = localStorage.getItem('projetLibelle');
  }


  readAssignments() {
    this.pageOptions.projetId = localStorage.getItem('projetId');
    
    console.log("PROJET_ID: ", localStorage.getItem('projetId'))

    this.assignmentService.readAssignments(this.pageOptions).subscribe({
      next: (data) => {
        this.datasource = data;
        this.missions = data.content;
        this.showErrorMessage = false;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.showErrorMessage = true;
      }
    });
  }

  navigateToRecommandation(missionId: any, libelleMission:any){
    localStorage.setItem("assignmentId", missionId)
    localStorage.setItem('typeRecommandation', 'mission')
    // localStorage.setItem('libelleMission', libelleMission);
    localStorage.setItem('recomandationlibelle', libelleMission);
    
    this.router.navigateByUrl("/projet/recomandation-mission")
  }
  navigateToProbleme(missionId: any, libelleMission:any){
    localStorage.setItem("assignmentId", missionId)
    localStorage.setItem('typeRecommandation', 'mission')
    // localStorage.setItem('libelleMission', libelleMission)
    localStorage.setItem('recomandationlibelle', libelleMission);
    // this.router.navigateByUrl("/projet/probleme-mission")
  }

  openBasicModal(content: TemplateRef<any>, mission?: any) {
    this.missionToUpdate = mission;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
    }).catch((res) => {});
  }

  deleteMission(id: any) {
    Alertes.confirmAction(
      "Suppression",
      "Voulez-vous vraiment executer cette action",
      () => {
        this.assignmentService.deleteAssignment(id).subscribe(data => {
          this.readAssignments();
        })
      })
  }

  close(event: boolean){
    if(event){
      this.modalService.dismissAll();
      this.readAssignments();
    }
  }

  checkPdf(document: any){

    if(document?.path?.indexOf(".pdf")>0){
      return true;
    }
    return false;
  }

  viewDoc(content: TemplateRef<any>, assignmentToview:any){
    this.assignmentToview =assignmentToview;
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
      // this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }

  downloadFile(mission: any){
    // this.assignmentService.readFile(mission?.id).subscribe(data=>{
    //
    //   let fileArrays: string[] = mission?.path?.split("\\")
    //   let value = fileArrays[fileArrays?.length-1]
    //
    //   if(value != null){
    //     if(this.readFormat(mission?.path, ".xlsx")){
    //       const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    //       saveAs(blob,value)
    //     }
    //     else if(this.readFormat(mission?.path, ".xls")){
    //       const blob = new Blob([data], { type: 'application/vnd.ms-excel'});
    //       saveAs(blob,value)
    //
    //     }
    //     else if(this.readFormat(mission?.path, ".doc")){
    //       const blob = new Blob([data], { type: 'application/msword'});
    //       saveAs(blob,value)
    //
    //     }
    //     else if(this.readFormat(mission?.path, ".docx")){
    //       const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
    //       saveAs(blob,value)
    //     }
    //   }
    // })

  }

  readFormat(file: string, format: string){
    if(file.indexOf(format)>0){
      return false;
    }
    return true;
  }
  paginate($event:any){
    this.pageOptions.page = $event - 1;
    this.readAssignments();
  }
  doSearch(data:any){
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    this.pageOptions.projetId = this.projetId;
    this.pageOptions.libelle = data.libelle;
    this.pageOptions.assignmentTypeId = data.assignmentTypeId;
    this.pageOptions.startDate = data.startDate;
    this.pageOptions.endDate = data.endDate;
    this.pageOptions.structureExecutionId = data.structureExecutionId;
    this.pageOptions.partenerId = data.partenerId;
    this.pageOptions.statusId = data.statusId;
    this.readAssignments()
  }

  fileChange(event: any){
    this.file = event.target.files[0];
  }

  importMission() {
    // this.assignmentService.importAssignment(this.file, this.projetId).subscribe({
    //   next: value => {
    //     Alertes.alerteAddSuccess();
    //     this.close(true)
    //   }
    // })
  }

  exportMission() {
    // this.assignmentService.exportAssignment().subscribe({
    //   next(response: any) {
    //     Helper.downloadFile(response, 'Mission.csv');
    //   },
    //   error(err) {
    //     Alertes.alerteAddDanger('Une erreur s\'est produite lors de l\'exportation CSV :'+ err)
    //   },
    // })
  }

  openImportMission(content: TemplateRef<any>) {
    this.openBasicModal(content);
  }
}
