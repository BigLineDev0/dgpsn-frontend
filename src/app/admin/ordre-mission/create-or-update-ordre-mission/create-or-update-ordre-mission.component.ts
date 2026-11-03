import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AgentService } from "src/app/services/agent/agent.service";
import { OrdreMissionService } from "src/app/services/ordre-mission/ordre-mission.service";
import { Alertes } from "src/app/util/alerte";
import { Helper } from "src/app/util/helper";
import { ResponseApi } from "src/app/util/response.model";
import { LabelService } from "@/app/services/labelService/label-service";
import { AppAgentMatriculeComponent } from "@/app/admin/ordre-mission/app-agent-matricule/app-agent-matricule.component";
import { NgFor, NgIf } from "@angular/common";
import { NgOptionComponent, NgSelectComponent, NgSelectModule } from "@ng-select/ng-select";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-create-or-update-ordre-mission",
  templateUrl: "./create-or-update-ordre-mission.component.html",
  styleUrls: ["./create-or-update-ordre-mission.component.scss"],
  imports: [
    AppAgentMatriculeComponent,
    NgIf,
    NgFor,
    ReactiveFormsModule,
    NgSelectComponent,
    NgOptionComponent,
    NgSelectModule,
    MatIconModule
  ],
  standalone: true,
})
export class CreateOrUpdateOrdreMissionComponent {
  agents!: any[];
  selectedAgentName: any;
  form!: FormGroup;
  @Input() isSearch!: boolean;
  @Input() ordreMissionToUpdate: any;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  filteredagentIdss: string[] = [];
  isIn: boolean = true;
  isOut: boolean = false;
  datasource: any;
  priseCharge: any[] = [];
  frais: any[] = [];
  agentNames: any;
  moyenTranport: any;
  loadingAgents: boolean = false;
  loadingFrais: boolean = false;
  loadingPriseCharge: boolean = false;

  constructor(
    private readonly modalService: NgbModal,
    private readonly agentService: AgentService,
    private readonly ordreMissionService: OrdreMissionService,
    private readonly labelService: LabelService
  ) { }

  ngOnInit() {
    this.getAllPriseEnCharge();
    this.getAllFrais();
    this.getMoyenTransport();
    this.initForm();
    this.loadFields();
  }

  initForm() {
    this.form = new FormGroup({
      agentIds: new FormControl(null, Validators.required),
      ordreMission: new FormControl(null, Validators.required),
      groupe: new FormControl(null),
      objectMission: new FormControl(null, Validators.required),
      destination: new FormControl(null),
      itineraire: new FormControl(null),
      dateDepartOrdre: new FormControl(null, Validators.required),
      dateRetourOrdre: new FormControl(null, Validators.required),
      dateDepartMission: new FormControl(null),
      dateRetourMission: new FormControl(null),
      responsableMission: new FormControl(null, Validators.required),
      // priseEnChargeId: new FormControl(null, Validators.required),
      moyenTranportId: new FormControl(null),

      // FormArray pour structure et frais
      structureFraisLignes: new FormArray([this.createStructureFraisGroup()])
    });

    this.form.get("agentIds")?.valueChanges.subscribe((value) => {
      this.validateagentIds();
    });
  }

  // Créer un groupe pour structure et frais
  createStructureFraisGroup(): FormGroup {
    return new FormGroup({
      structure: new FormControl(null, Validators.required),
      fraisIds: new FormControl(null, Validators.required),
    });
  }

  // Getter pour accéder au FormArray
  get structureFraisLignes(): FormArray {
    return this.form.get('structureFraisLignes') as FormArray;
  }

  // Ajouter une nouvelle ligne structure/frais
  ajouterStructureFrais() {
    this.structureFraisLignes.push(this.createStructureFraisGroup());
  }

  // Supprimer une ligne structure/frais
  supprimerStructureFrais(index: number) {
    if (this.structureFraisLignes.length > 1) {
      this.structureFraisLignes.removeAt(index);
    } else {
      Alertes.alerteAddDanger("Vous devez avoir au moins une ligne structure/frais");
    }
  }


  getAllAgents() {
    this.loadingAgents = true;
    this.agentService.getAllAgents().subscribe({
      next: (value: ResponseApi) => {
        this.datasource = value;
        if (value.status == "OK") {
          this.agents = value.payload;
          this.loadingAgents = false;
          console.log("mes listes d'agents", this.agents);
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => { },
    });
  }

  getAllPriseEnCharge() {
    this.loadingPriseCharge = true;
    let req = {
      page: 0,
      size: 100000,
      sortBy: "libelle",
      ascending: true,
      referentielType: "PRISE_EN_CHARGE",
    };
    this.labelService.readLabels(req).subscribe({
      next: (reponse) => {
        if (reponse && reponse.content) {
          this.priseCharge = reponse.content;
          console.log("prise en charge", this.priseCharge);
        }
        this.loadingPriseCharge = false;
      },
      error: (erreur) => {
        console.error(
          "Erreur lors de la récupération de la prise en charge :",
          erreur
        );
        this.loadingPriseCharge = false;
        Alertes.alerteAddDanger(
          "Impossible de charger les données de prise en charge."
        );
      },
    });
  }

  getAllFrais() {
    this.loadingFrais = true;
    let req = {
      page: 0,
      size: 100000,
      sortBy: "libelle",
      ascending: true,
      referentielType: "FRAIS",
    };
    this.labelService.readLabels(req).subscribe({
      next: (reponse) => {
        if (reponse && reponse.content) {
          this.frais = reponse.content;
          console.log("frais", this.frais);
        }
        this.loadingFrais = false;
      }
    });
  }

  getMoyenTransport() {
    this.loadingFrais = true;
    let req = {
      page: 0,
      size: 100000,
      sortBy: "libelle",
      ascending: true,
      referentielType: "MOYEN_TRANSPORT",
    };
    this.labelService.readLabels(req).subscribe({
      next: (reponse) => {
        if (reponse && reponse.content) {
          this.moyenTranport = reponse.content;
        }
        this.loadingFrais = false;
      }
    });
  }

  filteragentIdss(event: any) {
    const input = event.target.value;
    if (!input) {
      this.filteredagentIdss = [];
      return;
    }
    this.filteredagentIdss = this.agents
      .filter((agent) => agent.agentIds.includes(input))
      .map((agent) => agent.agentIds);
  }

  selectagentIds(agentIds: string) {
    this.form.get("agentIds")?.setValue(agentIds);
    this.filteredagentIdss = [];
    this.validateagentIds();
  }

  reset() {
    this.validateagentIds();
  }

  validateagentIds() {
    const agent = this.agents?.find(
      (agent) => agent.agentIds === this.form.value.agentIds
    );
    if (agent) {
      console.log("agent:", agent);
      this.form.patchValue({
        firstName: agent.firstName,
        lastName: agent.lastName,
      });
    } else {
      this.form.patchValue({
        firstName: "",
        lastName: "",
      });
    }
  }

  save() {
    if (this.form.invalid) {
      Alertes.alerteAddDanger("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const formValue = this.form.value;
    if (this.ordreMissionToUpdate === undefined) {
      // CRÉATION : Extraire les structures et fraisId de TOUTES les lignes
      const structures: string[] = [];
      const fraisIds: number[] = [];
      this.structureFraisLignes.controls.forEach((ligne) => {
        const ligneValue = ligne.value;
        structures.push(ligneValue.structure);
        fraisIds.push(ligneValue.fraisIds);
      });
      const ordreMission = {
        agentIds: formValue.agentIds,
        ordreMission: formValue.ordreMission,
        groupe: formValue.groupe,
        objectMission: formValue.objectMission,
        destination: formValue.destination,
        itineraire: formValue.itineraire,
        dateDepartOrdre: formValue.dateDepartOrdre,
        dateRetourOrdre: formValue.dateRetourOrdre,
        dateDepartMission: formValue.dateDepartMission,
        dateRetourMission: formValue.dateRetourMission,
        priseEnChargeId: formValue.priseEnChargeId,
        moyenTranportId: formValue.moyenTranportId,
        structures: structures,
        fraisIds: fraisIds,
      };

      this.create(ordreMission);
    } else {
      // UPDATE : mettre à jour avec TOUTES les lignes structure/frais
      const structures: string[] = [];
      const fraisIds: number[] = [];

      this.structureFraisLignes.controls.forEach((ligne) => {
        const ligneValue = ligne.value;
        structures.push(ligneValue.structure);
        fraisIds.push(ligneValue.fraisIds);
      });

      const form = {
        ...formValue,
        structures: structures,
        fraisIds: fraisIds
      };
      delete form.structureFraisLignes;
      this.update(this.ordreMissionToUpdate.id, form);
    }
  }

  create(form: any) {
    this.ordreMissionService.createOrdreMission(form).subscribe({
      next: (value) => {
        Alertes.alerteAddSuccess("Enregistrement réussi");
      },
      error: (error) => {
        console.log('error', error);
        Alertes.errorPopPup("Alerte :", error?.error?.message);
      },
      complete: () => {
        this.close();
      },
    });
  }

  loadFields() {
    if (this.ordreMissionToUpdate !== undefined) {
      // 1. Charger les agents
      const agentIds = this.ordreMissionToUpdate.agent.map((agent: any) => agent.id);
      this.form.get("agentIds")?.setValue(agentIds);

      // 2. Charger ordreMission et groupe
      this.form.get("ordreMission")?.setValue(this.ordreMissionToUpdate.ordreMission.name);
      this.form.get("groupe")?.setValue(this.ordreMissionToUpdate.groupe.name);

      // 3. Charger les champs simples
      this.form.get("objectMission")?.setValue(this.ordreMissionToUpdate.objectMission);
      this.form.get("destination")?.setValue(this.ordreMissionToUpdate.destination);
      this.form.get("itineraire")?.setValue(this.ordreMissionToUpdate.itineraire);

      // 4. Charger les dates principales
      this.form.get("dateDepartOrdre")?.setValue(Helper.editDate(this.ordreMissionToUpdate.dateDepartOrdre));
      this.form.get("dateRetourOrdre")?.setValue(Helper.editDate(this.ordreMissionToUpdate.dateRetourOrdre));

      // 5. Charger le responsable de mission
      this.form.get("responsableMission")?.setValue(this.ordreMissionToUpdate.responsableMission);

      // 6. Charger le moyen de transport (CORRECTION ICI)
      if (this.ordreMissionToUpdate.moyenTranport) {
        this.form.get("moyenTranportId")?.setValue(this.ordreMissionToUpdate.moyenTranport.id);
      }

      // 7. Vider le FormArray avant de le remplir
      while (this.structureFraisLignes.length > 0) {
        this.structureFraisLignes.removeAt(0);
      }

      // 8. Charger structures et frais (CORRECTION ICI)
      if (Array.isArray(this.ordreMissionToUpdate.structures) &&
        Array.isArray(this.ordreMissionToUpdate.frais)) {

        const maxLength = Math.max(
          this.ordreMissionToUpdate.structures.length,
          this.ordreMissionToUpdate.frais.length
        );

        for (let i = 0; i < maxLength; i++) {
          const group = this.createStructureFraisGroup();

          // Charger la structure
          if (this.ordreMissionToUpdate.structures[i]) {
            group.get("structure")?.setValue(
              this.ordreMissionToUpdate.structures[i].name ||
              this.ordreMissionToUpdate.structures[i]
            );
          }

          // Charger le frais (CORRECTION: utiliser fraisIds au lieu de frais)
          if (this.ordreMissionToUpdate.frais[i]) {
            group.get("fraisIds")?.setValue(this.ordreMissionToUpdate.frais[i].id);
          }

          this.structureFraisLignes.push(group);
        }
      } else {
        // Format ancien/différent : créer une seule ligne
        const premiereLigne = this.createStructureFraisGroup();

        if (this.ordreMissionToUpdate.structures) {
          premiereLigne.get("structure")?.setValue(
            this.ordreMissionToUpdate.structures.name ||
            this.ordreMissionToUpdate.structures
          );
        }

        if (this.ordreMissionToUpdate.frais) {
          premiereLigne.get("fraisIds")?.setValue(
            this.ordreMissionToUpdate.frais.id ||
            this.ordreMissionToUpdate.fraisIds
          );
        }

        this.structureFraisLignes.push(premiereLigne);
      }

      // 9. Charger les dates de mission pour EXTERIEUR
      if (this.ordreMissionToUpdate.ordreMission.name === "EXTERIEUR") {
        this.isOut = true;
        this.isIn = false;

        if (this.ordreMissionToUpdate.dateDepartMission) {
          this.form.get("dateDepartMission")?.setValue(
            Helper.editDate(this.ordreMissionToUpdate.dateDepartMission)
          );
        }

        if (this.ordreMissionToUpdate.dateRetourMission) {
          this.form.get("dateRetourMission")?.setValue(
            Helper.editDate(this.ordreMissionToUpdate.dateRetourMission)
          );
        }
      } else {
        this.isIn = true;
        this.isOut = false;
      }
    }
  }


  finishMultipleCreation(successCount: number, errorCount: number) {
    if (successCount > 0) {
      Alertes.alerteAddSuccess(`${successCount} ordre(s) de mission créé(s) avec succès`);
    }
    if (errorCount > 0) {
      Alertes.alerteAddDanger(`${errorCount} ordre(s) de mission en erreur`);
    }
    this.close();
  }



  close() {
    this.submit.emit(true);
  }

  update(id: any, form: any) {
    this.ordreMissionService.updateOrdreMission(id, form).subscribe({
      next: (value) => {
        Alertes.alerteAddSuccess("modification reussi");
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.message.code);
      },
      complete: () => {
        this.close();
      },
    });
  }

  doSearch() { }

  openBasicModal(content: TemplateRef<any>, fieldName: string) {
    const dialogRef = this.modalService.open(content, {
      size: "lg",
      backdrop: "static",
    });
    dialogRef.result
      .then((result) => {
        if (result) {
          console.log("Résultat du modal :", result);
          if (result.event === "save") {
            const agents = Array.isArray(result.data)
              ? result.data
              : [result.data];
            this.agents = agents;
            const selectedAgentIds = this.agents.map((agent: any) => agent.id);
            this.form.controls[fieldName]?.setValue(selectedAgentIds);
            this.selectedAgentName = this.agents
              .map(
                (agent: any) =>
                  `${agent.matricule} - ${agent.prenom} - ${agent.nom}`
              )
              .join(", ");
          }
        }
      })
      .catch((res) => {
        console.log("Valeur de res :", res);
      });
  }

  selectionChange(event: any) {
    console.log("en marche ", event);
    if (event === "INTERIEUR") {
      this.isIn = true;
      this.isOut = false;
    }
    if (event === "EXTERIEUR") {
      this.isOut = true;
      this.isIn = false;
    }
  }
}