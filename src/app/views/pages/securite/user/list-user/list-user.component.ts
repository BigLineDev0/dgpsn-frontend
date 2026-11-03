import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgbDropdownItem, NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from 'src/app/services/user/user.service';
import {Alertes} from 'src/app/util/alerte';
import {
    MatCell, MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable,
    MatTableDataSource
} from '@angular/material/table';
import {AgentService} from 'src/app/services/agent/agent.service';
import {StructureService} from 'src/app/services/structure/structure.service';
import {ProfilService} from 'src/app/services/profil/profil.service';
import {SpinnerComponent} from "@/app/util/spinner/spinner.component";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {FeatherIconDirective} from "@core/feather-icon/feather-icon.directive";
import {NgIf} from "@angular/common";
import {FormUserComponent} from "@views/pages/securite/user/form-user/form-user.component";
import {
    FormUpdatePasswordComponent
} from "@views/pages/securite/user/form-update-password/form-update-password.component";
import {MatRipple} from "@angular/material/core";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    imports: [
        SpinnerComponent,
        MatTable,
        MatHeaderCell,
        MatColumnDef,
        MatCell,
        MatHeaderCellDef,
        MatCellDef,
        MatMenuTrigger,
        MatMenu,
        MatRipple,
        FeatherIconDirective,
        NgbDropdownItem,
        NgIf,
        MatIcon,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        NgbPagination,
        FormUserComponent,
        FormUpdatePasswordComponent,
        MatRowDef
    ],
    standalone: true,
    styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

    displayedColumns: string[] = [
        'prenom',
        'nom',
        'login',
        'profil',
        'portee',
        'strcuture',
        'activer',
        'actions'
    ];

    datasource: any;
    users: any;
    userToUpdate: any;
    agents: any = [];
    structures: any = [];
    profiles: any = [];
     pageOptions: any = {page: 0, size: 20};
    loadingIndicator = true;

    // add = Authority.ADD_USER;
    // read = Authority.READ_USER;
    // update = Authority.EDIT_USER;
    // delete = Authority.DELETE_USER;

    constructor(
        private readonly userService: UserService,
        private readonly modalService: NgbModal,
        private readonly agentService: AgentService,
        private readonly structureService: StructureService,
        private readonly profileService: ProfilService
    ) {
    }

    ngOnInit(): void {
        this.getUsers();

        this.getAllAgent();

        this.getAllStructures();

        this.getAllProfile();
    }

    getUsers() {
        this.loadingIndicator = true;
        this.userService.readUsers(this.pageOptions).subscribe({
            next: value => {
                console.log("datasource :", value)
                this.datasource = value;
                this.users = value.content;
            },
            error: err => {
                console.log(err);
                this.loadingIndicator = false;
            },
            complete: () => {
                this.loadingIndicator = false;
            }
        });
    }

    deleteUsers(id: any) {
        Alertes.confirmAction(
            "Suppression",
            "Voulez-vous vraiment executer cette action",
            () => {
                this.userService.deleteUser(id).subscribe({
                    next: value => Alertes.alerteDeleteSuccess('Suppression reussie'),
                    error: value => Alertes.alerteDeleteDanger(value.error.message),
                    complete: () => this.getUsers()
                })
            })
    }

    changeStatus(user: any) {
        this.userService.activeOrDesativeUser(user.id).subscribe({
            next: value => Alertes.alerteCustomSucces("Utilisateur " + (user.status ? 'désactivé' : 'activé') + " avec succès"),
            error: value => Alertes.errorPopPup('Erreur lors ' + (user.status ? 'de la désactivation' : 'de l\'activation'), value.error.message),
            complete: () => {
                this.getUsers();
            }
        })
    }

    openBasicModal(content: TemplateRef<any>, user?: any) {
        this.userToUpdate = user;
        this.modalService.open(content, {size: 'lg'}).result.then((result) => {
        }).catch((res) => {
        });
    }

    close(event: boolean) {
        if (event) {
            this.modalService.dismissAll();
            this.getUsers();
        }
    }

    getAllAgent() {
        this.agentService.getAllAgents().subscribe({
            next: value => this.agents = value.content,
            error: value => {
            },
            complete: () => {
            }
        })
    }

    getAllStructures() {
        let params = {page: 0, size: 2000};
        this.structureService.readStructures(params).subscribe({
            next: value => this.structures = value.content,
            error: value => {
            },
            complete: () => {
            }
        })
    }

    getAllProfile() {
        this.profileService.readProfiles().subscribe({
            next: value => this.profiles = value.content,
            error: value => {
            },
            complete: () => {
            }
        })
    }

    doSearch(data: any) {
        this.pageOptions = data;
        this.pageOptions.page = 0;
        this.pageOptions.size = 20;
        // console.log("test:",data)
        this.getUsers();
    }

    paginate($event: any) {
        this.pageOptions.page = $event - 1;
        this.getUsers();
    }

    protected readonly Number = Number;
}
