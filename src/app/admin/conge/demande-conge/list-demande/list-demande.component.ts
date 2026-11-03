import {Alertes} from '@/app/util/alerte';
import {CommonModule} from '@angular/common';
import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {
    NgbAccordionModule,
    NgbAlertModule,
    NgbDropdownModule,
    NgbModal,
    NgbNavModule,
    NgbPaginationModule,
    NgbPopoverModule,
    NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import {AddDemandeComponent} from '../add-demande/add-demande.component';
import {SpinnerComponent} from '@/app/util/spinner/spinner.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {FeatherIconDirective} from '@core/feather-icon/feather-icon.directive';
import {NgSelectModule} from '@ng-select/ng-select';
import {HasAnyAuthorityDirective} from '@views/has-any-authority/has-any-authority.module';
import {QuillModule} from 'ngx-quill';
import {CongeService} from '@/app/services/conge/conge.service';
import {DemandeComponent} from '../../demande/demande.component';
import {DeciderArreterComponent} from '../../decider-arreter/decider-arreter.component';
import {RenseignementComponent} from '../../renseignement/renseignement.component';
import {ListDocumentComponent} from '@/app/admin/document/list-document/list-document.component';
import {FormValidationComponent} from '@/app/admin/workflow/form-validation/form-validation.component';
import {
    HistoriqueValidationComponent
} from '@/app/admin/workflow/historique-validation/historique-validation.component';
import {AgentRoutingComponent} from "@/app/admin/agent/agent-routing/agent-routing.component";
import {CongeExportService} from '@/app/services/CongeExport/conge-export.service';
import {Authority} from "@/app/util/Authority";

@Component({
    selector: 'app-list-demande',
    imports: [
        CommonModule,
        AddDemandeComponent,
        NgbPaginationModule,
        NgbDropdownModule,
        SpinnerComponent,
        MatTabsModule,
        NgbAccordionModule,
        MatDialogModule,
        MatTableModule,
        NgbTooltipModule,
        NgbNavModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule,
        FeatherIconDirective,
        MatRippleModule,
        ReactiveFormsModule,
        NgSelectModule,
        MatButtonModule,
        QuillModule,
        MatRadioModule,
        NgbNavModule,
        MatCardModule,
        FormsModule,
        MatPaginatorModule,
        MatSelectModule,
        NgbAlertModule,
        HasAnyAuthorityDirective,
        NgbPopoverModule,
        DemandeComponent,
        DeciderArreterComponent,
        RenseignementComponent,
        ListDocumentComponent,
        FormValidationComponent,
        HistoriqueValidationComponent,
        AgentRoutingComponent,
        NgbPaginationModule,
        NgbDropdownModule,
        SpinnerComponent,
        MatTabsModule,
        NgbAccordionModule,
        MatDialogModule,
        MatTableModule,
        NgbTooltipModule,
        NgbNavModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule,
        FeatherIconDirective,
        MatRippleModule,
        ReactiveFormsModule,
        NgSelectModule,
        MatButtonModule,
        QuillModule,
        MatRadioModule,
        NgbNavModule,
        MatCardModule,
        FormsModule,
        MatPaginatorModule,
        MatSelectModule,
        NgbAlertModule,
        HasAnyAuthorityDirective,
        NgbPopoverModule,
        DemandeComponent,
        DeciderArreterComponent,
        RenseignementComponent,
        ListDocumentComponent,
        FormValidationComponent,
        HistoriqueValidationComponent,
    ],
    templateUrl: './list-demande.component.html',
    styleUrl: './list-demande.component.scss',
    standalone: true,
})
export class ListDemandeComponent {
    baseColumns: string[] = [
        'matricule',
        'nom',
        'prenom',
        'libelle',
        'dateDemande',
        'duree',
        'actions',
    ];
    @ViewChild('updateDecisionModal') updateDecisionModal!: TemplateRef<any>;
    displayedColumns: string[] = [];

    // displayedColumns: string[] = [
    //   'matricule',
    //   'nom',
    //   'prenom',
    //   'libelle',
    //   'dateDemande',
    //   // 'dateDebut',
    //   // 'dateFin',
    //   // 'dateReprise',
    //   'duree',
    //    'etape',
    //   // 'objet',
    //   // 'statut',
    //   'actions',
    // ];
    @Input() typeConge: any
    agentId: any
    defaultNavActiveId = 1;
    dataSource: any
    annee: any
    loadingExport: any = false;
    isCongeAgentRoute: any
    congeToUpdate: any;
    pendingStatus: any;
    selectedStepId: any;
    currentStep: any;
    selectedFluxId: any
    availableYears: { value: number }[] = [];
    numeroDecision: any
    congeId: any
    etape: any
    loadingIndicator: boolean = true
    pageOptions: any = {
        page: 0, size: 20
    }

    add = Authority.ADD_CONGE;
    updated = Authority.EDIT_CONGE;
    deleted = Authority.DELETE_CONGE;
    readDocument = Authority.READ_DOCUMENT;
    generer_demande = Authority.GENERATE_DEMANDE_CONGE;
    generer_fiche = Authority.GENERATE_FICHE_CONGE;
    generer_decision = Authority.GENERATE_DECISION_CONGE;
    readCessationService =Authority.READ_CESSATION_CONGE;
    valited_conge = Authority.VALIDATION_CONGE;
     generer_be = Authority.GENERATE_BE_CONGE;
    validateConge = Authority. VALIDATION_CONGE;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private congeService: CongeService,
        private Sanitizer: DomSanitizer,
        private congeExportService: CongeExportService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.availableYears = this.generateYears();
        this.isCongeAgentRoute = this.router.url.includes('/admin/acces/agent/conge');
        this.getIdAgent();
        this.getAllDemandes();
        this.updateDisplayedColumns()
        this.annee = new Date().getFullYear();

    }

    getAllDemandes() {
        this.loadingIndicator = true;
        this.loadingIndicator = true;
        const params = this.pageOptions;
        params.typeConge = this.typeConge
        if (this.isCongeAgentRoute) {
            params.agentId = this.agentId
        }
        this.congeService.readPageConges(params).subscribe({
            next: (response) => {
                this.dataSource = response;
                this.etape = response.payload
                console.log(" this.etape  ", this.etape);
            },
            error: (response) => console.log(response),
            complete: () => (this.loadingIndicator = false),
        });

    }

    getIdAgent() {
        if (this.isCongeAgentRoute) {
            this.agentId = localStorage.getItem('idAgent');
        }
    }

    openBasicModal(content: TemplateRef<any>, size?: any, conge?: any) {
        this.congeToUpdate = conge;
        console.log(" this.congeToUpdate", this.congeToUpdate);
        this.selectedFluxId = conge?.id;
        this.selectedStepId = conge?.workflowStep?.id
        // console.log("selectedFluxId", this.selectedFluxId);
        // console.log("selectedStepId", this.selectedStepId);

        this.modalService
            .open(content, {size: size, backdrop: 'static'})
            .result.then((result) => {
            this.modalService.dismissAll();
        })
            .catch((res) => {
            });
    }

    close(event?: boolean) {
        if (event) {
            this.modalService.dismissAll();
            this.getAllDemandes();
        }
    }

    delete(congeId: any) {
        Alertes.confirmAction(
            'Voulez-vous supprimé ?',
            'Cet element sera definitivement supprimé',
            () => {
                this.congeService.deleteConge(congeId).subscribe({
                    next: (response) => {
                        Alertes.alerteDeleteSuccess();
                    },
                    error: (response) => {
                        Alertes.errorPopPup('suppression échouée', response?.error?.message)
                    },
                    complete: () => this.getAllDemandes(),
                });
            }
        );
    }

    doSearch(data: any) {
        this.pageOptions = data;
        this.pageOptions.page = 0;
        this.pageOptions.size = 20;
        this.modalService.dismissAll();
        this.getAllDemandes();
    }

    paginate($event: any) {
        this.loadingIndicator = true;
        this.pageOptions.page = $event - 1;
        this.getAllDemandes();
    }


    openUrl(url: any) {
        this.router.navigateByUrl(url);
    }

    openNavigateCessationService(congeId: any) {
        localStorage.setItem('congeId', congeId)
        this.router.navigateByUrl('/admin/acces/prise-service');
    }

    openSortieTerritoire(congeId: any, url: any) {
        localStorage.setItem('congeId', congeId)
        this.router.navigateByUrl(url);
    }

    generateYears(): { value: number }[] {
        const listYears: { value: number }[] = [];
        const dateActu: Date = new Date();
        for (let year = dateActu.getFullYear(); year >= 1960; year--) {
            listYears.push({value: year});
        }
        return listYears;
    }


    getBadgeClass(statut: any) {
        switch (statut.name) {
            case 'ACCEPTER':
                return 'badge text-bg-success';
            case 'REFUSER':
                return 'badge text-bg-danger';
            default:
                return 'badge text-bg-secondary';
        }
    }

    // updateStatus(conge: any, statutType: string) {
    //   Alertes.confirmAction(
    //     'Confirmation',
    //     'Voulez-vous mettre à jour le statut ?',
    //     () => {
    //       this.congeService.updateCongeStatut(conge.id, statutType).subscribe({
    //         next: (response) => {
    //           if (response?.status == "BAD_REQUEST") {
    //             Alertes.errorPopPup('Validation échouée', response?.message)
    //           } else {
    //             Alertes.alerteAddSuccess();
    //             // this.close();
    //           }
    //         },
    //         error: (response) => console.log(response),
    //         complete: () => this.getAllDemandes(),
    //       });
    //     }
    //   );
    // }
    onUpdateStatus(conge: any, status: string): void {
        this.congeId = conge.id;
        if (status === 'ACCEPTER' && (!conge.numeroDecision || conge.numeroDecision === null)) {
            this.pendingStatus = status;
            this.modalService.open(this.updateDecisionModal, {centered: true, backdrop: 'static'});
        } else if (status === 'ACCEPTER') {
            // Si numeroDecision existe pour ACCEPTER, une seule confirmation
            Alertes.confirmAction(
                'Confirmation',
                `Le numéro de décision ${conge.numeroDecision} 
            a été attribué à ce congé. Voulez-vous changer son statut ?`,
                () => {
                    this.congeService.updateCongeStatut(conge.id, status).subscribe({
                        next: (response) => {
                            if (response?.status === 'BAD_REQUEST') {
                                Alertes.errorPopPup('Validation échouée', response?.message);
                            } else {
                                Alertes.alerteAddSuccess('Statut mis à jour avec succès');
                                conge.statutType.name = status; // Mettre à jour l'affichage
                                this.getAllDemandes(); // Rafraîchir la liste
                            }
                        },
                        error: (error) => {
                            console.error('Erreur lors de la mise à jour du statut:', error);
                            Alertes.errorPopPup('Erreur lors de la mise à jour du statut', error?.error?.message);
                        },
                        complete: () => this.getAllDemandes(),
                    });
                }
            );
        } else {
            // Pour les autres statuts, demander confirmation
            Alertes.confirmAction(
                'Confirmation',
                'Voulez-vous mettre à jour le statut ?',
                () => {
                    this.updateStatus(conge, status);
                }
            );
        }
    }

    updateStatus(conge: any, status: string): void {
        Alertes.confirmAction(
            'Confirmation',
            'Voulez-vous mettre à jour le statut ?',
            () => {
                this.congeService.updateCongeStatut(conge.id, status).subscribe({
                    next: (response) => {
                        if (response?.status === 'BAD_REQUEST') {
                            Alertes.errorPopPup('Validation échouée', response?.message);
                        } else {
                            Alertes.alerteAddSuccess('Statut mis à jour avec succès');
                            conge.statutType.name = status; // Mettre à jour l'affichage
                            this.getAllDemandes(); // Rafraîchir la liste
                        }
                    },
                    error: (error) => {
                        console.error('Erreur lors de la mise à jour du statut:', error);
                        Alertes.errorPopPup('Erreur lors de la mise à jour du statut', error?.error?.message);
                    },
                    complete: () => this.getAllDemandes(),
                });
            }
        );
    }


    updateNumeroDecision(): void {
        if (!this.numeroDecision) {
            Alertes.errorPopPup('Erreur', 'Veuillez saisir un numéro de décision');
            return;
        }
        this.congeService.updateNumeroDecision(this.congeId, this.numeroDecision).subscribe({
            next: (response) => {
                if (response?.body?.status === 'BAD_REQUEST') {
                    Alertes.errorPopPup('Validation échouée', response?.body?.message);
                } else {
                    Alertes.alerteAddSuccess('Numéro de décision mis à jour avec succès');
                    this.modalService.dismissAll();
                    this.numeroDecision = null;
                    this.getAllDemandes();
                }
            },
            error: (error) => {
                console.error('Erreur lors de la mise à jour:', error);
                Alertes.errorPopPup('Erreur lors de la mise à jour du numéro', error?.error?.message);
            },
        });
    }

    updateNumeroDecisionAndAccept(): void {
        this.updateNumeroDecision();
    }


    closeModal(modal?: any) {
        modal.close();
        this.getAllDemandes();
    }

    updateDisplayedColumns() {
        this.displayedColumns = [...this.baseColumns];
        if (this.typeConge === 'ADMINISTRATIF') {
            this.displayedColumns.splice(this.displayedColumns.length - 1, 0, 'etape');
        }
        console.log('Colonnes affichées :', this.displayedColumns);
    }

    exportExcel() {
        this.loadingExport = true;
        this.congeExportService.exportExcel(this.annee || undefined).subscribe({
            next: (data) => {
                console.log('Export CSV réussi', data);
            },
            error: (err) => {
                Alertes.errorPopPup('Erreur lors de l\'export CSV. Veuillez réessayer.', err);
                this.loadingExport = false;
            },
            complete: () => {
                this.loadingExport = false;
                this.closeDemande();
            }
        });
    }

    exportCSV() {
        this.loadingExport = true;
        this.congeExportService.exportCSV(this.annee || undefined).subscribe({
            next: (data) => {
                console.log('Export CSV réussi', data);
            },
            error: (err) => {
                Alertes.errorPopPup('Erreur lors de l\'export CSV. Veuillez réessayer.', err);
                this.loadingExport = false;
            },
            complete: () => {
                this.loadingExport = false;
                this.closeDemande();
            }
        });
    }

    closeDemande() {
        this.modalService.dismissAll();
        this.getAllDemandes();
    }
}
