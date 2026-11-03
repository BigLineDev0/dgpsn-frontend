import { PartnerProjetService } from '@/app/services/partner-projet/partner-projet.service';
import { StructureService } from '@/app/services/structure/structure.service';
import { Alertes } from '@/app/util/alerte';
import { Helper } from '@/app/util/helper';
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
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgbTooltipModule, NgbDropdownModule, NgbPaginationModule, NgbAccordionModule, NgbNavModule, NgbProgressbarModule, NgbCarouselModule, NgbTimepickerModule, NgbPopoverModule, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { RoutingConfigProjetComponent } from '../../routimg-projet/routing-config-projet/routing-config-projet.component';
import { FormJalonProjetComponent } from '../param-jalon-projet/form-jalon-projet/form-jalon-projet.component';
import { FormStructureTutelleProjetComponent } from './form-structure-tutelle-projet/form-structure-tutelle-projet.component';
import {FeatherIconDirective} from "@core/feather-icon/feather-icon.directive";


@Component({
  selector: 'app-param-structure-tutelle-projet',
  templateUrl: './param-structure-tutelle-projet.component.html',
  styleUrls: ['./param-structure-tutelle-projet.component.scss'],
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
        FormJalonProjetComponent,
        SpinnerComponent,
        FormStructureTutelleProjetComponent,
        FeatherIconDirective


    ]
})
export class ParamStructureTutelleProjetComponent implements OnInit{

  displayedColumns: string[] = [

    'nom',
    'role',
    'date debut',
    'date fin',
    'actions'
  ];

  structures!: MatTableDataSource<any>;

  loadingIndicator = true;
  projetId: any;
  partenaires: any = [];
  padToUpdate: any;
  structureId: any;
  projetLibelle: any;
  file!: File;
  pageOptions: any = { page: 0, size: 20 };
  datasource: any;
  montant: any;
  //
  // add =Authority.ADD_SUPERVISION_EXECUTION_STRUCTURE
  // delete=Authority.DELETE_SUPERVISION_EXECUTION_STRUCTURE
  // expo =Authority.EXPORT_SUPERVISION_EXECUTION_STRUCTURE
  // impo =Authority.IMPORT_SUPERVISION_EXECUTION_STRUCTURE
  // read =Authority.READ_SUPERVISION_EXECUTION_STRUCTURE
  // edit =Authority.EDIT_SUPERVISION_EXECUTION_STRUCTURE
  constructor(
    private partenerProjetService: PartnerProjetService,
    private structurerService: StructureService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.projetLibelle = localStorage.getItem('projetLibelle');
    this.getProjectId();
    this.getAllPartnerOfProject();
  }

  getProjectId() {
    this.projetId = localStorage.getItem('projectId')!;
  }


  getAllPartnerOfProject() {
    this.loadingIndicator = true;
    this.pageOptions.projectId = this.projetId;
    this.pageOptions.structureProjectType = "GUARDIANSHIP";
    this.partenerProjetService.readPartnerProjects(this.pageOptions).subscribe(
      {
        next: response => {
          this.datasource = response;
          this.structures = response.content;
          this.loadingIndicator = false;
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

  openBasicModal(content: TemplateRef<any>, structProject?: any) {
    this.padToUpdate = structProject;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }).catch((res) => { });
  }

  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllPartnerOfProject();
    }
  }

  deletePartner(padId: any) {
    this.partenerProjetService.deletePartner(padId).subscribe({
      next: value => {
        Alertes.alerteDeleteSuccess('Structure tutelle');
      },
      error: value => {
        Alertes.alerteDeleteDanger(value.error.message)
      },
      complete: () => {
        this.getAllPartnerOfProject();
      }
    })
  }

  doSearch(data: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.pageOptions.projetId = this.projetId;
    this.pageOptions.structureId = data.structureId;
    this.pageOptions.startDate = data.startDate;
    this.pageOptions.endDate = data.endDate;
    this.pageOptions.montant = data.montant;
    this.pageOptions.structureType = data.structureType;
    this.pageOptions.structureProjectType = data.structureProjectType;
    this.pageOptions.structureProjectTypeList = data.structureProjectTypeList;

    console.log("PAGE_OPTIONS ", this.pageOptions)
    this.getAllPartnerOfProject();
  }
  fileChange(event: any) {
    this.file = event.target.files[0];
  }

  importPartner() {
    this.partenerProjetService.importPartner(this.file, this.projetId).subscribe({
      next: value => {
        Alertes.alerteAddSuccess();
        this.close(true)
      }
    })
  }

  exportPartner() {
    this.partenerProjetService.exportPartner().subscribe({
      next(response: any) {
        Helper.downloadFile(response, 'Partenaire.csv');
      },
      error(err) {
        Alertes.alerteAddDanger('Une erreur s\'est produite lors de l\'exportation CSV :' + err)
      },
    })
  }

  openImportPartner(content: TemplateRef<any>) {
    this.openBasicModal(content);
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllPartnerOfProject();
  }
}
