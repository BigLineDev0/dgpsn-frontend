import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { RapportControleService } from "../../../../services/rapport-controle/rapport-controle.service";

type PeriodType = "mensuel" | "trimestriel" | "annuel";
type TrimestreType = "T1" | "T2" | "T3" | "T4";

interface DynamicColumn {
  key: string;
  label: string;
  type: "text" | "number" | "percent";
  isFixed?: boolean;
  isPeriodic?: boolean;
  width?: string;
}

interface RecetteItem {
  libelle: string;
  servicesVotees: number;
  realisationT1: number;
  realisationT2: number;
  tauxRealisation: number;
  ecart: number;
  observations: string;
  isTotal?: boolean;
  annee?: number;
  trimestre?: string;
}

interface DepenseFonctionnement {
  libelle: string;
  budget: number;
  realisationT1: number;
  tauxT1: number;
  realisationT2: number;
  tauxT2: number;
  realisationT3: number;
  tauxT3: number;
  isTotal?: boolean;
  annee?: number;
  trimestre?: string;
}

// Interfaces pour la nouvelle structure API
interface ApiBudgetResponse {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: RealisationItem[];
  number: number;
  sort: any;
  numberOfElements: number;
  pageable: any;
  empty: boolean;
}

interface RealisationItem {
  id: number;
  code: string;
  montant: number;
  date: number[];
  fournisseur: string;
  numeroBon: string;
  numeroBE: string;
  numeroMandat: string;
  facture: string;
  description: string;
  ligneBudgetaire: LigneBudgetaire;
  realisations: RealisationHierarchy;
}

interface LigneBudgetaire {
  id: number;
  montant: number;
  typeLigneBugetaire: {
    description: string;
    name: string;
  };
  commentaire: string;
  rubrique: RubriqueHierarchie;
}

interface RealisationHierarchy {
  id: number;
  code: string;
  libelle: string;
  commentaire: string;
  type: string;
  parent: RubriqueHierarchie | null;
}

interface RubriqueHierarchie {
  id: number;
  code: string;
  libelle: string;
  commentaire: string;
  type: string;
  parent: ParentRubrique | null;
}

interface ParentRubrique {
  id: number;
  code: string;
  libelle: string;
  commentaire: string;
  type: string;
  parent: ParentRubrique | null;
}

@Component({
  selector: "app-controle-budget",
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: "./controle-budget.component.html",
  styleUrl: "./controle-budget.component.scss",
})
export class ControleBudgetComponent implements OnInit {
  // Filtres
  selectedYear: string = "2024";
  selectedPeriodType: PeriodType = "trimestriel";
  selectedTrimestre: TrimestreType = "T1";
  selectedTabIndex: number = 0;
  selectedMois: string = "09";

  // Options des filtres
  annees: string[] = ["2023", "2024", "2025", "2026"];
  periodes: { value: PeriodType; label: string }[] = [
    { value: "mensuel", label: "Mensuel" },
    { value: "trimestriel", label: "Trimestriel" },
    { value: "annuel", label: "Annuel" },
  ];
  trimestres: { value: TrimestreType; label: string }[] = [
    { value: "T1", label: "1er Trimestre" },
    { value: "T2", label: "2ème Trimestre" },
    { value: "T3", label: "3ème Trimestre" },
    { value: "T4", label: "4ème Trimestre" },
  ];
  mois: { value: string; label: string }[] = [
    { value: "01", label: "Janvier" },
    { value: "02", label: "Février" },
    { value: "03", label: "Mars" },
    { value: "04", label: "Avril" },
    { value: "05", label: "Mai" },
    { value: "06", label: "Juin" },
    { value: "07", label: "Juillet" },
    { value: "08", label: "Août" },
    { value: "09", label: "Septembre" },
    { value: "10", label: "Octobre" },
    { value: "11", label: "Novembre" },
    { value: "12", label: "Décembre" },
  ];

  // Données complètes
  allRecettesData: RecetteItem[] = [];
  allDepensesFonctionnementData: DepenseFonctionnement[] = [];

  // Données filtrées (affichées)
  recettesData: RecetteItem[] = [];
  depensesFonctionnementData: DepenseFonctionnement[] = [];

  // États de chargement
  isLoading: boolean = false;
  errorMessage: string = "";

  // Colonnes pour Recettes
  recettesColumns: DynamicColumn[] = [
    { key: "libelle", label: "Libellés", type: "text", width: "250px" },
    {
      key: "servicesVotees",
      label: "Services votées",
      type: "number",
      width: "150px",
    },
    {
      key: "realisationT1",
      label: "Réalisations au 30/03/2025",
      type: "number",
      width: "180px",
    },
    {
      key: "realisationT2",
      label: "Réalisation au 30/06/2025",
      type: "number",
      width: "180px",
    },
    {
      key: "tauxRealisation",
      label: "Taux de réalisation",
      type: "percent",
      width: "120px",
    },
    { key: "ecart", label: "Ecart", type: "number", width: "100px" },
    {
      key: "observations",
      label: "Observations",
      type: "text",
      width: "300px",
    },
  ];

  // Colonnes pour Dépenses Fonctionnement
  depensesFonctionnementColumns: DynamicColumn[] = [
    {
      key: "libelle",
      label: "DÉPENSES DE FONCTIONNEMENT",
      type: "text",
      width: "250px",
    },
    { key: "budget", label: "BUDGET 2025", type: "number", width: "120px" },
    {
      key: "realisationT1",
      label: "RÉALISATIONS AU 30-03-2025",
      type: "number",
      width: "150px",
    },
    { key: "tauxT1", label: "TR", type: "percent", width: "60px" },
    {
      key: "realisationT2",
      label: "RÉALISATIONS AU 30-06-2025",
      type: "number",
      width: "150px",
    },
    { key: "tauxT2", label: "TR", type: "percent", width: "60px" },
    {
      key: "realisationT3",
      label: "RÉALISATIONS AU 01-09-2025",
      type: "number",
      width: "150px",
    },
    { key: "tauxT3", label: "TR", type: "percent", width: "60px" },
  ];

  constructor(
    private http: HttpClient,
    private rapportControleService: RapportControleService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  // Charger toutes les données
  loadAllData(): void {
    this.isLoading = true;
    this.errorMessage = "";

    // Charger les données depuis les endpoints preview avec les filtres appliqués
    this.loadRecettesFromBackend();
    this.loadDepensesFromBackend();
  }

  // Charger les recettes depuis le backend
  loadRecettesFromBackend(): void {
    this.rapportControleService.getRecettesData(
      this.selectedYear,
      this.selectedTrimestre,
      this.selectedPeriodType
    ).subscribe({
      next: (data) => {
        this.recettesData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Erreur lors du chargement des recettes:", error);
        this.errorMessage = "Erreur lors du chargement des recettes";
        this.loadMockRecettesData();
        this.isLoading = false;
      }
    });
  }

  // Charger les dépenses depuis le backend
  loadDepensesFromBackend(): void {
    this.rapportControleService.getDepensesData(
      this.selectedYear,
      this.selectedTrimestre,
      this.selectedPeriodType
    ).subscribe({
      next: (data) => {
        this.depensesFonctionnementData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Erreur lors du chargement des dépenses:", error);
        this.errorMessage = "Erreur lors du chargement des dépenses";
        this.loadMockDepensesFonctionnementData();
        this.isLoading = false;
      }
    });
  }

  // Appel API pour les budgets
  getBudgetData(): Observable<ApiBudgetResponse> {
    return this.http.get<ApiBudgetResponse>(
      "http://localhost:2015/dgpsn-api/realisation"
    );
  }

  // Transformer toutes les données - VERSION CONNECTÉE À L'API
  transformAllData(apiData: RealisationItem[]): void {
    if (!apiData || apiData.length === 0) {
      console.warn(
        "Aucune donnée reçue de l'API, utilisation des données mock"
      );
      this.loadMockData();
      return;
    }

    console.log("Données reçues de l'API:", apiData);

    // Réinitialiser les données
    this.allRecettesData = [];
    this.allDepensesFonctionnementData = [];

    // Séparer les données par classe (CLASSE_6 = Dépenses, CLASSE_7 = Recettes)
    const classe6Data = apiData.filter(
      (item) => item.ligneBudgetaire?.typeLigneBugetaire?.name === "CLASSE_6"
    );
    const classe7Data = apiData.filter(
      (item) => item.ligneBudgetaire?.typeLigneBugetaire?.name === "CLASSE_7"
    );

    console.log("Données CLASSE_6 (Dépenses):", classe6Data);
    console.log("Données CLASSE_7 (Recettes):", classe7Data);

    // Transformer les données pour Recettes (CLASSE_7)
    this.transformRecettesData(classe7Data);

    // Transformer les données pour Dépenses Fonctionnement (CLASSE_6)
    this.transformDepensesData(classe6Data);
  }

  // Transformer les données pour Recettes
  transformRecettesData(apiData: RealisationItem[]): void {
    if (!apiData || apiData.length === 0) {
      console.warn("Aucune donnée recette, utilisation des mocks");
      this.loadMockRecettesData();
      return;
    }

    // Grouper par rubrique
    const groupedData = this.groupByRubrique(apiData);

    this.allRecettesData = Object.values(groupedData).map((group: any) => {
      const budget = group.budget || 0;
      const realiseT1 = group.realisationT1 || 0;
      const realiseT2 = group.realisationT2 || 0;
      const taux = budget > 0 ? Math.round((realiseT2 / budget) * 100) : 0;
      const ecart = budget - realiseT2;

      return {
        libelle: group.rubriqueLibelle || "Rubrique non spécifiée",
        servicesVotees: budget,
        realisationT1: realiseT1,
        realisationT2: realiseT2,
        tauxRealisation: taux,
        ecart: ecart,
        observations: group.commentaire || "Aucune observation",
        isTotal: false,
        annee: 2025,
        trimestre: this.selectedTrimestre,
      };
    });

    this.addRecettesTotalRow(this.allRecettesData);
  }

  // Transformer les données pour Dépenses
  transformDepensesData(apiData: RealisationItem[]): void {
    if (!apiData || apiData.length === 0) {
      console.warn("Aucune donnée dépense, utilisation des mocks");
      this.loadMockDepensesFonctionnementData();
      return;
    }

    // Grouper par rubrique
    const groupedData = this.groupByRubrique(apiData);

    this.allDepensesFonctionnementData = Object.values(groupedData).map(
      (group: any) => {
        const budget = group.budget || 0;
        const realiseT1 = group.realisationT1 || Math.round(budget * 0.3); // 30% pour T1
        const realiseT2 = group.realisationT2 || Math.round(budget * 0.45); // 45% pour T2
        const realiseT3 = group.realisationT3 || Math.round(budget * 0.6); // 60% pour T3
        const tauxT1 = budget > 0 ? Math.round((realiseT1 / budget) * 100) : 0;
        const tauxT2 = budget > 0 ? Math.round((realiseT2 / budget) * 100) : 0;
        const tauxT3 = budget > 0 ? Math.round((realiseT3 / budget) * 100) : 0;

        return {
          libelle: group.rubriqueLibelle || "Rubrique non spécifiée",
          budget: budget,
          realisationT1: realiseT1,
          tauxT1: tauxT1,
          realisationT2: realiseT2,
          tauxT2: tauxT2,
          realisationT3: realiseT3,
          tauxT3: tauxT3,
          isTotal: false,
          annee: 2025,
          trimestre: this.selectedTrimestre,
        };
      }
    );

    this.addDepensesTotalRow(this.allDepensesFonctionnementData);
  }

  // Grouper les données par rubrique
  groupByRubrique(data: RealisationItem[]): { [key: string]: any } {
    return data.reduce((acc: { [key: string]: any }, item) => {
      const rubriqueKey = item.ligneBudgetaire?.rubrique?.libelle || "Autres";

      if (!acc[rubriqueKey]) {
        acc[rubriqueKey] = {
          rubriqueLibelle: rubriqueKey,
          budget: item.ligneBudgetaire?.montant || 0,
          realisationT1: 0,
          realisationT2: 0,
          realisationT3: 0,
          commentaire:
            item.ligneBudgetaire?.commentaire ||
            item.description ||
            "Aucune observation",
          items: [],
        };
      } else {
        acc[rubriqueKey].budget += item.ligneBudgetaire?.montant || 0;
      }

      // Utiliser le montant comme réalisation
      const realisation = item.montant || 0;
      acc[rubriqueKey].realisationT1 += realisation * 0.3; // 30% pour T1
      acc[rubriqueKey].realisationT2 += realisation * 0.6; // 60% pour T2
      acc[rubriqueKey].realisationT3 += realisation; // 100% pour T3

      acc[rubriqueKey].items.push(item);

      return acc;
    }, {});
  }

  // Appliquer tous les filtres
  applyFilters(): void {
    this.filterRecettesData();
    this.filterDepensesData();
  }

  // Filtrer les données Recettes
  filterRecettesData(): void {
    let filteredData = [
      ...this.allRecettesData.filter((item) => !item.isTotal),
    ];

    // Filtrer par année
    filteredData = filteredData.filter(
      (item) => !item.annee || item.annee.toString() === this.selectedYear
    );

    // Filtrer par trimestre si applicable
    if (this.selectedPeriodType === "trimestriel") {
      filteredData = filteredData.filter(
        (item) => !item.trimestre || item.trimestre === this.selectedTrimestre
      );
    }

    // Ajouter le total correspondant aux données filtrées
    const totalServicesVotees = filteredData.reduce(
      (sum, item) => sum + item.servicesVotees,
      0
    );
    const totalRealisationT1 = filteredData.reduce(
      (sum, item) => sum + item.realisationT1,
      0
    );
    const totalRealisationT2 = filteredData.reduce(
      (sum, item) => sum + item.realisationT2,
      0
    );
    const totalTaux =
      totalServicesVotees > 0
        ? Math.round((totalRealisationT2 / totalServicesVotees) * 100)
        : 0;

    filteredData.push({
      libelle: "TOTAL RECETTES",
      servicesVotees: totalServicesVotees,
      realisationT1: totalRealisationT1,
      realisationT2: totalRealisationT2,
      tauxRealisation: totalTaux,
      ecart: totalServicesVotees - totalRealisationT2,
      observations: `Situation ${this.getPeriodLabel().toLowerCase()} du recouvrement des recettes`,
      isTotal: true,
      annee: parseInt(this.selectedYear),
      trimestre: this.selectedTrimestre,
    });

    this.recettesData = filteredData;
  }

  // Filtrer les données Dépenses
  filterDepensesData(): void {
    let filteredData = [
      ...this.allDepensesFonctionnementData.filter((item) => !item.isTotal),
    ];

    // Filtrer par année
    filteredData = filteredData.filter(
      (item) => !item.annee || item.annee.toString() === this.selectedYear
    );

    // Filtrer par trimestre si applicable
    if (this.selectedPeriodType === "trimestriel") {
      filteredData = filteredData.filter(
        (item) => !item.trimestre || item.trimestre === this.selectedTrimestre
      );
    }

    // Ajouter le total correspondant aux données filtrées
    const totalBudget = filteredData.reduce(
      (sum, item) => sum + item.budget,
      0
    );
    const totalRealisationT1 = filteredData.reduce(
      (sum, item) => sum + item.realisationT1,
      0
    );
    const totalRealisationT2 = filteredData.reduce(
      (sum, item) => sum + item.realisationT2,
      0
    );
    const totalRealisationT3 = filteredData.reduce(
      (sum, item) => sum + item.realisationT3,
      0
    );
    const totalTauxT1 =
      totalBudget > 0
        ? Math.round((totalRealisationT1 / totalBudget) * 100)
        : 0;
    const totalTauxT2 =
      totalBudget > 0
        ? Math.round((totalRealisationT2 / totalBudget) * 100)
        : 0;
    const totalTauxT3 =
      totalBudget > 0
        ? Math.round((totalRealisationT3 / totalBudget) * 100)
        : 0;

    filteredData.push({
      libelle: "TOTAL DÉPENSES",
      budget: totalBudget,
      realisationT1: totalRealisationT1,
      tauxT1: totalTauxT1,
      realisationT2: totalRealisationT2,
      tauxT2: totalTauxT2,
      realisationT3: totalRealisationT3,
      tauxT3: totalTauxT3,
      isTotal: true,
      annee: parseInt(this.selectedYear),
      trimestre: this.selectedTrimestre,
    });

    this.depensesFonctionnementData = filteredData;
  }

  // Charger les données mock en cas d'erreur
  loadMockData(): void {
    this.loadMockRecettesData();
    this.loadMockDepensesFonctionnementData();
  }

  // Données mock pour Recettes
  loadMockRecettesData(): void {
    this.allRecettesData = [
      // {
      //   libelle: "Transferts courants",
      //   servicesVotees: 2877583305,
      //   realisationT1: 1635467422,
      //   realisationT2: 1635467422,
      //   tauxRealisation: 57,
      //   ecart: 0,
      //   observations:
      //     "Ce montant représente les trois premières tranches de la subvention de l'Etat",
      //   isTotal: false,
      //   annee: 2025,
      //   trimestre: "T3",
      // },
      // {
      //   libelle: "Transferts en capital",
      //   servicesVotees: 147558480,
      //   realisationT1: 0,
      //   realisationT2: 0,
      //   tauxRealisation: 0,
      //   ecart: 0,
      //   observations:
      //     "Les subventions d'investissement n'ont pas connu un début d'exécution",
      //   isTotal: false,
      //   annee: 2025,
      //   trimestre: "T3",
      // },
      // {
      //   libelle: "Fonds propres",
      //   servicesVotees: 5000000,
      //   realisationT1: 4105870,
      //   realisationT2: 4105870,
      //   tauxRealisation: 82,
      //   ecart: 0,
      //   observations:
      //     "Ce montant provient de la vente des cahiers de charge et des produits financiers",
      //   isTotal: false,
      //   annee: 2025,
      //   trimestre: "T3",
      // },
      // {
      //   libelle: "Report à nouveau",
      //   servicesVotees: 10371110126,
      //   realisationT1: 10371110126,
      //   realisationT2: 10371110126,
      //   tauxRealisation: 100,
      //   ecart: 0,
      //   observations:
      //     "destiné à la prise en charge du reversement des fonds non exécutés dans le cadre du projet de 'cash éducation' financé par l'UNICEF",
      //   isTotal: false,
      //   annee: 2025,
      //   trimestre: "T3",
      // },
    ];

    this.addRecettesTotalRow(this.allRecettesData);
  }

  // Données mock pour Dépenses Fonctionnement
  loadMockDepensesFonctionnementData(): void {
    this.allDepensesFonctionnementData = [
      // {
      //   libelle: "Charges à caractère général",
      //   budget: 2653438126,
      //   realisationT1: 835746994,
      //   tauxT1: 31,
      //   realisationT2: 1197486853,
      //   tauxT2: 45,
      //   realisationT3: 1398176156,
      //   tauxT3: 53,
      //   isTotal: false,
      //   annee: 2025,
      //   trimestre: "T3",
      // },
      // {
      //   libelle: "Charges de personnel",
      //   budget: 1441125505,
      //   realisationT1: 300081240,
      //   tauxT1: 21,
      //   realisationT2: 588914752,
      //   tauxT2: 41,
      //   realisationT3: 774185629,
      //   tauxT3: 54,
      //   isTotal: false,
      //   annee: 2025,
      //   trimestre: "T3",
      // },
    ];

    this.addDepensesTotalRow(this.allDepensesFonctionnementData);
  }

  // Ajouter la ligne de total pour les recettes
  addRecettesTotalRow(data: RecetteItem[]): void {
    const totalServicesVotees = data.reduce(
      (sum, item) => sum + item.servicesVotees,
      0
    );
    const totalRealisationT1 = data.reduce(
      (sum, item) => sum + item.realisationT1,
      0
    );
    const totalRealisationT2 = data.reduce(
      (sum, item) => sum + item.realisationT2,
      0
    );
    const totalTaux =
      totalServicesVotees > 0
        ? Math.round((totalRealisationT2 / totalServicesVotees) * 100)
        : 0;

    data.push({
      libelle: "TOTAL RECETTES",
      servicesVotees: totalServicesVotees,
      realisationT1: totalRealisationT1,
      realisationT2: totalRealisationT2,
      tauxRealisation: totalTaux,
      ecart: totalServicesVotees - totalRealisationT2,
      observations: "Situation globale du recouvrement des recettes",
      isTotal: true,
      annee: 2025,
      trimestre: "T3",
    });
  }

  // Ajouter la ligne de total pour les dépenses
  addDepensesTotalRow(data: DepenseFonctionnement[]): void {
    const totalBudget = data.reduce((sum, item) => sum + item.budget, 0);
    const totalRealisationT1 = data.reduce(
      (sum, item) => sum + item.realisationT1,
      0
    );
    const totalRealisationT2 = data.reduce(
      (sum, item) => sum + item.realisationT2,
      0
    );
    const totalRealisationT3 = data.reduce(
      (sum, item) => sum + item.realisationT3,
      0
    );
    const totalTauxT1 =
      totalBudget > 0
        ? Math.round((totalRealisationT1 / totalBudget) * 100)
        : 0;
    const totalTauxT2 =
      totalBudget > 0
        ? Math.round((totalRealisationT2 / totalBudget) * 100)
        : 0;
    const totalTauxT3 =
      totalBudget > 0
        ? Math.round((totalRealisationT3 / totalBudget) * 100)
        : 0;

    data.push({
      libelle: "TOTAL DÉPENSES",
      budget: totalBudget,
      realisationT1: totalRealisationT1,
      tauxT1: totalTauxT1,
      realisationT2: totalRealisationT2,
      tauxT2: totalTauxT2,
      realisationT3: totalRealisationT3,
      tauxT3: totalTauxT3,
      isTotal: true,
      annee: 2025,
      trimestre: "T3",
    });
  }

  // Gestion des changements de filtres
  onYearChange(): void {
    this.loadAllData();
  }

  onPeriodTypeChange(): void {
    if (this.selectedPeriodType === "trimestriel") {
      this.selectedTrimestre = "T1";
    } else if (this.selectedPeriodType === "mensuel") {
      this.selectedMois = "01";
    }
    this.loadAllData();
  }

  onTrimestreChange(): void {
    this.loadAllData();
  }

  onMoisChange(): void {
    this.loadAllData();
  }

  // Obtenir la date de période pour l'affichage
  getDatePeriode(): string {
    if (this.selectedPeriodType === "mensuel") {
      const moisLabel = this.mois.find(
        (m) => m.value === this.selectedMois
      )?.label;
      return `${moisLabel} ${this.selectedYear}`;
    } else if (this.selectedPeriodType === "trimestriel") {
      const trimestreLabel = this.trimestres.find(
        (t) => t.value === this.selectedTrimestre
      )?.label;
      return `${trimestreLabel} ${this.selectedYear}`;
    } else {
      return `Année ${this.selectedYear}`;
    }
  }

  // Obtenir le libellé complet de la période
  getPeriodLabel(): string {
    if (this.selectedPeriodType === "mensuel") {
      const moisLabel = this.mois.find(
        (m) => m.value === this.selectedMois
      )?.label;
      return `Mensuel - ${moisLabel} ${this.selectedYear}`;
    } else if (this.selectedPeriodType === "trimestriel") {
      const trimestreLabel = this.trimestres.find(
        (t) => t.value === this.selectedTrimestre
      )?.label;
      return `Trimestriel - ${trimestreLabel} ${this.selectedYear}`;
    } else {
      return `Annuel - ${this.selectedYear}`;
    }
  }

  // Méthodes utilitaires
  getCellValue(row: any, columnKey: string): any {
    if (columnKey.includes(".")) {
      const keys = columnKey.split(".");
      let value = row;
      for (const key of keys) {
        value = value?.[key];
      }
      return value;
    }
    return row[columnKey];
  }

  formatNumber(value: number | undefined): string {
    if (!value && value !== 0) return "-";
    return new Intl.NumberFormat("fr-FR", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  formatPercent(value: number | undefined): string {
    if (!value && value !== 0) return "-";
    return `${value}%`;
  }

  formatValue(value: any, type: "text" | "number" | "percent"): string {
    if (type === "number") {
      return this.formatNumber(value);
    } else if (type === "percent") {
      return this.formatPercent(value);
    }
    return value || "-";
  }

  getRecettesRowClass(row: RecetteItem): string {
    if (row.isTotal) return "total-row";
    return "";
  }

  getDepensesRowClass(row: DepenseFonctionnement): string {
    if (row.isTotal) return "total-row";
    return "";
  }

  // Export vers Excel avec DESIGN IDENTIQUE À L'INTERFACE
  // exportToExcel(): void {
  //   try {
  //     const date = new Date();
  //     const dateStr = date.toISOString().split("T")[0];
  //     const timeStr = date.toTimeString().split(" ")[0].replace(/:/g, "-");

  //     let dataToExport: any[] = [];
  //     let fileName = "";
  //     let sheetName = "";
  //     let mainTitle = "";
  //     let tableTitle = "";
  //     let periodInfo = "";

  //     if (this.selectedTabIndex === 0) {
  //       // Export Recettes
  //       dataToExport = this.recettesData.map((item) => ({
  //         Libellés: item.libelle,
  //         "Services votées": item.servicesVotees,
  //         "Réalisations au 30/03/2025": item.realisationT1,
  //         "Réalisation au 30/06/2025": item.realisationT2,
  //         "Taux de réalisation": `${item.tauxRealisation}%`,
  //         Ecart: item.ecart,
  //         Observations: item.observations,
  //       }));
  //       fileName = `Recouvrement_Recettes_${this.getPeriodLabel().replace(
  //         /[^a-zA-Z0-9]/g,
  //         "_"
  //       )}_${dateStr}_${timeStr}.xlsx`;
  //       sheetName = "Recouvrement Recettes";
  //       mainTitle = "SITUATION RECOUVREMENT DES RECETTES PAR TRIMESTRE";
  //       tableTitle = "SUIVI DU RECOUVREMENT DES RECETTES";
  //       periodInfo =
  //         "Données en temps réel • Dernière mise à jour: " +
  //         this.getDatePeriode();
  //     } else {
  //       // Export Dépenses
  //       dataToExport = this.depensesFonctionnementData.map((item) => ({
  //         "DÉPENSES DE FONCTIONNEMENT": item.libelle,
  //         "BUDGET 2025": item.budget,
  //         "RÉALISATIONS AU 30-03-2025": item.realisationT1,
  //         "TR T1": `${item.tauxT1}%`,
  //         "RÉALISATIONS AU 30-06-2025": item.realisationT2,
  //         "TR T2": `${item.tauxT2}%`,
  //         "RÉALISATIONS AU 01-09-2025": item.realisationT3,
  //         "TR T3": `${item.tauxT3}%`,
  //       }));
  //       fileName = `Depenses_Fonctionnement_${this.getPeriodLabel().replace(
  //         /[^a-zA-Z0-9]/g,
  //         "_"
  //       )}_${dateStr}_${timeStr}.xlsx`;
  //       sheetName = "Dépenses Fonctionnement";
  //       mainTitle = "SITUATION DES DÉPENSES DE FONCTIONNEMENT";
  //       tableTitle = "ANALYSE DES DÉPENSES DE FONCTIONNEMENT";
  //       periodInfo = "Données en temps réel";
  //     }

  //     // Créer le workbook
  //     const wb: XLSX.WorkBook = XLSX.utils.book_new();

  //     // Préparer les données avec la structure IDENTIQUE à l'interface
  //     const wsData: any[][] = [];

  //     // Ligne vide
  //     wsData.push([]);

  //     // Titre principal (identique à l'interface)
  //     wsData.push([mainTitle]);

  //     // Information de période (identique à l'interface)
  //     wsData.push([periodInfo]);

  //     // Ligne vide
  //     wsData.push([]);

  //     // Titre du tableau (identique à l'interface)
  //     wsData.push([tableTitle]);

  //     // Ligne vide
  //     wsData.push([]);

  //     // En-têtes du tableau
  //     const headers = Object.keys(dataToExport[0] || {});
  //     wsData.push(headers);

  //     // Données
  //     dataToExport.forEach((row) => {
  //       const rowData = headers.map((header) => row[header]);
  //       wsData.push(rowData);
  //     });

  //     // Créer la feuille de calcul
  //     const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(wsData);

  //     // Définir les styles et largeurs de colonnes
  //     if (!ws["!cols"]) ws["!cols"] = [];

  //     // Définir les largeurs de colonnes selon l'onglet
  //     if (this.selectedTabIndex === 0) {
  //       // Recettes
  //       ws["!cols"] = [
  //         { width: 25 }, // Libellés
  //         { width: 15 }, // Services votées
  //         { width: 18 }, // Réalisations T1
  //         { width: 18 }, // Réalisations T2
  //         { width: 12 }, // Taux
  //         { width: 10 }, // Ecart
  //         { width: 30 }, // Observations
  //       ];
  //     } else {
  //       // Dépenses
  //       ws["!cols"] = [
  //         { width: 25 }, // DÉPENSES DE FONCTIONNEMENT
  //         { width: 12 }, // BUDGET 2025
  //         { width: 15 }, // RÉALISATIONS T1
  //         { width: 8 }, // TR T1
  //         { width: 15 }, // RÉALISATIONS T2
  //         { width: 8 }, // TR T2
  //         { width: 15 }, // RÉALISATIONS T3
  //         { width: 8 }, // TR T3
  //       ];
  //     }

  //     // Appliquer les styles aux cellules - DESIGN IDENTIQUE À L'INTERFACE
  //     const range = XLSX.utils.decode_range(ws["!ref"] || "A1:A1");

  //     // Style pour le titre principal (ligne 2) - DESIGN IDENTIQUE
  //     const mainTitleCell = XLSX.utils.encode_cell({ r: 1, c: 0 });
  //     if (!ws[mainTitleCell]) ws[mainTitleCell] = { t: "s", v: "" };
  //     ws[mainTitleCell].s = {
  //       font: { bold: true, sz: 16, color: { rgb: "000000" } },
  //       alignment: { horizontal: "left" },
  //     };

  //     // Style pour la période (ligne 3) - DESIGN IDENTIQUE
  //     const periodCell = XLSX.utils.encode_cell({ r: 2, c: 0 });
  //     if (!ws[periodCell]) ws[periodCell] = { t: "s", v: "" };
  //     ws[periodCell].s = {
  //       font: { sz: 11, color: { rgb: "666666" } },
  //       alignment: { horizontal: "left" },
  //     };

  //     // Style pour le titre du tableau (ligne 5) - DESIGN IDENTIQUE
  //     const tableTitleCell = XLSX.utils.encode_cell({ r: 4, c: 0 });
  //     if (!ws[tableTitleCell]) ws[tableTitleCell] = { t: "s", v: "" };
  //     ws[tableTitleCell].s = {
  //       font: { bold: true, sz: 12, color: { rgb: "000000" } },
  //       alignment: { horizontal: "left" },
  //     };

  //     // Styles pour les en-têtes (ligne 7) - DESIGN IDENTIQUE (vert comme l'interface)
  //     const headerRow = 6;
  //     for (let C = range.s.c; C <= range.e.c; ++C) {
  //       const headerCell = XLSX.utils.encode_cell({ r: headerRow, c: C });
  //       if (ws[headerCell]) {
  //         if (!ws[headerCell].s) ws[headerCell].s = {};
  //         ws[headerCell].s = {
  //           fill: { fgColor: { rgb: "2E7D32" } }, // Vert identique à l'interface
  //           font: { bold: true, color: { rgb: "FFFFFF" }, sz: 10 },
  //           alignment: { horizontal: "center", vertical: "center" },
  //           border: {
  //             top: { style: "thin", color: { rgb: "1B5E20" } },
  //             left: { style: "thin", color: { rgb: "1B5E20" } },
  //             bottom: { style: "thin", color: { rgb: "1B5E20" } },
  //             right: { style: "thin", color: { rgb: "1B5E20" } },
  //           },
  //         };
  //       }
  //     }

  //     // Styles pour les données - DESIGN IDENTIQUE
  //     for (let R = headerRow + 1; R <= range.e.r; ++R) {
  //       for (let C = range.s.c; C <= range.e.c; ++C) {
  //         const cell = XLSX.utils.encode_cell({ r: R, c: C });
  //         if (ws[cell]) {
  //           if (!ws[cell].s) ws[cell].s = {};

  //           // Style de base pour toutes les cellules - DESIGN IDENTIQUE
  //           ws[cell].s.border = {
  //             top: { style: "thin", color: { rgb: "E0E0E0" } },
  //             left: { style: "thin", color: { rgb: "E0E0E0" } },
  //             bottom: { style: "thin", color: { rgb: "E0E0E0" } },
  //             right: { style: "thin", color: { rgb: "E0E0E0" } },
  //           };

  //           // Style pour les lignes de total - DESIGN IDENTIQUE (bleu clair)
  //           const rowData = dataToExport[R - headerRow - 1];
  //           if (
  //             rowData &&
  //             (rowData["Libellés"]?.includes("TOTAL") ||
  //               rowData["DÉPENSES DE FONCTIONNEMENT"]?.includes("TOTAL"))
  //           ) {
  //             ws[cell].s.fill = { fgColor: { rgb: "E3F2FD" } }; // Bleu clair identique
  //             ws[cell].s.font = { bold: true, color: { rgb: "000000" } };
  //           }

  //           // Alignement selon le type de colonne - DESIGN IDENTIQUE
  //           const headerName = headers[C];
  //           if (
  //             headerName === "Libellés" ||
  //             headerName === "DÉPENSES DE FONCTIONNEMENT" ||
  //             headerName === "Observations"
  //           ) {
  //             ws[cell].s.alignment = { horizontal: "left", vertical: "center" };
  //             ws[cell].s.font = { sz: 10 };
  //           } else if (
  //             headerName.includes("Services") ||
  //             headerName.includes("BUDGET") ||
  //             headerName.includes("RÉALISATIONS")
  //           ) {
  //             ws[cell].s.alignment = {
  //               horizontal: "right",
  //               vertical: "center",
  //             };
  //             ws[cell].s.font = { sz: 10 };
  //             // Format numérique avec séparateurs de milliers
  //             if (ws[cell].v && typeof ws[cell].v === "number") {
  //               ws[cell].z = "#,##0";
  //             }
  //           } else if (
  //             headerName.includes("Taux") ||
  //             headerName.includes("TR")
  //           ) {
  //             ws[cell].s.alignment = {
  //               horizontal: "center",
  //               vertical: "center",
  //             };
  //             ws[cell].s.font = { sz: 10 };
  //           }

  //           // Style pour les cellules normales
  //           if (
  //             !rowData?.["Libellés"]?.includes("TOTAL") &&
  //             !rowData?.["DÉPENSES DE FONCTIONNEMENT"]?.includes("TOTAL")
  //           ) {
  //             ws[cell].s.font = { sz: 10, color: { rgb: "000000" } };
  //           }
  //         }
  //       }
  //     }

  //     // Fusionner les cellules pour les titres
  //     if (!ws["!merges"]) ws["!merges"] = [];

  //     // Fusionner le titre principal sur toutes les colonnes
  //     ws["!merges"].push({
  //       s: { r: 1, c: 0 },
  //       e: { r: 1, c: headers.length - 1 },
  //     });

  //     // Fusionner la période sur toutes les colonnes
  //     ws["!merges"].push({
  //       s: { r: 2, c: 0 },
  //       e: { r: 2, c: headers.length - 1 },
  //     });

  //     // Fusionner le titre du tableau sur toutes les colonnes
  //     ws["!merges"].push({
  //       s: { r: 4, c: 0 },
  //       e: { r: 4, c: headers.length - 1 },
  //     });

  //     // Ajouter la feuille au workbook
  //     XLSX.utils.book_append_sheet(wb, ws, sheetName);

  //     // Générer le fichier Excel
  //     XLSX.writeFile(wb, fileName);

  //     console.log("Export Excel avec design identique réussi:", fileName);
  //   } catch (error) {
  //     console.error("Erreur lors de l'export Excel:", error);
  //     this.errorMessage = "Erreur lors de l'export des données";
  //   }
  // }
  // Export vers Excel - Utilise le service pour la génération
  exportToExcel(): void {
    this.isLoading = true;
    this.errorMessage = "";

    // Déterminer le type d'export selon l'onglet actif
    const exportObservable = this.selectedTabIndex === 0
      ? this.rapportControleService.exportRecettesToExcel(
          this.selectedYear,
          this.selectedTrimestre,
          this.selectedPeriodType
        )
      : this.rapportControleService.exportDepensesToExcel(
          this.selectedYear,
          this.selectedTrimestre,
          this.selectedPeriodType
        );

    // Générer le nom de fichier
    const fileName = this.selectedTabIndex === 0
      ? `Recettes_${this.selectedYear}_${this.selectedTrimestre}.xlsx`
      : `Depenses_${this.selectedYear}_${this.selectedTrimestre}.xlsx`;

    // Télécharger le fichier
    exportObservable.subscribe({
      next: (blob) => {
        this.rapportControleService.downloadFile(blob, fileName);
        console.log('Export Excel réussi:', fileName);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de l\'export Excel:', error);
        this.errorMessage = 'Erreur lors de l\'export des données. Veuillez réessayer.';
        this.isLoading = false;
      }
    });
  }

  printReport(): void {
    window.print();
  }

  // Méthode pour recharger les données
  reloadData(): void {
    this.loadAllData();
  }
}
