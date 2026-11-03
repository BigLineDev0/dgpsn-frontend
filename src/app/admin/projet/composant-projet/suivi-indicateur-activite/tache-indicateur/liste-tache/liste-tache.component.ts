import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {
    SuiviIndicateurActiviteComponent
} from "@/app/admin/projet/composant-projet/suivi-indicateur-activite/suivi-indicateur-activite.component";
import {NgbDropdownItem, NgbModal, NgbModalRef, NgbPagination, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {TacheService} from "@/app/services/tache/tache.service";
import {Alertes} from "@/app/util/alerte";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {SpinnerComponent} from "@/app/util/spinner/spinner.component";
import {FeatherIconDirective} from "@core/feather-icon/feather-icon.directive";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatRipple} from "@angular/material/core";
import {MatIcon} from "@angular/material/icon";
import {
    FormTacheComponent
} from "@/app/admin/projet/composant-projet/suivi-indicateur-activite/tache-indicateur/form-tache/form-tache.component";

@Component({
    selector: 'app-liste-tache',
    imports: [
        SuiviIndicateurActiviteComponent,
        DatePipe,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatTable,
        NgForOf,
        NgIf,
        NgbPagination,
        NgbTooltip,
        SpinnerComponent,
        FormTacheComponent,
        NgClass,
        MatHeaderCellDef,
        FeatherIconDirective,
        MatRipple,
        MatIcon,
        MatMenu,
        NgbDropdownItem,
        MatMenuTrigger,
        FormTacheComponent
    ],
    templateUrl: './liste-tache.component.html',
    styleUrl: './liste-tache.component.scss'
})
export class ListeTacheComponent implements OnInit{

    displayedColumns: string[] = [
        'trimestre',
        'mois',
        'semaines',
        'dateDebut',
        'dateFin',
        'commentaire',
        'statut',
        'actions'
    ];

    datasource: any;
    @Input() activity: any;
    loadingIndicator = true;
    indicatorId: any;
    activite: any;
    tacheToUpdate: any;
    modalRef!: NgbModalRef;
    pageOptions: any = { page: 0, size: 20 };

    private readonly MOIS_LABELS: { [key: number]: string } = {
        1: 'Janvier', 2: 'Février', 3: 'Mars', 4: 'Avril',
        5: 'Mai', 6: 'Juin', 7: 'Juillet', 8: 'Août',
        9: 'Septembre', 10: 'Octobre', 11: 'Novembre', 12: 'Décembre'
    };

    private readonly STATUT_LABELS: { [key: string]: string } = {
        'PLANIFIE': 'Planifié',
        'EN_COURS': 'En cours',
        'TERMINE': 'Terminé'
    };

    constructor(
        private readonly tacheService: TacheService,
        private readonly modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.getActivite();
        this.loadTaches();
        this.getAllId();
    }

    getActivite() {
        this.activite = sessionStorage.getItem('activite');
        if (this.activite) {
            this.activite = JSON.parse(this.activite);
        }
    }

    getAllId() {
        this.indicatorId = sessionStorage.getItem('currentIndicatorId');
    }

    loadTaches() {
        this.loadingIndicator = true;
        this.pageOptions.activiteId = this.activity;

        this.tacheService.readTaches(this.pageOptions, this.pageOptions).subscribe({
            next: response => {
                if (response?.payload) {
                    this.datasource = {
                        content: response.payload,
                        totalElements: response.metadata?.totalElements || 0,
                        totalPages: response.metadata?.totalPages || 0,
                        number: response.metadata?.number || 0,
                        size: response.metadata?.size || 20
                    };
                } else {
                    this.datasource = response;
                }
                this.loadingIndicator = false;
            },
            error: err => {
                console.error('Error loading taches:', err);
                this.loadingIndicator = false;
                Alertes.alerteAddDanger('Erreur lors du chargement des tâches');
            }
        });
    }

    openModal(content: TemplateRef<any>, tache?: any) {
        this.tacheToUpdate = tache;
        this.modalRef = this.modalService.open(content, { size: 'lg', backdrop: 'static' });
    }

    close(event: boolean) {
        if (event) {
            this.modalService.dismissAll();
            this.loadTaches();
        }
    }

    deleteTache(tacheId: any) {
        Alertes.confirmAction(
            'Voulez-vous supprimer cette tâche ?',
            'Cette action est irréversible',
            () => {
                this.tacheService.deleteTache(tacheId).subscribe({
                    next: () => {
                        Alertes.alerteDeleteSuccess('Tâche supprimée avec succès');
                        this.loadTaches();
                    },
                    error: (err) => {
                        Alertes.alerteAddDanger(err?.error?.message || 'Erreur lors de la suppression');
                    }
                });
            }
        );
    }

    doSearch(data: any) {
        this.pageOptions.size = 20;
        this.pageOptions.page = 0;
        this.pageOptions.activiteId = this.activity;
        this.pageOptions.trimestre = data.trimestre;
        this.pageOptions.mois = data.mois;
        this.pageOptions.statut = data.statut;
        this.loadTaches();
    }

    paginate($event: any) {
        this.pageOptions.page = $event - 1;
        this.loadTaches();
    }

    getMoisLabel(mois: number): string {
        return this.MOIS_LABELS[mois] || 'Inconnu';
    }

    getStatutLabel(statut: string): string {
        return this.STATUT_LABELS[statut] || statut;
    }

    updateStatus(tache: any, statut: string) {
        if (tache.statut === statut) {
            return; // Éviter la mise à jour si le statut est le même
        }

        Alertes.confirmAction(
            'Confirmation de changement de statut',
            `Voulez-vous changer le statut de cette tâche en "${this.getStatutLabel(statut)}" ?`,
            () => {
                this.tacheService.updateTacheStatut(tache.id, statut).subscribe({
                    next: () => {
                        Alertes.alerteUpdateSuccess('Statut mis à jour avec succès');
                        this.loadTaches();
                    },
                    error: (err) => {
                        Alertes.alerteAddDanger(err?.error?.message || 'Erreur lors de la mise à jour du statut');
                    }
                });
            }
        );
    }

    exportTaches() {
        this.tacheService.exportTaches().subscribe({
            next: (blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `Taches_${new Date().toISOString().split('T')[0]}.csv`;
                link.click();
                window.URL.revokeObjectURL(url);
                Alertes.alerteAddSuccess('Export réussi');
            },
            error: (err) => {
                console.error('Error exporting taches:', err);
                Alertes.alerteAddDanger('Erreur lors de l\'export');
            }
        });
    }

    colorBadgeStatut(statut: string): string {
        const colors: any = {
            'PLANIFIE': 'bg-secondary',
            'EN_COURS': 'bg-warning',
            'TERMINE': 'bg-success'
        };
        return colors[statut] || 'bg-secondary';
    }
}
