import {Alertes} from "@/app/util/alerte";
import {Component, inject, Input, OnChanges, OnInit, signal, TemplateRef,} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    NgbAlertModule,
    NgbModal,
    NgbPaginationModule,
    NgbPopoverModule,
    NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {CandidatDTO, StatusCandidature} from "@/app/models/candidat.model";
import {CandidatService} from "@/app/services/candidat/candidat.service";
import {ExperienceLabelPipe} from "@/app/util/pipe/text/experience-label.pipe";
import {FeatherIconDirective} from "@core/feather-icon/feather-icon.directive";
import {FormCandidatComponent} from "@/app/admin/recrutement/suivi-recrutement/form-candidat/form-candidat.component";
import {
    DetailsCandidatsComponent
} from "@/app/admin/recrutement/suivi-recrutement/details-candidats/details-candidats.component";
import {
    NotationCandidatComponent
} from "@/app/admin/recrutement/suivi-recrutement/notation-candidat/notation-candidat.component";
import {NotationDTO} from "@/app/services/candidat/NotationService";
import { ListDocumentComponent } from "@/app/admin/document/list-document/list-document.component";

@Component({
    selector: "app-liste-candidat",
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbPaginationModule,
        NgbTooltipModule,
        NgbAlertModule,
        NgbPopoverModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatTabsModule,
        ExperienceLabelPipe,
        FeatherIconDirective,
        FormCandidatComponent,
        DetailsCandidatsComponent,
        NotationCandidatComponent,
        ListDocumentComponent,
    ],
    templateUrl: "./liste-candidat.component.html",
    styleUrls: ["./liste-candidat.component.scss"],
})
export class ListeCandidatComponent implements OnInit, OnChanges {
    @Input() typeCandidat: string = 'CAN';
    recrutementId = signal<String>('')


    private service = inject(CandidatService);
    modalService = inject(NgbModal);
    candidatToUpdate = signal<CandidatDTO | undefined>(undefined);
    page = 0;
    size = 20;
    loading = this.service.loading;
    displayedColumns: string[] = ['nom', 'designation', 'adresse', 'salaire', 'experience', 'actions'];
    // dataSource = new MatTableDataSource<CandidatDTO>([]);


    ngOnInit(): void {
        this.service.getInfosRecrutementInfosFromLocalStorage();
        this.load();
    }

    ngOnChanges(): void {
        this.load();
    }

    private load(): void {
        this.service.loadCandidats({ page: this.page, size: this.size });
    }

    get candidats(): CandidatDTO[] {
        return this.getCandidatsByType();
    }

    getCandidatsByType(): CandidatDTO[] {
        const map = {
            CAN: null ,
            CAN_PRE_ENT: StatusCandidature.PRESELECTED_FOR_INTERVIEW,
            CAN_RET: StatusCandidature.SELECTED_AFTER_INTERVIEW,
            CAN_PRE_FINAL: StatusCandidature.ACCEPTED,
        };
        const status = map[this.typeCandidat as keyof typeof map];
        return status
            ? this.service.candidatsByStatus(status)()
            : this.service.candidats();
    }



    getBadgeClass(candidat: CandidatDTO): string {
        switch (candidat.statusCandidature) {
            case StatusCandidature.IN_PROGRESS:
                return "badge text-bg-secondary";
            case StatusCandidature.PRESELECTED_FOR_INTERVIEW:
                return "badge text-bg-warning";
            case StatusCandidature.SELECTED_AFTER_INTERVIEW:
                return "badge text-bg-info";
            case StatusCandidature.ACCEPTED:
                return "badge text-bg-success";
            case StatusCandidature.REJECTED:
                return "badge text-bg-danger";
            default:
                return "badge text-bg-secondary";
        }
    }

    getStatutLabel(candidat: CandidatDTO): string {
        const labels: Record<StatusCandidature, string> = {
            [StatusCandidature.IN_PROGRESS]: "En cours",
            [StatusCandidature.PRESELECTED_FOR_INTERVIEW]: "Présélectionné",
            [StatusCandidature.SELECTED_AFTER_INTERVIEW]: "Retenu après entretien",
            [StatusCandidature.ACCEPTED]: "Accepté",
            [StatusCandidature.REJECTED]: "Rejeté",
        };
        return labels[candidat.statusCandidature!] || "Inconnu";
    }

    updateStatus(
        candidat: CandidatDTO,
        action: "PRESELECT" | "SELECT" | "ACCEPT" | "REJECT" | "INPROGRESS"
    ): void {
        let newStatus: StatusCandidature | undefined;

        switch (action) {
            case "PRESELECT":
                newStatus = StatusCandidature.PRESELECTED_FOR_INTERVIEW;
                break;
            case "SELECT":
                newStatus = StatusCandidature.SELECTED_AFTER_INTERVIEW;
                break;
            case "ACCEPT":
                newStatus = StatusCandidature.ACCEPTED;
                break;
            case "REJECT":
                newStatus = StatusCandidature.REJECTED;
                break;

            default :
                newStatus = StatusCandidature.IN_PROGRESS;
        }

        Alertes.confirmAction("Confirmation", "Mettre à jour le statut ?", () => {
            // const data = {
            //     id: candidat.id,
            //     statusCandidature: newStatus,
            // };

            this.service.updateCandidat(candidat.id!, {
                id: candidat.id,
                statusCandidature: newStatus,
            }).subscribe({
                next: () => {
                    Alertes.success("Statut mis à jour !");
                    this.load();
                },
                error: () => Alertes.error("Échec de la mise à jour"),
            });
        });
    }

    delete(id: number | undefined): void {
        if (!id) return;

        Alertes.confirmAction("Suppression", "Supprimer ce candidat ?", () => {
            this.service.deleteCandidat(id).subscribe({
                next: () => {
                    Alertes.success("Supprimé !");
                    this.load();
                },
            });
        });
    }

    paginate(page: number): void {
        this.page = page - 1;
        this.load();
    }



    openBasicModal(content: TemplateRef<any>, size?: any, candidat?: CandidatDTO) {
        if(candidat){
            this.candidatToUpdate.set(candidat);
        }
        this.modalService
            .open(content, { size: size, backdrop: "static" })
            .result.then(() => {})
            .catch(() => {});
    }

    close(event: boolean) {
        if (event) {
            this.modalService.dismissAll();
            this.load()
        }
    }

}