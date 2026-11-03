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
import { AddLignesChargesComponent } from "../add-ligne-charge/add-lignes-charges.component";
import { AddAgentComponent } from "@/app/admin/agent/add-agent/add-agent.component";
import { NewMockService } from "../../../data/newmock.service";
import { MockServiceVersion2 } from "../../../data/version2/finance.params.service";
import { LigneBudgetaire } from "../../../data/version2/budget.model";
import { BudgetService } from "../../../data/version2/budget.service";
import { LigneBudgetaireService } from "@/app/services/ligneBudgetaire/ligne-budgetaire.service";
import { log } from "console";


@Component({
  selector: "app-lignes-charges",
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
    AddLignesChargesComponent
  ],
  templateUrl: "./lignes-charges.component.html",
  styleUrl: "./lignes-charges.component.scss",
})
export class LignesChargesComponent implements OnInit {
  deleteLabel(arg0: any) {
    throw new Error('Method not implemented.');
  }
  @Input() backdrumpDisplay: boolean = true;
  @Input() typeLigneBugetaire:any
  @Input() selectedClasseId:any
  @Input() directionId!: number;
  @Input() budgetCode!: Signal<string>;
  
  dataSource :any;
  loading = signal<boolean>(true);
  agentToUpdate: any;
    loadingIndicator = true;
    projetlibelle: any;
    budgatToUpdate: any;
    pageOptions: any = { page: 0, size: 20 };
  updateAgentModal!: TemplateRef<any>;
  referentielType: any;
  addAgentModal!: TemplateRef<any>;
  displayedColumns: string[] = [
    "code",
    "libelle",
    "montant",
    "actions",
  ];

  constructor(private modalService: NgbModal,private ligneService:LigneBudgetaireService,
    private router :Router
  ) { }

  ngOnInit(): void {
    this.getAllLigneBudgetaire();
  }


  getAllLigneBudgetaire() {
    let req  = this.pageOptions
    req.typeLigneBugetaire = this.typeLigneBugetaire
    req.budgetId = localStorage.getItem("budgetId")
    this.ligneService.readAllLigneBudgetaire(req).subscribe({
      next: response => {
        this.dataSource = response;
        console.log("  this.dataSource",  this.dataSource);
        this.loadingIndicator = false;
      },
      error: err => {
        console.log(err);
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }

  openBasicModal(content: TemplateRef<any>, budget?: any) {
    this.budgatToUpdate = budget;
   console.log("this.budgatToUpdate",this.budgatToUpdate)
    this.modalService
      .open(content, { size: 'lg' })
      .result.then((result) => {})
      .catch((res) => {});
  }

  close(event: any) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllLigneBudgetaire();
    }
  }

  deleteBudget(budgetId: any) {
    Alertes.confirmAction(
      'Suppression',
      'Cet élément sera définitivement supprimé',
      () => {
        this.ligneService.deleteLigneBudgetaire(budgetId).subscribe({
          next: value => Alertes.alerteDeleteSuccess('Budget DGPSN'),
          error: value => Alertes.errorPopPup('Suppression échouée', value?.error?.message),
          complete: () => this.getAllLigneBudgetaire()
        });
      }
    );
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllLigneBudgetaire();
  }

   openBudgetDetails(lignebudget: any) {
    console.log('ehj',lignebudget);
    localStorage.setItem('lignebudgetId',lignebudget.id)
     localStorage.setItem('realisationId',lignebudget?.rubrique?.id)
    this.router.navigate(['/admin/acces/finance/budgets/realisation']);

  }

  calculTotalMontant(montantDepense: number, montantRecette: number): number {
    return (montantDepense || 0) + (montantRecette || 0);
  }


}
