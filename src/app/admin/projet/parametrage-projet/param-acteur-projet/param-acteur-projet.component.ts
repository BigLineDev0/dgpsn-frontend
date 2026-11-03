import {Component, OnInit, TemplateRef} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {NgbModal, NgbPaginationModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {HasAnyAuthorityDirective} from "@views/has-any-authority/has-any-authority.module";
import {SpinnerComponent} from "@/app/util/spinner/spinner.component";
import {
    FormParticipantAtelierComponent
} from "@/app/admin/serviceExterieur/atteliers/participant/form-participant-atelier/form-participant-atelier.component";
import {
    FormActeurProjetComponent
} from "@/app/admin/projet/parametrage-projet/param-acteur-projet/form-acteur-projet/form-acteur-projet.component";
import {
    RoutingConfigProjetComponent
} from "@/app/admin/projet/routimg-projet/routing-config-projet/routing-config-projet.component";
import {MatRipple} from "@angular/material/core";
import {FeatherIconDirective} from "@core/feather-icon/feather-icon.directive";
import {Authority} from "@/app/util/Authority";
import {ActeurProjetService} from "@/app/services/acteur-projet/acteur-projet.service";
import {AgentService} from "@/app/services/agent/agent.service";
import {RoleService} from "@/app/services/role/role.service";
import {Alertes} from "@/app/util/alerte";
import {Helper} from "@/app/util/helper";

@Component({
  selector: 'app-param-acteur-projet',
  templateUrl: './param-acteur-projet.component.html',
  styleUrls: ['./param-acteur-projet.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    NgbTooltipModule,
    NgbPaginationModule,
    NgSelectModule,
    HasAnyAuthorityDirective,
    SpinnerComponent,
    FormParticipantAtelierComponent,
    FormActeurProjetComponent,
    RoutingConfigProjetComponent,
    MatRipple,
    FeatherIconDirective
  ]
})
export class ParamActeurProjetComponent implements OnInit{

  displayedColumns: string[] = [
    'nom',
    'tel',
    'email',
    'role',
    'actions'
  ];
  acteurs!: MatTableDataSource<any>;
  projetLibelle:any;
  loadingIndicator = true;

  private routeSub!: Subscription;

  projetId: any;
  actorToUpdate: any;
  actors: any = [];
  roles: any = [];
  pageOptions: any = {page: 0, size: 20};
  datasource: any;
  file!: File;
  // add = Authority.ADD_ACTOR;
  // update = Authority.EDIT_ACTOR;
  // delete = Authority.DELETE_ACTOR;
  // read = Authority.READ_ACTOR;
  // export = Authority.EXPORT_ACTOR;
  // import = Authority.IMPORT_ACTOR;
  constructor(
    private readonly actorProjectService: ActeurProjetService,
    private readonly router: Router,
    private readonly agentService: AgentService,
    private readonly roleService: RoleService,
    private readonly modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.projetLibelle = localStorage.getItem('projetLibelle');
    this.getProjectId();
    this.getAllActorsOfProjet();
    this.getAllAgent();
    this.getAllRole();
  }

  getProjectId() {
    this.projetId = localStorage.getItem('projectId')!;
  }

  getAllActorsOfProjet() {
    this.pageOptions.projectId = this.projetId;
    this.actorProjectService.readActorProjects(this.pageOptions).subscribe(
      {
        next: response => {
          this.datasource = response;
          this.acteurs = response.content;
          this.loadingIndicator = false;
        },
        error: err => {
          console.log(err);
          this.loadingIndicator = false;
        },
        complete: () => {
          this.loadingIndicator = false;
        }

      })
  }

  openBasicModal(content: TemplateRef<any>, actor?: any) {
    this.actorToUpdate = actor;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
    }).catch((res) => {});
  }
  openUrl(id: any, url: any) {
    if (id) {
      localStorage.setItem('idActeur', id);
    }
    this.router.navigateByUrl(url);
  }

  close(event: boolean){
    if(event){
      this.modalService.dismissAll();
      this.getAllActorsOfProjet();
    }
  }

  getAllAgent() {
    this.agentService.getAllAgents().subscribe(response => {
      this.actors = (response.content as Array<any>).map(agent => {
        return { id: agent.id, fullName: `${agent.prenom} ${agent.nom}`}
      });
    })
  }

  getAllRole() {
    this.roleService.readRoles().subscribe(response => {
      this.roles = response.content;
    })
  }

  deleteActeur(acteurId: any) {
    this.actorProjectService.deleteActorProject(acteurId).subscribe({
      next: value => Alertes.alerteDeleteSuccess('Acteur'),
      error: value => Alertes.alerteDeleteDanger(value.error.message),
      complete: () => this.getAllActorsOfProjet()
    })
  }

  doSearch(data: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.pageOptions.projectId = this.projetId;
    this.pageOptions.agentId = data.agentId;
    this.pageOptions.roleId = data.roleId;
    this.getAllActorsOfProjet();
  }

  fileChange(event: any){
    this.file = event.target.files[0];
  }

  importActeur() {
    this.actorProjectService.importActeur(this.file, this.projetId).subscribe({
      next: value => {
        Alertes.alerteAddSuccess();
        this.close(true)
      }
    })
  }

  exportActor() {
    this.actorProjectService.exportActor().subscribe({
      next(response: any) {
        Helper.downloadFile(response, 'Acteur.csv');
      },
      error(err) {
        Alertes.alerteAddDanger('Une erreur s\'est produite lors de l\'exportation CSV :'+ err)
      },
    })
  }

  openImportActor(content: TemplateRef<any>) {
    this.openBasicModal(content);
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllActorsOfProjet();
  }
}


