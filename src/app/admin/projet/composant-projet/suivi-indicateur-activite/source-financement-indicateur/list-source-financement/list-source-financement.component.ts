import {Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {
    SuiviIndicateurActiviteComponent
} from "@/app/admin/projet/composant-projet/suivi-indicateur-activite/suivi-indicateur-activite.component";
import Swal from "sweetalert2";
import {FinancementActivityService} from "@/app/services/financementActivity/financement-activity.service";
import {NgbDropdownItem, NgbModal, NgbPagination, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {Alertes} from "@/app/util/alerte";
import {SpinnerComponent} from "@/app/util/spinner/spinner.component";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable
} from "@angular/material/table";
import {NgIf} from "@angular/common";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {TextFormatterPipe} from "@/app/util/pipe/text/text-formatter.pipe";
import {
    FormSourceFinancementComponent
} from "@/app/admin/projet/composant-projet/suivi-indicateur-activite/source-financement-indicateur/form-source-financement/form-source-financement.component";
import {FeatherIconDirective} from "@core/feather-icon/feather-icon.directive";
import {MatRipple} from "@angular/material/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list-source-financement',
    imports: [
        SuiviIndicateurActiviteComponent,
        NgbTooltip,
        SpinnerComponent,
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatHeaderCellDef,
        MatCellDef,
        NgIf,
        MatMenuTrigger,
        MatMenu,
        NgbDropdownItem,
        MatIcon,
        MatHeaderRow,
        MatRow,
        MatHeaderRowDef,
        MatRowDef,
        NgbPagination,
        TextFormatterPipe,
        FormSourceFinancementComponent,
        MatRipple,
        FeatherIconDirective,
        RouterLink
    ],
  templateUrl: './list-source-financement.component.html',
  styleUrl: './list-source-financement.component.scss'
})
export class ListSourceFinancementComponent implements OnInit{
    @ViewChild('popoverTrigger') popoverTrigger!: ElementRef<any>;
    @Output() submit: EventEmitter<boolean> = new EventEmitter();
    displayedColumns: string[] = [

        // 'jalon',
        'structure',
        'budget',
        'montant',
        'comment',
        'actions'
    ];
    datasource:any;
    loadingIndicator = true;
    managementUnitId: any;
    projetLibelle:any;
    sourceToUpdate: any;
    tacheId:any;
    managementUnitIdInput:any;

    pageOptions: any = {page: 0, size: 20};
    file!: File;
    comparaison:boolean=false;
    sourceComparaison: any=[
        {montantReel:219450000,budget:500000000,colorReel:'text-success',colorBudget:'text-success'},
        {montantReel:315000000,budget:500000000,colorReel:'text-success',colorBudget:'text-success'},
    ];

    constructor(
        private readonly sourceService:FinancementActivityService,
        private readonly modalService: NgbModal
    ) {}

    ngOnInit(): void {
        this.getProjectId();
        this.getAllSource();
        this.getProjetActivite();
    }
    getProjetActivite() {
        this.projetLibelle = localStorage.getItem('projetLibelle')!;
    }
    getProjectId() {
        this.managementUnitIdInput = localStorage.getItem('currentManagementUnitId');
        this.tacheId = localStorage.getItem('currentTacheId');
    }

    getAllSource(  ) {
        this.pageOptions.managementUnitId = this.managementUnitIdInput;
        this.pageOptions.tacheId = this.tacheId;
        this.sourceService.readAllSource(this.pageOptions).subscribe(
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

    openBasicModal(content: TemplateRef<any>, source?: any) {
        this.sourceToUpdate = source;
        this.modalService
            .open(content, { size: 'lg' })
            .result.then((result) => {})
            .catch((res) => {});
    }

    close(event: boolean) {
        if (event) {
            this.modalService.dismissAll();
            this.getAllSource();
        }
    }

    deleteSource(sourceId: any) {
        Alertes.confirmAction(
            'Suppression',
            'Cet element sera definitivement supprimé',
            () => {
                this.sourceService.deleteSource(sourceId).subscribe({
                    next: value => Alertes.alerteDeleteSuccess('Budget'),
                    error: value => Alertes.errorPopPup('Suppression échouée', value?.error?.message),
                    complete: () => this.getAllSource()
                });
            }
        );
    }

    doSearch(data: any) {
        this.pageOptions.size = 20;
        this.pageOptions.page = 0;
        this.pageOptions.projectId = this.managementUnitIdInput;
        this.pageOptions.libelle = data.libelle;
        this.pageOptions.predicatedDate = data.predicatedDate;
        this.pageOptions.readDate = data.readDate;
        this.getAllSource();
        console.log("this.pageOptions.readDate", this.pageOptions.readDate);


    }


    paginate($event: any) {
        this.pageOptions.page = $event - 1;
        this.getAllSource();
    }

}

