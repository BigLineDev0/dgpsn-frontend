import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

interface VentilationLine {
  id: string;
  classe: string;
  compte: string;
  sousCompte: string;
  rubrique: string;
  montant: number;
  solde: number;
}

@Component({
  selector: 'app-ventilation-budgetaire',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './ventilation-budgetaire.component.html',
  styleUrl: './ventilation-budgetaire.component.scss'
})
export class VentilationBudgetaireComponent implements OnChanges, OnInit {
  @Input() montantTotal: number = 0;
  @Input() isReadOnly: boolean = false;
  @Output() ventilationChange = new EventEmitter<VentilationLine[]>();

  get displayedColumns(): string[] {
    const baseColumns = ['classe', 'compte', 'sousCompte', 'rubrique', 'montant', 'solde'];
    return this.isReadOnly ? baseColumns : [...baseColumns, 'actions'];
  }
  dataSource: { data: VentilationLine[] } = { data: [] };

  // Liste fictive de comptes budgétaires (à remplacer par un service réel)
  comptesBudgets: string[] = [
    '611 - Achats de matières',
    '612 - Achats de fournitures',
    '613 - Variations de stocks',
    '614 - Achats de services',
    '615 - Transports',
    '616 - Déplacements',
    '617 - Frais postaux',
    '618 - Autres charges externes'
  ];

  filteredComptes: Observable<string[]> = of(this.comptesBudgets);

  totalVentile: number = 0;
  restantAVentiler: number = 0;
  isOverBudget: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['montantTotal']) {
      this.calculateTotals();
    }
  }

  ngOnInit(): void {
    // Données de démonstration pour présentation
    this.dataSource.data = [
      {
        id: '1',
        classe: '6',
        compte: '612 - Achats de fournitures',
        sousCompte: '612100',
        rubrique: 'Fournitures de bureau',
        montant: 1850.00,
        solde: 15000.00
      },
      {
        id: '2',
        classe: '6',
        compte: '612 - Achats de fournitures',
        sousCompte: '612200',
        rubrique: 'Matériel informatique',
        montant: 997.50,
        solde: 8500.00
      },
      {
        id: '3',
        classe: '6',
        compte: '615 - Transports',
        sousCompte: '615100',
        rubrique: 'Frais de déplacement',
        montant: 0.00,
        solde: 5000.00
      }
    ];
    this.calculateTotals();
  }

  addLine(): void {
    const newLine: VentilationLine = {
      id: Date.now().toString(),
      classe: '',
      compte: '',
      sousCompte: '',
      rubrique: '',
      montant: 0,
      solde: 0
    };
    const data = this.dataSource.data;
    data.push(newLine);
    this.dataSource.data = [...data];
    this.calculateTotals();
  }

  removeLine(id: string): void {
    const data = this.dataSource.data.filter(line => line.id !== id);
    this.dataSource.data = data;
    this.calculateTotals();
  }

  onMontantChange(line: VentilationLine, montant: number): void {
    line.montant = montant;
    this.calculateTotals();
  }

  onCompteSelection(event: any, line: VentilationLine): void {
    line.compte = event.option?.value || event.target?.value;
    this.calculateTotals();
  }

  filterComptes(value: string): void {
    this.filteredComptes = of(this.comptesBudgets.filter(compte => compte.toLowerCase().includes(value.toLowerCase())));
  }

  calculateTotals(): void {
    this.totalVentile = this.dataSource.data.reduce((sum, line) => sum + line.montant, 0);
    this.restantAVentiler = this.montantTotal - this.totalVentile;
    this.isOverBudget = this.totalVentile > this.montantTotal;

    // Mettre à jour les soldes (simulation)
    this.dataSource.data.forEach(line => {
      line.solde = Math.max(0, 10000 - line.montant); // Simulation de solde disponible
    });

    this.ventilationChange.emit(this.dataSource.data);
  }

  repartirAutomatiquement(): void {
    if (this.dataSource.data.length === 0) {
      console.log('Ajoutez d\'abord des lignes de ventilation.');
      return;
    }

    const restant = this.restantAVentiler;
    if (restant <= 0) {
      console.log('Le montant total est déjà entièrement ventilé.');
      return;
    }

    const montantParLigne = restant / this.dataSource.data.length;
    this.dataSource.data.forEach(line => {
      line.montant += montantParLigne;
    });
    this.calculateTotals();
    console.log('Répartition automatique effectuée.');
  }

  getTotalVentile(): number {
    return this.totalVentile;
  }

  getRestantAVentiler(): number {
    return this.restantAVentiler;
  }

  isFormValid(): boolean {
    return this.totalVentile === this.montantTotal && !this.isOverBudget;
  }

  getProgressBarColor(): string {
    const progress = (this.totalVentile / this.montantTotal) * 100;
    if (progress >= 100) {
      return this.isOverBudget ? 'warn' : 'primary';
    } else if (progress >= 80) {
      return 'accent';
    }
    return 'primary';
  }

  getSoldeClass(line: any): string {
    if (line.solde < line.montant) {
      return line.solde <= 0 ? 'danger' : 'warning';
    }
    return 'normal';
  }

  dismissAlert(): void {
    this.isOverBudget = false;
  }

  duplicateLine(line: any): void {
    const newLine = { ...line, id: Date.now().toString() };
    this.dataSource.data.push(newLine);
    this.dataSource.data = [...this.dataSource.data];
  }

  clearAll(): void {
    this.dataSource.data = [];
  }

  getProgressBarClass(): string {
    const progress = (this.totalVentile / this.montantTotal) * 100;

    if (this.isOverBudget) {
      return 'progress-error';
    } else if (progress >= 100) {
      return 'progress-success';
    } else if (progress >= 80) {
      return 'progress-warning';
    }
    return '';
  }
}
