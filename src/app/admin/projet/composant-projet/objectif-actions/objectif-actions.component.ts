import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManangementUnitService } from '@/app/services/manangement-unit/manangement-unit.service';
import { Alertes } from '@/app/util/alerte';
import { FormObjectifComponent } from '../form-objectif/form-objectif.component';
import {
  FormActionActiviteComponent
} from "@/app/admin/projet/composant-projet/form-action-activite/form-action-activite.component";

export enum FormAction {
  VIEW = 'VIEW',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  ADD_ACTION = 'ADD_ACTION',
  ADD_ACTIVITE = 'ADD_ACTIVITE'
}

@Component({
  selector: 'app-objectif-actions',
  templateUrl: './objectif-actions.component.html',
  styleUrls: ['./objectif-actions.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FormObjectifComponent,
    FormActionActiviteComponent
  ]
})
export class ObjectifActionsComponent {
  @Input() node: any;
  @Output() actionEvent: EventEmitter<FormAction> = new EventEmitter();
  isView: boolean = false;
  type: any;

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
    const typeLabel =
        this.node.level === 0 ? 'cet objectif' :
            this.node.level === 1 ? 'cette action' :
                'cette activité';

    Alertes.confirmAction(
        `Voulez-vous supprimer ${typeLabel} ?`,
        'Cette action est irréversible',
        () => {
          this.managementUnitService.deleteProjet(this.node.data.id).subscribe({
            next: () => {
              Alertes.alerteDeleteSuccess(`${typeLabel} supprimé(e) avec succès`);
              this.actionEvent.emit(FormAction.DELETE);
            },
            error: (error) => {
              Alertes.alerteAddDanger(error.error.message);
            }
          });
        }
    );
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
      if (this.type === 'ACTION') {
        this.actionEvent.emit(FormAction.ADD_ACTION);
      } else if (this.type === 'ACTIVITY') {
        this.actionEvent.emit(FormAction.ADD_ACTIVITE);
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
