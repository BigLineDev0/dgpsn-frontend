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
import { FormParticipantAtelierComponent } from '../form-participant-atelier/form-participant-atelier.component';
import { ParticipantAtelierService } from '@/app/services/participant-attelier/participant-atelier.service';

@Component({
  selector: 'app-liste-participant-atelier',
  templateUrl: './liste-participant-atelier.component.html',
  styleUrls: ['./liste-participant-atelier.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    NgbTooltipModule,
    NgbPaginationModule,
    NgSelectModule,
    HasAnyAuthorityDirective,
    SpinnerComponent,
    FormParticipantAtelierComponent,
  ]
})
export class ListeParticipantAtelierComponent {
  displayedColumns: string[] = [
    'idEmploye',
    'dateInscription',
    'statutPresence',
    'evaluation',
    'actions'
  ];

  datasource: any;
  loadingIndicator = true;
  atelierId: any;
  participantAtelierToUpdate: any;
  modalRef!: NgbModalRef;
  pageOptions: any = { page: 0, size: 20 };
  add = 'ADD_PARTICIPANT_ATELIER';
  update = 'UPDATE_PARTICIPANT_ATELIER';
  delete = 'DELETE_PARTICIPANT_ATELIER';

  @Input() atelier: any;

  constructor(
    private participantAtelierService: ParticipantAtelierService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAtelierId();
    this.getAllParticipantAteliers();
  }

  getAtelierId() {
    this.atelierId = sessionStorage.getItem('atelierId')!;
  }

  getAllParticipantAteliers() {
    this.pageOptions.atelierId = this.atelierId;
    this.participantAtelierService.readParticipantAteliers(this.pageOptions).subscribe({
      next: (response) => {
        this.datasource = response;
        this.loadingIndicator = false;
      },
      error: (err) => {
        console.log(err);
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }

  openBasicModal(content: TemplateRef<any>, participant?: any) {
    this.participantAtelierToUpdate = participant;
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }

  close(event: boolean) {
    if (event) {
      this.getAllParticipantAteliers();
    }
  }

  doSearch(searchCriteria: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.pageOptions.atelierId = this.atelierId;
    this.pageOptions.idEmploye = searchCriteria.idEmploye;
    this.pageOptions.dateInscription = searchCriteria.dateInscription;
    this.pageOptions.statutPresence = searchCriteria.statutPresence;
    this.getAllParticipantAteliers();
  }

  deleteParticipantAtelier(participantAtelierId: any) {
    this.participantAtelierService.deleteParticipantAtelier(participantAtelierId).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Suppression réussie');
      },
      error: (err) => {
        Alertes.alerteAddDanger(err.error.message);
      },
      complete: () => {
        this.getAllParticipantAteliers();
      }
    });
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllParticipantAteliers();
  }
}