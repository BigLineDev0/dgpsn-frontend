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
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { FormPlanPassationProjetComponent } from '../../appel-offre-projet/plan-passation/form-plan-passation-projet/form-plan-passation-projet.component';
import { RoutingAppelOffreProjetComponent } from '../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';


@Component({
  selector: 'app-form-composant',
  templateUrl: './form-composant.component.html',
  styleUrls: ['./form-composant.component.scss'],
    standalone:true,
  imports:[
     CommonModule,
    NgbTooltipModule,
    NgbDropdownModule,
    MatIconModule,
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
    NgbTimepickerModule,
    NgbPopoverModule,
    NgbDatepickerModule,
    MatCheckboxModule,
    MatRippleModule,
    HasAnyAuthorityDirective,
    MatTreeModule,
    MatListModule,
    MatTooltipModule,
    MatButtonModule,


  ]
})
export class FormComposantComponent implements OnInit {
  form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() composantProjectToUpdate: any;
  @Input() isSearch: boolean = false;
  @Input() projetId: any;

  constructor(
    private modalService: NgbModal,
    private managementUnitService: ManangementUnitService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      code: new FormControl(null, Validators.required),
      libelle: new FormControl(null, Validators.required)
    });

    this.loadFields();
  }

  loadFields(): void {
    if (this.composantProjectToUpdate) {
      this.form.get('code')?.setValue(this.composantProjectToUpdate.nomenclature);
      this.form.get('libelle')?.setValue(this.composantProjectToUpdate.name);
    }
  }

  save(): void {
    const composantProjet = {
      nomenclature: this.form.value.code,
      name: this.form.value.libelle,
      type: 'COMPONENT'
    };

    if (this.composantProjectToUpdate) {
      this.update(composantProjet);
    } else {
      this.create(composantProjet);
    }
  }

  create(composantProjet: any): void {
    console.log("composantProjet : ", composantProjet);
    composantProjet.parentId = this.projetId;
    this.managementUnitService.createNode(composantProjet, 'COMPONENT').subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Le composant a été ajouté avec succès');
        this.close();
      },
      error: (error) => {
        Alertes.errorPopPup('Erreur', error?.error?.message || 'Une erreur est survenue lors de l\'ajout du composant');
        console.error('Error creating component:', error);
      }
    });
  }

  update(composantProjet: any): void {
    this.managementUnitService.updateProjet(this.composantProjectToUpdate.id, composantProjet).subscribe({
      next: () => {
        Alertes.alerteUpdateSuccess('Le composant a été mis à jour avec succès');
        this.close();
      },
      error: (error) => {
        Alertes.errorPopPup('Erreur', error?.error?.message || 'Une erreur est survenue lors de la mise à jour du composant');
        console.error('Error updating component:', error);
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
