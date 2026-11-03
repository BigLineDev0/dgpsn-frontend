import { CriticityService } from '@/app/services/criticity/criticity.service';
import { DelayImpactService } from '@/app/services/delay-impact/delay-impact.service';
import { FinancialImpactService } from '@/app/services/financial-impact/financial-impact.service';
import { LabelService } from '@/app/services/labelService/label-service';
import { NatureService } from '@/app/services/nature/nature.service';
import { RiskService } from '@/app/services/risk/risk.service';
import { StatutService } from '@/app/services/statut/statut.service';
import { Alertes } from '@/app/util/alerte';
import { Helper } from '@/app/util/helper';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { RoutingAvancementProjetComponent } from '../../../routimg-projet/routing-avancement-projet/routing-avancement-projet.component';

@Component({
  selector: 'app-form-risque-projet',
  templateUrl: './form-risque-projet.component.html',
  styleUrls: ['./form-risque-projet.component.scss'],
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
export class FormRisqueProjetComponent implements OnInit {
  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  @Output() search: EventEmitter<any> = new EventEmitter();

  @Input() riskToUpdate: any;

  @Input() isSearch!: boolean;

  form!: FormGroup;

  impactFinanciers: any;
  criticities: any;
  impactDelai: any;
  natures: any;
  statuts: any;
  projetId!: string | null;
  value!: number;
  criticite!: string;
  impactDelais: any;
  criticity:any = [
    {name:'ELEVE', poids:'50', description:'Elevé',},
    {name:'MOYEN', poids:'35', description:'Moyen',},
    {name:'FAIBLE', poids:'15', description:'Faible',},
  ]

  //issa-sow
  financialWeight: number = 0;
  delayWeight: number = 0;

  constructor(
    private statutService: StatutService,
    private natureService: NatureService,
    private delayImpactService: DelayImpactService,
    private financialImpactService: FinancialImpactService,
    private criticityService: CriticityService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private riskService: RiskService,
    private labelService:LabelService,
  ) {}

  ngOnInit(): void {
    this.projetId = localStorage.getItem('projetId')!;
    // this.readCriticities();
    // this.readDelayImpacts();
    // this.readFinancialImpacts();
    this.readNatures();
    this.readStatus();

    this.initForm();

    this.editForm();
  }

  initForm() {
    this.form = this.fb.group({
      libelle: ['', Validators.required],
      description: [''],
      author: [''],
      identificationDate: [''],
      probability: [''],
      resolutionDate: [''],
      criticity: [''],
      delayImpact: [''],
      financialImpact: [''],
      statusId: [null],
      natureId: [null],
    });
  }

  editForm() {
    console.log("risk", this.riskToUpdate)
    if (this.riskToUpdate !== undefined) {
      this.form.get('libelle')?.setValue(this.riskToUpdate.libelle);
      this.form.get('description')?.setValue(this.riskToUpdate.description);
      this.form.get('author')?.setValue(this.riskToUpdate.author);
      this.form.get('identificationDate')?.setValue(Helper.editDate(this.riskToUpdate.identificationDate));
      this.form.get('probability')?.setValue(this.riskToUpdate.probability);
      // this.form.get('resolutionDate')?.setValue(Helper.editDate(this.riskToUpdate.resolutionDate))
      this.form.get('criticity')?.setValue(this.riskToUpdate.criticity);
      this.form.get('delayImpact')?.setValue(this.riskToUpdate.delayImpact);
      this.form.get('financialImpact')?.setValue(this.riskToUpdate.financialImpact);
      this.form.get('statusId')?.setValue(this.riskToUpdate.status.id);
      this.form.get('natureId')?.setValue(this.riskToUpdate.nature.id);
      this.financialWeight = this.riskToUpdate.financialImpact?.poids;
      this.delayWeight = this.riskToUpdate.delayImpact?.poids;

      this.setCriticity();
      // console.log("from value", this.form.value)
    }
  }

  readStatus() {
    this.statutService.readstatut({statusType: 'ISSUELOG'}).subscribe((data) => {
      this.statuts = data.content;
      this.sortItems(this.statuts);
    });
  }

  readNatures(){
    let req = {
      page: 0,
      size: 100000,
      sortBy: 'libelle',
      ascending: true,
      referentielType : 'NATURE',
    }
    this.labelService.readLabels(req).subscribe({
      next:reponse=>{
        console.log('liste nature : ',reponse);
        this.natures = reponse.content;
        this.sortItems(this.natures)
      },
      error:erreur=> {

      },
    });

  }
  // readDelayImpacts() {
  //   this.delayImpactService.readdelayImpacts().subscribe((data) => {
  //     this.impactDelais = data.content;
  //     this.sortItems(this.impactDelais);
  //   });
  // }
  // readFinancialImpacts() {
  //   this.financialImpactService.readfinancialImpacts().subscribe((data) => {
  //     this.impactFinanciers = data.content;
  //     this.sortItems(this.impactFinanciers);
  //   });
  // }
  // readCriticities() {
  //   this.criticityService.readcriticities().subscribe((data) => {
  //     this.criticities = data.content;
  //     this.sortItems(this.criticities);
  //   });
  // }

  save() {
    const riskRequest = this.form.value;
    console.log('riskRequest',riskRequest);
    
    riskRequest.projetId = +this.projetId!;
    // riskRequest.identificationDate = Helper.getDateFormatter(
    //   this.form.value.identificationDate
    // );

    if (this.riskToUpdate === undefined) {
      this.create(riskRequest);
    } else {
      this.update(this.riskToUpdate.id, riskRequest);
    }
  }

  create(riskRequest: any) {
    this.riskService.createRisk(riskRequest).subscribe({
      next: (value) => Alertes.alerteAddSuccess('Risque'),
      error: (value) => {
        Alertes.alerteAddDanger(value.error.message);
        console.log('erreur: ',value)
      },
      complete: () => this.close(),
    });
  }

  update(riskId: any, riskRequest: any) {
    this.riskService.updateRisk(riskId, riskRequest).subscribe({
      next: (value) => Alertes.alerteUpdateDanger('Risque'),
      error: (value) => Alertes.alerteUpdateDanger(value.error.message),
      complete: () => this.close(),
    });
  }

  close() {
    this.submit.emit(true);
  }

  setCriticity() {
    this.value = this.financialWeight + this.delayWeight;
    console.log('value : ', this.value);
    if(this.value <= 15){
      this.criticite = 'Faible';
      this.form.value.criticity = 'FAIBLE';
    }else if(this.value <= 35 && this.value > 15){
      this.criticite = 'Moyen';
      this.form.value.criticity = 'MOYEN';
    }else{
      this.criticite = 'Elevé';
      this.form.value.criticity = 'ELEVE';
    }
  }

  getWinancialWeight(event: any) {
    this.financialWeight = 0;

    if (event !== undefined) {
      this.financialWeight = +event.poids;
    }

    this.setCriticity();
  }

  getDelayWeight(event: any) {
    this.delayWeight = 0;

    if (event !== undefined) {
      this.delayWeight = +event.poids;
    }

    this.setCriticity();
  }

  doSearch() {
    const risqueRequest: any = {
      libelle: this.form.value.libelle,
      statusId: this.form.value.statusId,
      natureId: this.form.value.natureId,
      criticity: this.form.value.criticityId,
      identificationDate: this.form.value.identificationDate,
      projetId: +this.projetId!
    };

    this.search.emit(risqueRequest);
  }

  sortItems(labels: any) {
    labels.sort((a: any, b: any) => {
      if (a.libelle < b.libelle) {
        return -1;
      } else if (a.libelle > b.libelle) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
