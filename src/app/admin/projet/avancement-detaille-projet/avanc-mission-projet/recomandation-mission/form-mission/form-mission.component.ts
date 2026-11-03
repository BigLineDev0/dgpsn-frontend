import { RoutingAvancementProjetComponent } from '@/app/admin/projet/routimg-projet/routing-avancement-projet/routing-avancement-projet.component';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { IssueLogService } from 'src/app/services/issue-log/issue-log.service';
import { RecommendationService } from 'src/app/services/recommendation/recommendation.service';
import { StatutService } from 'src/app/services/statut/statut.service';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { ImageMediaProjetComponent } from '../../../avanc-mediatheque-projet/image-media-projet/image-media-projet.component';
import { VideoMediaProjetComponent } from '../../../avanc-mediatheque-projet/video-media-projet/video-media-projet.component';

@Component({
  selector: 'app-form-mission',
  templateUrl: './form-mission.component.html',
  styleUrls: ['./form-mission.component.scss'],
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
export class FormMissionComponent {

  statuts: any;
  problemes: any;
  projetId!: string | null;
  form: any;
  assignmentId: any;
  issueLogId:any;
  @Input() recommendationToUpdate: any;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() projetd: any;
  @Input()  label:any;


  @Output() search: EventEmitter<any> = new EventEmitter();

  @Input() isSearch!: boolean;

  constructor(
    private modalService: NgbModal,
    private statutService: StatutService,
    private issueLogService: IssueLogService,
    private recommandationService: RecommendationService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('typeRecommandation') === 'issuelog') {
      localStorage.removeItem('assignmentId');
      this.issueLogId = localStorage.getItem('issueLogId');
      this.assignmentId = null;
    } else if (localStorage.getItem('typeRecommandation') === 'mission') {
      localStorage.removeItem('issueLogId');
      this.assignmentId = localStorage.getItem('assignmentId');
      this.issueLogId = null;
    }

    this.form = new FormGroup({
      assignmentId: new FormControl('', Validators.required),
      libelle: new FormControl('', Validators.required),
      responsable: new FormControl('', Validators.required),
      deadline: new FormControl('', Validators.required),
      statusId: new FormControl('', Validators.required),
    });

    this.readStatus();
    this.readIssueLogs();
    this.reloadFiles();
  }

  reloadFiles() {
    if (this.recommendationToUpdate !== undefined) {
      this.form
        .get('assignmentId')
        ?.setValue(this.recommendationToUpdate.issueLog?.id);
      this.form.get('libelle')?.setValue(this.recommendationToUpdate.libelle);
      this.form
        .get('responsable')
        ?.setValue(this.recommendationToUpdate.responsable);
      this.form
        .get('deadline')
        ?.setValue(Helper.editDate(this.recommendationToUpdate.deadline));
      this.form
        .get('statusId')
        ?.setValue(this.recommendationToUpdate.status?.id);
    }
  }

  save() {
    if (this.recommendationToUpdate === undefined) {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
    let recommandation = this.form.value;
  //  recommandation.assignmentId = +this.assignmentId;
    recommandation.deadline = this.form.value.deadline;
    recommandation.assignmentId = this.assignmentId;
    recommandation.issueLogId = this.issueLogId;

    this.recommandationService.createRecommendation(recommandation).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess();
        this.close();
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.error.message);
      },
    });

  }

  update() {
    let recommandation = this.form.value;
    recommandation.deadline = this.form.value.deadline;
    recommandation.assignmentId = this.assignmentId;

    this.recommandationService
      .updateRecommendation(this.recommendationToUpdate.id, recommandation)
      .subscribe({
        next: (data) => {
          Alertes.alerteAddSuccess();
          this.close();
        },
        error: (error) => {
          Alertes.alerteAddDanger(error.error.message);
        },
      });
  }

  close() {
    this.submit.emit(true);
  }
 
  readStatus() {
    this.statutService.readstatut().subscribe((data) => {
      this.statuts = data.content;
    });
  }
  readIssueLogs() {
    const req = { projetId: this.projetId };
    this.issueLogService.readIssuelogs(req).subscribe((data) => {
      this.problemes = data.content;
    });
  }

  doSearch() {
    const recommandation: any = {};
    recommandation.deadline = this.form.value.deadline;
    recommandation.assignmentId = this.assignmentId;
    recommandation.responsable = this.form.value.responsable;
    recommandation.statusId = this.form.value.statusId; 

    this.search.emit(recommandation);
  }
}
