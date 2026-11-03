import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
import { WorkflowValidationHistoriqueServiceService } from 'src/app/services/workflow-validation-historique/workflow-validation-historique-service.service';
import {Authority} from "@/app/util/Authority";

interface DataInput {
  workflowType: any;
  entityId: any;
}

@Component({
  selector: 'app-historique-validation',
  templateUrl: './historique-validation.component.html',
  styleUrls: ['./historique-validation.component.scss'],
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
export class HistoriqueValidationComponent {
  @Input() data!: DataInput;

  pageOptions: any = { page: 0, size: 20 };
  loadingIndicator = true;
  activeTab: string = 'liste'; // ou 'liste' selon l’onglet par défaut
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  historiques: any[] = [];

  constructor(
    private dialog: MatDialog, private historiqueService: WorkflowValidationHistoriqueServiceService,
  ) { }

  ngOnInit(): void {
      this.getHistoriques();
  }

  getHistoriques() {
     this.loadingIndicator = true;

    const param = {
      workflowType: this.data.workflowType,
      entityId: this.data.entityId,
    }

    console.log("PARAM: ", param)
    
    this.historiqueService.readHistoriques(param, this.pageOptions.page,  this.pageOptions.size).subscribe({
      next: (value: any) => {
        console.log("value: ", value)
        this.historiques = value.content;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    })
   }

}
