import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CADRE_LOGIQUE_TYPE } from '@/app/util/type-cadre-logique';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SharedModule } from 'primeng/api';
import { CadreLogiqueService } from 'src/app/services/cadre-logique/cadre-logique.service';
import { Authority } from 'src/app/util/Authority';
import { Alertes } from 'src/app/util/alerte';
import { CreateOrUpdateCadrelogiqueComponent } from '../create-or-update-cadrelogique/create-or-update-cadrelogique.component';


@Component({
  selector: 'app-arrondissement',
  templateUrl: './arrondissement.component.html',
  styleUrls: ['./arrondissement.component.scss'],
    standalone:true,
    imports: [
    CommonModule,
    SpinnerComponent,
    MaterialModule,
    SharedModule,
    NgbPaginationModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    HasAnyAuthorityDirective,
    CreateOrUpdateCadrelogiqueComponent
  ],
   schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class ArrondissementComponent {
  cardres: any;

  datasource: any;

  cadreLogToEdit: any;
  pageOptions: any = {page: 0, size: 20};
  
  loadingIndicator = true;
  showErrorMessage= false;

  add = "";
  read = "";
  update ="";
  delete ="";
  niveau = {type: CADRE_LOGIQUE_TYPE.ARRONDISSEMENT, label: "Département", niveauPrent: CADRE_LOGIQUE_TYPE.DEPARTEMENT}
 
  

  displayedColumns: string[] = [
    'code',
    'libelle',
    'departement',
    'region',
    'actions'
  ];

  constructor(private cadrelogique: CadreLogiqueService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.readcadrelogs()
  }

  readcadrelogs() {
    this.loadingIndicator = true;
    this.pageOptions.codeType = CADRE_LOGIQUE_TYPE.ARRONDISSEMENT
    this.cadrelogique.readCadreLogiques(this.pageOptions).subscribe({
      
      next: response => {
        this.datasource = response;
        this.showErrorMessage = false;
        this.loadingIndicator = false;
      },
      error: err => {
        console.log(err);
        this.loadingIndicator = false;
        this.showErrorMessage = true;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    })
  }

  openBasicModal(content: TemplateRef<any>, cadreLog?:any) {
    this.cadreLogToEdit = cadreLog;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }).catch((res) => { });
  }

  close(event: boolean) {
    if (event) {
      this.modalService.dismissAll();
      this.readcadrelogs()
    }
  }

  deletecadrelogs(id: any) {
    Alertes.confirmAction(
      "Suppression",
      "Voulez-vous vraiment executer cette action",
      () => {
        this.cadrelogique.deleteCadreLogique(id).subscribe(data => {
          this.readcadrelogs()
        })
      })

  }
  doSearch(data: any){
    this.pageOptions = data;
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.readcadrelogs();
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.readcadrelogs();
  }


}
