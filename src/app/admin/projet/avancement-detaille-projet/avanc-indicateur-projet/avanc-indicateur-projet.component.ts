import { IndicateurService } from '@/app/services/indicateur/indicateur.service';
import { PeriodService } from '@/app/services/period/period.service';
import { ValueIndicatorService } from '@/app/services/value-indicator/value-indicator.service';
import { Alertes } from '@/app/util/alerte';
import { ResponseApi } from '@/app/util/response.model';
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
import {NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { Authority } from 'src/app/util/Authority';
import Swal from 'sweetalert2';
import { RoutingAvancementProjetComponent } from '../../routimg-projet/routing-avancement-projet/routing-avancement-projet.component';
import { FormIndicateurAvancProjetComponent } from './form-indicateur-avanc-projet/form-indicateur-avanc-projet.component';
import { SourceDeDonneesAvancComponent } from '../source-de-donnees-avanc/source-de-donnees-avanc.component';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';

@Component({
  selector: 'app-avanc-indicateur-projet',
  templateUrl: './avanc-indicateur-projet.component.html',
  styleUrls: ['./avanc-indicateur-projet.component.scss'],
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
      FormIndicateurAvancProjetComponent,
      SourceDeDonneesAvancComponent,
      SpinnerComponent,
      NgbCarouselModule,
      RoutingAvancementProjetComponent,

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
    ]
})
export class AvancIndicateurProjetComponent implements OnInit{
  @Input() projectId: any;
  @Input() activityId: any;

  valider = Authority.VALIDER_PROGRESS_TRACKING_INDICATOR

  displayedColumns: string[] = [
    'indicator',
    'periodId',
    'targetValue',
    'valueReched',
    'actions'
  ];

  displayedValidationColumns: string[] = [
    'acteur',
    'profil',
    'validation',
    'commentaire',
    'date',

  ];

  indicateurResquest!: MatTableDataSource<any>;
  loading = true;
  basicModalCloseResult: string = '';
  libelle: any;
  pageOptions: any = {page: 0, size: 20};
  datasource: any;
  valueIndicatorToUpdate: any;
  comparaison:boolean=false;
  isImport: any = false;

  problemeToValid: any;
  valid!: boolean;
  validComment: any;
  profile!: string | null;

  constructor(private valueIndicatorService: ValueIndicatorService, private modalService: NgbModal,
              private periodService: PeriodService, private indicateurService: IndicateurService) { }

  ngOnInit(): void {
    this.getAllValueIndicatorsOfProject();
    this.readPeriode()
    this.libelle = localStorage.getItem('projetLibelle');
    this.profile = sessionStorage.getItem("profile")
  }

  getAllValueIndicatorsOfProject() {
    // this.pageOptions.projectId = this.projectId;
    if(this.activityId){
      this.pageOptions.projectId = this.activityId;
    }else{
      this.pageOptions.projectId = localStorage.getItem('projetId');
    }
    this.valueIndicatorService.readValueIndicatorProjects(this.pageOptions).subscribe({
        next: response => {
          this.datasource = response;
          this.indicateurResquest = response.content;
          // console.log("liste des projets ", this.dataSource)
          // this.showErrorMessage = false;
          this.loading = false;
        },
        error: err => {
          console.log(err);
          this.loading = false;
          // this.showErrorMessage = true;
        },
        complete: () => {
          // this.loadingIndicator = false;
        }
      }
    )
  }

  chargerFichier() {
    Swal.fire({
      title: 'Comparaison...',
      text: 'Comparaison des données en cours...',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    setTimeout(() => {
      Swal.close();
      this.comparaison = true;
      this.alertePop();
    }, 3000);

  }

  // randomNumber(value: any) {
  //   const random = Math.random(); // Génère un nombre entre 0 et 1
  //   const delta = 15;         // Le décalage de 100000
  //
  //   if (random < 0.33) {
  //     return value;               // Retourne la même valeur 33% du temps
  //   } else if (random < 0.66) {
  //     return value - Math.floor(Math.random() * delta); // Retourne value - [0, 100000[
  //   } else {
  //     return value + Math.floor(Math.random() * delta); // Retourne value + [0, 100000[
  //   }
  // }


  alertePop(){
    Swal.fire({
      title: 'Succès!',
      text: 'Les données ont été comparées avec succès. Vous pouvez maintenant consulter les résultats ou effectuer d\'autres actions.',
      icon: 'success',
      timer: 10000,
      timerProgressBar: true,
      showConfirmButton: true,
      allowOutsideClick: true,
    });
  }
  openBasicModal(content: TemplateRef<any>, valueIndicator?: any, iSimport?: boolean) {
    this.valueIndicatorToUpdate = valueIndicator;
    this.isImport = iSimport;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }

  readPeriode(){
    // this.periods = [
    //   {}
    // ]
    // this.periodService.readAllPeriodPeriodicity().subscribe(response => {
    //   this.periods = response.content;
    // })
  }

  close(value: boolean) {
    if(value) {
      this.modalService.dismissAll();
      this.getAllValueIndicatorsOfProject();
    }
  }

  deleteValueIndicator(valueIndicatorId: any) {
    Alertes.confirmAction(
      'Suppression',
      `Voulez-vous supprimer l\élement id: ${valueIndicatorId}`,
      () => {
        this.valueIndicatorService.deleteValueIndicatorToProject(valueIndicatorId).subscribe({
          next: value => Alertes.alerteDeleteSuccess('Suppression reussi'),
          error: value => Alertes.alerteDeleteDanger(value.error.message),
          complete: () => this.getAllValueIndicatorsOfProject()
        })
      }
    )
  }

  doSearch(data: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.pageOptions.projetId = this.projectId;
    this.pageOptions.indicatorId = data.indicatorId;
    this.pageOptions.targetValue = data.targetValue;
    this.pageOptions.valueReched = data.valueReched;
    this.pageOptions.period = data.period;
    this.getAllValueIndicatorsOfProject();
  }

  exportExcel(){
    this.valueIndicatorService.exportProjetToExcel().subscribe({
      next(response: any) {
        // Helper.downloadFile(response, 'Indicateur.csv');
      },
      error(err) {
        Alertes.alerteAddDanger('Une erreur s\'est produite lors de l\'exportation CSV :'+ err)
      },
    })

  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllValueIndicatorsOfProject();
  }

  openCommentaire(content: TemplateRef<any>, problemeToValid?: any) {
    if(problemeToValid.valid){
      // this.validation = "d'invalider"
      // this.valid = false
    }else {
      // this.valid = true
      // this.validation = "de valider"
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
    // this.problemeToValid.validComment = this.validComment
    // this.issueLogRiskService.validIssuelog(this.problemeToValid.id, this.problemeToValid).subscribe({
    //   next: value => Alertes.alerteGlobal("validation réussie"),
    //   error: value => Alertes.alerteGlobal(value.error.message),
    //   complete: () => {
    //     this.readIssueLogs()
    //     this.closeValidation()
    //   }
    // })
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

