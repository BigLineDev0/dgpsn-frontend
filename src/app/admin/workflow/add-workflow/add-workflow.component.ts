import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { PickListModule } from 'primeng/picklist';
import { RadioButtonModule } from 'primeng/radiobutton';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { Alertes } from 'src/app/util/alerte';

enum WorkflowType {
 DEMANDE_CONGE ="DEMANDE_CONGE",
  VALIDATION_COURRIER ="VALIDATION_COURRIER",
  // FLUX_TRESORERIE = "FLUX_TRESORERIE",
  // INDICATEUR_TRESORERIE_MOIS_COUVERTURE = "INDICATEUR_TRESORERIE_MOIS_COUVERTURE"
}

@Component({
  selector: 'app-add-workflow',
  templateUrl: './add-workflow.component.html',
  styleUrls: ['./add-workflow.component.scss'],
   standalone: true,
   imports: [
    CommonModule,
    ReactiveFormsModule,
    ListboxModule,
    RadioButtonModule,
    ButtonModule,
    PickListModule,
    FormsModule,
    NgSelectModule,
    MatDialogModule,
    HasAnyAuthorityDirective,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    // MatMomentDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTooltipModule,
    // FuseFindByKeyPipeModule,
    // SharedModule,
    MatStepperModule,
    NgbPaginationModule,
    // FuseAlertModule,
  ],
})
export class AddWorkflowComponent implements OnInit {

  form!: FormGroup;
  @Input() workflowToUpdate: any;
  worfklowTypes: any[] = [
    { name: WorkflowType.DEMANDE_CONGE, libelle:WorkflowType.DEMANDE_CONGE.toLowerCase() },
    { name: WorkflowType.VALIDATION_COURRIER, libelle:WorkflowType.VALIDATION_COURRIER.toLowerCase() },
    // { name: WorkflowType.FLUX_TRESORERIE, libelle: WorkflowType.FLUX_TRESORERIE.toLowerCase() },
    // { name: WorkflowType.INDICATEUR_TRESORERIE_MOIS_COUVERTURE, libelle: "Trésorerie en mois de couverture" },
  ]
  
  constructor(
    private dialogref: MatDialogRef<AddWorkflowComponent>,
    private dialog: MatDialog,
    private workflowService : WorkflowService
  ) { }
  
    ngOnInit(): void {
      this.initForm()
    }
  
    initForm() {
      this.form = new FormGroup({
        code: new FormControl('', Validators.required),
        libelle: new FormControl('', Validators.required),
        type: new FormControl(null, Validators.required)
      });
  
      if (this.workflowToUpdate !== undefined) {
        this.setForm();
      }
    }
  
    setForm() {
      this.form.controls['code'].setValue(this.workflowToUpdate.code);
      this.form.controls['libelle'].setValue(this.workflowToUpdate.libelle);
      this.form.controls['type'].setValue(this.workflowToUpdate.type.name);
    }
  
    save() {
      const workflow = this.form.value;
      console.log(workflow)
      if (this.workflowToUpdate === undefined) {
        this.createWorkflow(workflow)
      } else {
        this.updateWorkflow(workflow);
      }
    }
  
    createWorkflow(workflow: any) {
      this.workflowService.createWorkflow(workflow).subscribe({
        next: (value: any) => {
          Alertes.alerteAddSuccess();
          this.close()
        },
        error: (value: any) => { 
          Alertes.alerteAddDanger(value.error.message)
          this.close()
        }
      })
    }
  
    updateWorkflow(workflow: any) {
      this.workflowService.updateWorkflow(this.workflowToUpdate.id, workflow).subscribe({
        next: (value: any) => {
          Alertes.alerteAddSuccess();
          this.close()
        },
        error: (value: any) => { 
          Alertes.alerteAddDanger(value.message)
          this.close()
        }
      })
    }
  
    close() {
      this.dialog.closeAll();
    }
}
