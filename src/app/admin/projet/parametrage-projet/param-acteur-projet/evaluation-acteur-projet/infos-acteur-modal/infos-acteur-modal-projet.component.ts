import { LogsService } from '@/app/services/logs/logs.service';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
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
import { NgbTooltipModule, NgbDropdownModule, NgbPaginationModule, NgbAccordionModule, NgbNavModule, NgbProgressbarModule, NgbCarouselModule, NgbTimepickerModule, NgbPopoverModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';


@Component({
  selector: 'app-infos-acteur-modal-projet',
  templateUrl: './infos-acteur-modal-projet.component.html',
  styleUrls: ['./infos-acteur-modal-projet.component.scss'],
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
  
  ]
})
export class InfosActeurModalProjetComponent implements OnInit{

  datasource: any;
  logs!: MatTableDataSource<any>;
  pageOptions: any = { page: 0, size: 20 };
  loadingIndicator = true;
  displayedColumns: string[] = [
    // 'utilisateur',
    // 'login',
    'actionType',
    'chemin',
    // 'method',
    'ipAddress',
    // 'userAgent',
    // 'url',
    'creationDate'
  ];

  journals:any=[
    {actionType:'Ajout de taux d\'avancement',path:'Projets/Liste Projets/Avancement detaillé/Indicateur',creationDate:'25/09/2024 17:28:24',ipAddress:'127.0.0.1'},
    {actionType:'Modification de taux d\'avancement',path:'Projets/Liste Projets/Avancement detaillé/Indicateur',creationDate:'25/09/2024 17:28:24',ipAddress:'127.0.0.1'},
    {actionType:'Ajout de Projet',path:'Projets/Liste Projets',creationDate:'25/09/2024 17:28:24',ipAddress:'127.0.0.1'},
  ];

  constructor(
    private logService: LogsService

  ) {
  }

  ngOnInit() {
    this.getInfos();
  }

  getInfos() {
    this.logService.getLogs(this.pageOptions).subscribe({
      next: value => {
        this.datasource = value;
        this.logs = value.content;
        // console.log("logs ", this.logs)
      },
      error: err => {
        console.log(err);
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    })
  }

  doSearch(data: any) {
    this.loadingIndicator = true;
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 5;
    console.log("test:",data)
    this.getInfos();
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getInfos();
  }


}
