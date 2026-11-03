import { Component, OnInit, signal, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTooltipModule,
  NgbAlertModule,
  NgbPopoverModule,
} from '@ng-bootstrap/ng-bootstrap';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { Alertes } from '@/app/util/alerte';
import { AddRecrutementComponent } from "../add-recrutement/add-recrutement.component";
import { CaracteristiqueService } from '@/app/services/caracteristique/caracteristique.service';
import { RecrutementService } from '@/app/services/recrutement/recrutement.service';
import { ListDocumentComponent } from '../../document/list-document/list-document.component';
import {HasAnyAuthorityDirective} from "@views/has-any-authority/has-any-authority.module";
import {Authority} from "@/app/util/Authority";

const MOCK_RECRUTEMENT: any[] = [
    {
      id: 1,
      libelle: 'Recrutement Développeur Web',
      typeContrat: { description: 'CDI' },
      dateRecrutement : new Date('2025-01-15'),
      statut: { name: 'ACCEPTER', description: 'Accepté' }
    },
    {
      id: 2,
      libelle: 'Recrutement Data Analyst',
      typeContrat: { description: 'CDD' },
      dateRecrutement : new Date('2025-02-01'),
      statut: { name: 'TRAITEMENT_ENCOUR', description: 'En cours...' }
    },
    {
      id: 3,
      libelle: 'Recrutement Ingénieur DevOps',
      typeContrat: { description: 'Freelance' },
      dateRecrutement : new Date('2025-01-20'),
      statut: { name: 'REFUSER', description: 'Rejeté' }
    },
    {
      id: 4,
      libelle: 'Recrutement UX/UI Designer',
      typeContrat: { description: 'Stage' },
      dateRecrutement : new Date('2025-01-25'),
      statut: { name: 'FERMER', description: 'Fermé' }
    },
    {
      id: 5,
      libelle: 'Recrutement Chef de Projet IT',
      typeContrat: { description: 'CDI' },
      dateRecrutement : new Date('2025-02-10'),
      statut: { name: 'TRAITEMENT_ENCOUR', description: 'En cours...' }
    },
  ];
@Component({
  selector: 'app-liste-recrutement',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTooltipModule,
    NgbAlertModule,
    NgbPopoverModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    SpinnerComponent,
    AddRecrutementComponent,
    ListDocumentComponent,
    HasAnyAuthorityDirective
],
  templateUrl: './liste-recrutement.component.html',
  styleUrls: ['./liste-recrutement.component.scss']
})
export class ListeRecrutementComponent implements OnInit {

  recrutementId: any;
    dataSource: any = [];
      metadata: any;
  recrutementToUpdate: any;
  loadingIndicator = false;
  pageOptions: any = {page: 0, size: 20};
  isSearch: boolean = false;
  add = Authority.ADD_RECRUTEMENT;
  updated = Authority.EDIT_RECRUTEMENT;
  deleted = Authority.DELETE_RECRUTEMENT;
  read = Authority.READ_RECRUTEMENT;



  recrutements = signal<any>([]);
  displayedColumns: string[] = [
    'libelle',
    'typeContrat',
    'dateRecrutement ',
    'actions',
  ];

  constructor(
    private router: Router,
        private caracteristiqueService: CaracteristiqueService,
        private recrutementService: RecrutementService,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    this.getAllRecrutement();
    this.getAllCaracteristiques();
  }

   getAllCaracteristiques(): void {
    this.loadingIndicator = true;
    
    console.log('Chargement de toutes les caractéristiques avec params:', this.pageOptions);
    
    this.caracteristiqueService.readCaracteristique(this.pageOptions).subscribe({
      next: (response: any) => {
        console.log('Réponse API toutes les caractéristiques:', response?.payload);
        this.dataSource = response?.payload || [];
        this.metadata = response?.metadata || { totalElements: 0, totalPages: 0, number: 0 };
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement de toutes les caractéristiques:', err);
        // Alertes.errorPopPup('Erreur de chargement', 'Impossible de charger les caractéristiques');
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }

  // getAllRecrutement() {
  //   this.loadingIndicator = true;
  //  this.recrutements.set(MOCK_RECRUTEMENT);
  //   this.loadingIndicator = false;
  
  // }

   getAllRecrutement(): void {
    this.loadingIndicator = true;

    this.recrutementService.readRecrutements(this.pageOptions).subscribe({
      next: (response: any) => {
        console.log("Réponse API recrutements:", response);
        // Si ton backend renvoie un objet avec "payload"
        this.recrutements.set(response?.payload?.content || response?.payload || []);
        this.metadata = response?.metadata || {};
      },
      error: (error) => {
        console.error("Erreur lors du chargement des recrutements :", error);
        Alertes.errorPopPup('Erreur', 'Impossible de charger les recrutements');
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }

  openBasicModal(content: TemplateRef<any>, size?: any, recrutement?: any) {
    this.recrutementToUpdate = recrutement;
    this.recrutementId = recrutement?.id;
    this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {

    }).catch((res) => {
    });
  }

  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllRecrutement();
    }
  }


  colorBadgeStatut(statutName: any) {
    switch (statutName) {
      case 'ACCEPTER':
        return 'badge text-bg-success';
      case 'REFUSER':
        return 'badge text-bg-danger';
      case 'FERMER':
        return 'badge text-bg-warning';
      case 'TRAITEMENT_ENCOUR':
        return 'badge text-bg-secondary';
      default:
        return 'badge text-bg-secondary';
    }
  }

  updateStatus(recrutement: any, statutType: string) {
    Alertes.confirmAction(
      'Confirmation',
      `Voulez-vous vraiment changer le statut à "${statutType}" ?`,
      () => {
        this.loadingIndicator = true; // Activer le spinner
        this.recrutementService.updateStatut(recrutement.id, statutType).subscribe({
          next: (response) => {
            console.log("Statut mis à jour avec succès", response);
            Alertes.alerteUpdateSuccess(); // Afficher une alerte de succès
            this.getAllRecrutement(); // Recharger la liste pour afficher la modification
          },
          error: (error) => {
            console.error("Erreur lors de la mise à jour du statut:", error);
            Alertes.errorPopPup('Erreur', 'Impossible de mettre à jour le statut');
            this.loadingIndicator = false; // Désactiver le spinner en cas d'erreur
          },
          complete: () => {
            // Le rechargement est déjà fait dans next, donc on peut simplement arrêter le spinner
            // this.loadingIndicator = false; // getAllRecrutement gère déjà son propre spinner
          }
        });
      }
    );
  }

  

  // Dans ListeRecrutementComponent
delete(recrutementId: any) {
  Alertes.confirmAction(
    'Confirmation',
    'Voulez-vous vraiment supprimer ce recrutement ?',
    () => {
      this.loadingIndicator = true;
      this.recrutementService.deleteRecrutement(recrutementId).subscribe({
        next: (response) => {
          console.log("Recrutement supprimé avec succès", recrutementId);
          Alertes.alerteDeleteSuccess();
          this.getAllRecrutement(); // Recharger la liste
        },
        error: (error) => {
          console.error("Erreur lors de la suppression:", error);
          Alertes.errorPopPup('Erreur', 'Impossible de supprimer le recrutement');
          this.loadingIndicator = false;
        },
        complete: () => {
          this.loadingIndicator = false;
        }
      });
    }
  );
}

  // delete(sortieId: any) {
  //   console.log("Vous avez supprimer le recrutement",sortieId);
  // }
  
  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;
    this.getAllRecrutement();
    this.modalService.dismissAll();
  }

  paginate($event: any) {
    this.loadingIndicator = true;
    this.pageOptions.page = $event - 1;
    this.getAllRecrutement();
  }

  openUrl(recrutement:any,url:any) {
    if(recrutement?.id){
      localStorage.setItem('idRecrutement',recrutement?.id);
      localStorage.setItem('libelleRecrutement',recrutement?.libelle);
    }
    this.router.navigateByUrl(url)
  }

  goToRecrutement() {
    this.router.navigateByUrl('/public/candidature')
  }

    goToCandidature() {
    this.router.navigateByUrl('/public/candidature/details')
  }
}
