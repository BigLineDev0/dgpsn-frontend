import {Component, OnInit, TemplateRef,CUSTOM_ELEMENTS_SCHEMA, ViewChild, signal} from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfilService } from 'src/app/services/profil/profil.service';
import { Alertes } from 'src/app/util/alerte';
import { AlerteService } from 'src/app/services/alerte/alerte.service';
import {ListeConfigAlerteComponent} from "./liste-config-alerte/liste-config-alerte.component";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Authority } from '@/app/util/Authority';
import { EditAlerteComponent } from '../edit-alerte/edit-alerte.component';
import { ListAlerteComponent } from '../list-alerte/list-alerte.component';
import { DetailsAlerteComponent } from '../details-alerte/details-alerte.component';
import { MainAlerteComponent } from '../main-alerte/main-alerte.component';
import { UserAlertComponent } from '../user-alert/user-alert.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TemplateService } from '@/app/services/template/template.service';

export type SeverityAlert = 'HAUTE' | 'BASSE' | 'MOYENNE';

export enum SeverityAlertEnum {
  HAUTE = 'HAUTE',
  BASSE = 'BASSE',
  MOYENNE = 'MOYENNE'
}

export interface Profile {
  id: number;
  libelle: string;
}

export interface Priority {
  id: number;
  name: SeverityAlert;
  description: string;
}

export interface Alert {
  id: number;
  name: string;
  description: string;
  priority: Priority;
  profiles: Profile[];
  date: Date;
}

// Profils administratifs
export const ADMIN_PROFILES: Profile[] = [
  { id: 1, libelle: 'Responsable RH' },
  { id: 2, libelle: 'Responsable Budget' },
  { id: 3, libelle: 'Secrétaire Administratif' },
  { id: 4, libelle: 'Admin' },
];

// Priorités
export const ALERT_PRIORITIES: Priority[] = [
  { id: 1, name: SeverityAlertEnum.HAUTE, description: 'Haute' },
  { id: 2, name: SeverityAlertEnum.MOYENNE, description: 'Moyenne' },
  { id: 3, name: SeverityAlertEnum.BASSE, description: 'Basse' },
];

// Mock d'alertes administratives
// export const MOCK_ALERTES: Alert[] = [
//   {
//     id: 1,
//     name: 'Nouvelle demande de congé',
//     description: 'Une nouvelle demande de congé',
//     priority: ALERT_PRIORITIES[0],
//     profiles: [ADMIN_PROFILES[0], ADMIN_PROFILES[3]], 
//     date: new Date() 
//   },
//   {
//     id: 2,
//     name: 'Nouveau budget mensuel dépassé',
//     description: 'Nouveau budget mensuel dépassé.',
//     priority: ALERT_PRIORITIES[1],
//     profiles: [ADMIN_PROFILES[1]],
//     date: new Date(Date.now() - 1000 * 60 * 60 * 24)
//   },
//   {
//     id: 3,
//     name: 'Nouveau courrier urgent',
//     description: 'Nouveau courrier urgent non traité.',
//     priority: ALERT_PRIORITIES[2],
//     profiles: [ADMIN_PROFILES[2]],
//     date: new Date(Date.now() - 1000 * 60 * 60 * 2)
//   },
// ];

@Component({
  selector: 'app-config-alerte',
  templateUrl: './config-alerte.component.html',
  styleUrls: ['./config-alerte.component.scss'],
  standalone:true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
 imports: [
  CommonModule,
  MatFormFieldModule,
  MatSelectModule,
  NgbAccordionModule, 
  NgbNavModule,
  MatTableModule,
  FormsModule,
  ReactiveFormsModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  NgSelectModule,
  MatSortModule,
  DragDropModule,
  EditAlerteComponent,
  ListeConfigAlerteComponent,
  
]
})
export class ConfigAlerteComponent implements OnInit {

  @ViewChild('listConfig') listConfig!: ListeConfigAlerteComponent;

  displayedColumns: string[] = [
    'type',
    'priorite',
    'profils',
    'actions'
  ];

  alertesCategories: any;
  templateToUpdate: any;
  profiles: any = [];
  priorites: any;
  pageOptions: any = { page: 0, size: 20 };
  loadingIndicator = true;
  categorie: any;
  descCategorie: any;
  typeAlertes: any;
  categorieName: any;

  // add = Authority.ADD_TEMPLATE;
  // read = Authority.READ_ALERTE;
  // update = Authority.EDIT_TEMPLATE;
  // delete = Authority.DELETE_TEMPLATE;
    add = "";
  read = Authority.READ_ALERTE;
  update = "";
  delete ="";


  constructor(
    private readonly templateService: TemplateService,
    private readonly profileService: ProfilService,
    private readonly modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAllProfiles();
    this.getAllPriorities();
    this.getAllCategorieAlerte();
  }


  getAllCategorieAlerte() {
    this.templateService.readAllCategorieAlerte().subscribe({
      next: value => {
        this.alertesCategories = value;
        console.log(" this.alertesCategories", this.alertesCategories);

        this.loadingIndicator = false;
      },
      error: err => {
        this.loadingIndicator = false;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    })
  }

  getSeverity(name: any) {
    if (name === 'HAUTE') return 'badge bg-danger';
    else if (name === 'BASSE') return 'badge bg-primary';
    else return 'badge bg-warning'
  }

  openBasicModal(content: TemplateRef<any>, typeAlertes: any, template?: any,description?:any,nameCategorie?:any) {
    this.descCategorie = description;
    this.typeAlertes = typeAlertes;
    this.templateToUpdate = template;
    this.categorieName = nameCategorie;


    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
    }).catch((res) => { });
  }

  close(event: boolean) {
    if (event) {
      this.listConfig.refresh();
      this.modalService.dismissAll();
    }
  }


  getAllProfiles() {
    this.profileService.readProfiles().subscribe({
      next: value => this.profiles = value.content
    })
  }

  getAllPriorities() {
    this.templateService.readAllPriorities().subscribe({
      next: value => this.priorites = value
    })
  }


  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
  }

  deleteTemplate(templateId: any) {
    Alertes.confirmAction(
      "Suppression",
      "Voulez-vous vraiment supprimer",
      () => {
        this.templateService.deleteTemplate(templateId).subscribe({
          next: (value) => {
            Alertes.alerteDeleteSuccess();
          },
          error: value => { Alertes.alerteDeleteDanger(value.error.message) }
        })
      })

  }
}

