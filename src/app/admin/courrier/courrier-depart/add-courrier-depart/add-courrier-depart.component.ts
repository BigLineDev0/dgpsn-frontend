import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { CourrierService } from "@/app/services/courrier/courrier.service";
import { QuillModule } from "ngx-quill";
import { Alertes } from "@/app/util/alerte";
import { LabelService } from "@/app/services/labelService/label-service";

@Component({
  selector: "app-add-courrier-depart",
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    QuillModule,
  ],
  templateUrl: "./add-courrier-depart.component.html",
  styleUrl: "./add-courrier-depart.component.scss",
  providers: [NgbActiveModal],
})
export class AddCourrierDepartComponent implements OnInit {
  form!: FormGroup;

  // Données dynamiques depuis l'API
  natureId: any[] = [];
  statutId: any[] = [];
  modeEnvoiId: any[] = [];
  urgenceId: any[] = [];

  @Input() isSearch: boolean = false;
  @Input() courrierToUpdate: any = null;
  @Input() typeCourrier: string = "DEPART";

  @Output() submit = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courrierService: CourrierService,
    public activeModal: NgbActiveModal,
    private labelService: LabelService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadFields();
    this.getNatureCourrier();
    this.getStatutCourrier();
    this.getUrgenceCourrier();
    this.getModeCourrier();
  }

  initForm() {
    const currentDate = new Date().toISOString().slice(0, 10);

    this.form = this.fb.group({
      reference: [
        this.courrierToUpdate?.reference ||
          `REF-${Math.floor(1000 + Math.random() * 9000)}`,
        Validators.required,
      ],
      destinataire: ["", Validators.required],
      objet: ["", Validators.required],
      description: [""],
      type: ["DEPART", Validators.required],
      natureId: [null, Validators.required],
      urgenceId: [null, Validators.required],
      statutId: [null, Validators.required],
      modeEnvoiId: [null, Validators.required],
      dateCourrier: [currentDate, Validators.required],
      dateReception: [currentDate],
      dateEnvoi: [currentDate],
      dateTraitement: [currentDate],
      numeroEnregistrement: [""],
      numeroSuivi: [""],
      instructions: [""],
      notes: [""],
    });

    if (!this.courrierToUpdate) {
      this.generateReference();
    }
  }

  loadFields() {
    if (this.courrierToUpdate) {
      console.log("Chargement des données du courrier:", this.courrierToUpdate);

      this.form.patchValue({
        reference: this.courrierToUpdate.reference || "",
        destinataire: this.courrierToUpdate.correspondant || "",
        objet: this.courrierToUpdate.objet || "",
        description: this.courrierToUpdate.description || "",
        type: "DEPART",
        natureId:
          this.courrierToUpdate.nature?.id ||
          this.courrierToUpdate.natureId ||
          null,
        urgenceId:
          this.courrierToUpdate.urgence?.id ||
          this.courrierToUpdate.urgenceId ||
          null,
        statutId:
          this.courrierToUpdate.statut?.id ||
          this.courrierToUpdate.statutId ||
          null,
        modeEnvoiId:
          this.courrierToUpdate.modeEnvoi?.id ||
          this.courrierToUpdate.modeEnvoiId ||
          null,
        dateCourrier: this.formatDate(this.courrierToUpdate.dateCourrier) || "",
        dateReception:
          this.formatDate(this.courrierToUpdate.dateReception) || "",
        dateEnvoi: this.formatDate(this.courrierToUpdate.dateEnvoi) || "",
        dateTraitement:
          this.formatDate(this.courrierToUpdate.dateTraitement) || "",
        numeroEnregistrement: this.courrierToUpdate.numeroEnregistrement || "",
        numeroSuivi: this.courrierToUpdate.numeroSuivi || "",
        instructions: this.courrierToUpdate.instructions || "",
        notes: this.courrierToUpdate.notes || "",
      });
    }
  }

  formatDate(date: any): string {
    if (!date) return "";

    if (typeof date === "string" && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return date;
    }

    const d = new Date(date);
    if (isNaN(d.getTime())) {
      console.error("Date invalide:", date);
      return "";
    }

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  save() {
    if (this.form.valid) {
      const formValue = this.form.value;

      // Récupérer les objets complets à partir des IDs
      const selectedNature = this.natureId?.find(
        (n: any) => n.id === formValue.natureId
      );
      const selectedUrgence = this.urgenceId?.find(
        (u: any) => u.id === formValue.urgenceId
      );
      const selectedStatut = this.statutId?.find(
        (s: any) => s.id === formValue.statutId
      );
      const selectedModeEnvoi = this.modeEnvoiId?.find(
        (m: any) => m.id === formValue.modeEnvoiId
      );

      const payload = {
        reference: formValue.reference,
        correspondant: formValue.destinataire,
        objet: formValue.objet,
        description: formValue.description,
        type: "DEPART",
        dateCourrier: formValue.dateCourrier
          ? new Date(formValue.dateCourrier).toISOString()
          : null,
        dateReception: formValue.dateReception
          ? new Date(formValue.dateReception).toISOString()
          : null,
        dateEnvoi: formValue.dateEnvoi
          ? new Date(formValue.dateEnvoi).toISOString()
          : null,
        dateTraitement: formValue.dateTraitement
          ? new Date(formValue.dateTraitement).toISOString()
          : null,
        numeroEnregistrement: formValue.numeroEnregistrement,
        numeroSuivi: formValue.numeroSuivi,
        nature: selectedNature, // Objet complet
        urgence: selectedUrgence, // Objet complet
        statut: selectedStatut, // Objet complet
        modeEnvoi: selectedModeEnvoi, // Objet complet
        instructions: formValue.instructions,
        notes: formValue.notes,
      };

      console.log("Payload COMPLET départ à envoyer:", payload);

      if (this.courrierToUpdate) {
        this.courrierService
          .updateCourrier(this.courrierToUpdate.id, payload)
          .subscribe({
            next: (response) => {
              Alertes.alerteAddSuccess("Courrier départ modifié avec succès");
              this.activeModal.close(true);
            },
            error: (error) => {
              console.error("Erreur détaillée modification:", error);
              Alertes.alerteAddDanger(error.message);
            },
          });
      } else {
        this.courrierService.createCourrier(payload).subscribe({
          next: (response: any) => {
            Alertes.alerteAddSuccess("Courrier départ créé avec succès");
            this.submit.emit(true);
            this.activeModal.close(true);
          },
          error: (error: any) => {
            console.error("Erreur détaillée création:", error);
            this.submit.emit(false);
            Alertes.alerteAddDanger(error.message);
          },
        });
      }
    } else {
      Alertes.alerteAddDanger("Veuillez remplir tous les champs obligatoires");
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  closeDialog(): void {
    this.activeModal.dismiss("cancel");
  }

  generateReference(): void {
    const ref = `REF-${Math.floor(1000 + Math.random() * 9000)}`;
    this.form.patchValue({ reference: ref });
  }

  copyDepartDate(): void {
    const dateCourrier = this.form.get("dateCourrier")?.value;
    if (dateCourrier) {
      this.form.patchValue({
        dateEnvoi: dateCourrier,
      });
    }
  }

  marquerCommeEnvoye() {
    this.form.patchValue({
      statutId: this.getStatutIdByName("ENVOYE"),
      dateEnvoi: new Date().toISOString().slice(0, 10),
    });
  }

  // Méthode utilitaire pour trouver l'ID du statut "ENVOYE"
  private getStatutIdByName(statutName: string): number | null {
    const statut = this.statutId.find(
      (s: any) =>
        s.libelle?.toLowerCase().includes(statutName.toLowerCase()) ||
        s.code?.toLowerCase().includes(statutName.toLowerCase())
    );
    return statut?.id || null;
  }

  getNatureCourrier() {
    const req = {
      page: 0,
      size: 10000,
      referentielType: "NATURE_COURRIER",
    };
    this.labelService.readLabels(req).subscribe({
      next: (value) => {
        this.natureId = value.content;
        // Si c'est une création et qu'aucune nature n'est sélectionnée, sélectionner la première
        if (
          !this.courrierToUpdate &&
          this.natureId.length > 0 &&
          !this.form.get("natureId")?.value
        ) {
          this.form.patchValue({ natureId: this.natureId[0].id });
        }
      },
      error: (error) => {
        console.error("Erreur lors du chargement des natures:", error);
      },
    });
  }

  getStatutCourrier() {
    const req = {
      page: 0,
      size: 10000,
      referentielType: "STATUT_COURRIER",
    };
    this.labelService.readLabels(req).subscribe({
      next: (value) => {
        this.statutId = value.content;
        // Si c'est une création et qu'aucun statut n'est sélectionné, sélectionner le premier
        if (
          !this.courrierToUpdate &&
          this.statutId.length > 0 &&
          !this.form.get("statutId")?.value
        ) {
          this.form.patchValue({ statutId: this.statutId[0].id });
        }
      },
      error: (error) => {
        console.error("Erreur lors du chargement des statuts:", error);
      },
    });
  }

  getUrgenceCourrier() {
    const req = {
      page: 0,
      size: 10000,
      referentielType: "URGENCE_COURRIER",
    };
    this.labelService.readLabels(req).subscribe({
      next: (value) => {
        this.urgenceId = value.content;
        // Si c'est une création et qu'aucune urgence n'est sélectionnée, sélectionner la première
        if (
          !this.courrierToUpdate &&
          this.urgenceId.length > 0 &&
          !this.form.get("urgenceId")?.value
        ) {
          this.form.patchValue({ urgenceId: this.urgenceId[0].id });
        }
      },
      error: (error) => {
        console.error("Erreur lors du chargement des urgences:", error);
      },
    });
  }

  getModeCourrier() {
    const req = {
      page: 0,
      size: 10000,
      referentielType: "MODE_ENVOIE_COURRIER",
    };
    this.labelService.readLabels(req).subscribe({
      next: (value) => {
        this.modeEnvoiId = value.content;
        // Si c'est une création et qu'aucun mode d'envoi n'est sélectionné, sélectionner le premier
        if (
          !this.courrierToUpdate &&
          this.modeEnvoiId.length > 0 &&
          !this.form.get("modeEnvoiId")?.value
        ) {
          this.form.patchValue({ modeEnvoiId: this.modeEnvoiId[0].id });
        }
      },
      error: (error) => {
        console.error("Erreur lors du chargement des modes d'envoi:", error);
      },
    });
  }
}
