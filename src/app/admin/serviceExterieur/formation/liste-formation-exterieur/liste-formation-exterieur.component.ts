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
import { FormFormationExterieurComponent } from '../form-formation-exterieur/form-formation-exterieur.component';
import { FormationExterieurService } from '@/app/services/formationExterieur/formation-exterieur.service';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import {AgentRoutingComponent} from "@/app/admin/agent/agent-routing/agent-routing.component";
import {Authority} from "@/app/util/Authority";

@Component({
  selector: 'app-liste-formation-exterieur',
  templateUrl: './liste-formation-exterieur.component.html',
  styleUrls: ['./liste-formation-exterieur.component.scss'],
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
    FormFormationExterieurComponent,
      AgentRoutingComponent,
      HasAnyAuthorityDirective
  ],
  
})
export class ListeFormationExterieurComponent {
  displayedColumns: string[] = [
    'titreFormation',
    'organismeFormateur',
    'lieu',
    'dateDebut',
    'dateFin',
    'dureeJours',
    'coutTotal',
    'nombreParticipants',
    'statut',
    'actions'
  ];

  datasource: any;
  agentId:any
  loadingIndicator = false;
  curentRoute: any;
  formationToUpdate: any;
  modalRef!: NgbModalRef;
  pageOptions: any = { page: 0, size: 20 };
  add = Authority.ADD_FORMATION_EXTERIEUR;
  updated = Authority.EDIT_FORMATION_EXTERIEUR;
  deleted = Authority.DELETE_FORMATION_EXTERIEUR;
  read = Authority.READ_FORMATION_EXTERIEUR;

  @Input() projet: any;

  constructor(
    private formationService: FormationExterieurService,
    private modalService: NgbModal,
    private router :Router
  ) {}

  ngOnInit(): void {
    this.agentId = localStorage.getItem("idAgent")
    console.log("text",this.agentId)
    this.getAllFormations();
    this.curentRoute = this.router.url
  }



  getAllFormations() {
    this.loadingIndicator = true;
    let req = this.pageOptions;

    if (this.router.url === "/admin/acces/agent/formation"){
      req.agentId = this.agentId

    }
    console.log("test", req)
    this.formationService.readFormations(req).subscribe({
      next: (response) => {
        console.log('✅ Réponse reçue:', response);
        // Vérifie si la réponse contient un tableau
        const formations = Array.isArray(response.payload) ? response.payload : [response.payload];
        this.datasource = {
          content: formations.map((f: any) => ({
            ...f,
            dateDebut: f.dateDebut ? new Date(f.dateDebut) : null,
            dateFin: f.dateFin ? new Date(f.dateFin) : null,
            statut: f.statut?.description || f.statut,
            devise: f.devise || '—'
          })),
          totalElements: formations.length,
          totalPages: 1,
          number: 0,
          size: formations.length
        };

        console.log('✅ Datasource finale:', this.datasource);
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des formations:', err);
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }


  openBasicModal(content: TemplateRef<any>, formation?: any) {
    this.formationToUpdate = formation;
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }
openUrl(id:any, url:any){
    localStorage.setItem("formationId",id)
 this.router.navigateByUrl(url)
}
  close(event: boolean) {
    if (event) {
      this.getAllFormations();
    }
  }

  doSearch(searchCriteria: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.pageOptions.titreFormation = searchCriteria.titreFormation;
    this.pageOptions.organismeFormateur = searchCriteria.organismeFormateur;
    this.pageOptions.dateDebut = searchCriteria.dateDebut;
    this.pageOptions.statut = searchCriteria.statut;
    this.getAllFormations();
  }

  deleteFormation(formationId: any) {
    Alertes.confirmAction(
        'Êtes-vous sûr de vouloir supprimer cette formation ?',
        '',
        () => {
          this.formationService.deleteFormationExterieur(formationId).subscribe({
            next: () => {
              Alertes.alerteAddSuccess('Suppression réussie');
            },
            error: (err) => {
              Alertes.alerteAddDanger(err.error?.message || 'Erreur lors de la suppression');
            },
            complete: () => {
              this.getAllFormations();
            }
          });
        }
    );
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllFormations();
  }
}