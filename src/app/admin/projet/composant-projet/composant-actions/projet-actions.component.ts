import { ManangementUnitService } from '@/app/services/manangement-unit/manangement-unit.service';
import { Alertes } from '@/app/util/alerte';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { FormComposantComponent } from '../form-composant/form-composant.component';
import { FormActiviteComponent } from '../form-activite/form-activite/form-activite.component';


export enum FormAction {
  VIEW = 'VIEW',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  ADD_RESULT = 'ADD_RESULT',
  ADD_PRODUCT = 'ADD_PRODUCT',
  ADD_ACTIVITY = 'ADD_ACTIVITY'
}

@Component({
  selector: 'app-projet-actions',
  templateUrl: './projet-actions.component.html',
  styleUrls: ['./projet-actions.component.scss'],

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
    FormComposantComponent,
    FormActiviteComponent

   

  ]
})
export class ProjetActionsComponent {
  @Input() node: any;
  @Output() actionEvent: EventEmitter<FormAction> = new EventEmitter();
  isView: boolean = false;
  type: string | undefined;

  constructor(
    private modalService: NgbModal,
    private managementUnitService: ManangementUnitService
  ) {}

  view(modal: TemplateRef<any>): void {
    this.isView = true;
    this.openModal(modal);
  }

  edit(modal: TemplateRef<any>): void {
    this.isView = false;
    this.openModal(modal);
  }

  addNode(modal: TemplateRef<any>, type: string): void {
    this.type = type;
    this.openModal(modal);
  }

  delete(): void {
    const typeLabel = this.node.level === 0 ? 'ce composant' : this.node.level === 1 ? 'ce résultat' : 'ce produit';
    Alertes.confirmAction(`Voulez-vous supprimer ${typeLabel} ?`, 'Cette action est irréversible', () => {
      this.managementUnitService.deleteProjet(this.node.data.id).subscribe({
        next: () => {
          Alertes.alerteDeleteSuccess(`${typeLabel} supprimé avec succès`);
          this.actionEvent.emit(FormAction.DELETE);
        },
        error: (error) => {
          Alertes.alerteAddDanger(error.error.message);
        }
      });
    });
  }

  openModal(modal: TemplateRef<any>): void {
    this.modalService.open(modal, { size: 'xl', backdrop: false }).result.then(() => {
      this.isView = false;
      this.type = undefined;
    });
  }

  emitEdit($event: boolean): void {
    if ($event) {
      this.actionEvent.emit(FormAction.UPDATE);
    }
  }

  emitAddNode($event: boolean): void {
    if ($event) {
      if (this.type === 'RESULT') {
        this.actionEvent.emit(FormAction.ADD_RESULT);
      } else if (this.type === 'PRODUCT') {
        this.actionEvent.emit(FormAction.ADD_PRODUCT);
      } else if (this.type === 'ACTIVITY') {
        this.actionEvent.emit(FormAction.ADD_ACTIVITY);
      }
    }
  }

  close($event: boolean): void {
    if ($event) {
      this.modalService.dismissAll();
      this.actionEvent.emit(FormAction.VIEW);
    }
  }
}
