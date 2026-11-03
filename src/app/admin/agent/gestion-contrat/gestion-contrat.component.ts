import { Component, Input, TemplateRef, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgbModal, NgbModalRef, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { AgentRoutingComponent } from '@/app/admin/agent/agent-routing/agent-routing.component';
import { Router } from '@angular/router';
import { Alertes } from '@/app/util/alerte';
import { LabelService } from '@/app/services/labelService/label-service';
import { GestionContratService } from '@/app/services/agent/gestion-contrat.service';


interface Contrat {
  id?: number;
  typeContratId: number;
  typeContrat?: { id: number; libelle: string };
  description: string;
  dateDebut: string;
  dateFin?: string;
  isActive: boolean;
  agentId: number;
}

interface SearchCriteria {
  typeContrat?: string;
  dateDebut?: string;
  dateFin?: string;
}

@Component({
  selector: 'app-gestion-contrat',
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
    NgSelectModule,
    HasAnyAuthorityDirective,
    SpinnerComponent,
    AgentRoutingComponent,
  ],
  templateUrl: './gestion-contrat.component.html',
  styleUrl: './gestion-contrat.component.scss',
})
export class GestionContratComponent implements OnInit {
  displayedColumns: string[] = [
    'typeContrat',
    'description',
    'dateDebut',
    'dateFin',
    'statut',
    'actions',
  ];

  datasource: Contrat[] = [];
  agentId!: number;
  loadingIndicator = false;
  curentRoute!: string;
  contratToUpdate!: Contrat;
  contrat: Contrat = {
    typeContratId: 0,
    description: '',
    dateDebut: new Date().toISOString().split('T')[0],
    dateFin: '',
    isActive: true,
    agentId: 0,
  };
  searchCriteria: SearchCriteria = {};
  modalRef!: NgbModalRef;

  typeContratsData = signal<any[]>([]);
  typeContrat = computed(() =>
    this.typeContratsData().map((type: any) => ({
      value: type.id,
      label: type.libelle,
    }))
  );

  sortData(data: Contrat[]) {
    return data.sort((a) => (a.isActive ? -1 : 1));
  }


  @Input() projet: any;

  constructor(
    private labelService: LabelService,
    private gestionContratService: GestionContratService,
    private modalService: NgbModal,
    private router: Router
  ) {}
// comment
  ngOnInit(): void {
    this.agentId = Number(localStorage.getItem('idAgent'));
    this.contrat.agentId = this.agentId;
    this.curentRoute = this.router.url;
    this.loadTypeContrat();
    this.loadingContrat();
  }

  loadTypeContrat() {
    this.labelService
      .readLabels({
        page: 0,
        size: 100,
        referentielType: 'TYPE_CONTRAT',
      })
      .subscribe({
        next: (response) => {
          this.typeContratsData.set(response.content);
        },
        error: (err) => {
          console.error('Erreur lors du chargement des types de contrat:', err);
        },
      });
  }

  loadingContrat() {
    this.loadingIndicator = true;
    this.gestionContratService.getContratsByAgent(this.agentId).subscribe({
      next: (response : any) => {
        this.datasource = this.sortData(response);
        this.loadingIndicator = false;
      },
      error: (err : any) => {
        console.error('Erreur lors du chargement des contrats:', err);
        // Alertes.errorPopPup('Erreur', 'Impossible de charger les contrats');
        this.loadingIndicator = false;
      },
    });
  }

  openBasicModal(content: TemplateRef<any>, contrat?: Contrat) {
    if (contrat) {
      this.contratToUpdate = { ...contrat };
      this.modalRef = this.modalService.open(content, { size: 'lg' });
    } else {
      this.contrat = {
        typeContratId: 0,
        description: '',
        dateDebut: new Date().toISOString().split('T')[0],
        dateFin: '',
        isActive: true,
        agentId: this.agentId,
      };
      this.modalRef = this.modalService.open(content, { size: 'lg' });
    }
  }

  saveContrat() {
    const contratToSend: Contrat = {
      ...this.contrat,
      typeContratId: Number(this.contrat.typeContratId),
      agentId: this.agentId,
      dateDebut: this.contrat.dateDebut.split('T')[0],
      dateFin: this.contrat.dateFin ? this.contrat.dateFin.split('T')[0] : undefined,
    };
    this.gestionContratService.createContrat(this.agentId, contratToSend).subscribe({
      next: (res : any) => {
        Alertes.alerteAddSuccess('Contrat enregistré avec succès');
        this.modalRef.close();
        this.loadingContrat();
      },
      error: (err : any) => {
        console.error('Erreur lors de la création:', err);
        Alertes.errorPopPup('Erreur', 'Impossible de créer le contrat');
      },
    });
  }

  updateContrat() {
    const contratToSend: Contrat = {
      ...this.contratToUpdate,
      typeContratId: Number(this.contratToUpdate.typeContratId),
      agentId: this.agentId,
      dateDebut: this.contratToUpdate.dateDebut.split('T')[0],
      dateFin: this.contratToUpdate.dateFin
        ? this.contratToUpdate.dateFin.split('T')[0]
        : undefined,
    };
    this.gestionContratService
      .updateContrat(this.agentId, contratToSend.id!, contratToSend)
      .subscribe({
        next: (res : any) => {
          Alertes.alerteAddSuccess('Contrat mis à jour avec succès');
          this.modalRef.close();
          this.loadingContrat();
        },
        error: (err : any) => {
          console.error('Erreur lors de la mise à jour:', err);
          Alertes.errorPopPup('Erreur', 'Impossible de mettre à jour le contrat');
        },
      });
  }

  toggleContratStatus(contrat: Contrat) {
    const newStatus = !contrat.isActive;
    this.gestionContratService
      .updateStatusContrat(this.agentId, contrat.id!, newStatus)
      .subscribe({
        next: (res : any) => {
          contrat.isActive = newStatus;
          Alertes.alerteAddSuccess(`Contrat marqué comme ${newStatus ? 'actif' : 'inactif'}`);
          this.loadingContrat();
        },
        error: (err : any) => {
          console.error('Erreur lors de la mise à jour du statut:', err);
          Alertes.errorPopPup('Erreur', 'Impossible de mettre à jour le statut');
        },
      });
  }

  deleteContrat(contratId: number) {
    Alertes.confirmAction(
      'Êtes-vous sûr de vouloir supprimer ce contrat ?',
      'Cette action est irréversible',
      () => {
        this.gestionContratService.deleteContrat(this.agentId, contratId).subscribe({
          next: (res : any) => {
            Alertes.alerteAddSuccess('Contrat supprimé avec succès');
            this.loadingContrat();
          },
          error: (err : any) => {
            console.error('Erreur lors de la suppression:', err);
            Alertes.errorPopPup('Erreur', 'Impossible de supprimer le contrat');
          },
        });
      }
    );
  }

  searchContrats() {
    this.gestionContratService.searchContrats(this.agentId, this.searchCriteria).subscribe({
      next: (response : any) => {
        this.datasource = response;
        this.modalRef.close();
      },
      error: (err : any) => {
        console.error('Erreur lors de la recherche:', err);
        Alertes.errorPopPup('Erreur', 'Impossible de rechercher les contrats');
      },
    });
  }
}