import { LabelService } from '@/app/services/labelService/label-service';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { FinancementActivityService } from 'src/app/services/financementActivity/financement-activity.service';
import { Authority } from 'src/app/util/Authority';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { FormBugetComponent } from '../../budget-global/form-buget/form-buget.component';
import { SourceDeDonneesComponent } from '../../budget-global/source-de-donnees/source-de-donnees.component';
import { RoutingFinancementComponent } from '../../routing-financement/routing-financement.component';

@Component({
  selector: 'app-form-mobilisation',
  templateUrl: './form-mobilisation.component.html',
  styleUrls: ['./form-mobilisation.component.scss'],
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
export class FormMobilisationComponent {
  form!:FormGroup;
  @Input()managementUnitId:any;
  @Input() isSearch!: boolean;
  @Input()mobilisationToUpdate:any;

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
      if(this.mobilisationToUpdate !== undefined) {
        this.form.get('libelle')?.setValue(this.mobilisationToUpdate.libelle);
        this.form.get('annee')?.setValue(this.mobilisationToUpdate?.annee);
        this.form.get('startingDate')?.setValue(Helper.editDate(this.mobilisationToUpdate?.startingDate));
        this.form.get('endingDate')?.setValue(Helper.editDate(this.mobilisationToUpdate?.endingDate));
        this.form.get('estimatedAmount')?.setValue(this.mobilisationToUpdate?.estimatedAmount);
        this.form.get('actualAmount')?.setValue(this.mobilisationToUpdate?.actualAmount);
        this.form.get('comment')?.setValue(this.mobilisationToUpdate?.comment);
        console.log('mobilisationToUpdate',this.mobilisationToUpdate);
        
      }
    }
  
    getManagementUnitId(){
      this.managementUnitId = localStorage.getItem('managementUnitId');
      console.log('getManagemnetUnitIdFORM',this.managementUnitId);
      
  }
  
    save() {
      const mobilisation = this.form.value;
      mobilisation.managementUnitId = +this.managementUnitId;
      console.log('mobilisation.managemnetUnitId',  mobilisation)


      if(this.mobilisationToUpdate === undefined) {
        this.create(mobilisation)
      } else {
         this.update(this.mobilisationToUpdate.id, mobilisation)
      }
    }
  
    create(mobilisation:any) {
      this.financementService.createMobilisation(mobilisation).subscribe({
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
    update(mobilisationId:any, mobilisationRequest:any) {
      this.financementService.updateMobilisation(mobilisationId, mobilisationRequest).subscribe({
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


