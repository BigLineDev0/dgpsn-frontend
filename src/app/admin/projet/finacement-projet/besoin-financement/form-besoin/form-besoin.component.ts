import { LabelService } from '@/app/services/labelService/label-service';
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


@Component({
  selector: 'app-form-besoin',
  templateUrl: './form-besoin.component.html',
  styleUrls: ['./form-besoin.component.scss'],
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
export class FormBesoinComponent {
  form!:FormGroup;
  @Input()managementUnitId:any;
  @Input() isSearch!: boolean;
  @Input()besoinToUpdate:any;

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
      if(this.besoinToUpdate !== undefined) {
        this.form.get('libelle')?.setValue(this.besoinToUpdate.libelle);
        this.form.get('annee')?.setValue(this.besoinToUpdate?.annee);
        this.form.get('startingDate')?.setValue(Helper.editDate(this.besoinToUpdate?.startingDate));
        this.form.get('endingDate')?.setValue(Helper.editDate(this.besoinToUpdate?.endingDate));
        this.form.get('estimatedAmount')?.setValue(this.besoinToUpdate?.estimatedAmount);
        this.form.get('actualAmount')?.setValue(this.besoinToUpdate?.actualAmount);
        this.form.get('comment')?.setValue(this.besoinToUpdate?.comment);
        
      }
    }
  
    getManagementUnitId(){
      this.managementUnitId = localStorage.getItem('managementUnitId');
      console.log('getManagemnetUnitIdFORM',this.managementUnitId);
      
  }
  
    save() {
      const besoin = this.form.value;
      besoin.managementUnitId = +this.managementUnitId;
      console.log('besoin.managemnetUnitId',  besoin)


      if(this.besoinToUpdate === undefined) {
        this.create(besoin)
      } else {
         this.update(this.besoinToUpdate.id, besoin)
      }
    }
  
    create(besoin:any) {
      this.financementService.createBesoin(besoin).subscribe({
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
    update(besoinId:any, besoinRequest:any) {
      this.financementService.updateBesoin(besoinId, besoinRequest).subscribe({
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