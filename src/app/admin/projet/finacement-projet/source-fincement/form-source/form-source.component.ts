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
import { StructureService } from 'src/app/services/structure/structure.service';
import { Alertes } from 'src/app/util/alerte';
import { SourceDeDonneesComponent } from '../../budget-global/source-de-donnees/source-de-donnees.component';
import { FormMobilisationComponent } from '../../mobilisation-financement/form-mobilisation/form-mobilisation.component';
import { RoutingFinancementComponent } from '../../routing-financement/routing-financement.component';

@Component({
  selector: 'app-form-source',
  templateUrl: './form-source.component.html',
  styleUrls: ['./form-source.component.scss'],
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
    MatRippleModule,
    HasAnyAuthorityDirective,
    MatTreeModule,
    MatListModule,
    MatTooltipModule,
    MatButtonModule,
  ]
})
export class FormSourceComponent {

  form!:FormGroup;
  @Input() managementUnitId : any;
  structure:any;
  budget:any;
  @Input() isSearch !: boolean;
  @Input()sourceToUpdate:any;
  @Input() label!: string;
  @Output() submit : EventEmitter <boolean>= new EventEmitter();
  
    ngOnInit(): void {
      this.getManagementUnitId();
      this.Initform();
      this.getStructure();
      this.getALLBudgetByProjet();
    }
    constructor(private fb:FormBuilder,
      private financementService: FinancementActivityService,
      private structureService:StructureService,
      private budgetService: FinancementActivityService){}
  
    Initform(){
    this.form = this.fb.group({
      montant:[''],
      structureId:[''],
      budgetId :[],
      comment :[''],
   
   })
   this.loadFileds();
    }
    loadFileds() {
      if(this.sourceToUpdate !== undefined) {
        this.form.get('montant')?.setValue(this.sourceToUpdate.montant);
        this.form.get('structureId')?.setValue(this.sourceToUpdate?.structure?.id);
        this.form.get('budgetId')?.setValue(this.sourceToUpdate?.budget?.id);
        this.form.get('comment')?.setValue(this.sourceToUpdate?.comment);
        
      }
    }
    getManagementUnitId(){
      this.managementUnitId = localStorage.getItem('managementUnitId');
      console.log('getManagemnetUnitIdFORM',this.managementUnitId);
      
  }
  
    save() {
      const source = this.form.value;
      source.managementUnitId = +this.managementUnitId;
      console.log('source.managemnetUnitId',  source)


      if(this.sourceToUpdate === undefined) {
        this.create(source)
      } else {
         this.update(this.sourceToUpdate.id, source)
      }
    }
  
    create(source:any) {
      this.financementService.createSource(source).subscribe({
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
    update(sourceId:any, sourceRequest:any) {
      this.financementService.updateSource(sourceId, sourceRequest).subscribe({
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

    getStructure(idsToIgnore?: any) {
      const req: any = {};
      if(idsToIgnore) {
        req.idsToIgnore = idsToIgnore
      }
  
      req.structureTypeList = ["Partenaire"];
      req.notOnly =true;
      req.sortBy ='nom';
      req.ascending =true;
      this.structureService.readStructures(req).subscribe(response => {
        this.structure = response.content;
        console.log();
        
      })
    }

  getALLBudgetByProjet() {
    this.budgetService.readAllBudget({ managementUnitId: this.managementUnitId }).subscribe({
      next: data => {
        // console.log('dataBudget', data);
        this.budget = data.content;
      },
      error: err => {
        // console.error('Error fetching budget data', err);
      }
    });
  }
  
}