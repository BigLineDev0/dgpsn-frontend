import { IndicateurProjetService } from '@/app/services/indicateur-projet/indicateur-projet.service';
import { IndicateurService } from '@/app/services/indicateur/indicateur.service';
import { LabelService } from '@/app/services/labelService/label-service';
import { Alertes } from '@/app/util/alerte';
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



@Component({
  selector: 'app-form-indicateur-projet',
  templateUrl: './form-indicateur-projet.component.html',
  styleUrls: ['./form-indicateur-projet.component.scss'],
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
export class FormIndicateurProjetComponent implements OnInit {

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() label!: string;
  @Input() projetId: any;
  @Input() indicatorToUpdate: any;
  @Input() isSearch!: boolean;

  form!: FormGroup;
  indicators: any;
  periodicities:any=[
    {name:'TRIMESTRIELLE',libelle:'Trimestrielle'},
    {name:'SEMESTRIELLE',libelle:'Semestrielle'},
    {name:'ANNUELLE',libelle:'Annuelle'},
    {name:'MOISUELLE',libelle:'Mensuelle'},
    ]
  constructor(
    private indicatorProjetService: IndicateurProjetService,
    private indicateurService: IndicateurService,
    private labelService:LabelService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllIndicators();
    if(this.indicatorToUpdate != undefined) {
      this.editForm();
    }
  }

  initForm() {
    this.form = new FormGroup(
      {
        indicatorId: new FormControl('', Validators.required),
        periodicity: new FormControl('', Validators.required),
        targetValue: new FormControl('', Validators.required)
      }
    );
  }

  editForm() {
    this.form.get('indicatorId')?.disable({onlySelf: true});
    this.form.get('periodicity')?.disable({onlySelf: true});
    this.form.get('indicatorId')?.setValue(this.indicatorToUpdate?.indicator.id);
    this.form.get('periodicity')?.setValue(this.indicatorToUpdate?.periodicity?.name);
    this.form.get('targetValue')?.setValue(this.indicatorToUpdate?.targetValue);
  }


  getAllIndicators() {
    let req: any = {}
    req.notOnly = true;
    req.sortBy = 'libelle';
    req.ascending = true;
    this.indicateurService.readIndicators(req).subscribe(response => {
      this.indicators = response.content;
    })
  }


  save() {
    const indicatorRequest = this.form.value;
    indicatorRequest.projetId = +this.projetId;

    if(this.indicatorToUpdate === undefined) {
      this.create(indicatorRequest);
    } else {
      indicatorRequest.indicatorId = this.indicatorToUpdate.indicator.id;
      indicatorRequest.periodicity = this.indicatorToUpdate.periodicity;

      this.update(this.indicatorToUpdate.id, indicatorRequest);
    }
  }

  create(indicatorRequest: any) {
    this.indicatorProjetService.addIndicatorToProject(indicatorRequest).subscribe({
      next: value => {
        Alertes.alerteAddSuccess('Indicateur');
      },
      error: value => {
        Alertes.alerteAddDanger(value.error.message)
      },
      complete: () => {
        this.close();
      }
    })
  }

  update(indicatorProjectId: any,  indicatorRequest: any) {
    this.indicatorProjetService.updateIndicatorProject(indicatorProjectId, indicatorRequest).subscribe({
      next: value => {
        Alertes.alerteUpdateSuccess('Indicateur');
      },
      error: value => {
        Alertes.alerteUpdateDanger(value.error.message)
      },
      complete: () => {
        this.close();
      }
    })
  }

  doSearch() {
    this.search.emit(this.form.value);
  }

  close() {
    this.submit.emit(true);
  }
}
