import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SharedModule } from 'primeng/api';
import { SubSectorService } from 'src/app/services/sub-sector/sub-sector.service';
import { TypeDepenseService } from 'src/app/services/typeDepense/type-depense.service';
import { Alertes } from 'src/app/util/alerte';
import { CreateOrUpdateCadrelogiqueComponent } from '../../cadrelogiques/create-or-update-cadrelogique/create-or-update-cadrelogique.component';
import { RegionComponent } from '../../cadrelogiques/region/region.component';

@Component({
  selector: 'app-list-depense',
  templateUrl: './list-depense.component.html',
  styleUrls: ['./list-depense.component.scss'],
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
    CreateOrUpdateCadrelogiqueComponent,
    RegionComponent,
    NgbNavModule,
   
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ListDepenseComponent {


  referentielType: any;
  displayedColumns: string[] = [
    'code',
    'libelle',
    'categorieDepense',
    // 'Budget',
    'actions'
  ];

  pageOptions: any = {
    page: 0,
    size: 20
  }
  datasource: any;

  loading = true;
  depenseToUpdate: any;

  constructor(
    private modalService: NgbModal,
    private typeDepense: TypeDepenseService
    ){

}

ngOnInit(): void {
  this.getReferentielType();
  this.getAllTypedepense(this.pageOptions);
  // console.log("sous categorie",this.datasource)
}

  getReferentielType() {
    this.referentielType = localStorage.getItem('referentielType')!;
    this.referentielType = JSON.parse(this.referentielType);
  }

  getAllTypedepense(pageOptions: any) {
    this.loading = true;
    // pageOptions.referentielType = this.referentielType.name;
    this.typeDepense.readTypeDepense(pageOptions).subscribe({
      next: response => {
        this.datasource = response;
        this.loading = false;
      },
      error: response => {},
      complete: () => this.loading = false
    })
  }

  openBasicModal(content: TemplateRef<any>) {

    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
    }).catch((res) => {});
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllTypedepense(this.pageOptions);
  }

  openDialog(content: TemplateRef<any>, modalSize: any, label?: any) {
    this.depenseToUpdate = label;

    this.modalService.open(content, {size: modalSize, backdrop: 'static'}).result.then((result) => {

    }).catch((res) => {});
  }

  deleteSubsector(sectorId: any) {
    Alertes.confirmAction('Etes-vous sûr de vouloire supprimer ?',
      '',
      () =>  {
        this.typeDepense.deleteTypeDepense(sectorId).subscribe({
          next: response => {},
          error: response => {},
          complete: () => {
            this.getAllTypedepense(this.pageOptions);
          }
        });
      }
    )
  }

  close () {
    this.modalService.dismissAll();
    this.getAllTypedepense(this.pageOptions);
  }

  doSearch(data: any) {
    this.pageOptions = data;
    this.pageOptions.page = 0;
    this.pageOptions.size = 20;

    this.getAllTypedepense(this.pageOptions);
  }

}


