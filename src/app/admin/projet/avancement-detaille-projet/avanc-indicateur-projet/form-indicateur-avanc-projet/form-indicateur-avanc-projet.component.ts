import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { Alertes } from '@/app/util/alerte';
import { Helper } from '@/app/util/helper';
import { IndicateurProjetService } from '@/app/services/indicateur-projet/indicateur-projet.service';
import { PeriodService } from '@/app/services/period/period.service';
import { ValueIndicatorService } from '@/app/services/value-indicator/value-indicator.service';
import { CommonModule } from '@angular/common';
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
import { FormPlanPassationProjetComponent } from '../../../appel-offre-projet/plan-passation/form-plan-passation-projet/form-plan-passation-projet.component';
import { RoutingAppelOffreProjetComponent } from '../../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';


@Component({
  selector: 'app-form-indicateur-avanc-projet',
  templateUrl: './form-indicateur-avanc-projet.component.html',
  styleUrls: ['./form-indicateur-avanc-projet.component.scss'],
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
export class FormIndicateurAvancProjetComponent implements OnInit {
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() activityId!: any;

  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() valueIndicatorToUpdate: any;
  @Input() iSimport!: boolean;

  @Input() isSearch!: boolean;

  form!: FormGroup;

  indicateurs: any = [];
  selectedIndicatorId: any;
  projetId: any;
  indicateur: any;
  periods: any=[
    {name:'ANNEE',libelle:'Année',periodicity:'ANNUELLE'},
    {name:'S1',libelle:'Semestre 1',periodicity:'SEMESTRIELLE'},
    {name:'S2',libelle:'Semestre 2',periodicity:'SEMESTRIELLE'},
    {name:'T1',libelle:'Trimestre 1',periodicity:'TRIMESTRIELLE'},
    {name:'T2',libelle:'Trimestre 2',periodicity:'TRIMESTRIELLE'},
    {name:'T3',libelle:'Trimestre 3',periodicity:'TRIMESTRIELLE'},
    {name:'T4',libelle:'Trimestre 4',periodicity:'TRIMESTRIELLE'},
    {name:'JANVIER',libelle:'Janvier',periodicity:'MOISUELLE'},
    {name:'FEVRIER',libelle:'Février',periodicity:'MOISUELLE'},
    {name:'MARS',libelle:'Mars',periodicity:'MOISUELLE'},
    {name:'AVRIL',libelle:'Avril',periodicity:'MOISUELLE'},
    {name:'MAI',libelle:'Mai',periodicity:'MOISUELLE'},
    {name:'JUIN',libelle:'Juin',periodicity:'MOISUELLE'},
    {name:'JUILLET',libelle:'Juillet',periodicity:'MOISUELLE'},
    {name:'AOUT',libelle:'Août',periodicity:'MOISUELLE'},
    {name:'SEPTEMBRE',libelle:'Septembre',periodicity:'MOISUELLE'},
    {name:'OCTOBRE',libelle:'Octobre',periodicity:'MOISUELLE'},
    {name:'NOVEMBRE',libelle:'Novembre',periodicity:'MOISUELLE'},
    {name:'DECEMBRE',libelle:'Decembre',periodicity:'MOISUELLE'},
  ];
  selectedPeriodId: any;
  file: any;
  periodsFiltered:any = this.periods;

  constructor(
    private readonly indicatorService: IndicateurProjetService,
    private readonly periodService: PeriodService,
    private readonly valueIndicatorService: ValueIndicatorService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.readIndicateurs()

    this.initForm();

    this.editForm();
  }

  initForm() {
    this.form = this.fb.group({
      targetValue: ['', Validators.required],
      valueReched: [''],
      startDate: [''],
      endDate: [''],
      indicatorProjetId: ['', Validators.required],
      period: ['', Validators.required],
      periodicity: ['']
    })
  }

  editForm() {
    if(this.valueIndicatorToUpdate !== undefined) {
      this.onSelectIndicateur(this.valueIndicatorToUpdate?.indicatorProjet);

      // this.readPeriode(this.valueIndicatorToUpdate.indicatorProjet.periodicity.id);

      this.form.get('indicatorProjetId')?.disable({onlySelf: true});
      this.form.get('indicatorProjetId')?.setValue(this.valueIndicatorToUpdate.indicatorProjet.id);
      this.form.get('targetValue')?.setValue(this.valueIndicatorToUpdate.targetValue);
      this.form.get('valueReched')?.setValue(this.valueIndicatorToUpdate.valueReched);
      this.form.get('startDate')?.setValue(Helper.editDate(this.valueIndicatorToUpdate.startDate));
      this.form.get('endDate')?.setValue(Helper.editDate(this.valueIndicatorToUpdate.endDate));
      this.form.get('period')?.setValue(this.valueIndicatorToUpdate.period.name);
      this.form.get('periodicity')?.setValue(this.valueIndicatorToUpdate.indicatorProjet.periodicity.libelle);
      this.form.get('periodicity')?.disable({onlySelf: true});
    }
  }

  getProjetId() {
    const projetId = localStorage.getItem('projetId')!;
    return +projetId;
  }

  save(){
    // const valueIndicatorRequest = this.getValueIndicatorRequest();
    let valueIndicatorRequest = this.form.value;
    if (this.activityId) {
      valueIndicatorRequest.activityId = this.activityId;
    } else {
      valueIndicatorRequest.projetId = this.getProjetId();
    }

    if(this.valueIndicatorToUpdate === undefined) {
      this.create(valueIndicatorRequest);
    } else {
      this.update(this.valueIndicatorToUpdate.id, valueIndicatorRequest);
    }
  }

  create(valueIndicatorRequest: any) {
    this.valueIndicatorService.addValueIndicatorToProject(valueIndicatorRequest).subscribe({
      next: value => Alertes.alerteAddSuccess('Enregistrement reussi'),
      error: value => Alertes.alerteAddDanger(value.error),
      complete: () => this.close()
    })
  }

  update(valueIndicatorRequestId: any, valueIndicatorRequest: any) {
    valueIndicatorRequest.indicatorProjetId = this.valueIndicatorToUpdate.indicatorProjet.id;

    this.valueIndicatorService.updateValueIndicatorToProject(valueIndicatorRequestId, valueIndicatorRequest).subscribe({
      next: value => Alertes.alerteAddSuccess('Modification reussi'),
      error: value => Alertes.alerteAddDanger(value.error.message),
      complete: () => this.close()
    })
  }

  // getValueIndicatorRequest(): any {
  //   const valueIndicator: any = {};
  //   valueIndicator.indicatorProjetId = this.form.value.indicatorProjetId;
  //   valueIndicator.targetValue = this.form.value.targetValue;
  //   valueIndicator.valueReched = this.form.value.valueReched;
  //   valueIndicator.startDate = this.form.value.startDate;
  //   valueIndicator.endDate = this.form.value.endDate;
  //   valueIndicator.projetId = this.getProjetId();
  //   valueIndicator.period = this.form.value.period;
  //   return valueIndicator;
  // }

  close(){
    this.submit.emit(true);
  }

  readIndicateurs() {
    const req = { projectId: this.projetId };
    this.indicatorService.readIndicatorProjects().subscribe(response => {
      console.log('liste indicateur',response);
      this.indicateurs = response.content;
    })
  }

  onSelectIndicateur(event: any) {
    console.log('Objet indicateur :', event);
    this.form.get('periodicity')?.setValue(event.periodicity.libelle);
    this.periodsFiltered = this.periods.filter((period:any) =>
      period.periodicity === event.periodicity.name
    );
  }


  doSearch() {
    const valueIndicator: any = {};
    valueIndicator.indicatorProjetId = this.form.value.indicatorProjetId;
    valueIndicator.targetValue = this.form.value.targetValue;
    valueIndicator.valueReched = this.form.value.valueReched;
    valueIndicator.projetId = this.getProjetId();
    valueIndicator.period = this.form.value.period;

    this.search.emit(valueIndicator);
  }

  fileChange(event: any){
    this.file = event.target.files[0];
  }

  import(){
    this.valueIndicatorService.importValueIndicatort(this.file, this.getProjetId()).subscribe({
      next:(data) =>{
        Alertes.alerteAddSuccess('Importation reussi');
        this.close();

      },
      error:(error)=>{
        Alertes.alerteAddDanger(error.error.message)
      }

    })
  }

}
