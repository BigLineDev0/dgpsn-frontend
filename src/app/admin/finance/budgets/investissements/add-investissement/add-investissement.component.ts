// add-investissement.component.ts
import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  signal,
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";

import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AgentService } from "@/app/services/agent/agent.service";
import { StructureService } from "@/app/services/structure/structure.service";
import { DirectionService } from "@/app/services/direction/direction.service";
import { LabelService } from "@/app/services/labelService/label-service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Alertes } from "@/app/util/alerte";
import { NgOptionComponent } from "@ng-select/ng-select";
import { MockServiceVersion2, IRubrique } from "../../../data/version2/finance.params.service";
import { BudgetService } from "../../../data/version2/budget.service";
import { LigneBudgetaire } from "../../../data/version2/budget.model";


@Component({
  selector: "app-add-investissement",
  templateUrl: "./add-investissement.component.html",
  styleUrls: ["./add-investissement.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgOptionComponent,
  ],
})
export class AddInvestissementComponent implements OnInit {
  form!: FormGroup;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<boolean> = new EventEmitter();
  @Input() agentToUpdate: any;
  @Input() referentielType: any;
  @Input() isSearch: any;
  @Input() excludeRubriqueCodes: string[] = [];
  @Input() budgetCode: string = "";
  indicatorTypes: any;
  structures: any;
  fonctions: any;
  dircections: any;
  file!: File;

  rubriquesItems = signal<IRubrique[]>([]);

 
  constructor(
    private modalService: NgbModal,
    private structureService: StructureService,
    private labelService: LabelService,
    private directionService: DirectionService,
    private paramService: MockServiceVersion2,
    private budgetService: BudgetService
  ) {}

  ngOnInit(): void {
    // Charger les rubriques de classe 2 (Investissements : 21, 23, 24)
    const allRubriques2 = this.paramService.getRubriquesByClasseCode('2');
    const filtered = allRubriques2.filter(r => !this.excludeRubriqueCodes.includes(r.code));
    this.rubriquesItems.set(filtered);

    this.form = new FormGroup({
      libelle: new FormControl("", Validators.required),
      montant: new FormControl("", Validators.required),
      commentaire: new FormControl("")
    });
    this.loadFileds();
    
  }

  loadFileds() {
    if (this.agentToUpdate !== undefined) {
      this.form.get("libelle")?.setValue(this.agentToUpdate.libelle);
      this.form.get("montant")?.setValue(this.agentToUpdate.montant);
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
      if (!this.form.get("libelle")?.value) {
        this.form.get("libelle")?.setErrors({ required: true });
      }
      if (!this.form.get("montant")?.value) {
        this.form.get("montant")?.setErrors({ required: true });
      }
      Alertes.alerteAddDanger("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const selectedCode: string = this.form.get("libelle")?.value;
    const selected = this.rubriquesItems().find(r => r.code === selectedCode);
    if (!selected) {
      Alertes.alerteAddDanger("Rubrique invalide.");
      return;
    }
    const montantNum = Number(this.form.get("montant")?.value);
    const commentaire = this.form.get("commentaire")?.value;
    const newLigne: LigneBudgetaire = {
      id: `LIG-${selected.code}-${Date.now()}`,
      code: selected.code,
      libelle: selected.libelle,
      montant: isNaN(montantNum) ? 0 : montantNum,
      realisations: [],
      commentaire: commentaire || selected.commentaire,
    };
    console.log("newLigne investissement", newLigne);
    this.budgetService.addLigneToBudgetByCode(this.budgetCode, newLigne);
    Alertes.alerteAddSuccess("Ligne budgétaire investissement ajoutée");
    this.emitSubmit();
    this.close();
  }

  update() {
    // Facultatif: implémenter la mise à jour d'une ligne si nécessaire
    this.emitSubmit();
    this.close();
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
    let req = { referentielType: "FONCTION" };
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