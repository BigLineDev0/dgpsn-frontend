import {Component, EventEmitter, Output, TemplateRef} from '@angular/core';
import {NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import { Alertes } from '@/app/util/alerte';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { InfosActeurModalProjetComponent } from '../infos-acteur-modal/infos-acteur-modal-projet.component';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { FormActeurEvaluationProjetComponent } from '../form-acteur-evaluation/form-acteur-evaluation-projet.component';


@Component({
  selector: 'app-list-evaluation-acteur-projet',
  templateUrl: './list-evaluation-acteur-projet.component.html',
  styleUrls: ['./list-evaluation-acteur-projet.component.scss'],
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
    SpinnerComponent,
    FormActeurEvaluationProjetComponent,

  ]
})
export class ListEvaluationActeurProjetComponent {

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  file!:File;
  loadingIndicator = false;
  evaluationToUpdate : any;
  evaluation : any;
  evaluationId : any;
  evaluations: any=[
    {periode:'Janvier',annee:'2024',note:'12'},
    {periode:'Fevrier',annee:'2024',note:'10'},
    {periode:'Mars',annee:'2024',note:'20'},
    {periode:'Avril',annee:'2024',note:'19'},
    {periode:'Mai',annee:'2024',note:'15'},
    {periode:'Juin',annee:'2024',note:'14'},
    {periode:'Juillet',annee:'2024',note:'08'},
    {periode:'Aout',annee:'2024',note:'11'},
  ];
  pageOptions: any = { page: 0, size: 10 };
  dataSource: any;
  metadata: any;
  displayedColumns: string[] = [
    'annee',
    'periode',
    'note',
    'actions',
  ];

  constructor(
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  // getEntreprises(){
  //   this.loadingIndicator = true;
  //   const params = this.pageOptions;
  //   this.evaluationService.readEntreprises(params).subscribe({
  //     next: response => {
  //       this.dataSource = response?.payload;
  //       this.metadata = response?.metadata;
  //     },
  //     error: err => this.loadingIndicator = false,
  //     complete: () => this.loadingIndicator = false
  //   });
  // }

  delete(evaluationId:any){
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
      })

  }

  paginate($event: any){
    this.loadingIndicator = true;
    this.pageOptions.page = $event - 1;
  }

  close(event: boolean){
    if (event) {
      this.modalService.dismissAll();
    }
  }

  doSearch(data: any){
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    this.modalService.dismissAll();
  }

  openBasicModal(content: TemplateRef<any>, size?: any, evaluation?: any) {
    this.evaluation = evaluation;
    this.evaluationId = evaluation?.id;
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {

    }).catch((res) => {
    });
  };

  import() {
  }

  fileChange(event: any){
    this.file = event.target.files[0];
  }

  openUrl(id: any, url: any) {
    if (id) {
      localStorage.setItem('idEntreprise', id);
    }
    this.router.navigateByUrl(url);
  }

  openFicheModal(content: TemplateRef<any>, evaluation?: any) {
    this.evaluation = evaluation;
    this.modalService.open(content, {size: 'xl', backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});

  }
}
