import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModal, NgbModalRef, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { Alertes } from 'src/app/util/alerte';
import { FormAtelierComponent } from '../form-atelier/form-atelier.component';
import { AtelierService } from '@/app/services/atelier/atelier.service';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import {Authority} from "@/app/util/Authority";

@Component({
  selector: 'app-liste-atelier',
  templateUrl: './liste-atelier.component.html',
  styleUrls: ['./liste-atelier.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgbTooltipModule,
    NgbPaginationModule,
    NgSelectModule,
    HasAnyAuthorityDirective,
    SpinnerComponent,
    FormAtelierComponent,
      HasAnyAuthorityDirective,
  ]
})
export class ListeAtelierComponent {
  displayedColumns: string[] = [
    'titreAtelier',
    'theme',
    'objectif',
    'dateAtelier',
    'heurDebut',
    'heurFin',
    'lieu',
    'nombreParticipantsMax',
    'agent',
    'coutOrganisation',
    'statut',
    'actions'
  ];

  datasource: any;
  loadingIndicator = false;
  atelierToUpdate: any;
  modalRef!: NgbModalRef;
  pageOptions: any = { page: 0, size: 20 };
  add = Authority.ADD_ATELIER;
  updated = Authority.EDIT_ATELIER;
  deleted = Authority.DELETE_ATELIER;
  read = Authority.READ_ATELIER;

  @Input() projet: any;

  constructor(
      private atelierService: AtelierService,
      private modalService: NgbModal,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllAteliers();
  }

  getAllAteliers() {
    this.loadingIndicator = true;

    this.atelierService.readAllAteliers(this.pageOptions).subscribe({
      next: (response) => {
        console.log('✅ Réponse reçue:', response);

        // Vérifie si la réponse contient un tableau
        const ateliers = Array.isArray(response.payload) ? response.payload : [response.payload];

        // Convertir les dates et structurer proprement
        this.datasource = {
          content: ateliers.map((a: any) => ({
            ...a,
            heurDebut: a.heurDebut ? new Date(a.heurDebut) : null,
            heurFin: a.heurFin ? new Date(a.heurFin) : null,
            dateAtelier: a.dateAtelier ? new Date(a.dateAtelier) : null,
            statut: a.statut?.description || a.statut,
            agentId: a.agentId || { prenom: '—' }
          })),
          totalElements: ateliers.length,
          totalPages: 1,
          number: 0,
          size: ateliers.length
        };

        console.log('✅ Datasource finale:', this.datasource);
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des ateliers:', err);
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }

  openBasicModal(content: TemplateRef<any>, atelier?: any) {
    this.atelierToUpdate = atelier;
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }

  close(event: boolean) {
    console.log('🔄 Fermeture modal, rechargement:', event);
    if (event) {
      this.getAllAteliers();
    }
    this.modalRef.close();
  }

  doSearch(searchCriteria: any) {
    console.log('🔍 Recherche avec critères:', searchCriteria);
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.pageOptions.titreAtelier = searchCriteria.titreAtelier;
    this.pageOptions.theme = searchCriteria.theme;
    this.pageOptions.lieu = searchCriteria.lieu;
    this.pageOptions.statut = searchCriteria.statut;
    this.getAllAteliers();
  }

  deleteAtelier(atelierId: any) {
    Alertes.confirmAction(
        'Êtes-vous sûr de vouloir supprimer cet atelier ?',
        '',
        () => {
          this.atelierService.deleteAtelier(atelierId).subscribe({
            next: () => {
              Alertes.alerteAddSuccess('Suppression réussie');
            },
            error: (err) => {
              Alertes.alerteAddDanger(err.error.message);
            },
            complete: () => {
              this.getAllAteliers();
            }
          });
        }
    );
  }

  openUrl(id: any, url: any) {
    sessionStorage.setItem('atelierId', id);
    this.router.navigateByUrl(url);
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllAteliers();
  }
}