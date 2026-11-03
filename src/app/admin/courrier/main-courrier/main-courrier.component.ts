import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { MatIconModule } from "@angular/material/icon";
import { ListCourrierArriverComponent } from "../courrier-arriver/list-courrier-arriver/list-courrier-arriver.component";
import { ListCourrierDepartComponent } from "../courrier-depart/list-courrier-depart/list-courrier-depart.component";
import { ArchiveCourrierComponent } from "../archive-courrier/archive-courrier/archive-courrier.component";
import { CourrierService } from "@/app/services/courrier/courrier.service";
import { MaterialModule } from "@/app/util/material/material.module";
import { Alertes } from "@/app/util/alerte";

@Component({
  selector: "app-main-courrier",
  standalone: true,
  imports: [
    CommonModule,
    NgbNavModule,
    MatIconModule,
    MaterialModule,
    ListCourrierArriverComponent,
    ListCourrierDepartComponent,
    ArchiveCourrierComponent,
  ],
  templateUrl: "./main-courrier.component.html",
  styleUrl: "./main-courrier.component.scss",
})
export class MainCourrierComponent implements OnInit {
  isCongeAgentRoute: boolean = false;
  active: number = 1;

  // Tous les courriers depuis l'API
  tousLesCourriers: any[] = [];

  // Données filtrées
  courriersActifs: any[] = [];
  courriersDepartActifs: any[] = [];
  courriersArchives: any[] = [];

  constructor(
    private router: Router,
    private courrierService: CourrierService
  ) {}

  ngOnInit(): void {
    this.isCongeAgentRoute = this.router.url === "/liste-agents/suivie/conge";
    this.loadAllCourriers();
  }
  loadAllCourriers(): void {
    // Charger les courriers non archivés
    this.courrierService.getCourriersNonArchives().subscribe({
      next: (courriersNonArchives) => {
        // Charger les courriers archivés
        this.courrierService.getCourriersArchives().subscribe({
          next: (courriersArchives) => {
            // Combiner les deux listes
            this.tousLesCourriers = [
              ...(Array.isArray(courriersNonArchives)
                ? courriersNonArchives
                : []),
              ...(Array.isArray(courriersArchives) ? courriersArchives : []),
            ];
            this.filterCourriers();
          },
          error: (error) => {
            console.error("Erreur lors du chargement des archives:", error);
            this.tousLesCourriers = Array.isArray(courriersNonArchives)
              ? courriersNonArchives
              : [];
            this.filterCourriers();
          },
        });
      },
      error: (error) => {
        console.error(
          "Erreur lors du chargement des courriers non archivés:",
          error
        );
        // Fallback: charger tous les courriers
        this.courrierService.getAllCourriers().subscribe({
          next: (courriers) => {
            this.tousLesCourriers = Array.isArray(courriers) ? courriers : [];
            this.filterCourriers();
          },
          error: (error) => {
            console.error(
              "Erreur lors du chargement de tous les courriers:",
              error
            );
            this.loadDonneesSimulees();
          },
        });
      },
    });
  }


  // Filtrer les courriers par type
  filterCourriers(): void {
    if (!Array.isArray(this.tousLesCourriers)) {
      console.error(
        "tousLesCourriers n'est pas un tableau:",
        this.tousLesCourriers
      );
      this.tousLesCourriers = [];
    }

    // Courriers arrivés actifs (type ARRIVER et non archivés)
    this.courriersActifs = this.tousLesCourriers.filter(
      (courrier) =>
        courrier.type?.name === "ARRIVER" && courrier.archive !== true // ← CHANGEMENT ICI
    );

    // Courriers départ actifs (type DEPART et non archivés)
    this.courriersDepartActifs = this.tousLesCourriers.filter(
      (courrier) =>
        courrier.type?.name === "DEPART" && courrier.archive !== true // ← CHANGEMENT ICI
    );

    // Archives (archive = true)
    this.courriersArchives = this.tousLesCourriers.filter(
      (courrier) => courrier.archive === true // ← CHANGEMENT ICI
    );

    // console.log("Courriers arrivés actifs:", this.courriersActifs);
    // console.log("Courriers départ actifs:", this.courriersDepartActifs);
    // console.log("Archives:", this.courriersArchives);
  }

  // Simulation d'archivage (si l'API ne le supporte pas)
  private simulerArchivage(courrier: any) {
    const courrierArchive = {
      ...courrier,
      statut: "ARCHIVE",
      dateArchivage: new Date(),
      archivePar: "Utilisateur Actuel",
    };

    this.tousLesCourriers = this.tousLesCourriers.map((c) =>
      c.id === courrier.id ? courrierArchive : c
    );
    this.filterCourriers();
    Alertes.alerteAddSuccess("Courrier archivé avec succès");
  }
  // Simulation de désarchivage
  private simulerDesarchivage(courrier: any) {
    const courrierDesarchive = {
      ...courrier,
      statut: "ACTIF",
      dateArchivage: null,
      archivePar: null,
    };

    this.tousLesCourriers = this.tousLesCourriers.map((c) =>
      c.id === courrier.id ? courrierDesarchive : c
    );
    this.filterCourriers();
    Alertes.alerteAddSuccess("Courrier désarchivé avec succès");
  }

  // Rafraîchir les données
  refreshData(): void {
    this.loadAllCourriers();
  }

  activeMenuForAgentProfile(): boolean {
    const hideMenu = localStorage.getItem("hideSuiviMenu");
    return hideMenu === "true" ? false : true;
  }

  // Méthode de secours avec données simulées
  private loadDonneesSimulees(): void {
    // Données simulées de secours
    this.tousLesCourriers = [
      {
        id: 1,
        reference: "CRR-2025-001",
        expediteur: "Ministère de l'Intérieur",
        objet: "Demande de statistiques trimestrielles",
        dateArrivee: new Date("2025-01-15"),
        dateReception: new Date("2025-01-16"),
        typeCourrier: "OFFICIEL",
        type: { name: "ARRIVE", description: "Courrier Arrivé" },
        urgence: "NORMALE",
        description:
          "Courrier concernant la demande des statistiques du dernier trimestre",
        statutType: { name: "NON_TRAITE", description: "Non traité" },
      },
      {
        id: 2,
        reference: "CRD-2025-001",
        destinataire: "Ministère des Finances",
        objet: "Envoi du rapport annuel 2024",
        dateDepart: new Date("2025-01-10"),
        dateEnvoi: new Date("2025-01-11"),
        typeCourrier: "OFFICIEL",
        type: { name: "DEPART", description: "Courrier Départ" },
        urgence: "NORMALE",
        description: "Rapport annuel d'activités pour l'exercice 2024",
        statutType: { name: "ENVOYE", description: "Envoyé" },
      },
    ];
    this.filterCourriers();
  }

  archiverCourrier(courrier: any) {
    if (confirm(`Voulez-vous archiver le courrier "${courrier.reference}" ?`)) {
      this.courrierService.archiverCourrier(courrier.id).subscribe({
        next: (response) => {
          // console.log("Réponse archivage API:", response);
          // console.log("Archive après archivage:", response.archive); // ← Vérifiez ce champ

          // Recharger toutes les données depuis l'API après archivage
          this.loadAllCourriers();
          Alertes.alerteAddSuccess("Courrier archivé avec succès");
        },
        error: (error) => {
          console.error("Erreur lors de l'archivage:", error);
          Alertes.alerteAddDanger("Erreur lors de l'archivage du courrier");
        },
      });
    }
  }

  // Méthode pour archiver un courrier départ
  archiverCourrierDepart(courrier: any) {
    if (confirm(`Voulez-vous archiver le courrier "${courrier.reference}" ?`)) {
      this.courrierService.archiverCourrier(courrier.id).subscribe({
        next: (response) => {
          console.log("Réponse archivage API:", response);
          // Recharger toutes les données depuis l'API après archivage
          this.loadAllCourriers();
          Alertes.alerteAddSuccess("Courrier archivé avec succès");
        },
        error: (error) => {
          console.error("Erreur lors de l'archivage:", error);
          Alertes.alerteAddDanger("Erreur lors de l'archivage du courrier");
        },
      });
    }
  }

  // Méthode pour désarchiver un courrier
  desarchiverCourrier(courrier: any) {
    if (
      confirm(`Voulez-vous désarchiver le courrier "${courrier.reference}" ?`)
    ) {
      // console.log("Désarchivage du courrier:", courrier.id, courrier.reference);

      this.courrierService.desarchiverCourrier(courrier.id).subscribe({
        next: (response) => {
          // console.log("✅ Réponse désarchivage API:", response);
          // console.log("📊 Archive après désarchivage:", response.archive);

          // Recharger toutes les données depuis l'API après désarchivage
          this.loadAllCourriers();
          Alertes.alerteAddSuccess("Courrier désarchivé avec succès");
        },
        error: (error) => {
          // console.error("❌ Erreur lors du désarchivage:", error);
          // console.error("Détails erreur:", error.message, error.status);
          Alertes.alerteAddDanger(
            "Erreur lors du désarchivage du courrier: " + error.message
          );
        },
      });
    }
  }
}
