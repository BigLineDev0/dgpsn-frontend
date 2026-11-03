import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {PtbaActivity, PtbaResponse} from '@/app/models/ptba.model';
import {ManangementUnitService} from "@/app/services/manangement-unit/manangement-unit.service";

interface GroupedActivity {
    objectif: string;
    objectifRowspan: number;
    actions: {
        action: string;
        actionRowspan: number;
        activities: PtbaActivity[];
    }[];
}

@Component({
    selector: 'app-ptba-table-excel',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ptba-table-excel.component.html',
    styleUrl: './ptba-table-excel.component.scss'
})
export class PtbaTableExcelComponent implements OnInit, OnChanges {
    @Input() ptbaParams!: { year: number; budgetId: string; timestamp: number };

    activities: PtbaActivity[] = [];
    groupedData: GroupedActivity[] = [];
    bailleurs: string[] = [];

    // Informations du projet
    projetName: string = '';
    projetCode: string = '';
    annee: number = new Date().getFullYear();
    totalGeneral: number = 0;

    // Loading state
    isLoading: boolean = false;
    errorMessage: string = '';

    // Mois pour les en-têtes
    trimestre1Mois = ['Janvier', 'Février', 'Mars'];
    trimestre2Mois = ['Avril', 'Mai', 'Juin'];
    trimestre3Mois = ['Juillet', 'Août', 'Septembre'];
    trimestre4Mois = ['Octobre', 'Novembre', 'Décembre'];

    constructor(
        private readonly managementUnitService: ManangementUnitService,
        private readonly route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        if (this.ptbaParams) {
            this.loadPtbaWithParams();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['ptbaParams'] && !changes['ptbaParams'].firstChange) {
            this.loadPtbaWithParams();
        }
    }

    loadPtbaWithParams() {
        this.isLoading = true;
        this.errorMessage = '';

        const { year, budgetId } = this.ptbaParams;

        // Prépare les options pour l'appel de service en fonction du mode choisi dans le parent.
        const options: { budgetId?: string; annee?: number } = {};
        if (budgetId) {
            // Mode "Par Budget" : le budgetId est la clé.
            options.budgetId = budgetId;
        } else {
            // Mode "Par Année" : l'année est la clé.
            options.annee = year;
        }

        this.managementUnitService.generatePtba(options).subscribe({
            next: (response: PtbaResponse) => {
                this.processResponse(response);
            },
            error: (error) => {
                console.error('Erreur lors du chargement du PTBA:', error);
                this.errorMessage = 'Erreur lors du chargement des données PTBA';
                this.isLoading = false;
            }
        });
    }

    processResponse(response: PtbaResponse) {
        this.activities = response.activities || [];
        this.bailleurs = response.bailleurs || [];
        this.projetName = response.projetName || '';
        this.projetCode = response.projetCode || '';
        this.annee = response.annee || new Date().getFullYear();
        this.totalGeneral = response.totalGeneral || 0;

        this.groupData();
        this.isLoading = false;
    }

    /**
     * Groupe les activités par objectif et action
     */
    groupData() {
        const grouped = new Map<string, Map<string, PtbaActivity[]>>();

        // Grouper par objectif puis par action
        this.activities.forEach(activity => {
            if (!grouped.has(activity.objectif)) {
                grouped.set(activity.objectif, new Map());
            }
            const actionsMap = grouped.get(activity.objectif)!;
            if (!actionsMap.has(activity.action)) {
                actionsMap.set(activity.action, []);
            }
            actionsMap.get(activity.action)!.push(activity);
        });

        // Convertir en structure pour le template
        this.groupedData = [];
        grouped.forEach((actionsMap, objectif) => {
            const actions: { action: string; actionRowspan: number; activities: PtbaActivity[] }[] = [];
            let objectifRowspan = 0;

            actionsMap.forEach((activities, action) => {
                actions.push({
                    action,
                    actionRowspan: activities.length,
                    activities
                });
                objectifRowspan += activities.length;
            });

            this.groupedData.push({
                objectif,
                objectifRowspan,
                actions
            });
        });
    }

    /**
     * Vérifie si une activité a lieu dans un mois donné
     */
    hasMonthActivity(activity: PtbaActivity, trimestre: number, monthIndex: number): boolean {
        const trimKey = `trimestre${trimestre}` as keyof PtbaActivity;
        const trim = activity[trimKey];

        if (!trim || typeof trim !== 'object') return false;

        const monthNames = [
            ['janvier', 'fevrier', 'mars'],
            ['avril', 'mai', 'juin'],
            ['juillet', 'aout', 'septembre'],
            ['octobre', 'novembre', 'decembre']
        ];

        const monthName = monthNames[trimestre - 1][monthIndex];
        return (trim as any)[monthName] === true;
    }

    /**
     * Formate un montant en devise
     */
    formatCurrency(amount: number): string {
        if (!amount || amount === 0) return '';
        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 0
        }).format(amount);
    }

    /**
     * Récupère la valeur d'une source de financement pour un bailleur donné
     * 🆕 Modifié pour gérer la Map dynamique
     */
    getSourceValue(activity: PtbaActivity, bailleur: string): string {
        if (!activity.sourcesFinancement || !activity.sourcesFinancement.sources) {
            return '';
        }

        const montant = activity.sourcesFinancement.sources[bailleur];
        return montant && montant > 0 ? this.formatCurrency(montant) : '';
    }

    /**
     * Calcule le total par objectif
     */
    getTotalObjectif(objectif: string): number {
        return this.activities
            .filter(a => a.objectif === objectif)
            .reduce((sum, a) => sum + (a.coutCFA || 0), 0);
    }

    /**
     * Calcule le total par action
     */
    getTotalAction(objectif: string, action: string): number {
        return this.activities
            .filter(a => a.objectif === objectif && a.action === action)
            .reduce((sum, a) => sum + (a.coutCFA || 0), 0);
    }

    /**
     * Retourne le total général
     */
    getGrandTotal(): number {
        return this.totalGeneral || this.activities.reduce((sum, a) => sum + (a.coutCFA || 0), 0);
    }

    /**
     * 🆕 Calcule le total par bailleur
     */
    getTotalByBailleur(bailleur: string): number {
        return this.activities.reduce((sum, a) => {
            const montant = a.sourcesFinancement?.sources?.[bailleur] || 0;
            return sum + montant;
        }, 0);
    }

    /**
     * 🆕 Calcule le total par bailleur pour un objectif
     */
    getTotalObjectifByBailleur(objectif: string, bailleur: string): number {
        return this.activities
            .filter(a => a.objectif === objectif)
            .reduce((sum, a) => {
                const montant = a.sourcesFinancement?.sources?.[bailleur] || 0;
                return sum + montant;
            }, 0);
    }

    /**
     * 🆕 Calcule le total par bailleur pour une action
     */
    getTotalActionByBailleur(objectif: string, action: string, bailleur: string): number {
        return this.activities
            .filter(a => a.objectif === objectif && a.action === action)
            .reduce((sum, a) => {
                const montant = a.sourcesFinancement?.sources?.[bailleur] || 0;
                return sum + montant;
            }, 0);
    }

    /**
     * Export Excel
     */
    exportToExcel() {
        console.log('Export Excel...');
        // TODO: Implémenter l'export Excel
        // Vous pouvez utiliser une bibliothèque comme xlsx ou SheetJS
    }

    /**
     * Impression
     */
    printTable() {
        window.print();
    }
}
