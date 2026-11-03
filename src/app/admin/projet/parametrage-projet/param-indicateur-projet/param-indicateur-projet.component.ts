import { IndicateurProjetService } from '@/app/services/indicateur-projet/indicateur-projet.service';
import { IndicateurService } from '@/app/services/indicateur/indicateur.service';
import { Alertes } from '@/app/util/alerte';
import { Authority } from '@/app/util/Authority';
import { Helper } from '@/app/util/helper';
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
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { RoutingConfigProjetComponent } from '../../routimg-projet/routing-config-projet/routing-config-projet.component';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { FormIndicateurAvancProjetComponent } from '../../avancement-detaille-projet/avanc-indicateur-projet/form-indicateur-avanc-projet/form-indicateur-avanc-projet.component';
import { FormIndicateurProjetComponent } from './form-indicateur-projet/form-indicateur-projet.component';
import {FeatherIconDirective} from "@core/feather-icon/feather-icon.directive";


@Component({
  selector: 'app-param-indicateur-projet',
  templateUrl: './param-indicateur-projet.component.html',
  styleUrls: ['./param-indicateur-projet.component.scss'],
            standalone:true,
    imports: [
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
        RoutingConfigProjetComponent,
        SpinnerComponent,
        FormIndicateurProjetComponent,
        FeatherIconDirective

    ]
})
export class ParamIndicateurProjetComponent implements OnInit{

  displayedColumns: string[] = [

    'libelle',
    'periodicite',
    'valeur cible',
    'actions'
  ];

  indicators!: MatTableDataSource<any>;

  loadingIndicator = true;

  projectId: any;
  pageOptions: any = {page: 0, size: 20};
  datasource: any;
  projetLibelle: any;
  file!:File;
  indicatorToUpdate: any;
  add = ""
  update = ""
  delete = ""
  export = ""
  import =""
  read = ""

  constructor(
    private indicatorProjetService: IndicateurProjetService,
    private indicateurService: IndicateurService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.projetLibelle = localStorage.getItem('projetLibelle');
    this.getProjectId();

    this.getAllIndicateurProjet();
  }

  getProjectId() {
    this.projectId = localStorage.getItem('projectId')!;
  }

  getAllIndicateurProjet() {
    this.pageOptions.projetId = this.projectId;
    this.indicatorProjetService.readIndicatorProjects(this.pageOptions).subscribe(
      {
        next: response => {
          this.datasource = response;
          this.indicators = response.content;
          this.loadingIndicator = false;
        },
        error: err => {
          console.log(err);
          this.loadingIndicator = false;
        },
        complete: () => {
          this.loadingIndicator = false;
        }
      }
    )
  }

  openBasicModal(content: TemplateRef<any>, indicator?: any) {
    this.indicatorToUpdate = indicator;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
    }).catch((res) => {});
  }

  close(event: boolean){
    if(event){
      this.modalService.dismissAll();
      this.getAllIndicateurProjet();
    }
  }

  deleteIndicateur(indicateurId: any) {
    this.indicatorProjetService.deleteIndcateurProject(indicateurId).subscribe({
      next: value => Alertes.alerteDeleteSuccess('Indicateur'),
      error: value => Alertes.alerteDeleteDanger(value.error.message),
      complete: () => this.getAllIndicateurProjet()
    })
  }

  doSearch(data: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.pageOptions.projetId = this.projectId;
    this.pageOptions.indicatorId = data.indicatorId;
    this.pageOptions.periodicityId = data.periodicityId;
    this.pageOptions.targetValue = data.targetValue;
    this.getAllIndicateurProjet();
  }
  fileChange(event: any){
    this.file = event.target.files[0];
  }
  importIndicateur(){
    this.indicatorProjetService.importIndicator(this.file, this.projectId).subscribe({
      next: value => {
        Alertes.alerteAddSuccess();
        this.close(true)
      }
    })
  }

  exportIndicator() {
    this.indicatorProjetService.exportIndicator().subscribe({
      next(response: any) {
        Helper.downloadFile(response, 'Indicateur.csv');
      },
      error(err) {
        Alertes.alerteAddDanger('Une erreur s\'est produite lors de l\'exportation CSV :'+ err)
      },
    })
  }

  openImportIndicator(content: TemplateRef<any>) {
    this.openBasicModal(content);
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllIndicateurProjet();
  }
}


