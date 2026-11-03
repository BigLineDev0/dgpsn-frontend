import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { AddProfileComponent } from '../add-profile/add-profile.component';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { AddWorkflowComponent } from '../add-workflow/add-workflow.component';
import { AddEtapeComponent } from '../add-etape/add-etape.component';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { ResponseApi } from 'src/app/util/response.model';
import { Alertes } from 'src/app/util/alerte';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgbModal, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';

@Component({
  selector: 'app-config-work-flow',
  templateUrl: './config-work-flow.component.html',
  styleUrls: ['./config-work-flow.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTooltipModule,
    MatStepperModule,
    MatListModule,
    MatCardModule,
    DragDropModule,
    NgbTooltipModule,
    NgbPaginationModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ConfigWorkFlowComponent implements OnInit {

  drawerMode!: "side" | "over";
  @ViewChild("matDrawer", { static: true }) matDrawer!: MatDrawer;

  pageOptions: any = { page: 0, size: 20 };
  loadingIndicator = true;

  workflows: any[] = [];
  workflowSteps: any[] = [];
  workflowConfig: any;

  validationType: string = 'INDIVIDUELLE';

  selectedWorkflow: any;
  selectedStep: any;
  selectedUsers: any[] = [];

  constructor(
      private dialog: MatDialog,
      private workflowService: WorkflowService,
      private readonly modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getWorkflows();
  }

  getWorkflows(workflowId?: any) {
    this.workflowService.readWorkflows(null, this.pageOptions.page, this.pageOptions.size).subscribe({
      next: (value: any) => {
        this.workflows = value.content;

        this.workflows = this.workflows.map(workflow => {
          workflow.displayLibelle = `${workflow.libelle} (${workflow.type})`;
          return workflow;
        });

        if (this.workflows.length > 0) {
          this.selectedWorkflow = workflowId != undefined ?
              this.workflows.find(w => w.id === workflowId) || this.workflows[0] :
              this.workflows[0];
          this.getWorkflowSteps(this.selectedWorkflow.id);
        } else {
          this.selectedWorkflow = undefined;
        }
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }

  getWorkflowSteps(workflowId: any) {
    const params = { workflowId: workflowId };

    this.workflowService.readWorkflowSteps(params, this.pageOptions.page, this.pageOptions.size).subscribe({
      next: (value: any) => {
        this.workflowSteps = value.content;

        this.workflowSteps = this.workflowSteps.map(step => {
          step.displayLibelle = `${step.ordre} - ${step.libelle}`;
          return step;
        });

        if (this.workflowSteps.length > 0) {
          this.selectedStep = this.workflowSteps[0];
          this.getWorkflowStepUsers(this.selectedStep.id);
        } else {
          this.selectedStep = undefined;
        }
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }

  getWorkflowStepUsers(stepId: any) {
    this.workflowService.readWorkflowUserConfig(stepId).subscribe({
      next: (value: any) => {
        this.workflowConfig = value;
        this.validationType = value ? this.workflowConfig.validationType.name : 'INDIVIDUELLE';
        this.selectedUsers = value ? this.workflowConfig.users : [];
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }

  onWorkflowSelect(workflow: any): void {
    this.selectedWorkflow = workflow;
    this.getWorkflowSteps(workflow.id);
  }

  onStepSelect(step: any): void {
    this.selectedStep = step;
    this.getWorkflowStepUsers(step.id);
  }

  openNew(stepValidation: any, users: any) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.width = '1900px';
    // dialogConfig.maxHeight = '600px';
    // dialogConfig.backdropClass = 'bacdrop-modal';
     dialogConfig.panelClass = 'large-profile-dialog';
    dialogConfig.position = { top: '10px' };
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      step: stepValidation,
      users: users
    };
    const dialogRef = this.dialog.open(AddProfileComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedUsers = result;
      }
    });
  }
    openBasicModal(content: TemplateRef<any>, size: any): void {
    this.modalService.open(content, { size: size, backdrop: 'static' })
  }

  openCreateWorkflow(id?: string): void {
    let dialogref = this.dialog.open(AddWorkflowComponent, { data: id });
    dialogref.afterClosed().subscribe(data => {
      this.getWorkflows();
    });
  }

  openCreateEtape(): void {
    let dialogref = this.dialog.open(AddEtapeComponent, { data: this.selectedWorkflow });
    dialogref.afterClosed().subscribe(data => {
      if (data) {
        this.getWorkflows(data);
      }
    });
  }

  saveValidationConfig() {
    const configValidation = {
      validationType: this.validationType,
      workflowStepId: this.selectedStep.id,
      userIds: this.selectedUsers.map(user => user.id)
    };

    this.workflowService.createWorkflowStepValidation(configValidation).subscribe({
      next: response => {
        Alertes.alerteAddSuccess();
      }
    });
  }

  disableSaveValidationButton(): boolean {
    return this.selectedStep === undefined
        || this.selectedUsers === undefined
        || this.selectedUsers.length === 0
        || this.validationType === 'AUCUN';
  }

  onDeleteWorkflow() {
    Alertes.confirmAction("Voulez-vous supprimer ce workflow ?", 'Cette action est irreversible', () => {
      this.workflowService.deleteWorkflow(this.selectedWorkflow.id).subscribe({
        next: response => {
          Alertes.alerteDeleteSuccess();
        },
        error: response => {
          console.log(response);
        },
        complete: () => {
          this.getWorkflows();
        }
      });
    });
  }

  onDeleteStep() {
    Alertes.confirmAction("Voulez-vous supprimer cette étape ?", 'Cette action est irreversible', () => {
      this.workflowService.deleteWorkflowSteps(this.selectedStep.id).subscribe({
        next: response => {
          Alertes.alerteDeleteSuccess();
        },
        error: response => {
          console.log(response);
        },
        complete: () => {
          this.getWorkflows();
        }
      });
    });
  }

  // Fonction pour le drag & drop des utilisateurs
  dropUser(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.selectedUsers, event.previousIndex, event.currentIndex);
  }
}
