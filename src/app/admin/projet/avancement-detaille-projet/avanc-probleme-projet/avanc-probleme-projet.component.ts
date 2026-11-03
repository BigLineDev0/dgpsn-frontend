import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import { Authority } from 'src/app/util/Authority';
import { ResponseApi } from '@/app/util/response.model';
import { CriticityService } from '@/app/services/criticity/criticity.service';
import { NatureService } from '@/app/services/nature/nature.service';
import { StatutService } from '@/app/services/statut/statut.service';
import { Alertes } from '@/app/util/alerte';
import { IssueLogService } from '@/app/services/issue-log/issue-log.service';
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
import { FormProblemeProjetComponent } from './form-probleme-projet/form-probleme-projet.component';

@Component({
  selector: 'app-avanc-probleme-projet',
  templateUrl: './avanc-probleme-projet.component.html',
  styleUrls: ['./avanc-probleme-projet.component.scss'],
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
    FormProblemeProjetComponent
   ]
})
export class AvancProblemeProjetComponent implements OnInit {
  displayedColumns: string[] = [
    'libelle',
    'identificationDate',
    'criticite',
    'statut',
    'actions',

  ];

  displayedValidationColumns: string[] = [
    'acteur',
    'profil',
    'validation',
    'commentaire',
    'date',

  ];

  validations = [
    {
        "acteur": "Mouhamed Sy",
        "profil": "Coordonnateur de Pôle",
        "validation": "Oui",
        "commentaire": "Tous les aspects sont bien couverts.",
        "date": "2024-09-28T10:30:00Z"  // Date la plus récente
    },
    {
        "acteur": "Fatou Bintou	SANE",
        "profil": "Chef de desk",
        "validation": "Non",
        "commentaire": "Des informations manquent.",
        "date": "2024-09-25T11:00:00Z"  // 3 jours avant
    },
    // {
    //     "acteur": "David Diop",
    //     "profil": "Chef de projet",
    //     "validation": "Oui",
    //     "commentaire": "Validation effectuée avec succès.",
    //     "date": "2024-09-22T12:15:00Z"  // 3 jours avant
    // }
]


  issulogResquest!: MatTableDataSource<any>;
  loading = true;
  showErrorMessage = false;
  reorderable = true;
  showConsulter!: boolean;
  @Input() projetId: any;
  pageOptions: any = { page: 0, size: 20 }
  datasource: any;
  basicModalCloseResult!: string;
  statuts: any;
  libelle: any;
  natures: any;
  criticities: any;
  file!: File;
  validComment: any
  
  valider = ""
  // add = Authority.ADD_ISSUE_LOG;
  // deletes = Authority.DELETE_ISSUE_LOG;
  // edit = Authority.EDIT_ISSUE_LOG;
  // read = Authority.READ_ISSUE_LOG;
  // import = Authority.IMPORT_ISSUE_LOG;
  // export = Authority.EXPORT_ISSUE_LOG;
  // addAction = Authority.ACTION_ISSUE_LOG;
  // addrecommendation = Authority.RECOMMENDATION_ISSUE_LOG;
  problemeRiskToUpdate: any;
  issuelogId: any;
  data: any = {
    content: [
      {
        "libelle":"probleme financier",
        "identificationDate":"03-12-2024",
        "criticity":{"libelle":"12"},
        "status":{"libelle":"En cours"},
      },
    ],
    totalElements: 3,
  };
  problemeToValid: any;
  validation!: string;
  valid: any = true;
  profile!: string | null;
  constructor(
    private issueLogService: IssueLogService,
    private modalService: NgbModal,
    private statutService: StatutService,
    private natureService: NatureService,
    private criticityService: CriticityService,
    private router: Router,
    private issueLogRiskService: IssueLogService
  ) { }

  ngOnInit(): void {
    this.readIssueLogs();
    this.libelle = localStorage.getItem('projetLibelle');
    this.valid = 'true'
    this.profile = sessionStorage.getItem("profile")
  }

  readIssueLogs() {
    // setTimeout(() => {
    //   this.datasource = this.data
    //   this.loading = false
    // }, 200);
    this.loading = true;
    // this.pageOptions.projetId = this.projetId;
    this.pageOptions.projetId = localStorage.getItem('projetId');
    this.issueLogService.readIssuelogs(this.pageOptions).subscribe({
        next: response => {
          this.datasource = response;
          this.issulogResquest = response?.content;
           console.log("liste des projets ", this.datasource)
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
  openBasicModal(content: TemplateRef<any>, problemeRiskToUpdate?: any) {
    this.problemeRiskToUpdate = problemeRiskToUpdate;
    this.modalService
      .open(content, { size: 'xl' })
      .result.then((result) => {
      this.basicModalCloseResult = 'Modal closed' + result;
    })
      .catch((res) => { });
  }

  readStatus() {
    this.statutService.readstatut().subscribe((data) => {
      this.statuts = data.content;
    });
  }
  readNatures() {
    this.natureService.readnatures().subscribe((data) => {
      this.natures = data.content;
    });
  }

  readCriticities() {
    this.criticityService.readcriticities().subscribe((data) => {
      this.criticities = data.content;
    });
  }

  navigateToRecommandation(issueLogId: any, recomandationlibelle: any) {
    let recLib = "Probleme : " + recomandationlibelle;
    
    localStorage.setItem('recomandationlibelle', recLib);
    localStorage.setItem('typeRecommandation', 'issuelog');
    localStorage.setItem('issueLogId', issueLogId);
    this.router.navigateByUrl('/projet/recomandation-probleme');
  }

  close(value: boolean) {
    if (value) {
      this.modalService.dismissAll();
      this.readIssueLogs();
    }

  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.readIssueLogs();
  }
  doSearch(data?: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    this.readIssueLogs();
  }

  deleteIssueLog(issueLogRiskId: any) {
    Alertes.confirmAction(
      'Suppression',
      `Voulez-vous supprimé l\élement id ${issueLogRiskId}`,
      () => {
        this.issueLogRiskService.deleteIssuelog(issueLogRiskId).subscribe({
          next: (value) => Alertes.alerteAddSuccess('Suppression reussi'),
          error: (value) => Alertes.alerteAddDanger(value.error.message),
          complete: () => this.readIssueLogs(),
        });
      }
    );
  }
  fileChange(event: any) {
    this.file = event.target.files[0];
  }

  importPloblem() {
    this.issueLogService.importProblem(this.file, this.projetId).subscribe({
      next: value => {
        Alertes.alerteAddSuccess();
        this.close(true)
      }
    })
  }
  exportExcel() {
    this.issueLogService.exportProblemExcel();
  }

  openActionRealized(content: TemplateRef<any>, problemeId: any) {
    // this.router.navigateByUrl('/projet/monitoring-issuelog');
    this.issuelogId = problemeId;
    // console.log("proid: ", problemeId);
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.basicModalCloseResult = 'Modal closed' + result;
    })
      .catch((res) => { });
  }

  getColor(code: any) {
    if (code == 'FAIBLE') {
      return 'badge bg-success';
    } else if (code == 'MOYEN') {
      return 'badge bg-primary';
    } else {
      return 'badge bg-danger';
    }
  }

  openCommentaire(content: TemplateRef<any>, problemeToValid?: any) {
    if(problemeToValid.valid){
      this.validation = "d'invalider"
      // this.valid = false
    }else {
      // this.valid = true
      this.validation = "de valider"
    }
    // this.validComment = problemeToValid.validComment
    this.problemeToValid = problemeToValid;
    this.modalService
      .open(content, { size: 'lg' })
      .result.then((result) => {
      this.basicModalCloseResult = 'Modal closed' + result;
    })
      .catch((res) => { });
  }

  saveValidation(){
    // alert(this.validComment)
    this.problemeToValid.validComment = this.validComment
    this.issueLogRiskService.validIssuelog(this.problemeToValid.id, this.problemeToValid).subscribe({
      next: value => Alertes.alerteGlobal("validation réussie"),
      error: value => Alertes.alerteGlobal(value.error.message),
      complete: () => {
        this.readIssueLogs()
        this.closeValidation()
      }
    })
  }

  closeValidation(){
    this.modalService.dismissAll();
  }

  getValidationColor(valid: Boolean){
    if(valid){
      return '#00813d'
    }else {
      return '#f4c276'
    }    
  }



}
