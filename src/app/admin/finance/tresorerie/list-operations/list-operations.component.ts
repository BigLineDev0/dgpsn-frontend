// list-operations/list-operations.component.ts
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { Operation, CompteBancaire } from '../models/tresorerie.model';
import { MOCK_OPERATIONS, MOCK_COMPTES } from '../mock-data/tresorerie-mock.data';
import { Alertes } from '../../../../util/alerte';

@Component({
  selector: 'app-list-operations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './list-operations.component.html',
  styleUrls: ['./list-operations.component.scss']
})
export class ListOperationsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'dateOperation',
    'compte',
    'libelle',
    'typeOperation',
    'sensOperation',
    'montant',
    'beneficiaire',
    'statut',
    'actions'
  ];

  dataSource: any = { payload: [], metadata: {} };
  allOperations: Operation[] = [...MOCK_OPERATIONS];
  selectedCompte?: CompteBancaire;
  compteId?: number;
  loadingIndicator = false;

  pageOptions: any = { 
    page: 0, 
    size: 10 
  };

  filterDateDebut?: string;
  filterDateFin?: string;
  filterSensOperation?: string;
  filterStatut?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['compteId']) {
        this.compteId = +params['compteId'];
        this.pageOptions.compteId = this.compteId;
        this.loadCompte();
      }
    });
    this.loadOperations();
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.sort.sortChange.subscribe((s: Sort) => {
        const sortKeyMap: Record<string, string> = {
          dateOperation: 'dateOperation',
          libelle: 'libelle',
          montant: 'montant',
          statut: 'statut.name'
        };
        const mapped = sortKeyMap[s.active];
        if (!mapped) return;
        
        const direction = s.direction || 'desc';
        this.pageOptions = {
          ...this.pageOptions,
          sort: `${mapped},${direction}`
        };
        this.loadOperations();
      });
    }
  }

  loadCompte(): void {
    if (this.compteId) {
      this.selectedCompte = MOCK_COMPTES.find(c => c.id === this.compteId);
    }
  }

  loadOperations(): void {
    this.loadingIndicator = true;
    
    setTimeout(() => {
      let filteredOps = [...this.allOperations];

      if (this.compteId) {
        filteredOps = filteredOps.filter(op => op.compteBancaire?.id === this.compteId);
      }

      if (this.filterDateDebut) {
        const dateDebut = new Date(this.filterDateDebut);
        filteredOps = filteredOps.filter(op => new Date(op.dateOperation) >= dateDebut);
      }

      if (this.filterDateFin) {
        const dateFin = new Date(this.filterDateFin);
        filteredOps = filteredOps.filter(op => new Date(op.dateOperation) <= dateFin);
      }

      if (this.filterSensOperation) {
        filteredOps = filteredOps.filter(op => op.sensOperation === this.filterSensOperation);
      }

      if (this.filterStatut) {
        filteredOps = filteredOps.filter(op => op.statut?.name === this.filterStatut);
      }

      if (this.pageOptions.sort) {
        filteredOps = this.applySorting(filteredOps);
      }

      const totalElements = filteredOps.length;
      const totalPages = Math.ceil(totalElements / this.pageOptions.size);
      const start = this.pageOptions.page * this.pageOptions.size;
      const end = start + this.pageOptions.size;
      const paginatedOps = filteredOps.slice(start, end);

      this.dataSource = {
        payload: paginatedOps,
        metadata: {
          totalElements: totalElements,
          totalPages: totalPages,
          currentPage: this.pageOptions.page,
          pageSize: this.pageOptions.size
        }
      };

      this.loadingIndicator = false;
    }, 300);
  }

  applySorting(operations: Operation[]): Operation[] {
    if (!this.pageOptions.sort) return operations;

    const [field, direction] = this.pageOptions.sort.split(',');
    
    return operations.sort((a: any, b: any) => {
      let valA: any;
      let valB: any;

      if (field === 'statut.name') {
        valA = a.statut?.name || '';
        valB = b.statut?.name || '';
      } else if (field === 'dateOperation') {
        valA = new Date(a[field]).getTime();
        valB = new Date(b[field]).getTime();
      } else {
        valA = a[field];
        valB = b[field];
      }

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  paginate(page: number): void {
    if (page && page > 0) {
      this.pageOptions.page = page - 1;
      this.loadOperations();
    }
  }

  onPageSizeChange(): void {
    this.pageOptions.page = 0;
    this.loadOperations();
  }

  ajouterOperation(): void {
    const queryParams = this.compteId ? { compteId: this.compteId } : {};
    this.router.navigate(['/admin/finance/tresorerie/add-operation'], { queryParams });
  }

  retourComptes(): void {
    this.router.navigate(['/admin/finance/tresorerie/list-comptes']);
  }

  validerOperation(operation: Operation): void {
    Alertes.confirmAction(
      'Validation',
      'Voulez-vous valider cette opération ?',
      () => {
        const index = this.allOperations.findIndex(op => op.id === operation.id);
        if (index !== -1) {
          this.allOperations[index] = {
            ...this.allOperations[index],
            statut: { name: 'VALIDE', description: 'Validé' },
            validatedBy: 'Directeur Financier',
            validatedAt: new Date()
          };
        }
        
        setTimeout(() => {
          Alertes.alerteAddSuccess('Opération validée');
          this.loadOperations();
          if (this.compteId) {
            this.loadCompte();
          }
        }, 300);
      }
    );
  }

  deleteOperation(id: number): void {
    Alertes.confirmAction(
      'Confirmation',
      'Voulez-vous supprimer cette opération ? Cette action est irréversible.',
      () => {
        const index = this.allOperations.findIndex(op => op.id === id);
        if (index !== -1) {
          this.allOperations.splice(index, 1);
        }
        
        setTimeout(() => {
          Alertes.alerteAddSuccess('Opération supprimée');
          this.loadOperations();
          if (this.compteId) {
            this.loadCompte();
          }
        }, 300);
      }
    );
  }

  applyFilters(): void {
    this.pageOptions.page = 0;
    this.loadOperations();
  }

  resetFilters(): void {
    this.filterDateDebut = undefined;
    this.filterDateFin = undefined;
    this.filterSensOperation = undefined;
    this.filterStatut = undefined;
    
    this.pageOptions = {
      page: 0,
      size: this.pageOptions.size,
      compteId: this.compteId
    };
    this.loadOperations();
  }

  getSensOperationBadge(sens: string): string {
    return sens === 'CREDIT' ? 'badge bg-success' : 'badge bg-danger';
  }

  getStatutBadge(statut: any): string {
    const badges: Record<string, string> = {
      'BROUILLON': 'bg-secondary',
      'EN_ATTENTE': 'bg-warning text-dark',
      'VALIDE': 'bg-success',
      'REJETE': 'bg-danger'
    };
    return `badge ${badges[statut?.name] || 'bg-secondary'}`;
  }

  exportOperations(format: 'excel' | 'pdf'): void {
    if (!this.compteId) {
      Alertes.alerteAddDanger('Veuillez sélectionner un compte');
      return;
    }
    
    Alertes.alerteAddSuccess(`Export ${format.toUpperCase()} en cours...`);
  }

  // ============================================================================
  // MÉTHODES D'IMPRESSION
  // ============================================================================

  /**
   * Imprimer toute la liste des opérations affichées
   */
  imprimerListe(): void {
    // Message d'information
    setTimeout(() => {
      const printContent = this.generatePrintContent(this.dataSource.payload);
      this.openPrintWindow(printContent);
    }, 100);
  }

  /**
   * Imprimer uniquement les opérations sélectionnées
   */
  imprimerSelection(): void {
    Alertes.alerteAddDanger('Veuillez d\'abord sélectionner des opérations');
  }

  /**
   * Aperçu avant impression
   */
  apercuAvantImpression(): void {
    const printContent = this.generatePrintContent(this.dataSource.payload);
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
    }
  }

  /**
   * Générer le contenu HTML pour l'impression
   */
  private generatePrintContent(operations: any[]): string {
    const today = new Date().toLocaleDateString('fr-FR');
    const compteInfo = this.selectedCompte 
      ? `<p><strong>Compte :</strong> ${this.selectedCompte.numeroCompte} - ${this.selectedCompte.libelleCompte}</p>
         <p><strong>Solde actuel :</strong> ${this.selectedCompte.soldeActuel.toLocaleString('fr-FR')} ${this.selectedCompte.devise}</p>`
      : '';

    return `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Liste des Opérations - DGPSN</title>
        <style>
          @page { margin: 2cm; size: A4 landscape; }
          body { font-family: Arial, sans-serif; font-size: 11px; color: #333; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #d0a217; padding-bottom: 20px; }
          .header h1 { color: #d0a217; margin: 0 0 10px 0; font-size: 24px; }
          .header h2 { margin: 5px 0; font-size: 18px; color: #555; }
          .info-section { margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-left: 4px solid #d0a217; }
          .info-section p { margin: 5px 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background: #d0a217; color: white; padding: 10px 8px; text-align: left; font-weight: bold; font-size: 11px; }
          td { padding: 8px; border-bottom: 1px solid #dee2e6; font-size: 10px; }
          tr:nth-child(even) { background: #f8f9fa; }
          .text-center { text-align: center; }
          .text-end { text-align: right; }
          .badge { display: inline-block; padding: 3px 8px; border-radius: 3px; font-size: 9px; font-weight: bold; }
          .badge-success { background: #d4edda; color: #155724; }
          .badge-danger { background: #f8d7da; color: #721c24; }
          .amount-credit { color: #28a745; font-weight: bold; }
          .amount-debit { color: #dc3545; font-weight: bold; }
          .footer { margin-top: 30px; text-align: center; font-size: 10px; color: #6c757d; border-top: 1px solid #dee2e6; padding-top: 15px; }
          @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>DÉLÉGATION GÉNÉRALE À LA PROTECTION SOCIALE</h1>
          <h2>Liste des Opérations de Trésorerie</h2>
          <p>Imprimé le ${today}</p>
        </div>
        <div class="info-section">
          ${compteInfo}
          <p><strong>Nombre d'opérations :</strong> ${operations.length}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Libellé</th>
              <th>Type</th>
              <th class="text-center">Sens</th>
              <th class="text-end">Montant</th>
              <th>Bénéficiaire</th>
              <th class="text-center">Statut</th>
            </tr>
          </thead>
          <tbody>
            ${operations.map(oper => `
              <tr>
                <td>${new Date(oper.dateOperation).toLocaleDateString('fr-FR')}</td>
                <td>${oper.libelle}</td>
                <td>${oper.typeOperation?.description || ''}</td>
                <td class="text-center">
                  <span class="badge ${oper.sensOperation === 'CREDIT' ? 'badge-success' : 'badge-danger'}">
                    ${oper.sensOperation}
                  </span>
                </td>
                <td class="text-end ${oper.sensOperation === 'CREDIT' ? 'amount-credit' : 'amount-debit'}">
                  ${oper.sensOperation === 'DEBIT' ? '-' : '+'}${oper.montant.toLocaleString('fr-FR')}
                </td>
                <td>${oper.beneficiaire || '-'}</td>
                <td class="text-center">
                  <span class="badge">${oper.statut?.description || ''}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="footer">
          <p>Document généré automatiquement par le système de gestion de la trésorerie DGPSN</p>
        </div>
      </body>
      </html>`;
  }

  /**
   * Ouvrir la fenêtre d'impression
   */
  private openPrintWindow(content: string): void {
    const printWindow = window.open('', '_blank', 'width=1200,height=800');
    
    if (printWindow) {
      printWindow.document.write(content);
      printWindow.document.close();
      
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };
    } else {
      Alertes.alerteAddDanger('Impossible d\'ouvrir la fenêtre d\'impression. Veuillez autoriser les pop-ups.');
    }
  }
}