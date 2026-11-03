import { LabelService } from '@/app/services/labelService/label-service';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
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
import { NgbTooltipModule, NgbDropdownModule, NgbPaginationModule, NgbAccordionModule, NgbNavModule, NgbProgressbarModule, NgbCarouselModule, NgbTimepickerModule, NgbPopoverModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { MarketFolderService } from 'src/app/services/market-folder/market-folder.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { FormRisqueProjetComponent } from '../../../avancement-detaille-projet/avanc-risque-projet/form-risque-projet/form-risque-projet.component';
import { RoutingAvancementProjetComponent } from '../../../routimg-projet/routing-avancement-projet/routing-avancement-projet.component';

@Component({
  selector: 'app-form-reception-dossier',
  templateUrl: './form-reception-dossier.component.html',
  styleUrls: ['./form-reception-dossier.component.scss'],
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
    RoutingAvancementProjetComponent,
    FormRisqueProjetComponent
   ]
})
export class FormReceptionDossierComponent implements OnInit {

  form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() label!: string;
  @Input() projetId: any;
  @Input() selectedActor: any;
  @Input() dossierToUpdate: any;
  @Input() isSearch!: boolean;
  @Input() isSearchAttri!: boolean;
  etat: boolean = false;
  coll: boolean = false;
  ep: boolean = false;
  snspm: boolean = false;
  formatTime(timeString: string): string {
    const time = new Date(timeString);
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return formattedTime;
  }


  marketId: any;
  statutReception: any;

  constructor(private labelService: LabelService, private marketFolderService: MarketFolderService) {
  }

  ngOnInit() {
    this.initForm();
    this.getMarketId();
    this.getStatusReception();
    this.editForm()
  }

  getMarketId() {
    this.marketId = localStorage.getItem('evaluation')
  }
  getStatusReception() {
    const req = {
      page: 0,
      size: 10000,
      referentielType: "STATUT_DE_LA_RECEPTION"
    }
    this.labelService.readLabels(req).subscribe({
      next: (value) => {
        this.statutReception = value.content
        console.log
      },
      error: (value) => {

      }
    })
  }

  initForm() {
    this.form = new FormGroup(
      {
        fileNumber: new FormControl('', Validators.required),
        bidderName: new FormControl('', Validators.required),
        legalRepresentative: new FormControl('', Validators.required),
        receptionManager: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required),
        dateReceptFile: new FormControl('', Validators.required),
        timeReceptFile: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        receptionStatusId: new FormControl('', Validators.required)
      }
    );
  }

  editForm() {
    if (this.dossierToUpdate !== undefined) {
      this.form.get('fileNumber')?.setValue(this.dossierToUpdate.fileNumber)
      this.form.get('bidderName')?.setValue(this.dossierToUpdate.bidderName)
      this.form.get('legalRepresentative')?.setValue(this.dossierToUpdate.legalRepresentative)
      this.form.get('receptionManager')?.setValue(this.dossierToUpdate.receptionManager)
      this.form.get('email')?.setValue(this.dossierToUpdate.email)
      this.form.get('phoneNumber')?.setValue(this.dossierToUpdate.phoneNumber)
      this.form.get('dateReceptFile')?.setValue(Helper.editDate(this.dossierToUpdate.dateReceptFile))
      this.form.get('timeReceptFile')?.setValue(this.formatTime(this.dossierToUpdate.timeReceptFile))
      this.form.get('description')?.setValue(this.dossierToUpdate.description)
      this.form.get('receptionStatusId')?.setValue(this.dossierToUpdate.receptionStatusId)
    }

  }

  save() {
    const dossierForm = this.form.value;
    dossierForm.passationMarketId = +this.marketId;
    dossierForm.timeReceptFile = Helper.getTimeValue(this.form.get('timeReceptFile'));
    console.log("savedDosier", typeof (Helper.getTimeValue(this.form.get('timeReceptFile'))))
    if (this.dossierToUpdate === undefined) {
      this.create(dossierForm);
    } else {
      this.update(this.dossierToUpdate.id, dossierForm);
    }
  }

  create(form: any) {
    this.marketFolderService.createFolderMarket(form).subscribe({
      next: (value) => {
        Alertes.alerteAddSuccess('enregistrement effectue');
      },
      error: (value) => {

        Alertes.alerteAddDanger(value.error.message)
      },
      complete: () => {
        this.close();
      }
    })
  }


  update(id: any, form: any) {
    this.marketFolderService.updateFolderMarket(id, form).subscribe({
      next: () => {
        Alertes.alerteUpdateSuccess('mise a jour effectue');
      },
      error: (value) => {
        Alertes.alerteUpdateDanger(value.error.message)
      },
      complete: () => {
        this.close();
      }
    })
  }


  close() {
    this.submit.emit(true);
  }

  doSearch() {
    this.search.emit(this.form.value);
  }


}
