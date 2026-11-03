import { FlagService } from '@/app/services/flag/flag.service';
import { HistoryFlagService } from '@/app/services/history-flag/history-flag.service';
import { Alertes } from '@/app/util/alerte';
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
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { FormEtatProjetComponent } from './form-etat-projet/form-etat-projet.component';


@Component({
  selector: 'app-avanc-etat-projet',
  templateUrl: './avanc-etat-projet.component.html',
  styleUrls: ['./avanc-etat-projet.component.scss'],
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
    RoutingAvancementProjetComponent,
    SpinnerComponent,
    FormEtatProjetComponent,
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
    ]
})
export class AvancEtatProjetComponent implements OnInit {

  @Input() projectId: any;
  basicModalCloseResult!: string;
  refFlags: any;
  datasource:any;
  pageOptions:any ={page:0, size:20}
  flagToUpdate: any;
  libelle: any;
  // add = Authority.ADD_FLAG;
  // deletes = Authority.DELETE_FLAG;
  // edit = Authority.EDIT_FLAG;
  // read = Authority.READ_FLAG;

  flags!: MatTableDataSource<any>;
  loadingIndicator = true;
  displayedColumns: string[] = [
    'libelle',
    'dateDebut',
    'dateFin',
    'actions',
  ];

  constructor(private historyFlagService: HistoryFlagService,
              private modalService: NgbModal,
              private flagService: FlagService) { }

  ngOnInit(): void {
    this.getAllHistoriesFlags();
    this.readFlags();
    this.libelle = localStorage.getItem('projetLibelle');
  }

  getAllHistoriesFlags() {
    // this.pageOptions.projectId = this.projectId;
    this.pageOptions.projectId = localStorage.getItem('projetId');
    this.historyFlagService.readHistoriesFlagProjects(this.pageOptions).subscribe({
      next: value => {this.datasource = value;
        this.flags=value.content
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

  getColor(flag: any) {
    if(flag.libelle === 'Mauvais') return 'color: crimson';
    else if(flag.libelle === 'Moyen') return 'color: gold';
    else return 'color: darkgreen';
  }

  openBasicModal(content: TemplateRef<any>, flag?: any) {
    this.flagToUpdate = flag;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }

  readFlags(){
    this.flagService.readFlags().subscribe(data=>{
      this.refFlags = data.content;

    })
  }

  close(value: boolean) {
    if(value) {
      this.modalService.dismissAll();
      this.getAllHistoriesFlags();
    }
  }

  deleteHistoryStatus(historyFLAGId: any) {
    Alertes.confirmAction(
      'Suppression',
      `Voulez-vous supprimé l\élement id ${historyFLAGId}`,
      () => {
        this.historyFlagService.deleteHistoryFlagOfProject(historyFLAGId).subscribe({
          next: value => Alertes.alerteAddSuccess('Suppression reussi',),
          error: value => Alertes.alerteAddDanger(value.error.message),
          complete: () => this.getAllHistoriesFlags()
        })
      }
    )
  }

  paginate($event:any){
    this.pageOptions.page = $event -1;
    this.getAllHistoriesFlags();
  }

  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    this.pageOptions.projectId = this.projectId;
    this.pageOptions.flagId = data.flagId;
    this.pageOptions.startDate = data.startDate;
    this.pageOptions.endDate = data.endDate;
    this.getAllHistoriesFlags();
  }

}
