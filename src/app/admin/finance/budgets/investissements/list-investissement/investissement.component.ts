import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input,
  TemplateRef,
  Signal,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatPaginatorModule, MatPaginator } from "@angular/material/paginator";
import { MatSortModule, MatSort } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule, MatDialog } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Alertes } from "@/app/util/alerte";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AgentService } from "@/app/services/agent/agent.service";

import { SpinnerComponent } from "@/app/util/spinner/spinner.component";
import { AddAgentComponent } from "@/app/admin/agent/add-agent/add-agent.component";
import { MockServiceVersion2 } from "../../../data/version2/finance.params.service";
import { LigneBudgetaire } from "../../../data/version2/budget.model";
import { BudgetService } from "../../../data/version2/budget.service";
import { AddLignesChargesComponent } from "../../charges/add-ligne-charge/add-lignes-charges.component";
import { AddInvestissementComponent } from "../add-investissement/add-investissement.component";
import {Authority} from "@/app/util/Authority";
import {HasAnyAuthorityDirective} from "@views/has-any-authority/has-any-authority.module";

@Component({
  selector: "app-investissement",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatMenuModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule,
    AddAgentComponent,
    SpinnerComponent,
    // AddLignesChargesComponent
     AddInvestissementComponent,
      HasAnyAuthorityDirective
  ],
  templateUrl: "./investissement.component.html"
})
export class InvestissementComponent implements OnInit {
  deleteLabel(arg0: any) {
    throw new Error('Method not implemented.');
  }
  @Input() backdrumpDisplay: boolean = true;
  @Input() directionId!: number;
  @Input() budgetCode!: Signal<string>;
  router = inject(Router);
  route = inject(ActivatedRoute);
  paramService = inject(MockServiceVersion2)
  rubriques = signal<LigneBudgetaire[]>([]);
  budgetService = inject(BudgetService);
  dataSource = new MatTableDataSource<LigneBudgetaire>([]);
  loading = signal<boolean>(true);
  agentToUpdate: any;
  updateAgentModal!: TemplateRef<any>;
  referentielType: any;
  add= "";
  updated ="";
  deleted = "";
  read = "";
  addAgentModal!: TemplateRef<any>;
  displayedColumns: string[] = [
    "code",
    "libelle",
    "montant",
    "actions",
  ];

  pageOptions: any = {
    page: 0,
    size: 20,
  };

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getReferentielType();
    this.loadRubriques();  
  }

  getReferentielType() {
    this.referentielType = localStorage.getItem("referentielType")!;
    this.referentielType = JSON.parse(this.referentielType);
  }

  loadRubriques() {
    try {
      this.loading.set(true);
      const rubriques = this.budgetService.allRubriquesFilterInClass("2");
      console.log("Tous les rubriques classe 2 (Investissement)",rubriques);
      this.rubriques.set(rubriques);
      this.dataSource = new MatTableDataSource<LigneBudgetaire>(rubriques);
    } catch (error) {
      console.error('Erreur lors du chargement des budgets :', error);
      this.dataSource.data = [];
    } finally {
      this.loading.set(false);
    }
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.loadRubriques();
  }

  openBasicModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, { size: "lg" })
      .result.then((result: any) => { })
      .catch((res: any) => { });
  }

  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.size = 3;
    this.pageOptions.page = 0;
    this.loadRubriques();
  }

  openDialog(content: TemplateRef<any>, modalSize: any, agent?: any) {
    this.agentToUpdate = agent;

    this.modalService
      .open(content, { size: modalSize, backdrop: "static" })
      .result.then((result: any) => { })
      .catch((res: any) => { });
  }

  close() {
    this.modalService.dismissAll();
    this.loadRubriques();
  }
  
  get excludeRubriqueCodes(): string[] {
    return this.dataSource.data.map(l => l.code);
  }
  
  get currentBudgetCode(): string {
    try {
      return this.budgetCode?.() ?? '';
    } catch {
      return '';
    }
  }
  navigateToRealisation(codeLigne: string) {
    this.router.navigate([
      '/admin/acces/finance/budgets/details/ligne',
      codeLigne,
      'realisation'
    ]);
  }
        navigateToBonEngagement(ligne: LigneBudgetaire) {
      console.log('Navigation vers bons d\'engagement pour ligne:', ligne);
      
      if (!ligne || !ligne.code) {
        Alertes.errorPopPup('Erreur', 'Ligne budgétaire invalide');
        return;
      }

      // Navigation vers la page liste des bons d'engagement avec filtrage
      this.router.navigate(['/admin/acces/finance/budgets/details/bonengagement/liste'], {
        queryParams: { 
          ligneCode: ligne.code,
          ligneLibelle: ligne.libelle,
          filterActive: 'true'
        }
      });
    }

}