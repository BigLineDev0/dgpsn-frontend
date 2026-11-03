
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
import { RoutingFinancementComponent } from '../../routing-financement/routing-financement.component';
import { SourceDeDonneesComponent } from '../source-de-donnees/source-de-donnees.component';


@Component({
  selector: 'app-form-buget',
  templateUrl: './form-buget.component.html',
  styleUrls: ['./form-buget.component.scss'],
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
export class FormBugetComponent {
 
  form!:FormGroup;
  @Input() managementUnitId : any;
  @Input() isSearch! : boolean;
  @Input()budgetToUpdate:any;
  @Input() label!: string;
  priveePublicque:boolean =false;
  @Output() submit : EventEmitter <boolean>= new EventEmitter();

  sourceBudget : any[] = [
    {name:'PRIVEE',description:'Privé'},
    {name:'PUBLIC',description:'Public'},
    {name:'PPP',description:'PPP'},
  ];
  
    ngOnInit(): void {
      this.getManagementUnitId();
      this.Initform();
    }
    constructor(private fb:FormBuilder,
      private financementService: FinancementActivityService){}
  
    Initform(){
    this.form = this.fb.group({
     libelle:[''],
     souceBudget:[''],
     estimatedAmount :[],
     actualAmount :[],
     publicShare :[],
     privateShare :[],
     comment :[''],
   
   })
   this.loadFileds();
    }
    loadFileds() {
      if(this.budgetToUpdate !== undefined) {
        this.form.get('libelle')?.setValue(this.budgetToUpdate.libelle);
        this.form.get('souceBudget')?.setValue(this.budgetToUpdate?.souceBudget?.name);
        this.form.get('estimatedAmount')?.setValue(this.budgetToUpdate?.estimatedAmount);
        this.form.get('actualAmount')?.setValue(this.budgetToUpdate?.actualAmount);
        this.form.get('publicShare')?.setValue(this.budgetToUpdate?.publicShare);
        this.form.get('privateShare')?.setValue(this.budgetToUpdate?.privateShare);
        this.form.get('comment')?.setValue(this.budgetToUpdate?.comment);
        
      }
    }
    getManagementUnitId(){
      this.managementUnitId = localStorage.getItem('managementUnitId');
      console.log('getManagemnetUnitIdFORM',this.managementUnitId);
      
  }
  
    save() {
      const budget = this.form.value;
      budget.managementUnitId = +this.managementUnitId;
      console.log('budget.managemnetUnitId',  budget)


      if(this.budgetToUpdate === undefined) {
        this.create(budget)
      } else {
         this.update(this.budgetToUpdate.id, budget)
      }
    }
  
    create(budget:any) {
      this.financementService.createBudget(budget).subscribe({
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
    update(budgetId:any, budgetRequest:any) {
      this.financementService.updateBudget(budgetId, budgetRequest).subscribe({
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
  

  onchangeType(value:any){
    console.log('value',value)
  if(value.name =='PPP'){
 this.priveePublicque =true;
  }
  else{
    this.priveePublicque =false
  }
  }
}