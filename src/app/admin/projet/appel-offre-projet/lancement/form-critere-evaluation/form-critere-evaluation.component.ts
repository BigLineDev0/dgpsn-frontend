import { LabelService } from '@/app/services/labelService/label-service';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
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
import { CritereMarketService } from 'src/app/services/critere-market/critere-market.service';
import { Alertes } from 'src/app/util/alerte';
import { FormRisqueProjetComponent } from '../../../avancement-detaille-projet/avanc-risque-projet/form-risque-projet/form-risque-projet.component';
import { RoutingAvancementProjetComponent } from '../../../routimg-projet/routing-avancement-projet/routing-avancement-projet.component';
import { RoutingAppelOffreSuiteLancementComponent } from '../../../routimg-projet/routing-appel-offre-suite-lancement/routing-appel-offre-suite-lancement.component';

@Component({
  selector: 'app-form-critere-evaluation',
  templateUrl: './form-critere-evaluation.component.html',
  styleUrls: ['./form-critere-evaluation.component.scss'],
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
export class FormCritereEvaluationComponent {
  form!: FormGroup
  @Input() projetId: any;
  @Input() label!: string;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() isSearch!: boolean;
  @Input() critereToUpdate: any;
  typeNumber: boolean = false
  typeText: boolean = true


  critereEvaluation = [
    { nom: 'Budget', type: "number" },
    { nom: 'Qualité technique', type: "text" },
    { nom: 'Délai d\'exécution' },
    { nom: 'Expérience du candidat', type: "text" },
    { nom: 'Capacité financière ' },
    { nom: 'Critères environnementaux' },
    { nom: 'Expérience et Références' },
    { nom: 'Capacité Technique' },
    { nom: 'Conformité aux Spécifications' },
    { nom: 'Délais de Livraison' },
    { nom: 'Critères sociaux' },
    { nom: 'Critères environnementaux' },
    { nom: 'Innovation' },
    { nom: 'Chlorures' },
    { nom: 'Originalité' },
    // Ajoutez d'autres paramètres si nécessaire
  ];


  polluantAir = [
    { nom: 'Prix' },
    { nom: 'Qualité technique' },
    { nom: 'Délai d\'exécution' },
    { nom: 'Expérience du candidat' },
    { nom: 'Capacité financière du candidat' },
    { nom: 'Critères environnementaux' },
    { nom: 'Critères sociaux' },
    { nom: 'Critères environnementaux' },
    { nom: 'Innovation' },
    { nom: 'Chlorures' },
    { nom: 'Originalité' },
    // Ajoutez d'autres paramètres si nécessaire
  ];
  marketId: any;
  criterEvaluate: any;


  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private critereMarketService: CritereMarketService,
    private labelService: LabelService
  ) {

  }
  ngOnInit(): void {
    this.getMarketId();
    this.form = new FormGroup({
      criterEvaluation: new FormArray([

      ])

    });
    this.initializeCritere()
    this.getCriterEvaluation();
    this.loadFileds();
  }

  get ligneCritere(): FormArray {
    return this.form.get('criterEvaluation') as FormArray;
  }

  getMarketId() {
    this.marketId = localStorage.getItem('evaluation')
  }

  getCriterEvaluation() {
    const req = {
      page: 0,
      size: 10000,
      referentielType: "TYPE_DE_CRITERE_EVALUATION_MARCHE"
    }
    this.labelService.readLabels(req).subscribe({
      next: (value) => {
        this.criterEvaluate = value.content
        console.log("testest", this.criterEvaluate)

      },
      error: (value) => {

      }
    })
  }
  addNewCritere() {
    const newCritereGroup = this.formBuilder.group({
      evaluationCriteriaId: new FormControl(''),
      expectedValue: new FormControl(''),
      ponderation: new FormControl(''),
      passationMarketId: this.marketId
    });
    this.ligneCritere.push(newCritereGroup);
  }

  removeMember(index: number) {
    const critereArray = this.form.get('criterEvaluation') as FormArray;
    critereArray.removeAt(index);
  }

  initializeCritere() {

    var newMemberGroup: any = this.formBuilder.group({
      evaluationCriteriaId: new FormControl(''),
      expectedValue: new FormControl(''),
      ponderation: new FormControl(''),
      passationMarketId: this.marketId

    });
    this.ligneCritere.push(newMemberGroup);
  }

  loadFileds() {
    console.log("modification", this.critereToUpdate)
    if (this.critereToUpdate !== undefined) {

      const critereArray = this.form.get('criterEvaluation') as FormArray;
      const formGroupToUpdate = critereArray.at(0) as FormGroup;
      formGroupToUpdate.get('expectedValue')?.setValue(this.critereToUpdate.expectedValue);
      formGroupToUpdate.get('ponderation')?.setValue(this.critereToUpdate.ponderation);
      formGroupToUpdate.get('evaluationCriteriaId')?.setValue(this.critereToUpdate.evaluationCriteria.id);



    }

  }

  selectionChange(event: any) {
    console.log(event)
    if (event.type === 'number') {
      console.log("laye")
      this.typeNumber = true
      this.typeText = false
    } else if (event.type === 'text') {
      this.typeText = true
      this.typeNumber = false
    }

  }


  save() {
    const formCriter = this.form.value.criterEvaluation;
    //ici on 'est dans un array by fari
    if (this.critereToUpdate === undefined) {
      this.create(formCriter)
    } else {
      //ici on 'est dans un array alors que la modif attend un objet by fari
      this.update(this.critereToUpdate.id, formCriter[0])
    }
  }


  create(componentRequest: any) {
    this.critereMarketService.createCritereMarket(componentRequest).subscribe({
      next: value => {
        Alertes.alerteAddSuccess('Enregistrement reussi');
      },
      error: value => {
        Alertes.alerteAddDanger(value.error.message)
      },
      complete: () => {
        this.close();
      }
    })
  }
  update(componentId: any, componentRequest: any) {
    this.critereMarketService.updateCritereMarket(componentId, componentRequest).subscribe({
      next: value => {
        Alertes.alerteAddSuccess('Modification reussi');
      },
      error: value => {
        Alertes.alerteAddDanger(value.error.message)
      },
      complete: () => {
        this.close();
      }
    })
  }
  close() {
    this.submit.emit(true);
  }
}
