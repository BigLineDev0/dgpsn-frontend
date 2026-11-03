import { MilestoneService } from '@/app/services/milestone/milestone.service';
import { Alertes } from '@/app/util/alerte';
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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { RoutingConfigProjetComponent } from '../../routimg-projet/routing-config-projet/routing-config-projet.component';
import { FormJalonProjetComponent } from './form-jalon-projet/form-jalon-projet.component';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import {FeatherIconDirective} from "@core/feather-icon/feather-icon.directive";


@Component({
  selector: 'app-param-jalon-projet',
  templateUrl: './param-jalon-projet.component.html',
  styleUrls: ['./param-jalon-projet.component.scss'],
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
        FeatherIconDirective,


    ]
})
export class ParamJalonProjetComponent implements OnInit{

  jalonsObj:any;
  jalonToUpdate:any;
  displayedColumns: string[] = [
    'jalon',
    'dateDebutPrevue',
    'dateDebutReel',
    'comment',
    'actions'
  ];

  pageOptions: any = {page: 0, size: 20}

  dates!: MatTableDataSource<any>;
  datasource: any;
  projetLibelle: any;
  projetId: any;
  loading = true;

  constructor(
    private modalService: NgbModal,
    private milestoneService: MilestoneService,

  ) {
  }
  ngOnInit(): void {
    this.projetLibelle = localStorage.getItem('projetLibelle');
    this.getProjectId();
    this.getAllJalons();

  }

  getProjectId() {
    this.projetId = localStorage.getItem('projectId')!;
  }
  getAllJalons() {
    // alert(this.projetId)
    this.pageOptions.projectId = this.projetId;
    this.milestoneService.readMilestoneProjects(this.pageOptions).subscribe(
      {
        next: response => {
          this.datasource = response;
          this.dates = response.content;
          this.loading = false;
        },
        error: err => {
          console.log(err);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  paginate(event: any) {
    this.pageOptions.page = event - 1;
    this.getAllJalons();
  }

  openBasicModal(content: TemplateRef<any>, jalon?: any) {
    this.jalonToUpdate = jalon;
    this.modalService.open(content, {size: 'xl', backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }
  obj:any;
  openDiagrammeGantt(content: TemplateRef<any>) {
    console.log('Jalon Obj :',this.jalonsObj);
    // this.obj = this.jalonsObj ;
    this.modalService.open(content, {size: 'xl', backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

   doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.getAllJalons();
  }

  delete(id:any){
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.milestoneService.deleteMilestoneToProject(id).subscribe({
          next: (value) => {
            Alertes.alerteDeleteSuccess('Jalons');
          },
          error: (value) => {
            Alertes.alerteDeleteDanger(value.error.message);
          },
          complete: () => {
            this.getAllJalons();
          },
        });
      }
    );
  }

  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllJalons();
    }
  }
}

