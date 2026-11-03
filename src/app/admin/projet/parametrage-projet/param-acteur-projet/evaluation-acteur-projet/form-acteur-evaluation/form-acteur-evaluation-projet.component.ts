
import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import { InfosActeurModalProjetComponent } from '../infos-acteur-modal/infos-acteur-modal-projet.component';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';

@Component({
  selector: 'app-form-acteur-evaluation-projet',
  templateUrl: './form-acteur-evaluation-projet.component.html',
  styleUrls: ['./form-acteur-evaluation-projet.component.scss'],
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
    InfosActeurModalProjetComponent
  ]
})
export class FormActeurEvaluationProjetComponent {

  @Input() evaluation: any;
  @Input() isSearch!: boolean;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  evaluationForm!: FormGroup;
  critere:any;
  periodes:any=[
    {libelle:'Janvier',id:1},
    {libelle:'Fevrier',id:1},
    {libelle:'Mars',id:1},
    {libelle:'Avril',id:1},
    {libelle:'Mai',id:1},
    {libelle:'Juin',id:1},
    {libelle:'Juillet',id:1},
    {libelle:'Aout',id:1},
    {libelle:'Septembre',id:1},
    {libelle:'Octobre',id:1},
    {libelle:'Novembre',id:1},
    {libelle:'Decembre',id:1},
  ];
  annees:any=[] = [];

  // Structure des critères par catégorie
  // categories = [
  //   {
  //     categorie: 'Volume d\'interactions',
  //     criteres: [
  //       { nom: 'Nombre d\'opérations effectuées', type: 'text', showExtraField: false, valeur: '0' },
  //       { nom: 'Fréquence d\'interaction', type: 'select', valeur: 'Quotidien', showExtraField: true, options: ['Quotidien', 'Hebdomadaire', 'Mensuel'] }
  //     ]
  //   },
  //   {
  //     categorie: 'Qualité des contributions',
  //     criteres: [
  //       { nom: 'Exactitude des données', type: 'text', showExtraField: false, valeur: '100%' },
  //       { nom: 'Taux d\'erreurs', type: 'text', showExtraField: false, valeur: '0%' }
  //     ]
  //   },
  //   {
  //     categorie: 'Satisfaction des utilisateurs',
  //     criteres: [
  //       { nom: 'Satisfaction globale', type: 'text', showExtraField: false, valeur: '5/5' },
  //       { nom: 'Recommandation', type: 'select', valeur: 'Oui', showExtraField: true, options: ['Oui', 'Non'] }
  //     ]
  //   },
  //   {
  //     categorie: 'Efficacité des processus',
  //     criteres: [
  //       { nom: 'Temps moyen de traitement', type: 'text', showExtraField: false, valeur: '2 heures' },
  //       { nom: 'Taux de respect des délais', type: 'text', showExtraField: false, valeur: '95%' }
  //     ]
  //   },
  //   {
  //     categorie: 'Engagement des acteurs',
  //     criteres: [
  //       { nom: 'Participation aux réunions', type: 'text', showExtraField: false, valeur: '80%' },
  //       { nom: 'Initiatives proposées', type: 'text', showExtraField: false, valeur: '5' }
  //     ]
  //   },
  //   {
  //     categorie: 'Respect des normes',
  //     criteres: [
  //       { nom: 'Conformité aux règlements', type: 'text', showExtraField: false, valeur: '100%' },
  //       { nom: 'Audits réalisés', type: 'text', showExtraField: false, valeur: '2 par an' }
  //     ]
  //   },
  //   {
  //     categorie: 'Impact des actions',
  //     criteres: [
  //       { nom: 'Nombre de bénéficiaires', type: 'text', showExtraField: false, valeur: '500' },
  //       { nom: 'Amélioration mesurable', type: 'text', showExtraField: false, valeur: '20%' }
  //     ]
  //   },
  //   {
  //     categorie: 'Gestion des ressources',
  //     criteres: [
  //       { nom: 'Utilisation du budget', type: 'text', showExtraField: false, valeur: '85%' },
  //       { nom: 'Ressources allouées', type: 'text', showExtraField: false, valeur: '100000 F CFA' }
  //     ]
  //   },
  //   {
  //     categorie: 'Communication',
  //     criteres: [
  //       { nom: 'Fréquence de communication', type: 'select', valeur: 'Hebdomadaire', showExtraField: true, options: ['Quotidien', 'Hebdomadaire', 'Mensuel'] },
  //       { nom: 'Clarté des informations', type: 'text', showExtraField: false, valeur: '5/5' }
  //     ]
  //   },
  //   {
  //     categorie: 'Formation et développement',
  //     criteres: [
  //       { nom: 'Sessions de formation organisées', type: 'text', showExtraField: false, valeur: '4' },
  //       { nom: 'Participants aux formations', type: 'text', showExtraField: false, valeur: '80%' }
  //     ]
  //   }
  // ];

  criteres = [
    { code:'NBR_OPP_EFF', nom: 'Nombre d\'opérations effectuées', valeur: '0' },
    { code:'FRI', nom: 'Fréquence d\'interaction', valeur: 'Quotidien', options: ['Quotidien', 'Hebdomadaire', 'Mensuel'] },
    { code:'EXD', nom: 'Exactitude des données', valeur: '100%' },
    { code:'TE', nom: 'Taux d\'erreurs', valeur: '0%' },
    { code:'TMT', nom: 'Temps moyen de traitement', valeur: '2 heures' },
    { code:'TRD', nom: 'Taux de respect des délais', valeur: '95%' },
    { code:'PR', nom: 'Participation aux réunions', valeur: '80%' },
    { code:'FRC', nom: 'Fréquence de communication', valeur: 'Hebdomadaire', options: ['Quotidien', 'Hebdomadaire', 'Mensuel'] },
    { code:'CI', nom: 'Clarté des informations', valeur: '5/5' },
    // { nom: 'Satisfaction globale', valeur: '5/5' },
    // { nom: 'Recommandation', valeur: 'Oui', options: ['Oui', 'Non'] },
    // { nom: 'Initiatives proposées', valeur: '5' },
    // { nom: 'Conformité aux règlements', valeur: '100%' },
    // { nom: 'Audits réalisés', valeur: '2 par an' },
    // { nom: 'Nombre de bénéficiaires', valeur: '500' },
    // { nom: 'Amélioration mesurable', valeur: '20%' },
    // { nom: 'Utilisation du budget', valeur: '85%' },
    // { nom: 'Ressources allouées', valeur: '100000 F CFA' },
    // { nom: 'Sessions de formation organisées', valeur: '4' },
    // { nom: 'Participants aux formations', valeur: '80%' }
  ];


  constructor(private fb: FormBuilder,
              private modalService: NgbModal,
              ) { }

  ngOnInit(): void {
    const currentDate = new Date().getFullYear();

    for (let year = currentDate; year >= 2012; year--) {
      this.annees.push({id:year,libelle:year.toString()});
    }

    this.evaluationForm = this.fb.group({
      categories: this.fb.array([])
    });

    this.initForm();
  }

  initForm() {
    // const categoriesFormArray = this.evaluationForm.get('categories') as FormArray;
    //
    // this.categories.forEach(cat => {
    //   const criteresArray:any = this.fb.array([]);  // Ceci est un FormArray de FormGroup
    //
    //   cat.criteres.forEach((critere:any) => {
    //     criteresArray.push(this.fb.group({
    //       nom: new FormControl(critere.nom),
    //       note: new FormControl(''),
    //       extraField: critere.type === 'select' ? new FormControl('') : new FormControl(null)
    //     }));
    //   });
    //
    //   categoriesFormArray.push(this.fb.group({
    //     categorie: new FormControl(cat.categorie),
    //     criteres: criteresArray  // Ceci est bien un FormArray
    //   }));
    // });
  }
  // getCategorieControls() {
  //   return (this.evaluationForm.get('categories') as FormArray).controls;
  // }
  //
  // getCriteresControls(categorieIndex: number) {
  //   return (this.getCategorieControls()[categorieIndex].get('criteres') as FormArray).controls;
  // }

  openInfos(content: TemplateRef<any>, size?: any,critere?:any){
    this.critere = critere;
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {

    }).catch((res) => {
    });
  }

  onSubmit() {
    console.log(this.evaluationForm.value);
  }
}
