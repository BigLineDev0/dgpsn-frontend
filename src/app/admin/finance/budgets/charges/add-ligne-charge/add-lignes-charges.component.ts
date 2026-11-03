import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { LigneBudgetaireService } from '@/app/services/ligneBudgetaire/ligne-budgetaire.service';
import { Alertes } from '@/app/util/alerte';
import { CommonModule } from '@angular/common';
import { PlanService } from '@/app/services/plan-compte/plan.service';

@Component({
  selector: 'app-add-lignes-charges',
  templateUrl: './add-lignes-charges.component.html',
  styleUrls: ['./add-lignes-charges.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgbTooltipModule,
    MatIconModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AddLignesChargesComponent implements OnInit {
  @Input() isSearch: boolean = false;
  @Input() ligneToUpdate: any;
  @Input() typeLigneBugetaire: any;
  @Input() selectedClasseId!: number;
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  budgetId: any;
  form!: FormGroup;
  budgetDgpsnList: any[] = [];
  planComptableElementList: any[] = [];
  filteredRubriques: any[] = [];

  constructor(
    private fb: FormBuilder,
    private planService: PlanService,
    private financementService: LigneBudgetaireService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    console.log("ligneToUpdate", this.ligneToUpdate);
    this.budgetId = localStorage.getItem('budgetId');
    this.initForm();
    this.loadBudgetDgpsnList();
    if (!this.isSearch) {
      this.addLigne();
    }
    this.loadPlanComptableElements();
  }

  initForm() {
    this.form = this.fb.group({
      budgetDgpsnId: [''],
      lignes: this.fb.array([]),
      rubriqueId: [''],
      montant: [],
      primitif: [],
      modification: [],
      budgetModifie: [],
      commentaire: [''],
    });
  }

  get lignes(): FormArray {
    return this.form.get('lignes') as FormArray;
  }

  addLigne() {
    const ligneForm = this.fb.group({
      rubriqueId: [''],
      montant: [],
      primitif: [],
      modification: [],
      budgetModifie: [],
      commentaire: [''],
    });
    this.lignes.push(ligneForm);
  }

  removeLigne(index: number) {
    if (this.lignes.length > 1) {
      this.lignes.removeAt(index);
    }
  }


  loadBudgetDgpsnList() {
    this.financementService.readAllLigneBudgetaire({ page: 0, size: 100000 }).subscribe({
      next: (response) => {
        this.budgetDgpsnList = response.content;
      },
      error: (err) => console.error(err),
    });
  }

  loadPlanComptableElements(): void {
    this.planService.readAllPlanComptableElement().subscribe({
      next: (elements) => {
        this.planComptableElementList = elements.content;
        if (this.selectedClasseId) {
          this.loadRubriquesByClasse(this.selectedClasseId);
        } else if (this.ligneToUpdate) {
          // Si pas de selectedClasseId mais qu'on a une ligne à modifier
          // Charger la classe depuis la rubrique existante
          const classeId = this.ligneToUpdate.rubrique?.parent?.parent?.parent?.id;
          if (classeId) {
            this.loadRubriquesByClasse(classeId);
          } else {
            // Fallback: charger les champs sans les rubriques
            this.loadFields();
          }
        }
      },
      error: (err) => console.error(err),
    });
  }

  loadRubriquesByClasse(classeId: any): void {
    this.planService.getRubriquesByClasseId(classeId).subscribe({
      next: (rubriques) => {
        this.filteredRubriques = rubriques.map(el => ({
          ...el, codeLibelle: `${el.code} - ${el.libelle}`
        }));
        this.loadFields();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des rubriques:', err);
        Alertes.alerteAddDanger('Impossible de charger les rubriques de la classe');
        this.loadFields();
      }
    });
  }

  loadFields() {
    if (this.ligneToUpdate) {
      if (this.lignes.length === 0) this.addLigne();
      const ligneForm = this.lignes.at(0);
      ligneForm.patchValue({
        rubriqueId: this.ligneToUpdate.rubrique?.id,
        montant: this.ligneToUpdate.montant,
        primitif:this.ligneToUpdate.primitif,
        modification:this.ligneToUpdate.modification,
        budgetModifie:this.ligneToUpdate.budgetModifie,
        commentaire: this.ligneToUpdate.commentaire
      });
    }
  }
save() {
  const budgetId = this.budgetId;  
  if (this.ligneToUpdate === undefined) {
    const typeLigneBugetaire = this.typeLigneBugetaire;
    const lignes = this.lignes.value.map((ligne: any) => ({
      ...ligne,
      budgetId,
      typeLigneBugetaire,
    }));
    
    if (lignes.length === 1) {
      this.create(lignes[0]);
    } else {
      this.createMultiple(lignes);
    }
  } else {
    const ligneRequest = {
      ...this.lignes.value[0],
      budgetId,
      typeLigneBugetaire: this.ligneToUpdate.typeLigneBugetaire
    };
    this.update(this.ligneToUpdate.id, ligneRequest);
  }
}

  create(ligne: any) {
    this.financementService.createLigneBudgetaire(ligne).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Enregistrement réussi');
      },
      error: (value) => {
        console.log("value", value);
        Alertes.errorPopPup('Erreur :', value.error.message);
      },
      complete: () => {
        this.close();
      },
    });
  }

  createMultiple(lignes: any[]) {
    this.financementService.createMultipleLigneBudgetaire(lignes).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Enregistrement réussi');
      },
      error: (value) => {
        console.log("value", value);
        Alertes.errorPopPup('Erreur :', value.error.message);
      },
      complete: () => {
        this.close();
      },
    });
  }

  update(ligneId: any, ligneRequest: any) {
    this.financementService.updateLigneBudgetaire(ligneId, ligneRequest).subscribe({
      next: () => {
        Alertes.alerteAddSuccess('Modification réussie');
      },
      error: (value) => {
        console.log("value", value);
        Alertes.errorPopPup('Erreur :', value.error.message);
      },

      complete: () => {
        this.close();
      },
    });
  }

  close() {
    this.submit.emit(true);
    this.modalService.dismissAll();
  }

  doSearch() {
    this.submit.emit(this.form.value);
  }
}