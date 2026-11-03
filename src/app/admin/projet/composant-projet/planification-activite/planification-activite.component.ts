import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModal, NgbModalRef, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { Alertes } from '@/app/util/alerte';
import { FormPlanificationComponent } from '../form-planification/form-planification.component';
import {PlanificationService} from "@/app/services/planification/planification.service";

@Component({
  selector: 'app-planification-activite',
  templateUrl: './planification-activite.component.html',
  styleUrls: ['./planification-activite.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgbTooltipModule,
    MatIconModule,
    MatTableModule,
    SpinnerComponent,
    NgbPaginationModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    MatButtonModule,
    HasAnyAuthorityDirective,
    FormPlanificationComponent
  ]
})
export class PlanificationActiviteComponent implements OnInit {

  displayedColumns: string[] = [
    'trimestre',
    'mois',
    'semaines',
    'dateDebut',
    'dateFin',
    'statut',
    'commentaire',
    'actions'
  ];

  datasource: any;
  @Input() activity: any;
  loadingIndicator = true;
  activite: any;
  planningToUpdate: any;
  modalRef!: NgbModalRef;
  pageOptions: any = { page: 0, size: 20 };

  private readonly MOIS_LABELS: { [key: number]: string } = {
    1: 'Janvier', 2: 'Février', 3: 'Mars', 4: 'Avril',
    5: 'Mai', 6: 'Juin', 7: 'Juillet', 8: 'Août',
    9: 'Septembre', 10: 'Octobre', 11: 'Novembre', 12: 'Décembre'
  };

  private readonly STATUT_LABELS: { [key: string]: string } = {
    'PLANIFIE': 'Planifié',
    'EN_COURS': 'En cours',
    'TERMINE': 'Terminé'
  };

  constructor(
      private readonly planificationService: PlanificationService,
      private readonly modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getActivite();
    this.loadPlanifications();
  }

  getActivite() {
    this.activite = sessionStorage.getItem('activite');
    if (this.activite) {
      this.activite = JSON.parse(this.activite);
    }
  }

  loadPlanifications() {
    this.pageOptions.activityId = this.activity;
    this.planificationService.readPlanifications(this.pageOptions).subscribe({
      next: response => {
        this.datasource = response;
        this.loadingIndicator = false;
      },
      error: err => {
        console.error('Error loading planifications:', err);
        this.loadingIndicator = false;
        Alertes.alerteAddDanger('Erreur lors du chargement des planifications');
      }
    });
  }

  openModal(content: TemplateRef<any>, planning?: any) {
    this.planningToUpdate = planning;
    this.modalRef = this.modalService.open(content, { size: 'lg', backdrop: false });
  }

  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      this.loadPlanifications();
    }
  }

  deletePlanning(planningId: any) {
    Alertes.confirmAction(
        'Voulez-vous supprimer cette planification ?',
        'Cette action est irréversible',
        () => {
          this.planificationService.deletePlanification(planningId).subscribe({
            next: () => {
              Alertes.alerteDeleteSuccess('Planification supprimée avec succès');
              this.loadPlanifications();
            },
            error: (err) => {
              Alertes.alerteAddDanger(err?.error?.message || 'Erreur lors de la suppression');
            }
          });
        }
    );
  }

  doSearch(data: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.pageOptions.activityId = this.activity;
    this.pageOptions.trimestre = data.trimestre;
    this.pageOptions.mois = data.mois;
    this.pageOptions.statut = data.statut;
    this.loadPlanifications();
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.loadPlanifications();
  }

  getMoisLabel(mois: number): string {
    return this.MOIS_LABELS[mois] || 'Inconnu';
  }

  getStatutLabel(statut: string): string {
    return this.STATUT_LABELS[statut] || statut;
  }
}
