import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  TemplateRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { NgbModal, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { DetailArchiveCourrierComponent } from "../detail-archive-courrier/detail-archive-courrier.component";

@Component({
  selector: "app-archive-courrier",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    NgbPaginationModule,
    DetailArchiveCourrierComponent,
  ],
  templateUrl: "./archive-courrier.component.html",
  styleUrls: ["./archive-courrier.component.scss"],
})
export class ArchiveCourrierComponent implements OnInit {
  @Input() courriersArchives: any[] = [];
  @Output() onDesarchiver = new EventEmitter<any>();
  @ViewChild("detailModal") detailModal!: TemplateRef<any>;
  courrierToUpdate: any;

  displayedColumns: string[] = [
    "reference",
    "expediteur",
    "objet",
    "dateArrivee",
    "dateArchivage",
    "archivePar",
    "actions",
  ];

  loadingIndicator: boolean = true;
  pageOptions: any = { page: 0, size: 20 };

  constructor(private snackBar: MatSnackBar, private modalService: NgbModal) {}

  ngOnInit() {
    // Simulation de chargement
    // setTimeout(() => {
    //   this.loadingIndicator = false;
    // }, 800);
    this.loadingIndicator = false;
  }

  // Méthode pour désarchiver un courrier
  // desarchiverCourrier(courrier: any) {
  //   if (
  //     confirm(
  //       `Voulez-vous désarchiver le courrier "${courrier.reference}" ?\n\nIl sera remis dans la liste des courriers actifs.`
  //     )
  //   ) {
  //     this.loadingIndicator = true;

  //     setTimeout(() => {
  //       // Émettre l'événement vers le parent
  //       this.onDesarchiver.emit(courrier);

  //       this.loadingIndicator = false;

  //       this.snackBar.open(
  //         `Courrier ${courrier.reference} désarchivé avec succès`,
  //         "Fermer",
  //         {
  //           duration: 4000,
  //           panelClass: ["snackbar-success"],
  //         }
  //       );
  //     }, 1000);
  //   }
  // }

  // Méthode pour ouvrir le modal
  openBasicModal(content: TemplateRef<any>, size?: any, courrier?: any) {
    this.courrierToUpdate = courrier;
    this.modalService
      .open(content, {
        size: size || "lg",
        backdrop: "static",
        centered: true,
      })
      .result.then(
        () => {
          console.log("Modal fermé");
        },
        () => {
          console.log("Modal dismiss");
        }
      );
  }

  // Méthode pour voir les détails
  voirDetails(courrier: any) {
    this.openBasicModal(this.detailModal, "lg", courrier);
  }

  // Méthode pour générer un accusé
  genererAccuse(courrier: any) {
    this.snackBar.open(
      `Génération d'accusé pour ${courrier.reference}`,
      "Fermer",
      {
        duration: 3000,
      }
    );

    // Simulation de génération PDF
    setTimeout(() => {
      const pdfContent = this.creerContenuAccuse(courrier);
      this.downloadPDF(pdfContent, `Accuse-${courrier.reference}.pdf`);
    }, 1500);
  }

  // Méthode utilitaire pour formater les dates
  private formatDate(date: any): string {
    if (!date) return "Non spécifié";
    return new Date(date).toLocaleDateString("fr-FR");
  }

  // Méthode pour créer le contenu de l'accusé (simulation)
  private creerContenuAccuse(courrier: any): string {
    return `
      ACCUSÉ DE RÉCEPTION - ARCHIVE
      ==============================
      
      Référence: ${courrier.reference}
      Expéditeur: ${courrier.expediteur}
      Objet: ${courrier.objet}
      Date d'arrivée: ${this.formatDate(courrier.dateArrivee)}
      Date d'archivage: ${this.formatDate(courrier.dateArchivage)}
      
      Cet accusé de réception a été généré à partir des archives.
      Document généré le ${new Date().toLocaleDateString("fr-FR")}
    `;
  }

  // Méthode pour télécharger le PDF (simulation)
  private downloadPDF(content: string, filename: string) {
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);

    this.snackBar.open("Accusé téléchargé avec succès", "Fermer", {
      duration: 3000,
      panelClass: ["snackbar-success"],
    });
  }

  paginate($event: any) {
    this.loadingIndicator = true;
    this.pageOptions.page = $event - 1;

    setTimeout(() => {
      this.loadingIndicator = false;
    }, 500);
  }

  // Méthode pour désarchiver un courrier
 // Dans archive-courrier.component.ts
desarchiverCourrier(courrier: any) {
  if (
    confirm(
      `Voulez-vous désarchiver le courrier "${courrier.reference}" ?\n\nIl sera remis dans la liste des courriers actifs.`
    )
  ) {
    this.loadingIndicator = true;
    
    console.log("📤 Émission événement désarchivage:", courrier);

    // Émettre l'événement vers le parent
    this.onDesarchiver.emit(courrier);

    setTimeout(() => {
      this.loadingIndicator = false;
      this.snackBar.open(
        `Courrier ${courrier.reference} désarchivé avec succès`,
        "Fermer",
        {
          duration: 4000,
          panelClass: ["snackbar-success"],
        }
      );
    }, 1000);
  }
}
}
