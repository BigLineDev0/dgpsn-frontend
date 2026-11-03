import {Component, OnInit, TemplateRef} from '@angular/core';
import {NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import { Authority } from 'src/app/util/Authority';
import {saveAs} from "file-saver";
import { ManangementUnitService } from '@/app/services/manangement-unit/manangement-unit.service';
import { Alertes } from '@/app/util/alerte';
import { Helper } from '@/app/util/helper';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { FormUgpProjetComponent } from './parametrage-projet/param-ugp-projet/form-ugp-projet/form-ugp-projet.component';
import { RoutingConfigProjetComponent } from './routimg-projet/routing-config-projet/routing-config-projet.component';
import { FormProjetsComponent } from './form-projets/form-projets.component';
import { UploadImageProjetComponent } from './upload-image-projet/upload-image-projet.component';
import { AlerteFormatterPipe } from '@/app/util/pipe/alerte/alerte-formatter.pipe';
import { ThousandsSeparatorPipe } from '@/app/util/pipe/text/number-formatter.pipe';
import { TextFormatterPipe } from '@/app/util/pipe/text/text-formatter.pipe';
import { SafeUrlPipe } from '@core/pipe/safe-url.pipe';


@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss'],
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
    SpinnerComponent,
    UploadImageProjetComponent,
    FormProjetsComponent,
    
 
  ]
})
export class ProjetComponent implements OnInit{

  avancement= "";
  parametre= "";
  activite= "";
  financement= "";
  offre= "";
  esg= "";
  entreprise= "";
  fiche= "";
  tdb= "";

  // add= Authority.ADD_;
  // update="";
  // delete="";
  // read="";
  // export="";
  // import="";

  displayedColumns: string[] = [
    // 'programme',
    'nom',
    'structure',
    // 'tauxExecution',
    'dateDebut',
    'dateDebutReel',
    // 'budget',
    // 'monnaie',
    // 'status',
    'actions'
  ];
  projets: any;
  pageOptions: any = { page: 0, size: 20 };
  datasource: any;
  dataSource: any;
  file!: File;
  // projets: MatTableDataSource<any>;
  loadingIndicator = true;
  showErrorMessage= false;
  projectToUpdate: any;
  tableauBordProjet:any
  projectId: any;
  programId: any;
  toProgram: boolean=false;
  uploadProjetId: any;
  libelleProgramme: any;
  fieldsToSearch: any = [];
  selectedFieldsToSearch: any = [];
  fielsToSend: any = [];
  acteurs!: boolean;
  ugps!: boolean ;
  structureExec!: boolean;
  partenaires!: boolean;
  structureTutelle!: boolean;
  structures!: boolean;
  dates!: boolean;
  indicators!: boolean;

  private elementLabels = {
    getAllActorsOfProjet: 'Acteurs',
    getAllPartnerOfProject: 'Partenaires',
    getAllUgpsOfProjet: 'Unité de Gestion de Projets (UGP)',
    getAllStructureTutelleOfProject: 'Structure de tutelle',
    getAllStructureExecOfProject: 'Structure d’exécution',
    getAllJalons: 'Jalons',
    getAllIndicateurProjet: 'Indicateurs'
  };

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private managementUnitService:ManangementUnitService,
    private route: ActivatedRoute,
  ) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      filter((event: NavigationEnd) => event.urlAfterRedirects === '/projet')
    ).subscribe(() => {
      this.loadingIndicator = true;
      this.programId = undefined;
      // window.location.reload();
      this.getAllProjet
    });
  }

  ngOnInit() {
    this.libelleProgramme = localStorage.getItem('programmeLibelle');
    // if (this.route.snapshot.queryParams.programId !== undefined){
    //   this.programId = atob(this.route.snapshot.queryParams.programId);
    // }
    this.toProgram = !!this.programId;
    this.getAllProjet();
    this.initFieldsToSearh();
  }

  getAllProjet() {
    this.pageOptions.type = "PROJECT";
    this.pageOptions.parentId = this.programId;
    this.managementUnitService.readAllProgrammes(this.pageOptions).subscribe({
      next: response => {
        this.dataSource = response;
        this.projets = response.content;
        this.loadingIndicator = false;
        console.log('PROJETS: ', this.projets);
      },
      error: err => {
        console.log(err);
        this.loadingIndicator = false;
      }
    });
  }

//   getAllProjet() {
//   this.loadingIndicator = true;
//   this.pageOptions.type = "PROJECT";
//   this.pageOptions.parentId = this.programId;


//       this.loadingIndicator = false;
//   // On simule la réponse API
//   this.managementUnitService.readAllProgrammes(this.pageOptions).subscribe({
//     next: () => {
//       this.dataSource = [
//         {
//           id: 1,
//           name: "Projet d’Appui à la Gouvernance Locale (PAGL)",
//           parent: { name: "Programme de Décentralisation et Développement Territorial" },
//           ministerTutelles: [
//             { structure: { code: "MININT" } },
//             { structure: { code: "DGPSN" } }
//           ],
//           expectedStartDate: "2022-03-01",
//           expectedEndDate: "2026-12-31",
//           tauxAvancement: 65,
//           equivalence: 5200000000,
//           monnaie: "XOF",
//           status: { code: "EN_COURS", libelle: "En cours" },
//           disorganized: false,
//           publish: true
//         },
//         // ... autres projets
//       ];
//       this.loadingIndicator = false;
//     },
//     error: err => {
//       console.error(err);
//       this.loadingIndicator = false;
//     }
//   });
// }



  deleteProject(id:any){
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.managementUnitService.deleteProjet(id).subscribe({
          next:reponse=>{
            Alertes.alerteDeleteSuccess('Projet');
          },
          error:erreur=>{
            console.log('erreur lors de la suppression',erreur);
            Alertes.errorPopPup('Supression échouée',erreur?.error?.message);
          },
        })
      }
    );
  }
  openDetail(projetId: any){
    localStorage.setItem("projetId", projetId);
    this.router.navigateByUrl("/projet/details")
  }

  downloadFile(file: any){
    const blob = new Blob([file], { type: 'application/pdf'});
    saveAs(blob)
  }

  exportExcel(){
    this.managementUnitService.exportProjetsToExcel().subscribe({
      next(value: any) {
        Helper.downloadFile(value, 'Projet.csv');
        Alertes.alerteGlobal('Le téléchargement du fichier CSV va démarrer');

      },
      error(err) {
        console.error('Une erreur s\'est produite lors de l\'exportation CSV :', err);
        Alertes.errorPopPup('L\'export par CSV a échoué',err?.error?.message);
      },
    })
  }

  exportPdf() {
    this.managementUnitService.exportProjetsPdf().subscribe({
      next:reponse=>{
        Alertes.alerteGlobal('Le téléchargement du fichier PDF va démarrer');
        this.downloadFile(reponse);
      },
      error:erreur=>{
        console.error('Une erreur s\'est produite lors de l\'exportation PDF :', erreur);
        Alertes.errorPopPup('L\'export par PDF a échoué',erreur?.error?.message);
      }
    })
  }


  openConfigProject(projetId: any, ugp: any,projetLibelle:any) {
   localStorage.setItem("projetLibelle", projetLibelle);
    localStorage.setItem('projectId', projetId);
    localStorage.setItem('ugp', ugp);
    this.router.navigateByUrl('/admin/acces/parametrage/ugp');

  }

  openAvancementDetailles(projetId: any, projetLibelle:any) {
    localStorage.setItem("projetId", projetId);
    localStorage.setItem("projetLibelle", projetLibelle);
    localStorage.setItem('managementUnitId', projetId);
    this.router.navigateByUrl("/programme/taux-projet-config")
  }

  openSuiviActivite(parent: any,projetLibelle:any) {
   localStorage.setItem("parentId",parent);
  //  localStorage.setItem("projetId", parent);
    localStorage.setItem("projetLibelle", projetLibelle);
    console.log('parents',parent);
    this.router.navigateByUrl("/activite/list-activite")
  }
  openAction(projetId: any,projetLibelle:any,url:any) {
    console.log('managementUnitId: ', projetId)
    localStorage.setItem("projetId", projetId);
    localStorage.setItem("projetLibelle", projetLibelle);
    localStorage.setItem('managementUnitId', projetId);
    this.router.navigateByUrl("/admin/acces/"+url)
  }
  openActionEsg(url:any){
    this.router.navigateByUrl("/projet/"+url)
  }

  openSuivifinancement(managementUnitId: any,projetLibelle:any){
    localStorage.setItem("managementUnitId", managementUnitId);
     console.log('managemnetUnitId:',managementUnitId);
    localStorage.setItem("projetLibelle",projetLibelle);
    this.router.navigateByUrl("/projet/budget-config")
    // console.log('PROJET:',projetLibelle)
  }

  openUploadImage(content: TemplateRef<any>, projetId: any) {
    this.uploadProjetId = projetId;
    this.modalService.open(content, {size: 'md', backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  openFicheModal(content: TemplateRef<any>, projet?: any) {
    this.projectId = projet;
    this.tableauBordProjet = projet
    console.log("this.tableauBordProjet", this.tableauBordProjet);


    this.modalService.open(content, {size: 'xl', backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }


  openBasicModal(content: TemplateRef<any>, projet?: any) {
    this.projectToUpdate = projet;
    console.log("this.projectToUpdate",this.projectToUpdate);
    this.projectId = projet?.id;
    this.modalService.open(content, {size: 'xl', backdrop: 'static'}).result.then((result) => {
    }).catch((res) => {});
  }

  getColor(code: any) {
    if(code == 'ENC') {
      return 'badge bg-primary';
    } else if(code == 'CLOT') {
      return 'badge bg-success';
    }
    else if(code == 'ARR') {
      return 'badge bg-danger';
    } else {
      return 'badge bg-warning';
    }
  }

  disabled(disorganized: any) {
    return (!disorganized)? 'inline': 'none';
  }

  paginate($event: any) {
    this.loadingIndicator = true;
    this.pageOptions.page = $event - 1;
    this.getAllProjet();
  }

  fileChange(event: any){
    this.file = event.target.files[0];
  }


  initFieldsToSearh() {
    this.fieldsToSearch = [
      // {
      //   label: 'Type',
      //   checked: false
      // },
      {
        label: 'Sigle',
        checked: false
      },
      {
        label: 'Nom',
        checked: false
      },
      {
        label: 'Structure de tutelle',
        checked: false
      },
      {
        label: "Etat d'exécution",
        checked: false
      },
      {
        label: 'Date début',
        checked: false
      },
      {
        label: 'Date Fin',
        checked: false
      },
      {
        label: 'Tags',
        checked: false
      },
      {
        label: "Axe du PSE",
        checked: false
      },
      {
        label: "Sous secteur",
        checked: false
      },
      {
        label: 'Montant en FCFA',
        checked: false
      }
    ];

    this.selectedFieldsToSearch = [
      {
        label: 'Sigle',
        checked: true
      },
      {
        label: 'Nom',
        checked: true
      },
      {
        label: 'Structure de tutelle',
        checked: false
      },
      {
        label: "Etat d'exécution",
        checked: false
      },
    ];
  }
  isChecked(field: any) : boolean {
    this.selectedFieldsToSearch.forEach((selectedField: any) => {
      if(field.label === selectedField.label) {
        field.checked = true;
      }
    });
    return field.checked;
  }

  changeField(event: any, field: any) {
    if(event.srcElement.checked) {
      this.selectedFieldsToSearch.push(field);
    }else {
      let i=0;
      this.selectedFieldsToSearch.forEach((selectedField: any) => {
        if(field.label === selectedField.label) this.selectedFieldsToSearch.splice(i, 1);
        i++;
        return;
      })
    };

    this.fielsToSend = this.selectedFieldsToSearch;
  }


  close(event: boolean){
    if(event){
      this.modalService.dismissAll();
      this.getAllProjet();
    }
  }

  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;

    this.getAllProjet();
  }
  getTauxAvancement(content: any) {
    const projets = content;

    projets.forEach((projet: any) => {
      const realDuration = new Date().getTime() - new Date(projet.expectedStartDate).getTime();
      const totalDuration = new Date(projet.expectedEndDate).getTime() - new Date(projet.expectedStartDate).getTime();
      let taux;

      if(isNaN(totalDuration)) {
        taux = "NAN";
      } else if (realDuration <= 0) {
        taux = 0;
      } else if(totalDuration == 0) {
        taux = 100
      } else {
        taux = (realDuration / totalDuration) * 100;
      }

      projet.tauxAvancement = taux;
    });

    this.projets = projets;
  }

  // publishProjet(projetId: any, publish: boolean) {
  //   this.managementUnitService.publishUnpublishProject(projetId).subscribe({
  //     next: value => Alertes.alerteGlobal(
  //       !publish ? 'Le projet vient d\'être publié avec succès' : 'La publication de ce projet vient d\'être annulée'
  //     ),
  //     error: error => {
  //       const errorMessage = error?.error?.message || 'Une erreur est survenue lors de la publication du projet';
  //       Alertes.alerteGlobal(undefined, errorMessage);
  //     },
  //     complete: () => this.getAllProjet()
  //   });
  // }
  publishProjet(projetId: any, publish: boolean) {
    const confirmationMessage = publish
      ? 'Voulez-vous annuler vraiment la publication de ce projet ?'
      : 'Voulez-vous vraiment publier ce projet ?';
    Alertes.confirmAction(
      confirmationMessage,
      'Cette action est irréversible. Êtes-vous sûr ?',
      () => {
        this.managementUnitService.publishUnpublishProject(projetId).subscribe({
          next: value => {
            Alertes.alerteGlobal(
              !publish ? 'Le projet vient d\'être publié avec succès' : 'La publication de ce projet vient d\'être annulée'
            );
          },
          error: error => {
            const errorMessage = error?.error?.message || 'Une erreur est survenue lors de la publication du projet';
            Alertes.errorPopPup('Erreur', errorMessage);
          },
          complete: () => this.getAllProjet()
        });
      },
      () => {
        console.log("Publication annulée");
      }
    );
  }

  openUrl(url: string, projet?: any) {
    if (projet) {
      sessionStorage.setItem('libelleProjet', projet.libelle);
      sessionStorage.setItem('projetId', projet.id);
    }
    this.router.navigateByUrl(url);
  }

}
