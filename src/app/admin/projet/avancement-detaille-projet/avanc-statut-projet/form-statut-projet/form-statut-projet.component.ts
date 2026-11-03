import { HistoryStatusService } from '@/app/services/history-status/history-status.service';
import { StatutService } from '@/app/services/statut/statut.service';
import { Alertes } from '@/app/util/alerte';
import { Helper } from '@/app/util/helper';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
import {NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { RoutingAvancementProjetComponent } from '../../../routimg-projet/routing-avancement-projet/routing-avancement-projet.component';
import { ImageMediaProjetComponent } from '../../avanc-mediatheque-projet/image-media-projet/image-media-projet.component';
import { VideoMediaProjetComponent } from '../../avanc-mediatheque-projet/video-media-projet/video-media-projet.component';


@Component({
  selector: 'app-form-statut-projet',
  templateUrl: './form-statut-projet.component.html',
  styleUrls: ['./form-statut-projet.component.scss'],
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
    RoutingAvancementProjetComponent,
    ImageMediaProjetComponent,
    VideoMediaProjetComponent
   ]
})
export class FormStatutProjetComponent implements OnInit {
  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  @Input() statusToUpdate: any;

  statuts: any = [];

  form!: FormGroup;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() isSearch!: boolean;


  projetId: any;

  constructor(private modalService: NgbModal,
              private statutService: StatutService,
              private historyStatusService: HistoryStatusService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.readStatus();
    this.initForm();
    this.loadFields();
    this.getProjet();
  }

  getProjet() {
    this.projetId = localStorage.getItem('projetId')!;
  }

  initForm() {
    this.form = this.fb.group({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      statusId:new FormControl('', Validators.required)
    })
  }

  loadFields() {
    console.log("history status ",this.statusToUpdate)
    if(this.statusToUpdate !== undefined) {
      if(this.statusToUpdate.startDate){
        this.form.get('startDate')?.setValue(Helper.editDate(this.statusToUpdate.startDate));
      }
      if(this.statusToUpdate.endDate){
        this.form.get('endDate')?.setValue(Helper.editDate(this.statusToUpdate.endDate));
      }
      this.form.get('statusId')?.setValue(this.statusToUpdate.status.id);
    }
  }

  save() {
    const historyStatus = this.form.value;
    // historyStatus.startDate = Helper.getDateFormatter(this.form.value.startDate);
    // historyStatus.endDate = Helper.getDateFormatter(this.form.value.endDate);
    historyStatus.projetId = +this.projetId;

    if(this.form.valid){
      if(this.statusToUpdate === undefined) {
        this.create(historyStatus);
      } else {
        this.update(historyStatus);
      }
    }
  }

  create(historyStatus: any){
    this.historyStatusService.addHistoryStatusOfProject(historyStatus).subscribe({
      next: value => Alertes.alerteAddSuccess('Statut'),
      error: value => Alertes.alerteAddDanger(value.error.message),
      complete: () => this.close()
    })
  }

  update(historyStatus: any) {
    this.historyStatusService.updateHistoryStatusOfProject(this.statusToUpdate.id, historyStatus).subscribe({
      next: value => Alertes.alerteUpdateSuccess('Statut'),
      error: value => Alertes.alerteUpdateDanger(value.error.message),
      complete: () => this.close()
    })
  }

  close(){
    this.submit.emit(true);
  }

  readStatus(){
    let req = {statusType: 'PROJECT', page: 0,
      size: 100000,
      sortBy: 'libelle',
      ascending: true}
    this.statutService.readstatut(req).subscribe(data=>{
      this.statuts = data.content;
    })
  }
  doSearch() {
    this.search.emit(this.form.value);
  }

}
