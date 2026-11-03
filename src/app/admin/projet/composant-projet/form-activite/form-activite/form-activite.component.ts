import { ManangementUnitService } from '@/app/services/manangement-unit/manangement-unit.service';
import { Alertes } from '@/app/util/alerte';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Helper } from 'src/app/util/helper';
import { RoutingAppelOffreProjetComponent } from '../../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';


@Component({
  selector: 'app-form-activite',
  templateUrl: './form-activite.component.html',
  styleUrls: ['./form-activite.component.scss'],
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
export class FormActiviteComponent implements OnInit {
  pageOptions: any = { page: 0, size: 100 };
  form!: FormGroup;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() activiteEvent: EventEmitter<boolean> = new EventEmitter();
  @Input() isSearch: boolean = false;
  @Input() type: string | undefined;
  @Input() activite: any;
  @Input() view: boolean = false;
  @Input() isActivity: boolean = false;
  years: any[] = [];

  constructor(private managementUnitService: ManangementUnitService) {}

  ngOnInit(): void {
    this.years = Helper.generateYears().reverse().map(year => {
      return {value: year}
    });
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      nomenclature: new FormControl({ value: '', disabled: this.view }, Validators.required),
      name: new FormControl({ value: '', disabled: this.view }, Validators.required)
    });

    // if(this.isActivity) {
    //   this.form.addControl('budget', new FormControl('', Validators.required));
    //   this.form.addControl('anneeDebut', new FormControl('', Validators.required));
    //   this.form.addControl('anneeFin', new FormControl('', Validators.required));
    // }

    this.setForm();
  }

  setForm(): void {
    if (this.activite && this.activite.id) {
      this.form.controls['nomenclature'].setValue(this.activite.nomenclature || this.activite.code);
      this.form.controls['name'].setValue(this.activite.name || this.activite.libelle);
    }
  }

  save(): void {
    const nodeData: any = {
      code: this.form.value.nomenclature,
      name: this.form.value.name,
      type: this.type
    };

    // if(this.isActivity) {
    //   nodeData.anneeDebut = this.form.value.anneeDebut,
    //   nodeData.anneeFin = this.form.value.anneeFin
    // }

    console.log("nodeData: ", nodeData)

    if (this.activite && this.activite.id) {
      this.updateNode(nodeData);
    } else {
      this.createNode(nodeData);
    }
  }

  createNode(nodeData: any): void {
    // const parentId = this.activite.projet.id;
    nodeData.parentId = this.activite.projet.id;
    this.managementUnitService.createNode(nodeData, this.type).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Ajouté avec succès');
        this.activiteEvent.emit(true);
        this.close();
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.error.message);
      }
    });
  }

  updateNode(nodeData: any): void {
    this.managementUnitService.updateProjet(this.activite.id, nodeData).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Mis à jour avec succès');
        this.close();
        this.activiteEvent.emit(true);
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.error.message);
      }
    });
  }

  doSearch(): void {
    this.search.emit(this.form.value);
  }

  close(): void {
    this.submit.emit(true);
  }
}
