import {Component, OnInit, TemplateRef} from '@angular/core';
import { Authority } from 'src/app/util/Authority';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import { GeographicalLocationService } from '@/app/services/geographical-location/geographical-location.service';
import { Alertes } from '@/app/util/alerte';
import { NgbModal, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormParticipantAtelierComponent } from '@/app/admin/serviceExterieur/atteliers/participant/form-participant-atelier/form-participant-atelier.component';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { RoutingConfigProjetComponent } from '../../routimg-projet/routing-config-projet/routing-config-projet.component';
import { FormZoneInterventionProjetComponent } from './form-zone-intervention-projet/form-zone-intervention-projet.component';
import { MatMenuModule } from '@angular/material/menu';
import {FeatherIconDirective} from "@core/feather-icon/feather-icon.directive";
import {MatRipple} from "@angular/material/core";


@Component({
  selector: 'app-param-zone-intervention-projet',
  templateUrl: './param-zone-intervention-projet.component.html',
  styleUrls: ['./param-zone-intervention-projet.component.scss'],
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
        FormZoneInterventionProjetComponent,
        RoutingConfigProjetComponent,
        MatRipple,
        FeatherIconDirective
    ]
})
export class ParamZoneInterventionProjetComponent implements OnInit{

  displayedColumns: string[] = [

    'libelle',
    'code',
    'type',
    'actions'
  ];

  localisations!: MatTableDataSource<any>;

  loadingIndicator = true;
  projetId: any;

  localisationsId: any = [];
  actorToUpdate: any;
  projetLibelle: any;
  file!: File;
  pageOptions: any = {page: 0, size: 20};
  add=""
  delete=""
  expo= ""
  impo= ""
  read= ""


  datasource: any;
  cadreLogiqueId: any;
  constructor(
    private geographicalLocationService: GeographicalLocationService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.projetLibelle = localStorage.getItem('projetLibelle');
    this.getProjectId();

    this.getAllOfProjet();
  }

  getProjectId() {
    this.projetId = localStorage.getItem('projectId')!;
  }

  getAllOfProjet() {
    this.loadingIndicator = true;
    this.pageOptions.projetId = this.projetId;
    this.geographicalLocationService.readgeographicalLocations(this.pageOptions).subscribe(

      {
        next: response => {
          this.datasource = response;
          this.localisations = response.content;
          this.loadingIndicator = false;
          this.localisationsId = response.content;
          // this.datasource.content.forEach((item: any) => {
          //  this.localisationsId.push(item.id)
          // });
        },
        error: err => {
          console.log(err);
          this.loadingIndicator = false;
        },
        complete: () => {
          this.loadingIndicator = false;
        }
      }

    )
  }

  openBasicModal(content: TemplateRef<any>, cadreLogiqueId?: any) {
    // this.actorToUpdate = localisation;
    this.cadreLogiqueId = cadreLogiqueId;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
    }).catch((res) => {});
  }

  close(event: boolean){
    if(event){
      this.modalService.dismissAll();
      this.getAllOfProjet();
    }
  }

  deleteZone(id: any) {

    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.geographicalLocationService.deletegeographicalLocation(id).subscribe({
          next: value => Alertes.alerteDeleteSuccess('Suppression reussie'),
          error: value => Alertes.alerteDeleteDanger(value.error.message),
          complete: () => this.getAllOfProjet()
        })
      }
    );
  }

  doSearch(data: any) {
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.pageOptions.projetId = this.projetId;
    this.pageOptions.code = data.code;
    this.pageOptions.libelle = data.libelle;
    this.getAllOfProjet();
  }

  fileChange(event: any){
    this.file = event.target.files[0];
  }

  import() {
    // this.actorProjectService.importActeur(this.file, this.projetId).subscribe({
    //   next: value => {
    //     Alertes.alerteAddSuccess();
    //     this.close(true)
    //   }
    // })
  }

  export() {
    // this.actorProjectService.exportActor().subscribe({
    //   next(response: any) {
    //     Helper.downloadFile(response, 'Acteur.csv');
    //   },
    //   error(err) {
    //     Alertes.alerteAddDanger('Une erreur s\'est produite lors de l\'exportation CSV :'+ err)
    //   },
    // })
  }

  openImport(content: TemplateRef<any>) {
    this.openBasicModal(content);
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllOfProjet();
  }

  getLabel(cadreLogique: any){
    console.log("cadre ", cadreLogique.typeCadreLogique?.code)
    if(cadreLogique.typeCadreLogique?.code == "REGION"){
      return "Ajouter département"
    }else if(cadreLogique.typeCadreLogique?.code == "DEPARTEMENT") {
      return "Ajouter arrondissement"
    }else if(cadreLogique.typeCadreLogique?.code == "ARRONDISSEMENT") {
      return "Ajouter commune"
    }
    return
  }
}

