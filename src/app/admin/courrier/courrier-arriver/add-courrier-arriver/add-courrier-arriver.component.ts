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
  selector: "app-add-courrier-arriver",
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    QuillModule,
  ],
  templateUrl: "./add-courrier-arriver.component.html",
  styleUrl: "./add-courrier-arriver.component.scss",
  providers: [NgbActiveModal],
})
export class AddCourrierArriverComponent implements OnInit {
  form!: FormGroup;

  // Natures de courriers
  // naturesCourrier: any = [
  //   { id: 1, name: "OFFICIEL", description: "Courrier Officiel" },
  //   { id: 2, name: "PRIVE", description: "Courrier Privé" },
  //   { id: 3, name: "RECLAMATION", description: "Réclamation" },
  //   { id: 4, name: "DEMANDE", description: "Demande" },
  //   { id: 5, name: "AUTRES", description: "Autres" },
  // ];

  // Niveaux d'urgence
  // urgences: any = [
  //   { id: 1, name: "NORMALE", description: "Normale" },
  //   { id: 2, name: "IMPORTANT", description: "Important" },
  //   { id: 3, name: "URGENT", description: "Urgent" },
  // ];

  // Statuts
  // statuts: any = [
  //   { id: 1, name: "NON_TRAITE", description: "Non traité" },
  //   { id: 2, name: "EN_COURS", description: "En cours" },
  //   { id: 3, name: "TRAITE", description: "Traité" },
  // ];

  // Modes d'envoi
  // modesEnvoi: any = [
  //   { id: 1, name: "COURRIER", description: "Par Courrier" },
  //   { id: 2, name: "EMAIL", description: "Par Email" },
  //   { id: 3, name: "MAIN_PROPRE", description: "En Main Propre" },
  //   { id: 4, name: "FAX", description: "Par Fax" },
  // ];

  natureId: any;
  statutId: any;
  modeEnvoiId: any;
  urgenceId: any;
  @Input() isSearch: boolean = false;
  @Input() courrierToUpdate: any = null;
  @Input() typeCourrier: string = "ARRIVER";

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
      correspondant: ["", Validators.required],
      objet: ["", Validators.required],
      description: [""],
      type: ["ARRIVER", Validators.required], // CORRECTION: "ARRIVER"
      natureId: [, Validators.required],
      urgenceId: [, Validators.required],
      statutId: [, Validators.required],
      modeEnvoiId: [, Validators.required],
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

  // loadFields() {
  //   if (this.courrierToUpdate) {
  //     console.log("Chargement des données du courrier:", this.courrierToUpdate);

  //     this.form.patchValue({
  //       reference: this.courrierToUpdate.reference || "",
  //       correspondant: this.courrierToUpdate.correspondant || "",
  //       objet: this.courrierToUpdate.objet || "",
  //       description: this.courrierToUpdate.description || "",
  //       type: "ARRIVER", // CORRECTION: "ARRIVER"
  //       natureId: this.courrierToUpdate.natureId || 1,
  //       urgenceId: this.courrierToUpdate.urgenceId || 1,
  //       statutId: this.courrierToUpdate.statutId || 1,
  //       modeEnvoiId: this.courrierToUpdate.modeEnvoiId || 1,
  //       dateCourrier: this.formatDate(this.courrierToUpdate.dateCourrier) || "",
  //       dateReception:
  //         this.formatDate(this.courrierToUpdate.dateReception) || "",
  //       dateEnvoi: this.formatDate(this.courrierToUpdate.dateEnvoi) || "",
  //       dateTraitement:
  //         this.formatDate(this.courrierToUpdate.dateTraitement) || "",
  //       numeroEnregistrement: this.courrierToUpdate.numeroEnregistrement || "",
  //       numeroSuivi: this.courrierToUpdate.numeroSuivi || "",
  //       instructions: this.courrierToUpdate.instructions || "",
  //       notes: this.courrierToUpdate.notes || "",
  //     });
  //   }
  // }
  loadFields() {
  if (this.courrierToUpdate) {
    console.log("Chargement des données du courrier:", this.courrierToUpdate);

    this.form.patchValue({
      reference: this.courrierToUpdate.reference || "",
      correspondant: this.courrierToUpdate.correspondant || "",
      objet: this.courrierToUpdate.objet || "",
      description: this.courrierToUpdate.description || "",
      type: "ARRIVER",
      // Chargez l'ID depuis l'objet nature s'il existe, sinon depuis natureId
      natureId: this.courrierToUpdate.nature?.id || this.courrierToUpdate.natureId || null,
      urgenceId: this.courrierToUpdate.urgence?.id || this.courrierToUpdate.urgenceId || null,
      statutId: this.courrierToUpdate.statut?.id || this.courrierToUpdate.statutId || null,
      modeEnvoiId: this.courrierToUpdate.modeEnvoi?.id || this.courrierToUpdate.modeEnvoiId || null,
      dateCourrier: this.formatDate(this.courrierToUpdate.dateCourrier) || "",
      dateReception: this.formatDate(this.courrierToUpdate.dateReception) || "",
      dateEnvoi: this.formatDate(this.courrierToUpdate.dateEnvoi) || "",
      dateTraitement: this.formatDate(this.courrierToUpdate.dateTraitement) || "",
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

  // save() {
  //   if (this.form.valid) {
  //     const formValue = this.form.value;

  //     const payload = {
  //       reference: formValue.reference,
  //       correspondant: formValue.correspondant,
  //       objet: formValue.objet,
  //       description: formValue.description,
  //       type: "ARRIVER", // CORRECTION: "ARRIVER" au lieu de "ARRIVER"
  //       dateCourrier: formValue.dateCourrier
  //         ? new Date(formValue.dateCourrier).toISOString()
  //         : null,
  //       dateReception: formValue.dateReception
  //         ? new Date(formValue.dateReception).toISOString()
  //         : null,
  //       dateEnvoi: formValue.dateEnvoi
  //         ? new Date(formValue.dateEnvoi).toISOString()
  //         : null,
  //       dateTraitement: formValue.dateTraitement
  //         ? new Date(formValue.dateTraitement).toISOString()
  //         : null,
  //       numeroEnregistrement: formValue.numeroEnregistrement,
  //       numeroSuivi: formValue.numeroSuivi,
  //       natureId: formValue.natureId,
  //       urgenceId: formValue.urgenceId,
  //       statutId: formValue.statutId,
  //       modeEnvoiId: formValue.modeEnvoiId,
  //       instructions: formValue.instructions,
  //       notes: formValue.notes,
  //     };

  //     console.log("Payload à envoyer:", payload);

  //     if (this.courrierToUpdate) {
  //       this.courrierService
  //         .updateCourrier(this.courrierToUpdate.id, payload)
  //         .subscribe({
  //           next: (response) => {
  //             // console.log("Courrier modifié avec succès:", response);
  //             // alert("Courrier modifié avec succès");
  //             Alertes.alerteAddSuccess("Courrier arriver modifié avec succès");
  //              this.submit.emit(true);
  //             this.activeModal.close(true);
  //           },
  //           error: (error) => {
  //             // console.error("Erreur lors de la modification:", error);
  //             // alert(
  //             //   "Erreur lors de la modification du courrier: " +
  //             //     (error.message || "Erreur inconnue")
  //             // );
  //             Alertes.alerteAddDanger(error.message);
  //              this.submit.emit(false);
  //           },
  //         });
  //     } else {
  //       this.courrierService.createCourrier(payload).subscribe({
  //         next: (response) => {
  //           // console.log("Courrier créé avec succès:", response);
  //           // alert("Courrier créé avec succès");
  //           Alertes.alerteAddSuccess('Courrier arriver créé avec succès');
  //            this.submit.emit(true);
  //           this.activeModal.close(true);
  //         },
  //         error: (error) => {
  //           // console.error("Erreur lors de la création:", error);
  //           // alert(
  //           //   "Erreur lors de l'ajout du courrier: " +
  //           //     (error.message || "Erreur inconnue")
  //           // );
  //           Alertes.alerteAddDanger(error.message);
  //           this.activeModal.close(false);
  //         },
  //       });
  //     }
  //   } else {
  //     Alertes.alerteAddDanger('Veuillez remplir tous les champs obligatoires');
  //     this.markFormGroupTouched();
  //   }
  // }
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
        correspondant: formValue.correspondant,
        objet: formValue.objet,
        description: formValue.description,
        type: "ARRIVER",
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

      console.log("Payload COMPLET à envoyer:", payload);

      if (this.courrierToUpdate) {
        this.courrierService
          .updateCourrier(this.courrierToUpdate.id, payload)
          .subscribe({
            next: (response) => {
              Alertes.alerteAddSuccess("Courrier arriver modifié avec succès");
              this.submit.emit(true);
              this.activeModal.close(true);
            },
            error: (error) => {
              console.error("Erreur détaillée:", error);
              Alertes.alerteAddDanger(error.message);
              this.submit.emit(false);
            },
          });
      } else {
        this.courrierService.createCourrier(payload).subscribe({
          next: (response) => {
            Alertes.alerteAddSuccess("Courrier arriver créé avec succès");
            this.submit.emit(true);
            this.activeModal.close(true);
          },
          error: (error) => {
            console.error("Erreur détaillée création:", error);
            Alertes.alerteAddDanger(error.message);
            this.activeModal.close(false);
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

  copyArrivalDate(): void {
    const dateCourrier = this.form.get("dateCourrier")?.value;
    if (dateCourrier) {
      this.form.patchValue({
        dateReception: dateCourrier,
      });
    }
  }

  marquerCommeRecu() {
    this.form.patchValue({
      statutId: 3,
      dateReception: new Date().toISOString().slice(0, 10),
    });
  }

  getNatureCourrier() {
    const req = {
      page: 0,
      size: 10000,
      referentielType: "NATURE_COURRIER",
    };
    this.labelService.readLabels(req).subscribe({
      next: (value) => {
        // console.log("Hello world",value);

        this.natureId = value.content;
      },
      error: (value) => {},
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
        // console.log("Hello world",value);

        this.statutId = value.content;
      },
      error: (value) => {},
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
        // console.log("Hello world",value);

        this.urgenceId = value.content;
      },
      error: (value) => {},
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
        // console.log("Hello world",value);

        this.modeEnvoiId = value.content;
      },
      error: (value) => {},
    });
  }
}
