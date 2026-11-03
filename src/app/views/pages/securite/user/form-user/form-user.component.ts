import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgbModal, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {AgentService} from 'src/app/services/agent/agent.service';
import {ProfilService} from 'src/app/services/profil/profil.service';
import {StructureService} from 'src/app/services/structure/structure.service';
import {UserService} from 'src/app/services/user/user.service';
import {Alertes} from 'src/app/util/alerte';
import {NgClass, NgIf} from "@angular/common";
import {NgSelectComponent} from "@ng-select/ng-select";
import {AgentToSelectComponent} from "@views/pages/securite/user/agent-to-select/agent-to-select.component";

@Component({
    selector: 'app-form-user',
    templateUrl: './form-user.component.html',
    imports: [
        NgIf,
        ReactiveFormsModule,
        NgbTooltip,
        NgSelectComponent,
        AgentToSelectComponent,
        NgClass
    ],
    standalone: true,
    styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

    @Output() submit: EventEmitter<boolean> = new EventEmitter();
    @Output() search: EventEmitter<boolean> = new EventEmitter();

    @Input() label: string = '';

    @Input() userToUpdate: any;
    @Input() isSearch: boolean = false;

    form: FormGroup = new FormGroup({});

    agents: any = [];
    selectedAgentName: any

    structures: any = [];

    profiles: any = [];
    isUpdate = false;

    constructor(
        private readonly userService: UserService,
        private readonly agentService: AgentService,
        private readonly modalService: NgbModal,
        private readonly structureService: StructureService,
        private readonly profileService: ProfilService
    ) {
    }

    ngOnInit(): void {
        this.initForm();

        // this.getAllAgent();

        this.getAllStructures();

        this.getAllProfile();

        if (this.userToUpdate != undefined) {
            this.isUpdate = true;
            this.editForm();
        } else {
            this.isUpdate = false;
        }
    }

    initForm() {
        this.form = new FormGroup(
            {
                login: new FormControl('', Validators.required),
                password: new FormControl('', Validators.required),
                status: new FormControl(''),
                agentId: new FormControl(null, Validators.required),
                structureId: new FormControl(null),
                profileId: new FormControl(null, Validators.required),
            }
        );
    }

    editForm() {
        this.form.get('login')?.setValue(this.userToUpdate?.login);
        this.form.get('password')?.setValue(this.userToUpdate?.password);
        this.form.get('status')?.setValue(this.userToUpdate?.status);
        this.form.get('agentId')?.setValue(this.userToUpdate?.agent?.id);
        this.form.get('structureId')?.setValue(this.userToUpdate?.structure?.id);
        this.form.get('profileId')?.setValue(this.userToUpdate?.profile?.id);

        // this.form.get('agentId')?.disable({onlySelf: true});
        // this.form.get('structureId')?.disable({onlySelf: true});
        // this.form.get('profileId')?.disable({onlySelf: true});
    }


    // getAllAgent() {
    //   let req = {
    //     page: 0,
    //     size: 100,
    //     sortBy: 'prenom',
    //     ascending: true
    //   };
    //   this.agentService.readAgents(req).subscribe({
    //       next: (value: ResponseApi) => {
    //         if (value.status == RESPONSE_STATUS.OK) {
    //           this.agents = value.payload;
    //           this.agents = this.agents.map((actor: any) => {
    //             {
    //               actor.fullname = `${actor.prenom} ${actor.nom}`
    //             }
    //             return actor;

    //           })
    //       }else {
    //         console.log("error ", value.message)
    //       }
    //     },

    //     error: value => { },
    //     complete: () => { }
    //   })
    // }

    openBasicModal(content: TemplateRef<any>, fieldName: string) {
        const dialogRef = this.modalService.open(content, {size: 'lg', backdrop: 'static'});
        dialogRef.result.then((result) => {
            if (result) {
                console.log("Résultat du modal :", result);
                if (result.event === 'save') {
                    this.agents = [];
                    this.agents.push(result.data);
                    this.form.controls[fieldName]?.setValue(result.data.id);
                    this.selectedAgentName = `${result.data.prenom} - ${result.data.nom} -${result.data?.structure?.code}`;
                    // ${result.data.matricule} -
                }
            }
        }).catch((res) => {
            console.log("Valeur de res :", res);
        });
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
            next: value => {
                this.profiles = value.content, console.log("cool", this.profiles)
            },
            error: value => {
            },
            complete: () => {
            }
        })
    }

    create() {
        const userRequest = this.form.value;
        console.log("user ", userRequest);
        if (this.userToUpdate == undefined) {
            this.userService.createUser(userRequest).subscribe({
                next: value => {
                    Alertes.alerteAddSuccess();
                },
                error: (value) => {
                    console.log("error ", value)
                    Alertes.alerteAddDanger(value.error?.message)
                },
                complete: () => {
                    this.close();
                }
            })
        } else {
            this.userService.updateUser(this.userToUpdate.id, userRequest).subscribe({
                next: value => {
                    Alertes.alerteAddSuccess();
                },
                error: (value) => {
                    console.log("error ", value)
                    Alertes.alerteAddDanger(value.error?.message)
                },
                complete: () => {
                    this.close();
                }
            })
        }
    }

    close() {
        this.submit.emit(true);
    }

    doSearch() {
        const user: any = this.form.value;
        console.log("critères ", user)
        this.search.emit(user);
    }

    togglePassword(input: any) {
        input.type === 'password' ? input.type = 'text' : input.type = 'password';
    }

    getIcon(input: any): any {
        return {
            off: input.type === 'password' ? true : false,
            on: input.type === 'text' ? true : false
        }
    }

}
