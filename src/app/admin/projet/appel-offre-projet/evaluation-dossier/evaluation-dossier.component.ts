import { CritereMarketService } from '@/app/services/critere-market/critere-market.service';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
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
import { NotefolderService } from 'src/app/services/notefolder/notefolder.service';
import { Alertes } from 'src/app/util/alerte';
import { ResponseApi } from 'src/app/util/response.model';
import { RoutingAppelOffreSuiteLancementComponent } from '../../routimg-projet/routing-appel-offre-suite-lancement/routing-appel-offre-suite-lancement.component';
import { DocumentReceptionDossierComponent } from '../reception-dossier/document-reception-dossier/document-reception-dossier.component';
import { FormReceptionDossierComponent } from '../reception-dossier/form-reception-dossier/form-reception-dossier.component';



interface noteEvaluated {
  passationMarketCritereId: any; // ou le type approprié
  expectedValue: any; // ou le type approprié
  ponderation: any; // ou le type approprié
  note: any; // ou le type approprié
}



@Component({
  selector: 'app-evaluation-dossier',
  templateUrl: './evaluation-dossier.component.html',
  styleUrls: ['./evaluation-dossier.component.scss'],
        standalone:true,
  imports:[
        CommonModule,
    NgbTooltipModule,
    NgbDropdownModule,
    MatIconModule,
    // FeatherIconModule,
    NgbTooltipModule,
    MatTableModule,
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
export class EvaluationDossierComponent {
  form!: FormGroup
  @Input() projetId: any;
  @Input() label!: string;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() isSearch!: boolean;
  @Input() dossierId:any;
  typeNumber: boolean = false
  typeText: boolean = true

  pageOptions: any = {
    page: 0,
    size: 20
  }

  marketId: any;
  //dataSourceCriterePerMarket: any;
  dataSourceCriterePerMarket: [] = [];
  //newValue: any;
  newValue: any[] = [];

  newsavedataSourceCritere: any



  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private critereMarketService: CritereMarketService,
    private noteFolder: NotefolderService
  ) {
    this.form = this.formBuilder.group({
      evaluation: this.formBuilder.array([])

    });
  }
  ngOnInit(): void {

    this.getMarketId();
    this.getAllcriterePerMarket();
  }


  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    // this.getAllEvaluationDossier(this.pageOptions);
  }


  get ligneEvaluation(): FormArray {
    return this.form.get('evaluation') as FormArray;
  }

// Initialiser l'objet pour mapper les libellés aux IDs
        libelleToIdMap: { [libelle: string]: number } = {};

  initializeMembers() {
    this.dataSourceCriterePerMarket.forEach((member: any) => {
      const newEvaluationGroup = this.formBuilder.group({
        passationMarketCritereId: new FormControl(member.evaluationCriteria.libelle),
        expectedValue: new FormControl(member.expectedValue),
        ponderation: new FormControl(member.ponderation),
        marketFileId:this.dossierId,
        note: new FormControl('')
      });

      this.libelleToIdMap[member.evaluationCriteria.libelle] = member.id;


      (this.form.get('evaluation') as FormArray).push(newEvaluationGroup);
    });
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
  getMarketId() {
    //represente l'id du marche
    this.marketId = localStorage.getItem('evaluation')
  }

  

  getAllcriterePerMarket() {
    this.critereMarketService.readAllCriterePerMarket(this.marketId).subscribe({
      next: (value) => {
        this.dataSourceCriterePerMarket = value.body
        console.log("datasource comlete", this.dataSourceCriterePerMarket)
        this.initializeMembers();
      },
      error: () => {

      },
      complete: () => {

      }
    })
  }


  save() {
    console.log("initialise",this.libelleToIdMap)

    const formCriter = this.form.value.evaluation;
    for (let i = 0; i < formCriter.length; i++) {
      this.newValue.push(this.dataSourceCriterePerMarket[i])

    }

    const evaluation = this.form.get('evaluation') as FormArray
    const newValues: noteEvaluated[] = [];
    for (let i = 0; i < this.newValue.length; i++) {
      newValues.push({
        passationMarketCritereId: this.newValue[i].id,
        expectedValue: this.newValue[i].expectedValue,
        ponderation: this.newValue[i].ponderation,
        note: '',
      },)
     
      console.log("bouna pene 30", this.newValue[i].id)
    }
    evaluation.controls.forEach((evaluationControl: AbstractControl, index: number) => {
      if (evaluationControl instanceof FormGroup) {
        console.log("typeOf", evaluationControl)

        // Récupérer l'ID de l'évaluation actuelle
        // const passationMarketCritereId = evaluationControl.controls[0].get('passationMarketCritereId')
        const passationMarketCritereId = evaluationControl.get('passationMarketCritereId')?.getRawValue();
        //console.log("laye s'enneui ", evaluationControl?.setValue(newValues[index]))
        console.log("laye s'enneui ", evaluationControl.get('passationMarketCritereId')?.value)
       
         // Récupérer l'ID correspondant au libellé à partir du mapping
         //const passationMarketCritereIdFari = this.libelleToIdMap[evaluationControl.get('passationMarketCritereId')?.value];
         console.log("index",index)
         //console.log("JE veux terminer",passationMarketCritereIdFari)
         console.log("le formulaire imcomplet",this.form.value.evaluation[index].passationMarketCritereId=this.newValue[index].id
         )
      }
    });

    // this.create(formCriter);
     console.log("le formulaire complet",formCriter)
   this.create(formCriter);
  }


  create(componentRequest: any) {
    this.noteFolder.createNoteFolder(componentRequest).subscribe({
      next: _value => {
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
      next: _value => {
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
















// initialize() {
//   this.dataSourceCriterePerMarket.forEach((member: any) => {
//     const newEvaluationGroup = this.formBuilder.group({
//       passationMarketCritereId: new FormControl(member.evaluationCriteria.libelle),
//       expectedValue: new FormControl(member.expectedValue),
//       ponderation: new FormControl(member.ponderation),
//       note: new FormControl('')
//     });

//     (this.form.get('evaluation') as FormArray).push(newEvaluationGroup);
//   });
// }



// Créez un tableau associatif pour faire correspondre le texte avec l'ID
// const textToIdMap: { [text: string]: string } = {};

// this.dataSourceCriterePerMarket.forEach((member: { evaluationCriteria: { libelle: string | number; id: string; }; }) => {
//   textToIdMap[member.evaluationCriteria.libelle] = member.evaluationCriteria.id;
// });


// // Maintenant, utilisez ce tableau pour traduire le texte en ID
// const idsSelectionnes = formCriter.map((member: { evaluationCriteriaText: string | number; }) => {
//   return textToIdMap[member.evaluationCriteriaText]; // Récupérer l'ID correspondant au texte
// });

// console.log('IDs sélectionnés :', idsSelectionnes);

// const idsSelectionnes = formCriter.map( (member: { passationMarketCritereId: any; }) => member.passationMarketCritereId);
// console.log('IDs sélectionnés :', idsSelectionnes);

//this.create(formCriter)
// if (this.critereToUpdate === undefined) {
//   this.create(formCriter)
// } else {
//   this.update(this.critereToUpdate.id, formCriter)
// }