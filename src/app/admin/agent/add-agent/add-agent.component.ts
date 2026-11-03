import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
  OnInit,
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AgentService } from "src/app/services/agent/agent.service";
import { PaysService } from "src/app/services/pays/pays.service";
import { Alertes } from "src/app/util/alerte";
import { NgSelectModule } from "@ng-select/ng-select";
import { LabelService } from "@/app/services/labelService/label-service";
import { StructureService } from "@/app/services/structure/structure.service";
import { DirectionService } from "@/app/services/direction/direction.service";

@Component({
  selector: "app-add-agent",
  templateUrl: "./add-agent.component.html",
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    NgbModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    NgSelectModule,
    // PaysModule,
    MatSortModule,
    DragDropModule,
  ],
  standalone: true,
  styleUrls: ["./add-agent.component.scss"],
})
export class AddAgentComponent implements OnInit {
  form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() agentToUpdate: any;
  @Input() referentielType: any;
  @Input() isSearch: any;
  indicatorTypes: any;
  structures: any;
  fonctions: any;
  dircections: any;

  sexe = [
    { name: "MASCULIN", description: "Masculin" },
    { name: "FEMININ", description: "Feminin" },
  ];

  situationMatrimoniale = [
    { name: "CELIBATAIRE", description: "Célibataire" },
    { name: "MARIE", description: "Marié(e)" },
  ];

  file!: File;

  constructor(
    private agentService: AgentService,
    private modalService: NgbModal,
    private structureService: StructureService,
    private labelService: LabelService,
    private directionService: DirectionService
  ) {}

  ngOnInit(): void {
    this.getStructure();
    this.getFonction();
    this.getDirection();
    this.form = new FormGroup({
      matricule: new FormControl("", Validators.required),
      nom: new FormControl("", Validators.required),
      prenom: new FormControl("", Validators.required),
      adresse: new FormControl(""),
      email: new FormControl(""),
      telephone: new FormControl("", [
        Validators.minLength(7),
        Validators.maxLength(9),
      ]),
      structureId: new FormControl(null),
      fonctionId: new FormControl(null),
      dateNaissance: new FormControl(null, Validators.required),
      dateCreation: new FormControl(null),
      sexe: new FormControl(null, Validators.required),
      directionId: new FormControl(null, Validators.required),
      situationMatrimoniale: new FormControl(null, Validators.required),
    });

    this.loadFileds();
  }

  loadFileds() {
    if (this.agentToUpdate !== undefined) {
      this.form.get("matricule")?.setValue(this.agentToUpdate.matricule);
      this.form.get("nom")?.setValue(this.agentToUpdate.nom);
      this.form.get("prenom")?.setValue(this.agentToUpdate.prenom);
      this.form.get("adresse")?.setValue(this.agentToUpdate.adresse);
      this.form.get("email")?.setValue(this.agentToUpdate.email);
      this.form.get("telephone")?.setValue(this.agentToUpdate.telephone);
      
      // Gestion de la date de naissance
      if (this.agentToUpdate.dateNaissance) {
        const dateNaissance = new Date(this.agentToUpdate.dateNaissance);
        this.form.get("dateNaissance")?.setValue(dateNaissance.toISOString().split('T')[0]);
      }
      
      // Gestion de la date de création
      if (this.agentToUpdate.dateCreation) {
        const dateCreation = new Date(this.agentToUpdate.dateCreation);
        this.form.get("dateCreation")?.setValue(dateCreation.toISOString().split('T')[0]);
      }
      
      // Gestion du sexe
      if (this.agentToUpdate.sexe) {
        this.form.get("sexe")?.setValue(this.agentToUpdate.sexe.name);
      }
      
      // Gestion de la situation matrimoniale
      if (this.agentToUpdate.situationMatrimoniale) {
        this.form.get("situationMatrimoniale")?.setValue(this.agentToUpdate.situationMatrimoniale.name);
      }
      
      this.form.get("structureId")?.setValue(this.agentToUpdate?.structure?.id);
      this.form.get("fonctionId")?.setValue(this.agentToUpdate?.fonction?.id);
      this.form.get("directionId")?.setValue(this.agentToUpdate?.direction?.id);
    }
  }

  save() {
    if (this.agentToUpdate === undefined) {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
    if (!this.form.valid) {
      // Vérifiez si le champ nom est vide
      if (!this.form.get("matricule")?.value) {
        this.form.get("matricule")?.setErrors({ required: true });
      }
      if (!this.form.get("nom")?.value) {
        this.form.get("nom")?.setErrors({ required: true });
      }
      if (!this.form.get("prenom")?.value) {
        this.form.get("prenom")?.setErrors({ required: true });
      }
      if (!this.form.get("adresse")?.value) {
        this.form.get("adresse")?.setErrors({ required: true });
      }
      if (!this.form.get("email")?.value) {
        this.form.get("email")?.setErrors({ required: true });
      }
      if (!this.form.get("telephone")?.value) {
        this.form.get("telephone")?.setErrors({ required: true });
      }
      // dateCreation est maintenant optionnel
      if (!this.form.get("fonction")?.value) {
        this.form.get("fonction")?.setErrors({ required: true });
      }
      if (!this.form.get("structure")?.value) {
        this.form.get("structure")?.setErrors({ required: true });
      }
      // Affichez un message d'erreur approprié
      Alertes.alerteAddDanger("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    let agent = this.form.value;
    console.log(agent);
    this.agentService.createAgent(agent).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess("Enregistrement reussi");
        this.emitSubmit();
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.error.message);
      },
      complete: () => {
        this.close();
      },
    });
  }

  update() {
    let agent = this.form.value;
    this.agentService.updateAgent(this.agentToUpdate.id, agent).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess("Modification reussi");
        this.emitSubmit();
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.error.message);
      },
    });
  }

  close() {
    this.modalService.dismissAll();
  }

  getStructure() {
    this.structureService.readStructures().subscribe({
      next: (response) => {
        console.log("abel", response);
        this.structures = response.content;
      },
      error: (response) => {},
    });
  }

  getFonction() {
    let req = { referentielType: "FONCTION", page: 0, size: 3000000 };
    this.labelService.readLabels(req).subscribe({
      next: (response) => {
        console.log("abel", response);
        this.fonctions = response.content;
      },
      error: (response) => {},
    });
  }

  getDirection() {
    this.directionService.readDirections(null, 0, 100).subscribe({
      next: (response) => {
        console.log("directions", response);
        this.dircections = response.content;
      },
      error: (response) => {},
    });
  }

  doSearch() {
    this.search.emit(this.form.value);
  }

  emitSubmit() {
    this.submit.emit(true);
  }
}
