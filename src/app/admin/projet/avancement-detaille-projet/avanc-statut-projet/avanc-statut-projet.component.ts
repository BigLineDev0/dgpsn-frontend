import { StatutService } from '@/app/services/statut/statut.service';
import { Alertes } from '@/app/util/alerte';
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
import {NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { RoutingAvancementProjetComponent } from '../../routimg-projet/routing-avancement-projet/routing-avancement-projet.component';
import { ImageMediaProjetComponent } from '../avanc-mediatheque-projet/image-media-projet/image-media-projet.component';
import { VideoMediaProjetComponent } from '../avanc-mediatheque-projet/video-media-projet/video-media-projet.component';
import { HistoryStatusService } from '@/app/services/history-status/history-status.service';
import { FormStatutProjetComponent } from './form-statut-projet/form-statut-projet.component';


@Component({
  selector: 'app-avanc-statut-projet',
  templateUrl: './avanc-statut-projet.component.html',
  styleUrls: ['./avanc-statut-projet.component.scss'],
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
   FormStatutProjetComponent
   ]
})
export class AvancStatutProjetComponent implements OnInit {

  @Input() projectId: any;
  pageOptions: any = { page: 0, size: 20 }
  datasource: any;
  basicModalCloseResult!: string;
  statusId: any;
  startDate: any;
  endDate: any;
  statusToUpdate: any;
  libelle: any;
  file!: File;
  // add = Authority.ADD_STATUS;
  // deletes = Authority.DELETE_STATUS;
  // edit = Authority.EDIT_STATUS;
  // read = Authority.READ_STATUS;

  statuts!: MatTableDataSource<any>;
  loadingIndicator = true;
  displayedColumns: string[] = [
    'libelle',
    'dateDebut',
    'dateFin',
    'actions',
  ];

  constructor(private historyStatusService: HistoryStatusService, private modalService: NgbModal, private statutService: StatutService) { }

  ngOnInit(): void {
    this.getAllHistoriesStatus();
    this.libelle = localStorage.getItem('projetLibelle');
  }

  getAllHistoriesStatus() {
    this.loadingIndicator=true;
    // this.pageOptions.projectId = this.projectId;
    this.pageOptions.projectId = localStorage.getItem('projetId');
    this.historyStatusService.readHistoriesStatusProjects(this.pageOptions).subscribe({
      next: value => {
        this.datasource = value;
        this.statuts = value.content;
        console.log('this.statuts', this.statuts);

        this.loadingIndicator=false;
      },
      error: err => {
        console.log(err);
        this.loadingIndicator=false;

      },
      complete: () => {
        this.loadingIndicator = false;
      }

    })
  }

  getSeverity(code: any) {
    if (code == 'ENC') {
      return 'badge bg-primary'
    } else if (code == 'TRM') {
      return 'badge bg-success'
    } else if (code == 'NL') {
      return 'badge bg-warning'
    } else {
      return 'badge bg-danger'
    }
  }

  openBasicModal(content: TemplateRef<any>, status?: any) {
    this.statusToUpdate = status;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => { });
  }
  // readStatus(){
  //   this.statutService.readstatut(this.pageOptions).subscribe(data=>{
  //     this.datasource = data;
  //   })
  // }

  close(event: any) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllHistoriesStatus();
    }
  }

  deleteHistoryStatus(historyStatusId: any) {
    Alertes.confirmAction(
      'Suppression',
      `Voulez-vous supprimé l\élement id ${historyStatusId}`,
      () => {
        this.historyStatusService.deleteHistoryStatusOfProject(historyStatusId).subscribe({
          next: value => Alertes.alerteAddSuccess('Suppression reussi',),
          error: value => Alertes.alerteAddDanger(value.error.message),
          complete: () => this.getAllHistoriesStatus()
        })
      }
    )
  }
  /** paginate page */
  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllHistoriesStatus();
  }

  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    this.pageOptions.projectId = this.projectId;
    this.pageOptions.statusId = data.statusId;
    this.pageOptions.startDate = data.startDate
    this.pageOptions.endDate = data.endDate
    this.getAllHistoriesStatus()
  }
  fileChange(event: any) {
    this.file = event.target.files[0];
  }

  importStatut() {
    this.historyStatusService.importStatut(this.file, this.projectId).subscribe({
      next: value => {
        Alertes.alerteAddSuccess();
        this.close(true)
      }
    })
  }
}
