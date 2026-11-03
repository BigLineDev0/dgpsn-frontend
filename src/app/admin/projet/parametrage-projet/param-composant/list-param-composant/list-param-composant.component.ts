import { Alertes } from '@/app/util/alerte';
import { Authority } from '@/app/util/Authority';
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
import {NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { RoutingConfigProjetComponent } from '../../../routimg-projet/routing-config-projet/routing-config-projet.component';
import { FormParamComposantComponent } from '../form-param-composant/form-param-composant.component';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import {FeatherIconDirective} from "@core/feather-icon/feather-icon.directive";


@Component({
  selector: 'app-list-param-composant',
  templateUrl: './list-param-composant.component.html',
  styleUrls: ['./list-param-composant.component.scss'],
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
        FormParamComposantComponent,
        SpinnerComponent,
        FeatherIconDirective

    ]
})
export class ListParamComposantComponent implements OnInit{

  displayedColumns: string[] = [
    'code',
    'libelle',
    'actions'
  ];
  composants: any[] = [];
  loadingIndicator = true;
  projetId: any;
  composantProjectToUpdate: any;
  projetLibelle: any;
  pageOptions: any = {page: 0, size: 20};
  datasource: any;
  add = "";
  edit = "";
  delete ="";
  read ="";


  constructor(
    // private ugpService: UgpService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.projetLibelle = localStorage.getItem('projetLibelle');
    this.getProjectId();

    this.getAllComposantProjet();
  }

  getProjectId() {
    this.projetId = localStorage.getItem('projectId')!;
  }

  getAllComposantProjet() {
    this.loadingIndicator = false;
    this.pageOptions.projectId = this.projetId;
    this.datasource= {totalElements:0};
    //FIX: 6 exemple de donnes de composant pour tester
    this.composants = [
      {code: '1', libelle: 'Composant 1'},
      {code: '2', libelle: 'Composant 2'},
      {code: '3', libelle: 'Composant 3'},
      {code: '4', libelle: 'Composant 4'},
      {code: '5', libelle: 'Composant 5'},
      {code: '6', libelle: 'Composant 6'}
    ];
    // this.ugpService.readUgpProjects(this.pageOptions).subscribe( {
    //   next: response => {
    //     this.datasource = response;
    //     this.ugps = response.content;
    //     this.loadingIndicator = false;
    //     console.log("logg:",this.ugps)
    //   },
    //   error: err => {
    //     console.log(err);
    //     this.loadingIndicator = false;
    //   },
    //   complete: () => {
    //     this.loadingIndicator = false;
    //   }
    // })
  }

  openBasicModal(content: TemplateRef<any>, composant?: any) {
    this.composantProjectToUpdate = composant;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
    }).catch((res) => {});
  }

  close(event: boolean){
    if(event){
      this.modalService.dismissAll();
      this.getAllComposantProjet();
    }
  }

  deleteComposant(ugpId: any) {
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        // this.ugpService.deleteUgpProject(ugpId).subscribe({
        //   next: value => Alertes.alerteDeleteSuccess('Suppression reussie'),
        //   error: value => Alertes.alerteDeleteDanger(value.error.message),
        //   complete: () => this.getAllComposantProjet()
        // })
      }
    );
  }

  doSearch(data: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.pageOptions.projectId = this.projetId;
    this.pageOptions.code = data.code
    this.pageOptions.libelle = data.libelle
    this.getAllComposantProjet();
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllComposantProjet();
  }

}

