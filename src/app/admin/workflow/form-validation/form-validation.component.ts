import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WorkflowValidationHistoriqueServiceService } from 'src/app/services/workflow-validation-historique/workflow-validation-historique-service.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { Alertes } from 'src/app/util/alerte';
;
import { log } from 'console';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbPaginationModule, NgbDropdownModule, NgbAccordionModule, NgbTooltipModule, NgbNavModule, NgbAlertModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { QuillModule } from 'ngx-quill';
import { CongeService } from '@/app/services/conge/conge.service';
import { AppAgentMatriculeComponent } from '../../ordre-mission/app-agent-matricule/app-agent-matricule.component';

interface Data {
  workflowType: string;
  etapeId: number;
  entityId?: number;
  
}

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss'],
    imports: [
    CommonModule,
     NgbPaginationModule,
        NgbDropdownModule,
        MatTabsModule,
        NgbAccordionModule,
        MatDialogModule,
        MatTableModule,
        NgbTooltipModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule,
        MatRippleModule,
        ReactiveFormsModule,
        NgSelectModule,
        MatButtonModule,
        QuillModule,
        MatRadioModule,
        NgbNavModule,
        MatCardModule,
        FormsModule,
        MatPaginatorModule,
        MatSelectModule,
        NgbAlertModule,
        HasAnyAuthorityDirective,
        NgbPopoverModule,
        AppAgentMatriculeComponent
  ],
})
export class FormValidationComponent {
  form!: FormGroup;
  @Input() historiqueToUpdate: any;
  @Input() data!: Data;
  @Output() onclose: EventEmitter<boolean> = new EventEmitter();
  @Output() onCalcule: EventEmitter<any> = new EventEmitter();
  
  constructor(
    private dialog: MatDialog,
    private historiqueService: WorkflowValidationHistoriqueServiceService,
     private congeService: CongeService

  ) { }
  
    ngOnInit(): void {
      this.initForm()
      console.log("LOGFORM",this.data);
      
    }
  
    initForm() {
      this.form = new FormGroup({
        validation: new FormControl('', Validators.required),
        commentaire: new FormControl('', Validators.required)
      });
  
      if (this.historiqueToUpdate !== undefined) {
        this.setForm();
      }
    }
  
    setForm() {
      this.form.controls['validation'].setValue(this.historiqueToUpdate.validation);
      this.form.controls['commentaire'].setValue(this.historiqueToUpdate.commentaire);
    }
  
    save() {
      const validation = this.form.value;
      validation.workflowType = this.data.workflowType;
      validation.entityId = this.data.entityId || null; 
       validation.etapeId = this.data.etapeId;

      console.log("VALIDATION: ", validation)

      if (this.historiqueToUpdate === undefined) {
        if(validation.workflowType === "DEMANDE_CONGE" || validation.workflowType === "VALIDATION_COURRIER") {
          this.validateStep(validation)
        }
        // if(validation.workflowType === "INDICATEUR_TRESORERIE_MOIS_COUVERTURE") {
        //   this.validateStepTresorerieCouverture(validation);
        // }
      } else {
        this.updateHistorique(validation);
      }
    }
  
    validateStep(historique: any) {
      this.congeService.validateStep(historique).subscribe({
        next: (value: any) => {
          console.log("value",value);
          
          Alertes.alerteAddSuccess();
        },
        error: (value: any) => { 
          console.log("value",value);
          Alertes.alerteAddDanger(value.error?.message)
        }
      })
    }
  
    updateHistorique(historique: any) {
      this.historiqueService.updateHistorique(this.historiqueToUpdate.id, historique).subscribe({
        next: (value: any) => {
          Alertes.alerteAddSuccess();
        },
        error: (value: any) => { 
          Alertes.alerteAddDanger(value.message)
        }
      })
    }

    validateStepTresorerieCouverture(historique: any) {
      // this.lcrService.validateStepTresorerieCouverture(historique).subscribe({
      //   next: (value: any) => {
      //     console.log("value",value);
      //     this.onCalcule.emit(value);
      //     Alertes.alerteAddSuccess();
      //   },
      //   error: (value: any) => { 
      //     console.log("value",value);
      //     Alertes.errorPopPup("Erreur!", value.error?.message)
      //     // Alertes.errorPopPup("ERREUR VALIDATION", value.error?.message)
      //   }
      // })
    }
  
    close() {
      this.onclose.emit(true);
    }
}
