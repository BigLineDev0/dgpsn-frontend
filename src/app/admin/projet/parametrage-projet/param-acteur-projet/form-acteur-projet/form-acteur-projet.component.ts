import { ActeurProjetService } from '@/app/services/acteur-projet/acteur-projet.service';
import { AgentService } from '@/app/services/agent/agent.service';
import { RoleService } from '@/app/services/role/role.service';
import { Alertes } from '@/app/util/alerte';
import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgbTooltipModule, NgbDropdownModule, NgbPaginationModule, NgbAccordionModule, NgbNavModule, NgbProgressbarModule, NgbCarouselModule, NgbTimepickerModule, NgbPopoverModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { InfosActeurModalProjetComponent } from '../evaluation-acteur-projet/infos-acteur-modal/infos-acteur-modal-projet.component';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';


@Component({
  selector: 'app-form-acteur-projet',
  templateUrl: './form-acteur-projet.component.html',
  styleUrls: ['./form-acteur-projet.component.scss'],
          standalone:true,
  imports:[
     CommonModule,
    NgbTooltipModule,
    NgbDropdownModule,
    MatIconModule,
    // FeatherIconModule,
    NgbTooltipModule,
    MatTableModule,
    SpinnerComponent,
    NgbPaginationModule,
    MatMenuModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatStepperModule,
    NgbNavModule,
    NgbProgressbarModule,
    ListboxModule,
    FormsModule,
    NgbCarouselModule,
    // NgGanttEditorModule,
    NgbTimepickerModule,
    NgbPopoverModule,
    NgbDatepickerModule,
    MatCheckboxModule,
    // ProgrammeModule,
    // NgApexchartsModule,
    // DocumentModule,
    MatRippleModule,
    HasAnyAuthorityDirective,
    // TdbProjetSepecifiqueModule,
    // FoncierePubliqueModule,
    MatTreeModule,
    MatListModule,
    MatTooltipModule,
    MatButtonModule,

  ]
})
export class FormActeurProjetComponent implements OnInit {

  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Input() label!: string;
  @Input() projetId: any;
  @Input() selectedActor: any;
  @Input() actorToUpdate: any;
  @Input() isSearch!: boolean;
  pageOption!:{page:0,size:1000}
  form!: FormGroup;
  actors: any;
  roles: any;
  constructor(
    private agentService: AgentService,
    private roleService: RoleService,
    private actorProjectService: ActeurProjetService
  ) { }

  ngOnInit(): void {
    this.initForm();

    if(this.isSearch) {
      this.getAllAgent();
    } else {
      this.getNotSelectedAgent(this.selectedActor);
    }

    this.getAllRole();

    if(this.actorToUpdate != undefined) {
      this.editForm();
    }
  }

  initForm() {
    this.form = new FormGroup(
      {
        agentId: new FormControl('', Validators.required),
        roleId: new FormControl('', Validators.required)
      }
    );
  }

  editForm() {
    const agent = { id: this.actorToUpdate.agent.id, fullName: `${this.actorToUpdate.agent.prenom} ${this.actorToUpdate.agent.nom}`}
    this.form.get('agentId')?.disable({onlySelf: true});
    this.form.get('agentId')?.setValue(agent.id);
    this.form.get('roleId')?.setValue(this.actorToUpdate?.role.id);
  }

  getNotSelectedAgent(actors: any[]) {
    const idsToIgnore = actors.map((actor:any) => actor.agent.id);

    this.getAllAgent(idsToIgnore);
  }

  getAllAgent(idsToIgnore?: any) {
    const req: any = {};
    if (idsToIgnore) {
      req.idsToIgnore = idsToIgnore;
    }
    // req.sortBy = "nom,prenom"
    // req.ascending = true;
    req.page = 0;
    req.size = 1000000;
    this.agentService.getAllAgents(req).subscribe({
      next:reponse=>{
        console.log("List recup :",reponse)
          this.actors = (reponse.content as Array<any>).map(agent => {
            return { id: agent.id, fullName: `${agent.prenom} ${agent.nom}`}
        })
      },
      error: err => {
        console.log("error recup : ", err)
      }
    })
  }

  getAllRole() {
    let req: any = {}
    req.sortBy = 'libelle';
    req.ascending = true;
    this.roleService.readRoles(req).subscribe(response => {
      this.roles = response.content;
    })
  }

  save() {
    const actorProjectRequest = this.form.value;
    actorProjectRequest.projetId = +this.projetId;

    if(this.actorToUpdate === undefined) {
      this.create(actorProjectRequest);
    } else {
      actorProjectRequest.agentId = this.actorToUpdate.agent.id;

      this.update(this.actorToUpdate.id, actorProjectRequest);
    }
  }

  create(actorProjectRequest: any) {
    this.actorProjectService.addActorToProject(actorProjectRequest).subscribe(
      (value) => {
        Alertes.alerteAddSuccess('Acteur');
      },
      (value) => {
        Alertes.alerteAddDanger(value.error.message)
      },
      () => {
        this.close();
      });
  }

  update(actorProjectRequestId: any, actorProjectRequest: any) {
    this.actorProjectService.updateActorProject(actorProjectRequestId, actorProjectRequest).subscribe(
      (value) => {
        Alertes.alerteUpdateSuccess('Acteur');
      },
      (value) => {
        Alertes.alerteUpdateDanger(value.error.message)
      },
      () => {
        this.close();
      });
  }

  close() {
    this.submit.emit(true);
  }

  doSearch() {
    this.search.emit(this.form.value);
  }
}
