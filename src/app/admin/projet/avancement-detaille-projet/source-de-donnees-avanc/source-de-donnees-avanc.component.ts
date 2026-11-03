import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
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
import {NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import Swal from "sweetalert2";
import { FormPlanPassationProjetComponent } from '../../appel-offre-projet/plan-passation/form-plan-passation-projet/form-plan-passation-projet.component';
import { RoutingAppelOffreProjetComponent } from '../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';

@Component({
  selector: 'app-source-de-donnees-avanc',
  templateUrl: './source-de-donnees-avanc.component.html',
  styleUrls: ['./source-de-donnees-avanc.component.scss'],
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
    RoutingAppelOffreProjetComponent,
    SpinnerComponent,
    FormPlanPassationProjetComponent,

  ]
})
export class SourceDeDonneesAvancComponent implements OnInit{

  @Output() submit : EventEmitter <boolean>= new EventEmitter();
  @Output() charger : EventEmitter <boolean>= new EventEmitter();
  loadingIndicator:boolean = true;
  datasource:any;
  pageOptions: any = {page: 0, size: 20};
  displayedColumns: string[] = [
    'libelle',
    'file',
    'etat',
    'actions'
  ];

  sources:any =[
    {libelle:'File 1.xlsx',file:'',fichierPrincipal:true},
    {libelle:'File 2.pdf',file:'',fichierPrincipal:false},
    {libelle:'File 3.docx',file:'',fichierPrincipal:false},
    {libelle:'File 4.csv',file:'',fichierPrincipal:false},
  ]

  selectedFichierPrincipal: number = 0; // Fichier 1 est sélectionné par défaut



  constructor(
    private modalService: NgbModal,

  ) {
  }

  ngOnInit() {
    this.getAllSourceDeDonnees();
  }

  getAllSourceDeDonnees(){
    this.loadingIndicator = false;
    this.datasource = {
      content: this.sources,
      totalElements: this.sources.length
    };
  }

  setFichierPrincipal(index: number) {
    this.sources.forEach((source:any, i:any) => source.fichierPrincipal = i === index);
  }

  openBasicModal(content: TemplateRef<any>, source?: any) {
    // this.sourceToUpdate = source;
    this.modalService
      .open(content, { size: 'lg' })
      .result.then((result) => {})
      .catch((res) => {});
  }

  close(){
    this.submit.emit(true);
  }

  chargerFichier() {
    this.close();
    this.charger.emit(true);
    Swal.fire({
      title: 'Chargement...',
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
      this.alertePop();
    }, 3000);

  }

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


  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllSourceDeDonnees();
  }

}
