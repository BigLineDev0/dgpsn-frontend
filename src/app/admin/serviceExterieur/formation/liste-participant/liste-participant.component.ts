import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { NgbModal, NgbModalRef, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { Alertes } from 'src/app/util/alerte';
import { FormParticipantComponent } from '../form-participant/form-participant.component';
import { ParticipantService } from '@/app/services/participant/participant.service';
import feather from 'feather-icons';


@Component({
  selector: 'app-liste-participant',
  templateUrl: './liste-participant.component.html',
  styleUrls: ['./liste-participant.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    NgbTooltipModule,
    NgbPaginationModule,
    NgSelectModule,
    HasAnyAuthorityDirective,
    SpinnerComponent,
    FormParticipantComponent,

  ]
})
export class ListeParticipantComponent {
  displayedColumns: string[] = [
    'agent',
    'dateInscription',
    'statut',
    'noteEvaluation',
    'certificatObtenu',
    'commentaires',
    'actions'
  ];

  datasource: any;
  loadingIndicator = false;
  formationId: any;
  participantToUpdate: any;
  modalRef!: NgbModalRef;
  pageOptions: any = { page: 0, size: 20 };
  add = 'ADD';
  delete = 'DELETE';
  update = 'UPDATE';
  @Input() formation: any;

  constructor(
      private participantService: ParticipantService,
      private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getFormationId();
    this.getAllParticipants();
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  getFormationId() {
    this.formationId = sessionStorage.getItem('formationId')!;
    console.log('🔍 FormationId:', this.formationId);
  }

  getAllParticipants() {
    this.loadingIndicator = true;
    this.pageOptions.formationId = this.formationId;

    console.log('📤 Chargement participants avec options:', this.pageOptions);

    this.participantService.readParticipants(this.pageOptions).subscribe({
      next: (response) => {
        console.log('✅ Participants reçus:', response);
        console.log('✅ Type de payload:', Array.isArray(response.payload));
        console.log('✅ Contenu payload:', response.payload);

        // ✅ S'assurer que payload est toujours un tableau
        const payloadData = Array.isArray(response.payload)
            ? response.payload
            : (response.content || response.data || []);

        this.datasource = {
          payload: payloadData,
          totalElements: response.metadata?.totalElements || response.totalElements || payloadData.length,
          metadata: response.metadata || {}
        };

        console.log('✅ Datasource final:', this.datasource);
        console.log('✅ Nombre de participants:', this.datasource.payload?.length);
      },
      error: (err) => {
        console.error('❌ Erreur chargement participants:', err);
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }

  openBasicModal(content: TemplateRef<any>, participant?: any) {
    this.participantToUpdate = participant;
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }

  close(event: boolean) {
    console.log('🔄 Fermeture modal, rechargement:', event);
    if (event) {
      this.getAllParticipants();
    }
    this.modalRef.close();
  }

  doSearch(searchCriteria: any) {
    console.log('🔍 Recherche avec critères:', searchCriteria);
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.pageOptions.formationId = this.formationId;
    this.pageOptions.agentId = searchCriteria.agentId;
    this.pageOptions.dateInscription = searchCriteria.dateInscription;
    this.pageOptions.statut = searchCriteria.statut;
    this.getAllParticipants();
  }

  deleteParticipant(participantId: any) {
    Alertes.confirmAction(
        'Êtes-vous sûr de vouloir supprimer ce participant ?',
        '',
        () => {
          this.participantService.deleteParticipant(participantId).subscribe({
            next: () => {
              Alertes.alerteAddSuccess('Suppression réussie');
            },
            error: (err) => {
              Alertes.alerteAddDanger(err.error?.message || 'Erreur lors de la suppression');
            },
            complete: () => {
              this.getAllParticipants();
            }
          });
        }
    );
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllParticipants();
  }
}