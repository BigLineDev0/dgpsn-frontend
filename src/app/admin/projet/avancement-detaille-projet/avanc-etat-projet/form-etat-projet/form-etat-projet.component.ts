import { FlagService } from '@/app/services/flag/flag.service';
import { HistoryFlagService } from '@/app/services/history-flag/history-flag.service';
import { LabelService } from '@/app/services/labelService/label-service';
import { Alertes } from '@/app/util/alerte';
import { Helper } from '@/app/util/helper';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
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
import { RoutingAppelOffreProjetComponent } from '../../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';

@Component({
  selector: 'app-form-etat-projet',
  templateUrl: './form-etat-projet.component.html',
  styleUrls: ['./form-etat-projet.component.scss'],
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
export class FormEtatProjetComponent implements OnInit {

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() isSearch!: boolean;
  @Input() flagToUpdate: any;

  @Input() projetId: any;

  flags: any = [];

  form!: FormGroup;

  constructor(private modalService: NgbModal,
              private flagService: FlagService,
              private fb: FormBuilder,
              private historyFlagService: HistoryFlagService,
              private labelService:LabelService) { }

  ngOnInit(): void {
    this.readFlags();

    this.initForm();

    this.loadFields();

    this.getProjetId();
  }

  getProjetId() {
    this.projetId = localStorage.getItem('projetId')!;
  }

  initForm() {
    this.form = this.fb.group({
      startDate:new FormControl('', Validators.required),
      endDate:new FormControl('', Validators.required),
      flagId:new FormControl('', Validators.required)
    })
  }

  loadFields() {
    if(this.flagToUpdate !== undefined) {
      console.log("flagId .flagToUpdate.", this.flagToUpdate.flag.id)
      if(this.flagToUpdate.startDate){
        this.form.get('startDate')?.setValue(Helper.editDate(this.flagToUpdate.startDate));
      }
      if(this.flagToUpdate.endDate) {
        this.form.get('endDate')?.setValue(Helper.editDate(this.flagToUpdate.endDate));
      }
      this.form.get('flagId')?.setValue(this.flagToUpdate.flag.id);
    }
  }

  save() {
    const historyFlag = this.form.value;
    historyFlag.projetId = +this.projetId;

    if(this.form.valid){
      if(this.flagToUpdate === undefined) {
        this.create(historyFlag);
      } else {
        this.update(this.flagToUpdate.id, historyFlag);
      }
    }
  }

  create(historyFlag: any){
    this.historyFlagService.addHistoryFlagOfProject(historyFlag).subscribe({
      next: value => Alertes.alerteAddSuccess('Etat'),
      error: (erreur) => {
        console.log('erreur lors de l\'ajout',erreur)
        Alertes.errorPopPup('Ajout échouée',erreur?.error?.message)
      },
      complete: () => this.close()
    })
  }

  update(historyFlagId: any, historyFlag: any) {
    this.historyFlagService.updateHistoryFlagOfProject(historyFlagId, historyFlag).subscribe({
      next: value => Alertes.alerteUpdateSuccess('Etat'),
      error: (erreur) => {
        // Alertes.alerteAddDanger(value.error.message);
        console.log('erreur lors de l\'ajout',erreur)
        Alertes.errorPopPup('Modification échouée',erreur?.error?.message)
      },
      complete: () => this.close()
    })
  }

  close(){
    this.submit.emit(true);
  }

  readFlags(){
    let req = {
      page: 0,
      size: 100000,
      sortBy:'libelle',
      ascending: true,
      referentielType : 'FLAG',
    };
    this.labelService.readLabels(req).subscribe(data=>{
      this.flags = data.content;
    })
  }

  doSearch() {
    const historyFlag: any = this.form.value;
    historyFlag.projectId = this.projetId;
    this.search.emit(historyFlag);
  }
}
