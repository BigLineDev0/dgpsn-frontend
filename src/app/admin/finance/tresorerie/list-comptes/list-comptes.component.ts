// list-comptes/list-comptes.component.ts
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { saveAs } from 'file-saver';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx-js-style';

import { CompteBancaire, DashboardTresorerie } from '../models/tresorerie.model';
import { Alertes } from '../../../../util/alerte';
import { MOCK_DASHBOARD, MOCK_RESPONSE } from '../mock-data/tresorerie-mock.data';

@Component({
  selector: 'app-list-comptes',
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
  templateUrl: './list-comptes.component.html',
  styleUrls: ['./list-comptes.component.scss']
})
export class ListComptesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'numeroCompte',
    'libelleCompte',
    'banque',
    'typeCompte',
    'compteDesigne',
    'projet',
    'devise',
    'soldeActuel',
    'statut',
    'actions'
  ];

  dataSource: any = { payload: [], metadata: {} };
  dashboardData?: DashboardTresorerie;
  searchCriteria: any = {};
  loadingIndicator = false;

  pageOptions: any = { 
    page: 0, 
    size: 10 
  };

  constructor(
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
    this.loadComptes();
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.sort.sortChange.subscribe((s: Sort) => {
        const sortKeyMap: Record<string, string> = {
          numeroCompte: 'numeroCompte',
          libelleCompte: 'libelleCompte',
          banque: 'banque.libelle',
          typeCompte: 'typeCompte.name',
          soldeActuel: 'soldeActuel',
          statut: 'statut.name'
        };
        const mapped = sortKeyMap[s.active];
        if (!mapped) return;
        
        const direction = s.direction || 'asc';
        this.pageOptions = {
          ...this.pageOptions,
          sort: `${mapped},${direction}`
        };
        this.loadComptes();
      });
    }
  }

  loadDashboard(): void {
    setTimeout(() => {
      this.dashboardData = MOCK_DASHBOARD;
    }, 100);
  }

  loadComptes(): void {
    this.loadingIndicator = true;
    setTimeout(() => {
      this.dataSource = MOCK_RESPONSE;
      this.loadingIndicator = false;
    }, 300);
  }

  paginate(page: number): void {
    if (page && page > 0) {
      this.pageOptions.page = page - 1;
      this.loadComptes();
    }
  }

  onPageSizeChange(): void {
    this.pageOptions.page = 0;
    this.loadComptes();
  }

  ajouterCompte(): void {
    this.router.navigate(['/admin/finance/tresorerie/add-compte']);
  }

  voirOperations(compte: CompteBancaire): void {
    this.router.navigate(['/admin/finance/tresorerie/list-operations'], {
      queryParams: { compteId: compte.id }
    });
  }

  // voirSituation(): void {
  //   this.router.navigate(['/admin/finance/tresorerie/situation-tresorerie']);
  // }

  // voirPlanTresorerie(): void {
  //   this.router.navigate(['/admin/finance/tresorerie/plan-tresorerie']);
  // }

  toggleStatut(compte: CompteBancaire): void {
    const newStatut = compte.statut?.name === 'ACTIF' ? 'INACTIF' : 'ACTIF';
    Alertes.confirmAction(
      'Confirmation',
      `Voulez-vous ${newStatut === 'ACTIF' ? 'activer' : 'désactiver'} ce compte ?`,
      () => {
        setTimeout(() => {
          if (compte.statut) {
            compte.statut.name = newStatut;
            compte.statut.description = newStatut === 'ACTIF' ? 'Actif' : 'Inactif';
          }
          Alertes.alerteAddSuccess('Statut mis à jour');
          this.loadComptes();
          this.loadDashboard();
        }, 300);
      }
    );
  }

  deleteCompte(id: number): void {
    Alertes.confirmAction(
      'Confirmation',
      'Voulez-vous supprimer ce compte ? Cette action est irréversible.',
      () => {
        setTimeout(() => {
          const index = this.dataSource.payload.findIndex((c: CompteBancaire) => c.id === id);
          if (index > -1) {
            this.dataSource.payload.splice(index, 1);
            this.dataSource.metadata.totalElements--;
          }
          Alertes.alerteAddSuccess('Compte supprimé');
          this.loadComptes();
          this.loadDashboard();
        }, 300);
      }
    );
  }

  getTypeCompteBadge(type: any): string {
    const badges: Record<string, string> = {
      'COURANT': 'bg-primary',
      'EPARGNE': 'bg-info',
      'COMPTE_DESIGNE': 'bg-warning text-dark',
      'AUTRE': 'bg-secondary'
    };
    return `badge ${badges[type?.name] || 'bg-secondary'}`;
  }

  getStatutBadge(statut: any): string {
    const badges: Record<string, string> = {
      'ACTIF': 'bg-success',
      'INACTIF': 'bg-warning text-dark',
      'CLOTURE': 'bg-danger'
    };
    return `badge ${badges[statut?.name] || 'bg-secondary'}`;
  }

  doSearch(criteria: any): void {
    this.searchCriteria = { ...criteria };
    this.pageOptions = { ...criteria, page: 0, size: this.pageOptions.size };
    this.loadComptes();
  }

  hasSearchCriteria(): boolean {
    return Object.keys(this.searchCriteria).length > 0 &&
      Object.values(this.searchCriteria).some(value =>
        value !== null && value !== undefined && value !== ''
      );
  }

  exportData(format: 'excel' | 'pdf'): void {
    if (!this.dataSource?.payload?.length) {
      Alertes.alerteAddDanger('Aucune donnée à exporter');
      return;
    }

    if (format === 'excel') {
      this.exportToExcel();
    } else {
      this.exportToPdf();
    }
  }

  private exportToExcel(): void {
    try {
      const columns = [
        { header: 'N° Compte', dataKey: 'numeroCompte' },
        { header: 'Libellé', dataKey: 'libelleCompte' },
        { header: 'Banque', dataKey: 'banque' },
        { header: 'Type', dataKey: 'typeCompte' },
        { header: 'Compte Désigné', dataKey: 'compteDesigne' },
        { header: 'Projet', dataKey: 'projet' },
        { header: 'Bailleur', dataKey: 'bailleur' },
        { header: 'Devise', dataKey: 'devise' },
        { header: 'Solde Initial', dataKey: 'soldeInitial' },
        { header: 'Solde Actuel', dataKey: 'soldeActuel' },
        { header: 'Statut', dataKey: 'statut' }
      ];

      const data = this.dataSource.payload.map((compte: CompteBancaire) => ({
        numeroCompte: compte.numeroCompte || '',
        libelleCompte: compte.libelleCompte || '',
        banque: compte.banque?.libelle || '',
        typeCompte: compte.typeCompte?.description || '',
        compteDesigne: compte.isCompteDesigne ? 'Oui' : 'Non',
        projet: compte.projet?.libelle || '',
        bailleur: compte.bailleur?.libelle || '',
        devise: compte.devise || '',
        soldeInitial: compte.soldeInitial || 0,
        soldeActuel: compte.soldeActuel || 0,
        statut: compte.statut?.description || ''
      }));

      const ws = XLSX.utils.aoa_to_sheet([
        ['Gestion de la Trésorerie - Liste des Comptes Bancaires'],
        columns.map(col => col.header),
        ...data.map((row: any) => columns.map(col => row[col.dataKey]))
      ]);

      const titleRange = { s: { r: 0, c: 0 }, e: { r: 0, c: columns.length - 1 } };
      ws['!merges'] = [titleRange];
      const titleCell = XLSX.utils.encode_cell({ r: 0, c: 0 });
      ws[titleCell].s = {
        fill: { fgColor: { rgb: '5a7a5e' } },
        font: { bold: true, sz: 14, color: { rgb: 'FFFFFF' } },
        alignment: { horizontal: 'center' }
      };

      const headerStyle = {
        fill: { fgColor: { rgb: '5a7a5e' } },
        font: { bold: true, color: { rgb: 'FFFFFF' } },
        alignment: { horizontal: 'center' }
      };

      for (let col = 0; col < columns.length; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 1, c: col });
        if (!ws[cellAddress]) ws[cellAddress] = { v: columns[col].header };
        ws[cellAddress].s = headerStyle;
      }

      ws['!cols'] = columns.map(() => ({ wch: 20 }));

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Comptes Bancaires');

      const excelOutput = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelOutput], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      saveAs(blob, `Tresorerie_Comptes_${new Date().toISOString().split('T')[0]}.xlsx`);

      Alertes.alerteAddSuccess('Export Excel réussi');
    } catch (err) {
      console.error('Erreur export Excel:', err);
      Alertes.alerteAddDanger('Erreur lors de l\'export Excel');
    }
  }

  private exportToPdf(): void {
    const doc = new jsPDF.default('l', 'mm', 'a4');

    doc.setFontSize(16);
    doc.text('Gestion de la Trésorerie - Liste des Comptes Bancaires', 14, 15);

    const columns = [
      'N° Compte',
      'Libellé',
      'Banque',
      'Type',
      'Projet',
      'Devise',
      'Solde Actuel',
      'Statut'
    ];

    const data = this.dataSource.payload.map((compte: CompteBancaire) => [
      compte.numeroCompte || '',
      compte.libelleCompte || '',
      compte.banque?.libelle || '',
      compte.typeCompte?.description || '',
      compte.projet?.libelle || '',
      compte.devise || '',
      `${(compte.soldeActuel || 0).toLocaleString()} ${compte.devise}`,
      compte.statut?.description || ''
    ]);

    (doc as any).autoTable({
      head: [columns],
      body: data,
      startY: 25,
      theme: 'grid',
      headStyles: {
        fillColor: [90, 122, 94],
        textColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        fontSize: 8
      },
      margin: { top: 25, left: 10, right: 10 }
    });

    doc.save(`Tresorerie_Comptes_${new Date().toISOString().split('T')[0]}.pdf`);
    Alertes.alerteAddSuccess('Export PDF réussi');
  }
}