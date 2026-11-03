import { LabelService } from '@/app/services/labelService/label-service';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { FinancementActivityService } from 'src/app/services/financementActivity/financement-activity.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { FormBugetComponent } from '../../budget-global/form-buget/form-buget.component';
import { SourceDeDonneesComponent } from '../../budget-global/source-de-donnees/source-de-donnees.component';
import { RoutingFinancementComponent } from '../../routing-financement/routing-financement.component';

@Component({
  selector: 'app-form-execution',
  templateUrl: './form-execution.component.html',
  styleUrls: ['./form-execution.component.scss'],
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
export class FormExecutionComponent {
 
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
    constructor(private fb:FormBuilder,private labelService: LabelService,
      private financementService: FinancementActivityService){}
  
    
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
        // console.log('executionToUpdate',this.executionToUpdate);
        
      }
    }
    getManagementUnitId(){
      this.managementUnitId = localStorage.getItem('managementUnitId');
      // console.log('getManagemnetUnitIdFORM',this.managementUnitId);   
  }
    save() {
      const execution = this.form.value;
      execution.managementUnitId = +this.managementUnitId;
      // console.log('execution.managemnetUnitId',  execution)

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
    for (let i = 1960; i <= currentYear; i++) {
      this.annee.push({ id: i - 1960, year: i });
    }
  }
}
