import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherIconDirective } from '@core/feather-icon/feather-icon.directive';

interface AuditLog {
  id: string;
  date: Date;
  utilisateur: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'VALIDATE' | 'REJECT' | 'DOWNLOAD' | 'EXPORT';
  module: string;
  reference: string;
  description: string;
  ipAddress: string;
  details?: string;
}

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatRippleModule,
    NgbPaginationModule,
    NgbTooltipModule,
    FeatherIconDirective
  ],
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.scss'
})
export class AuditComponent implements OnInit {

  displayedColumns: string[] = [
    'date',
    'utilisateur',
    'action',
    'module',
    'reference',
    'description',
    'ipAddress',
    'actions'
  ];

  // Données mockées des logs d'audit
  private allLogs: AuditLog[] = [
    {
      id: 'LOG-001',
      date: new Date('2025-01-20T10:30:00'),
      utilisateur: 'Amadou DIOP',
      action: 'CREATE',
      module: 'Bons d\'Engagement',
      reference: 'BE-001',
      description: 'Création du bon d\'engagement BE-001 pour salaires personnel',
      ipAddress: '192.168.1.105',
      details: 'Montant: 15M FCFA, Type: Investissement'
    },
    {
      id: 'LOG-002',
      date: new Date('2025-01-20T11:15:00'),
      utilisateur: 'Fatou SALL',
      action: 'VALIDATE',
      module: 'Bons d\'Engagement',
      reference: 'BE-001',
      description: 'Validation du bon d\'engagement BE-001',
      ipAddress: '192.168.1.112',
      details: 'Approuvé par le directeur financier'
    },
    {
      id: 'LOG-003',
      date: new Date('2025-01-20T14:22:00'),
      utilisateur: 'Moussa NDIAYE',
      action: 'UPDATE',
      module: 'Bons d\'Engagement',
      reference: 'BE-002',
      description: 'Modification du montant du BE-002',
      ipAddress: '192.168.1.098',
      details: 'Montant modifié: 8.5M FCFA → 9M FCFA'
    },
    {
      id: 'LOG-004',
      date: new Date('2025-01-20T15:45:00'),
      utilisateur: 'Aminata BA',
      action: 'EXPORT',
      module: 'Bons d\'Engagement',
      reference: 'EXPORT-2025-01',
      description: 'Export Excel des bons d\'engagement de janvier',
      ipAddress: '192.168.1.087',
      details: '10 bons d\'engagement exportés'
    },
    {
      id: 'LOG-005',
      date: new Date('2025-01-20T16:10:00'),
      utilisateur: 'Cheikh FALL',
      action: 'DELETE',
      module: 'Bons d\'Engagement',
      reference: 'BE-005',
      description: 'Suppression du bon d\'engagement BE-005',
      ipAddress: '192.168.1.120',
      details: 'Bon annulé par erreur de saisie'
    },
    {
      id: 'LOG-006',
      date: new Date('2025-01-19T09:30:00'),
      utilisateur: 'Awa THIAM',
      action: 'CREATE',
      module: 'Budget',
      reference: 'BUDG-2025-001',
      description: 'Création du budget 2025',
      ipAddress: '192.168.1.099',
      details: 'Budget total: 1.5 Mds FCFA'
    },
    {
      id: 'LOG-007',
      date: new Date('2025-01-19T10:50:00'),
      utilisateur: 'Ibrahima SARR',
      action: 'VALIDATE',
      module: 'Budget',
      reference: 'BUDG-2025-001',
      description: 'Validation du budget annuel 2025',
      ipAddress: '192.168.1.145',
      details: 'Approuvé par la direction générale'
    },
    {
      id: 'LOG-008',
      date: new Date('2025-01-19T14:20:00'),
      utilisateur: 'Marieme SECK',
      action: 'DOWNLOAD',
      module: 'Bons d\'Engagement',
      reference: 'BE-003',
      description: 'Téléchargement du document BE-003',
      ipAddress: '192.168.1.078',
      details: 'Document PDF téléchargé'
    },
    {
      id: 'LOG-009',
      date: new Date('2025-01-18T11:35:00'),
      utilisateur: 'Ousmane DIALLO',
      action: 'REJECT',
      module: 'Bons d\'Engagement',
      reference: 'BE-004',
      description: 'Rejet du bon d\'engagement BE-004',
      ipAddress: '192.168.1.156',
      details: 'Montant non conforme au budget'
    },
    {
      id: 'LOG-010',
      date: new Date('2025-01-18T15:00:00'),
      utilisateur: 'Khadija Kane',
      action: 'UPDATE',
      module: 'Ligne Budgétaire',
      reference: 'LIG-001',
      description: 'Modification de la ligne budgétaire LIG-001',
      ipAddress: '192.168.1.167',
      details: 'Budget ajusté suite à révision'
    },
    {
      id: 'LOG-011',
      date: new Date('2025-01-17T09:15:00'),
      utilisateur: 'Amadou DIOP',
      action: 'CREATE',
      module: 'Bons d\'Engagement',
      reference: 'BE-006',
      description: 'Création du BE-006 pour fournitures',
      ipAddress: '192.168.1.105',
      details: 'Montant: 2.5M FCFA'
    },
    {
      id: 'LOG-012',
      date: new Date('2025-01-17T10:45:00'),
      utilisateur: 'Fatou SALL',
      action: 'VALIDATE',
      module: 'Bons d\'Engagement',
      reference: 'BE-006',
      description: 'Validation du BE-006',
      ipAddress: '192.168.1.112',
      details: 'Validation en attente de paiement'
    }
  ];

  dataSource: any;
  loadingIndicator: boolean = false;
  
  // Filtres
  selectedAction: string = '';
  selectedModule: string = '';
  searchQuery: string = '';
  dateDebut: string = '';
  dateFin: string = '';

  // Options pour les filtres
  actionOptions: string[] = ['CREATE', 'UPDATE', 'DELETE', 'VALIDATE', 'REJECT', 'DOWNLOAD', 'EXPORT'];
  moduleOptions: string[] = ['Bons d\'Engagement', 'Budget', 'Ligne Budgétaire'];

  pageOptions: any = {
    page: 0,
    size: 10
  };

  ngOnInit(): void {
    this.loadAuditLogs();
  }

  @Input() set pageSize(size: number) {
    this.pageOptions.size = size;
    this.loadAuditLogs();
  }
  /**
   * Charge et filtre les logs d'audit
   */
  loadAuditLogs(): void {
    this.loadingIndicator = true;

    setTimeout(() => {
      let filteredLogs = [...this.allLogs];

      // Filtrer par action
      if (this.selectedAction) {
        filteredLogs = filteredLogs.filter(log => log.action === this.selectedAction);
      }

      // Filtrer par module
      if (this.selectedModule) {
        filteredLogs = filteredLogs.filter(log => log.module === this.selectedModule);
      }

      // Filtrer par recherche textuelle
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filteredLogs = filteredLogs.filter(log =>
          log.utilisateur.toLowerCase().includes(query) ||
          log.reference.toLowerCase().includes(query) ||
          log.description.toLowerCase().includes(query)
        );
      }

      // Filtrer par date de début
      if (this.dateDebut) {
        const debut = new Date(this.dateDebut);
        filteredLogs = filteredLogs.filter(log => log.date >= debut);
      }

      // Filtrer par date de fin
      if (this.dateFin) {
        const fin = new Date(this.dateFin);
        fin.setHours(23, 59, 59, 999);
        filteredLogs = filteredLogs.filter(log => log.date <= fin);
      }

      // Trier par date décroissante
      filteredLogs.sort((a, b) => b.date.getTime() - a.date.getTime());

      // Pagination
      const startIndex = this.pageOptions.page * this.pageOptions.size;
      const endIndex = startIndex + this.pageOptions.size;
      const paginatedData = filteredLogs.slice(startIndex, endIndex);

      this.dataSource = {
        payload: paginatedData,
        metadata: {
          totalElements: filteredLogs.length
        }
      };

      this.loadingIndicator = false;
    }, 300);
  }

  /**
   * Applique les filtres
   */
  applyFilters(): void {
    this.pageOptions.page = 0;
    this.loadAuditLogs();
  }

  /**
   * Réinitialise les filtres
   */
  clearFilters(): void {
    this.selectedAction = '';
    this.selectedModule = '';
    this.searchQuery = '';
    this.dateDebut = '';
    this.dateFin = '';
    this.pageOptions.page = 0;
    this.loadAuditLogs();
  }

  /**
   * Pagination
   */
  paginate(page: number): void {
    this.pageOptions.page = page - 1;
    this.loadAuditLogs();
  }

  /**
   * Voir les détails d'un log
   */
  voirDetails(log: AuditLog): void {
    console.log('Détails du log:', log);
    alert(`Détails du log:\n\n${log.details || 'Aucun détail supplémentaire'}`);
  }

  /**
   * Obtient l'icône pour une action
   */
  getActionIcon(action: string): string {
    const icons: Record<string, string> = {
      'CREATE': 'add_circle',
      'UPDATE': 'edit',
      'DELETE': 'delete',
      'VALIDATE': 'check_circle',
      'REJECT': 'cancel',
      'DOWNLOAD': 'download',
      'EXPORT': 'file_download'
    };
    return icons[action] || 'info';
  }

  /**
   * Obtient la classe CSS pour le badge d'action
   */
  getActionBadgeClass(action: string): string {
    const classes: Record<string, string> = {
      'CREATE': 'text-bg-success',
      'UPDATE': 'text-bg-primary',
      'DELETE': 'text-bg-danger',
      'VALIDATE': 'text-bg-info',
      'REJECT': 'text-bg-warning',
      'DOWNLOAD': 'text-bg-secondary',
      'EXPORT': 'text-bg-dark'
    };
    return classes[action] || 'text-bg-secondary';
  }

  /**
   * Obtient le label français pour une action
   */
  getActionLabel(action: string): string {
    const labels: Record<string, string> = {
      'CREATE': 'Création',
      'UPDATE': 'Modification',
      'DELETE': 'Suppression',
      'VALIDATE': 'Validation',
      'REJECT': 'Rejet',
      'DOWNLOAD': 'Téléchargement',
      'EXPORT': 'Export'
    };
    return labels[action] || action;
  }

  /**
   * Formate une date
   */
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  /**
   * Export des logs
   */
  exportLogs(): void {
    console.log('Export des logs d\'audit');
    alert('Fonctionnalité d\'export en cours de développement');
  }
}