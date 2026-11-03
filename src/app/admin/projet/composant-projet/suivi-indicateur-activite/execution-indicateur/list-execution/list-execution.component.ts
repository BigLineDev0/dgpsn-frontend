import {Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import {
    SuiviIndicateurActiviteComponent
} from "@/app/admin/projet/composant-projet/suivi-indicateur-activite/suivi-indicateur-activite.component";
import {DatePipe, NgIf} from "@angular/common";
import {
    FormExecutionComponent
} from "@/app/admin/projet/finacement-projet/execution-financement/form-execution/form-execution.component";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {NgbDropdownItem, NgbModal, NgbPagination, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {
    SourceDeDonneesComponent
} from "@/app/admin/projet/finacement-projet/budget-global/source-de-donnees/source-de-donnees.component";
import {SpinnerComponent} from "@/app/util/spinner/spinner.component";
import {MatIcon} from "@angular/material/icon";
import {MatRipple} from "@angular/material/core";
import {FinancementActivityService} from "@/app/services/financementActivity/financement-activity.service";
import Swal from "sweetalert2";
import {Alertes} from "@/app/util/alerte";
import {FeatherIconDirective} from "@core/feather-icon/feather-icon.directive";

@Component({
  selector: 'app-list-execution',
    imports: [
        SuiviIndicateurActiviteComponent,
        DatePipe,
        FormExecutionComponent,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatIcon,
        MatMenu,
        MatRipple,
        MatRow,
        MatRowDef,
        MatTable,
        NgIf,
        NgbDropdownItem,
        NgbPagination,
        NgbTooltip,
        SourceDeDonneesComponent,
        SpinnerComponent,
        MatMenuTrigger,
        FeatherIconDirective,
        MatHeaderCellDef
    ],
  templateUrl: './list-execution.component.html',
  styleUrl: './list-execution.component.scss'
})
export class ListExecutionComponent {

    @ViewChild('popoverTrigger') popoverTrigger!: ElementRef<any>;
    displayedColumns: string[] = [

        'libelle',
        'annee',
        'startingDate',
        'endingDate',
        'estimatedAmount',
        'actualAmount',
        'comment',
        'actions'
    ];

    datasource:any;
    loading =true;

    dates!: MatTableDataSource<any>;
    loadingIndicator = true;
    managementUnitId: any;
    projetLibelle:any;
    executionToUpdate: any;
    pageOptions: any = {page: 0, size: 20};
    file!: File;
    add="";
    update="";
    delete="";
    read="";
    export="";
    import="";

    comparaison:boolean=false;
    sourceComparaison: any=[
        {montantReel:11500000,montantPrevue:12500000,colorReel:'text-success',colorPrevue:'text-success'},
        {montantReel:390000000,montantPrevue:390000000,colorReel:'text-success',colorPrevue:'text-success'},
    ];
    constructor(
        private financementService: FinancementActivityService,
        private modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.getProjectId();
        this.getAllExecutionFinancement();
        this.getProjetActivite();
    }

    getProjetActivite() {
        this.projetLibelle = localStorage.getItem('projetLibelle')!;
        this.projetLibelle = JSON.parse(this.projetLibelle);
    }

    getProjectId() {
        this.managementUnitId = localStorage.getItem('managementUnitId')!;
    }

    getAllExecutionFinancement(  ) {
        this.pageOptions.managementUnitId = this.managementUnitId;
        this.financementService.readAllExecution(this.pageOptions).subscribe(
            {
                next: response => {
                    this.datasource = response;
                    this.loadingIndicator = false;
                },
                error: err => {
                    console.log(err);
                    this.loadingIndicator = false;
                },
                complete: () => {
                    this.loadingIndicator = false;
                }
            }
        );
    }

    chargerFichier() {
        Swal.fire({
            title: 'Comparaison...',
            text: 'Comparaison des données en cours...',
            icon: 'info',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        setTimeout(() => {
            Swal.close();
            this.comparaison = true;
            this.alertePop();
        }, 3000);

    }

    alertePop(){
        Swal.fire({
            title: 'Succès!',
            text: 'Les données ont été comparées avec succès. Vous pouvez maintenant consulter les résultats ou effectuer d\'autres actions.',
            icon: 'success',
            timer: 10000,
            timerProgressBar: true,
            showConfirmButton: true,
            allowOutsideClick: true,
        });
    }
    openBasicModal(content: TemplateRef<any>,execution?: any) {
        this.executionToUpdate =execution;
        this.modalService
            .open(content, { size: 'lg' })
            .result.then((result) => {})
            .catch((res) => {});
    }

    close(event: boolean) {
        if (event) {
            this.modalService.dismissAll();
            this.getAllExecutionFinancement();
        }
    }

    deleteExecution(executionId: any) {
        Alertes.confirmAction(
            'Suppression',
            'Cet element sera definitivement supprimé',
            () => {
                this.financementService.deleteExecution(executionId).subscribe({
                    next: value => Alertes.alerteDeleteSuccess('execution'),
                    error: value => Alertes.errorPopPup('Suppression échouée', value?.error?.message),
                    complete: () => this.getAllExecutionFinancement()
                });
            }
        );
    }

    doSearch(data: any) {
        this.pageOptions.size = 20;
        this.pageOptions.page = 0;
        this.pageOptions.managementUnitId = this.managementUnitId;
        this.pageOptions.libelle = data.libelle;
        this.pageOptions.predicatedDate = data.predicatedDate;
        this.pageOptions.readDate = data.readDate;
        this.getAllExecutionFinancement();
        console.log("this.pageOptions.readDate", this.pageOptions.readDate);


    }
    paginate($event: any) {
        this.pageOptions.page = $event - 1;
        this.getAllExecutionFinancement();
    }

}
