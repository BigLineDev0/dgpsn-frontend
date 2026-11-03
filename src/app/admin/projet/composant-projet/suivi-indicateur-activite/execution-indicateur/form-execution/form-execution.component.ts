import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FinancementActivityService} from "@/app/services/financementActivity/financement-activity.service";
import {Helper} from "@/app/util/helper";
import {Alertes} from "@/app/util/alerte";
import {NgForOf, NgIf} from "@angular/common";
import {NgOptionComponent, NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: 'app-form-execution',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgOptionComponent,
    NgSelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './form-execution.component.html',
  styleUrl: './form-execution.component.scss'
})
export class FormExecutionComponent implements OnInit{

  form!:FormGroup;
  @Input()managementUnitId:any;
  @Input() isSearch!: boolean;
  @Input()executionToUpdate:any;
  @Input() label!: string;
  @Output() submit : EventEmitter <boolean>= new EventEmitter();
  annee: { id: number, year: number }[] = [];

  ngOnInit(): void {
    this.getManagementUnitId();
    this.formInit();
    this.getAnnee();
  }
  constructor(private readonly fb:FormBuilder,
              private readonly financementService: FinancementActivityService){}


  formInit(){
    this.form = this.fb.group({
      libelle:[],
      annee:[],
      startingDate:[],
      endingDate:[],
      estimatedAmount:[],
      actualAmount:[],
      comment:[]
    })
    this.loadFileds();
  }

  loadFileds() {
    if(this.executionToUpdate !== undefined) {
      this.form.get('libelle')?.setValue(this.executionToUpdate.libelle);
      this.form.get('annee')?.setValue(this.executionToUpdate?.annee);
      this.form.get('startingDate')?.setValue(Helper.editDate(this.executionToUpdate?.startingDate));
      this.form.get('endingDate')?.setValue(Helper.editDate(this.executionToUpdate?.endingDate));
      this.form.get('estimatedAmount')?.setValue(this.executionToUpdate?.estimatedAmount);
      this.form.get('actualAmount')?.setValue(this.executionToUpdate?.actualAmount);
      this.form.get('comment')?.setValue(this.executionToUpdate?.comment);

    }
  }
  getManagementUnitId(){
    this.managementUnitId = localStorage.getItem('managementUnitId');
  }
  save() {
    const execution = this.form.value;
    execution.managementUnitId = +this.managementUnitId;

    if(this.executionToUpdate === undefined) {
      this.create(execution)
    } else {
      this.update(this.executionToUpdate.id, execution)
    }
  }

  create(execution:any) {
    this.financementService.createExecution(execution).subscribe({
      next: value => {
        console.log("error :",value);

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
  update(executionId:any, executionRequest:any) {
    this.financementService.updateExecution(executionId, executionRequest).subscribe({
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
  close(){
    this.submit.emit(true);
  }

  doSearch(){}

  getAnnee() {
    const currentYear = new Date().getFullYear();
    for (let i = 2000; i <= currentYear; i++) {
      this.annee.push({ id: i - 2000, year: i });
    }
  }
}

