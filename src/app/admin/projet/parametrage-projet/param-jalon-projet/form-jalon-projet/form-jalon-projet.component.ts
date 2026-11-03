import { MilestoneService } from '@/app/services/milestone/milestone.service';
import { Alertes } from '@/app/util/alerte';
import { Helper } from '@/app/util/helper';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
// import { DiagrammeGanttJalonProjetComponent } from '../diagramme-gantt-jalon-projet/diagramme-gantt-jalon-projet.component';

@Component({
  selector: 'app-form-jalon-projet',
  templateUrl: './form-jalon-projet.component.html',
  styleUrls: ['./form-jalon-projet.component.scss'],
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
    // DiagrammeGanttJalonProjetComponent
 
  ]
})
export class FormJalonProjetComponent implements OnInit {

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() isSearch!: boolean;
  @Input() label!: string;
  @Input() projetId: any;
  @Input() milestoneToUpdate: any;
  milestones: any;
  form!: FormGroup;

  constructor(
    private milestoneProjetService: MilestoneService
  ) { }

  ngOnInit(): void {
    this.initForm();

    if(this.milestoneToUpdate != undefined) {
      this.editForm();
    }
  }

  initForm() {
    this.form = new FormGroup(
      {
        libelle: new FormControl('', Validators.required),
        predicatedDate: new FormControl(null, Validators.required),
        readDate: new FormControl(null, Validators.required),
        comment: new FormControl('')
      }
    );
  }

  editForm() {
    this.form.get('libelle')?.setValue(this.milestoneToUpdate?.libelle);
    this.form.get('predicatedDate')?.setValue(Helper.editDate(this.milestoneToUpdate?.predicatedDate));
    this.form.get('readDate')?.setValue(Helper.editDate(this.milestoneToUpdate?.readDate));
    this.form.get('comment')?.setValue(this.milestoneToUpdate?.comment);
  }

  save() {
    const milestoneRequest = this.form.value;
    milestoneRequest.projetId = localStorage.getItem('projectId');
    // milestoneRequest.projetId = localStorage.getItem('projectId');

    if(this.milestoneToUpdate === undefined) {
      this.create(milestoneRequest);
    } else {
      this.update(this.milestoneToUpdate.id, milestoneRequest);
    }
  }

  create(milestoneRequest: any) {
    this.milestoneProjetService.addMilestoneToProject(milestoneRequest).subscribe({
      next: value => {
        Alertes.alerteAddSuccess('Jalons');
      },
      error: value => {
        Alertes.alerteAddDanger(value.error.message)
      },
      complete: () => {
        this.close();
      }
    })
  }

  update(milestoneRequestId: any, milestoneRequest: any) {
    this.milestoneProjetService.updateMilestoneToProject(milestoneRequestId, milestoneRequest).subscribe({
      next: value => {
        Alertes.alerteUpdateSuccess('Jalons');
      },
      error: value => {
        Alertes.alerteUpdateDanger(value.error.message)
      },
      complete: () => {
        this.close();
      }
    });
  }

  close() {
    this.submit.emit(true);
  }

  doSearch() {
    const milestoneRequest: any = {
      libelle :this.form.value.libelle,
      predicatedDate :this.form.value.predicatedDate,
      readDate:this.form.value.readDate,
      projetId: +this.projetId,
    };
    this.search.emit(milestoneRequest);
  }


}
