import { CaracteristiqueService } from "@/app/services/caracteristique/caracteristique.service";
import { LabelService } from "@/app/services/labelService/label-service";
import { RecrutementService } from "@/app/services/recrutement/recrutement.service";
import { Alertes } from "@/app/util/alerte";
import { Helper } from "@/app/util/helper";
import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from "@angular/core";
import {
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormArray,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { FeatherIconDirective } from "@core/feather-icon/feather-icon.directive";
import {
  NgbAccordionModule,
  NgbAlertModule,
  NgbDropdownModule,
  NgbModal,
  NgbNavModule,
  NgbPaginationModule,
  NgbPopoverModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-add-recrutement",
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgbDropdownModule,
    MatTabsModule,
    NgbAccordionModule,
    MatDialogModule,
    MatTableModule,
    NgbTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatRippleModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatButtonModule,
    MatRadioModule,
    NgbNavModule,
    MatCardModule,
    FormsModule,
    MatPaginatorModule,
    MatSelectModule,
    NgbAlertModule,
    NgbPopoverModule,
    FeatherIconDirective,
  ],
  standalone: true,

  templateUrl: "./add-recrutement.component.html",
  styleUrl: "./add-recrutement.component.scss",
})
export class AddRecrutementComponent {
  form!: FormGroup;
  @Input() isSearch: boolean = false;
  @Input() recrutementToUpdate: any;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  loading = false;
  loadingTypeContrat: boolean = false;
  loadingCaracteristique: boolean = false;
  loadingIndicator: boolean = false;
  pageOptions: any = { page: 0, size: 100 };
  datasource: any;
  dates: any;

  agents: any = [];
  typeContrats: any = [];
  categorieCaracteristique: any = [];
  filteredCaracteristiques: any[] = [];
  constructor(
    private labelService: LabelService,
    private modalService: NgbModal,
    private recrutementService: RecrutementService, // Ajoutez ceci

    private caracteristiqueService: CaracteristiqueService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getTypeContrat();
    this.getCaracteristique();
    this.loadDependenciesAndFillForm();
  }

  create(recrutement: any) {
    this.loading = true;

    // Formatter les données avant l'envoi
    const dataToSend = {
      libelle: recrutement.libelle,
      dateRecrutement: recrutement.dateRecrutement,
      typeContratId: recrutement.typeContrat,
      caracteristiques: recrutement.caracteristiques.map((char: any) => ({
      categorieCaracteristique: char.categorieCaracteristique,
      caracteristiqueId: char.caracteristique, // ID de la caractéristique sélectionnée
      exige: char.exige || false,
      })),
    };

    console.log("Données à envoyer:", dataToSend);

    this.recrutementService.createRecrutement(dataToSend).subscribe({
      next: (response) => {
        console.log("Recrutement créé:", response);
        Alertes.alerteAddSuccess();
        this.loading = false;
        this.close();
      },
      error: (err) => {
        console.error("Erreur lors de la création:", err);
        Alertes.alerteAddDanger("Erreur lors de la création du recrutement");
        this.loading = false;
      },
    });
  }

  delete(recrutementId: number) {
    if (confirm("Voulez-vous vraiment supprimer ce recrutement ?")) {
      this.loading = true;
      this.recrutementService.deleteRecrutement(recrutementId).subscribe({
        next: (response) => {
          Alertes.alerteDeleteSuccess(); // tu peux créer ce helper si non existant
          console.log("Recrutement supprimé avec succès:", response);
          this.loading = false;
          this.close();
        },
        error: (err) => {
          console.error("Erreur lors de la suppression du recrutement:", err);
          Alertes.alerteAddDanger(
            "Erreur lors de la suppression du recrutement"
          );
          this.loading = false;
        },
      });
    }
  }

  // Méthode update

  update(recrutement: any) {
    this.loading = true;

    const dataToSend = {
      libelle: recrutement.libelle,
      dateRecrutement: recrutement.dateRecrutement,
      typeContratId: recrutement.typeContrat,
      // CORRECTION : Simplifiez l'objet envoyé
      caracteristiques: recrutement.caracteristiques.map((char: any) => ({
        caracteristiqueId: char.caracteristique, // ID de la caractéristique
        exige: char.exige || false,
      })),
    };

    console.log("Données à mettre à jour:", dataToSend);

    this.recrutementService
      .updateRecrutement(this.recrutementToUpdate.id, dataToSend)
      .subscribe({
        next: (response) => {
          console.log("Recrutement mis à jour:", response);
          Alertes.alerteUpdateSuccess();
          this.loading = false;
          this.close();
        },
        error: (err) => {
          console.error("Erreur lors de la mise à jour:", err);
          // Afficher le message d'erreur du backend est plus utile
          const errorMessage =
            err.error?.message ||
            "Erreur lors de la mise à jour du recrutement";
          Alertes.alerteAddDanger(errorMessage);
          this.loading = false;
        },
      });
  }

  resetSearch() {
    this.form.reset();
  }

  loadDependenciesAndFillForm() {
    this.loading = true;

    const typeContrats$ = this.labelService.readLabels({
      ...this.pageOptions,
      referentielType: "TYPE_CONTRAT",
    });
    const caracteristiques$ = this.caracteristiqueService.readCaracteristique(
      this.pageOptions
    );

    forkJoin({
      typeContrats: typeContrats$,
      caracteristiques: caracteristiques$,
    }).subscribe({
      next: (responses) => {
        // Peupler la liste des types de contrat pour le ng-select
        this.typeContrats = responses.typeContrats?.content || [];

        // Traiter et grouper les caractéristiques pour les ng-select
        this.processAndGroupCaracteristiques(
          responses.caracteristiques.payload
        );

        // Maintenant que les listes sont prêtes, on peut remplir le formulaire
        if (this.recrutementToUpdate) {
          this.loadFields();
        } else {
          // Si c'est un nouvel ajout, on ajoute une ligne de caractéristique vide
          this.addCharacteristic();
        }

        this.loading = false;
      },
      error: (err) => {
        console.error(
          "Erreur lors du chargement des données pour le formulaire:",
          err
        );
        Alertes.errorPopPup(
          "Erreur",
          "Impossible de charger les données du formulaire"
        );
        this.loading = false;
      },
    });
  }

  processAndGroupCaracteristiques(data: any[]) {
    const typeMap = new Map();
    (data || []).forEach((item: any) => {
      const type = item.caracteristiqueType;
      const typeCode = type ? type.code : "SANS_CATEGORIE";

      if (!typeMap.has(typeCode)) {
        typeMap.set(typeCode, {
          categorieName: typeCode,
          libelle: type ? type.libelle : "Sans catégorie",
          items: [],
        });
      }

      typeMap.get(typeCode).items.push({ id: item.id, libelle: item.libelle });
    });
    this.categorieCaracteristique = Array.from(typeMap.values());
  }

  getCaracteristique() {
    this.loadingCaracteristique = true;

    this.caracteristiqueService
      .readCaracteristique(this.pageOptions)
      .subscribe({
        next: (response) => {
          console.log("Response complète:", response);

          const data = response.payload || [];

          // Grouper par type de caractéristique
          const typeMap = new Map();

          data.forEach((item: any) => {
            // Vérifier si l'item a un caracteristiqueType
            if (item.caracteristiqueType) {
              const typeCode = item.caracteristiqueType.code;
              const typeLibelle = item.caracteristiqueType.libelle;
              const typeId = item.caracteristiqueType.id;

              // Si le type n'existe pas encore dans la map, le créer
              if (!typeMap.has(typeCode)) {
                typeMap.set(typeCode, {
                  categorieName: typeCode,
                  libelle: typeLibelle,
                  nameCat: typeCode,
                  typeId: typeId,
                  items: [],
                });
              }

              // Ajouter l'item à son type
              typeMap.get(typeCode).items.push({
                id: item.id,
                code: item.code,
                libelle: item.libelle,
                nameCat: typeCode,
              });
            } else {
              // Gérer les items sans type (comme id: 155, 154, 153)
              if (!typeMap.has("SANS_TYPE")) {
                typeMap.set("SANS_TYPE", {
                  categorieName: "SANS_TYPE",
                  libelle: "Sans type",
                  nameCat: "SANS_TYPE",
                  typeId: null,
                  items: [],
                });
              }

              typeMap.get("SANS_TYPE").items.push({
                id: item.id,
                code: item.code,
                libelle: item.libelle,
                nameCat: "SANS_TYPE",
              });
            }
          });

          // Convertir la Map en tableau
          this.categorieCaracteristique = Array.from(typeMap.values());

          console.log("Catégories groupées:", this.categorieCaracteristique);
          if (this.recrutementToUpdate) {
            this.loadCaracteristiques();
          }

          this.loadingCaracteristique = false;
        },
        error: (err) => {
          console.error("Erreur lors du chargement des caractéristiques:", err);
          this.loadingCaracteristique = false;
        },
      });
  }

  loadCaracteristiques() {
    // Vider le FormArray pour éviter les doublons
    while (this.caracteristiques.length !== 0) {
      this.caracteristiques.removeAt(0);
    }

    this.recrutementToUpdate.caracteristiques.forEach((char: any) => {
      // CORRECTION : Accéder correctement aux propriétés de l'objet.
      // On suppose que la catégorie est dans `char.caracteristique.caracteristiqueType.code`
      // et l'ID de la caractéristique dans `char.caracteristique.id`.
      // Adaptez si votre API renvoie une structure différente.
      const categorieCode = char.caracteristique?.caracteristiqueType?.code;
      const caracteristiqueId = char.caracteristique?.id;

      this.caracteristiques.push(
        new FormGroup({
          // On peuple avec les bonnes valeurs
          categorieCaracteristique: new FormControl(categorieCode),
          caracteristique: new FormControl(caracteristiqueId),
          exige: new FormControl(char.exige || false), // Le `exige` se charge correctement
        })
      );
    });
  }

  // Méthode pour obtenir les caractéristiques filtrées pour chaque ligne
  getFilteredCaracteristiques(index: number): any[] {
    const characteristicGroup = this.caracteristiques.at(index) as FormGroup;
    const selectedCategorie = characteristicGroup.get(
      "categorieCaracteristique"
    )?.value;

    console.log(
      "Catégorie sélectionnée pour index",
      index,
      ":",
      selectedCategorie
    );

    if (!selectedCategorie) {
      return [];
    }

    // Trouver la catégorie correspondante
    const categorie = this.categorieCaracteristique.find(
      (cat: any) => cat.categorieName === selectedCategorie
    );

    console.log("Items trouvés:", categorie?.items || []);

    return categorie ? categorie.items : [];
  }

  onCategorieChange(event: any, index: number) {
    console.log("Catégorie changée:", event, "pour index:", index);

    // Réinitialiser le champ caracteristique de cette ligne
    const characteristicGroup = this.caracteristiques.at(index) as FormGroup;
    characteristicGroup.get("caracteristique")?.setValue(null);
  }
  // onCategorieChange(categorieName: string, index: number) {
  //   // Filtrer les caractéristiques par catégorie sélectionnée
  //   console.log('car',categorieName);
  //   this.filteredCaracteristiques = this.categorieCaracteristique.filter(
  //     (item:any) => item.nameCat === categorieName
  //   );

  //     const characteristicGroup = this.characteristics.at(index) as FormGroup;
  //   // Réinitialiser la sélection de caractéristique
  //   this.form.get('categorieCaracteristique')?.setValue(null);
  // }

  // Méthode pour obtenir les caractéristiques filtrées pour chaque ligne
  // getFilteredCaracteristiques(index: number): any[] {
  //   const characteristicGroup = this.characteristics.at(index) as FormGroup;
  //   const selectedCategorie = characteristicGroup.get('categorieCaracteristique')?.value;

  //   if (!selectedCategorie) {
  //     return [];
  //   }

  //   return this.categorieCaracteristique.filter(
  //     (item: any) => item.nameCat === selectedCategorie
  //   );
  // }

  initForm() {
    this.form = new FormGroup({
      libelle: new FormControl("", Validators.required),
      dateRecrutement: new FormControl(""),
      typeContrat: new FormControl(null),
      caracteristiques: new FormArray([]),
    });

    if (this.recrutementToUpdate) {
      this.loadFields();
    } else {
      this.addCharacteristic();
    }
  }

  get caracteristiques(): FormArray {
    return this.form.get("caracteristiques") as FormArray;
  }

  addCharacteristic() {
    this.caracteristiques.push(
      new FormGroup({
        categorieCaracteristique: new FormControl(null, Validators.required),
        caracteristique: new FormControl(null, Validators.required),
        exige: new FormControl(false),
      })
    );
  }

  removeCharacteristic(index: number) {
    this.caracteristiques.removeAt(index);
  }

  // loadFields() {
  //   this.form.patchValue({
  //     libelle: this.recrutementToUpdate.libelle,
  //     dateRecrutement: Helper.editDate(this.recrutementToUpdate.dateRecrutement),
  //     typeContrat: this.recrutementToUpdate.typeContrat,
  //     categorieCaracteristique: this.recrutementToUpdate.categorieCaracteristique,
  //   });

  //   this.recrutementToUpdate.caracteristiques.forEach((char: any) => {
  //           console.log('categoris');
  //     this.caracteristiques.push(new FormGroup({
  //       categorieCaracteristique: new FormControl(char.categorieCaracteristique),
  //       caracteristique: new FormControl(char.caracteristique),
  //       exige: new FormControl(char.exige),
  //     }));
  //   });
  // }

  loadFields() {
    console.log("Loading fields with:", this.recrutementToUpdate);

    this.form.patchValue({
      libelle: this.recrutementToUpdate.libelle,
      dateRecrutement: Helper.editDate(
        this.recrutementToUpdate.dateRecrutement
      ),
      typeContrat: this.recrutementToUpdate.typeContrat,
    });

    // 2. Vider complètement le FormArray des caractéristiques avant de le remplir.
    // C'est une étape cruciale pour éviter les duplications et les erreurs.
    const caracteristiquesFormArray = this.form.get(
      "caracteristiques"
    ) as FormArray;
    while (caracteristiquesFormArray.length !== 0) {
      caracteristiquesFormArray.removeAt(0);
    }

    // 3. Traiter et charger les caractéristiques existantes dans le FormArray
    if (
      this.recrutementToUpdate.caracteristiques &&
      this.recrutementToUpdate.caracteristiques.length > 0
    ) {
      // Parcourir chaque caractéristique associée au recrutement
      this.recrutementToUpdate.caracteristiques.forEach((char: any) => {
        // Récupérer l'ID de la caractéristique. La structure de l'objet peut varier,
        // on vérifie donc plusieurs possibilités pour plus de robustesse.
        const caracteristiqueId =
          char.caracteristique?.id || char.caracteristiqueId;

        // Si aucun ID n'est trouvé, on ignore cette entrée pour éviter une erreur.
        if (!caracteristiqueId) {
          console.warn(
            "Caractéristique ignorée car son ID est introuvable :",
            char
          );
          return;
        }

        // Variable pour stocker le code de la catégorie que nous allons trouver
        let foundCategorieCode: string | null = null;

        // **Logique principale de la correction :**
        // Rechercher la catégorie parente de la caractéristique actuelle.
        // On parcourt la liste des catégories (`this.categorieCaracteristique`) qui a été
        // préparée au moment de l'initialisation du composant.
        for (const categorie of this.categorieCaracteristique) {
          // Pour chaque catégorie, on vérifie si notre caractéristique (par son ID)
          // se trouve dans la liste de ses `items`.
          if (
            categorie.items &&
            categorie.items.some((item: any) => item.id === caracteristiqueId)
          ) {
            // Si on la trouve, on stocke le code de la catégorie (ex: 'NIVEAU_ETUDE').
            foundCategorieCode = categorie.categorieName;
            // On arrête la recherche, car on a trouvé ce qu'on cherchait.
            break;
          }
        }

        // 4. Ajouter un nouveau FormGroup au FormArray pour cette caractéristique
        // On utilise les valeurs trouvées (ID de la caractéristique et code de sa catégorie)
        // pour peupler les champs, ce qui assurera la sélection correcte dans l'interface.
        caracteristiquesFormArray.push(
          new FormGroup({
            // Le `foundCategorieCode` va pré-sélectionner le bon "Type de caractéristique".
            categorieCaracteristique: new FormControl(
              foundCategorieCode,
              Validators.required
            ),
            // Le `caracteristiqueId` va pré-sélectionner la bonne "Caractéristique".
            caracteristique: new FormControl(
              caracteristiqueId,
              Validators.required
            ),
            // Le champ `exige` est une simple valeur booléenne.
            exige: new FormControl(char.exige || false),
          })
        );
      });
    } else {
      // Si le recrutement n'a pas de caractéristiques, on s'assure qu'au moins
      // une ligne vide est présente pour que l'utilisateur puisse en ajouter une.
      this.addCharacteristic();
    }
  }

  save() {
    let reintegration = this.form.value;
    if (this.recrutementToUpdate === undefined) {
      this.create(reintegration);
    } else {
      this.update(reintegration);
    }
  }

  getTypeContrat() {
    this.loadingTypeContrat = true;
    let params = {
      page: 0,
      size: 1000,
      referentielType: "TYPE_CONTRAT",
    };

    this.labelService.readLabels(params).subscribe({
      next: (reponse) => {
        this.typeContrats = reponse?.content;
        this.loadingTypeContrat = false;
      },
      error: (err) => {
        this.loadingTypeContrat = false;
      },
    });
  }

  //   getAllMilestoneOfProject(  ) {
  //     this.pageOptions.projectId = this.activity;
  //     console.log('pageOptionslist',this.pageOptions);
  //     this.budgetService.readBudgetActivity(this.pageOptions).subscribe(
  //       {
  //       next: response => {
  //         this.datasource = response;
  //         console.log('this.datasource ', this.datasource );
  //         this.dates = response.content;
  //         this.loadingIndicator = false;
  //       },
  //       error: err => {
  //         console.log(err);
  //         this.loadingIndicator = false;
  //       },
  //       complete: () => {
  //         this.loadingIndicator = false;
  //       }
  //   }
  // );
  //   }

  //     getCaracteristique(){
  //     this.loadingCaracteristique = false;

  //     this.caracteristiqueService.readCaracteristique(this.pageOptions).subscribe(
  //       {
  //       next: response => {
  //         this.datasource = response;
  //         console.log('this.datasource ', this.datasource );
  //         this.dates = response.content;
  //         this.loadingIndicator = false;
  //       },
  //       error: err => {
  //         console.log(err);
  //         this.loadingIndicator = false;
  //       },
  //       complete: () => {
  //         this.loadingIndicator = false;
  //       }
  //   }
  // );
  //   }

  // create(reintegration:any){
  //   this.loading = true;
  //   Alertes.alerteAddSuccess();
  //   this.close();
  // }

  // update(reintegration:any){
  //   this.loading = true;
  //   Alertes.alerteUpdateSuccess();
  //   this.close();
  // }

  close() {
    this.submit.emit(true);
  }

  doSearch() {
    this.search.emit(this.form.value);
  }

  openBasicModal(content: TemplateRef<any>, fieldName: string) {
    const dialogRef = this.modalService.open(content, {
      size: "lg",
      backdrop: "static",
    });
  }
}
