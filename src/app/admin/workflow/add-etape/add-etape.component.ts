import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { Alertes } from 'src/app/util/alerte';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { ListboxModule } from 'primeng/listbox';
// import { FuseAlertType } from '@fuse/components/alert';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';

@Component({
  selector: 'app-add-etape',
  templateUrl: './add-etape.component.html',
  styleUrls: ['./add-etape.component.scss'],
  encapsulation:ViewEncapsulation.None,
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
export class AddEtapeComponent implements OnInit {
  form!: FormGroup;
  @Input() workflowStepToUpdate: any;
  
  constructor(
    private dialogref: MatDialogRef<AddEtapeComponent>,
    private dialog: MatDialog,
    private workflowService: WorkflowService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
  ngOnInit(): void {
   this.initForm()
  }
  
    initForm() {
      this.form = new FormGroup({
        code: new FormControl('', Validators.required),
        libelle: new FormControl('', Validators.required),
        ordre: new FormControl('', Validators.required)
      });
  
      if (this.workflowStepToUpdate !== undefined) {
        this.setForm();
      }
    }
  
    setForm() {
      this.form.controls['code'].setValue(this.workflowStepToUpdate.code);
      this.form.controls['libelle'].setValue(this.workflowStepToUpdate.libelle);
      this.form.controls['ordre'].setValue(this.workflowStepToUpdate.ordre);
    }
  
    save() {
      const workflowStep = this.form.value;
      workflowStep.workflowId = this.data.id;
      if (this.workflowStepToUpdate === undefined) {
        this.createWorkflowStep(workflowStep)
      } else {
        this.updateWorkflowStep(workflowStep);
      }
    }
  
    createWorkflowStep(workflow: any) {
      this.workflowService.createWorkflowStep(workflow).subscribe({
        next: (value: any) => {
          Alertes.alerteAddSuccess();
          this.close()
        },
        error: (value: any) => { 
          console.log("VALUE: ", value)
          Alertes.alerteAddDanger(value.error.message)
          this.close()
        }
      })
    }
  
    updateWorkflowStep(workflow: any) {
      this.workflowService.updateWorkflowStep(this.workflowStepToUpdate.id, workflow).subscribe({
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
      this.dialogref.close(this.data);
    }

}
