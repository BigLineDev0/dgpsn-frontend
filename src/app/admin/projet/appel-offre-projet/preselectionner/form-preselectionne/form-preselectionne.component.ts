
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
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
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { PreselectionnedFileService } from 'src/app/services/preselectionnedFile/preselectionned-file.service';
import { Alertes } from 'src/app/util/alerte';
import { RoutingAppelOffreProjetComponent } from '../../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';
import { MarketFolderService } from '@/app/services/market-folder/market-folder.service';

@Component({
  selector: 'app-form-preselectionne',
  templateUrl: './form-preselectionne.component.html',
  styleUrls: ['./form-preselectionne.component.scss'],
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
export class FormPreselectionneComponent implements OnInit {

  form!: FormGroup;
  pageOptions: any = { page: 0, size: 20 };
  loadingIndicator: boolean = true;
  datasource: any;
  @Input() projetId: any;
  @Input() label!: string;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() dossierPreselectionToUpdate: any;
  @Input() isSearch!: boolean;

  displayedColumns: string[] = [
    'select',
    'ref',
    'code',
    'nom',
    'eval',
    'time',
    'comments',
    // 'actions'
  ];
 
  lancement: any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private marketFolderService: MarketFolderService,
    private preselectionnedService: PreselectionnedFileService

  ) {
  }

  ngOnInit() {

    this.getMarketId()
    
    this.getAllDossierPerMarket();
    this.initForm();
    this.editForm();
  }


  //ici je recupere le marche id
  getMarketId() {
    let lancementItem: any = localStorage.getItem('lancement');
    this.lancement = JSON.parse(lancementItem);
  }

 

  //ici je recupere la liste des dossiers d'un marches
  getAllDossierPerMarket() {
    const req = {
      page: 0,
      size: 20,
      passationMarketId: this.lancement.id
    }
    this.marketFolderService.readFolderMarketPage(req).subscribe({
      next: (value) => {
        this.datasource = value.content
      },
      error: () => {

      },
      complete: () => {

      }
    })
    this.loadingIndicator = false;

  }


  initForm() {
    this.form = new FormGroup(
      {
        marketFileId: new FormControl([], Validators.required),
        winner:new FormControl('')
      }
    );
  }

  editForm() {
    if (this.dossierPreselectionToUpdate !== undefined) {
      const marketFileId = [this.dossierPreselectionToUpdate.marketFileEntity.id];
      this.form.get('marketFileId')?.setValue(marketFileId);

    }
  }
  save() {
    const formPreselectioned = this.form.value;
    
    let tab: any[] = []
    for (let i = 0; i < formPreselectioned.marketFileId.length; i++) {
      let form = {
        marketFileId: formPreselectioned.marketFileId[i],
        passationMarketId:this.lancement.id
      }
      tab.push(form)
    }
    if (this.dossierPreselectionToUpdate === undefined) {
       this.create(tab)
    } else {

      let form = {
        marketFileId: formPreselectioned.marketFileId[0],
        passationMarketId:this.lancement.id,
        winner:formPreselectioned.winner
      }
     
      this.update(this.dossierPreselectionToUpdate.id, form)
    }

  }



  create(form: any) {
    this.preselectionnedService.createPreselectionnedfile(form).subscribe({
      next: (value) => {
        Alertes.alerteAddSuccess("enregistrement reussi")
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.message.code)
      },
      complete: () => {
        this.close()
      }
    })
  }

  update(id: any, form: any) {
    this.preselectionnedService.updatePreselectionnedfile(id,form).subscribe({
      next: (value) => {
        Alertes.alerteAddSuccess("Modification reussi")
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.message.code)
      },
      complete: () => {
        this.close()
      }
    })
  }

  close() {
    this.submit.emit(true);
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllDossierPerMarket();
  }
  doSearch() {
    this.search.emit(this.form.value);
  }

}
