import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, TemplateRef } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ResponseApi } from 'src/app/util/response.model';
import { Router } from '@angular/router';
import { GeographicalLocationService } from 'src/app/services/geographical-location/geographical-location.service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { CreateOrUpdateNatureSpecifiqueComponent } from '../../natureSpecifique/create-or-update-nature-specifique/create-or-update-nature-specifique.component';
import { CreateOrUpdatePlangeoComponent } from '../create-or-update-plangeo/create-or-update-plangeo.component';


@Component({
  selector: 'app-list-plangeo',
  templateUrl: './list-plangeo.component.html',
  styleUrls: ['./list-plangeo.component.scss'],
   standalone : true,
  imports : [
    CommonModule,
    SpinnerComponent,
    MaterialModule,
    SharedModule,
    NgbPaginationModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbNavModule,
    CreateOrUpdatePlangeoComponent

   
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ListPlangeoComponent {
  referentielType: any;

  displayedColumns: string[] = [
    'projet',
    'cadreLogique',
    // 'Budget',
    'actions'
  ];

  pageOptions: any = {
    page: 0,
    size: 20
  }

  datasource: any;

  loading = true;

  constructor(
    private modalService: NgbModal,
    private geographicalLocationService: GeographicalLocationService
    ){

  }
  ngOnInit(): void {
    //this.getAllPrograms(this.pageOptions);
    this.getReferentielType();
    this.getAllProgram(this.pageOptions);
  }

  getReferentielType() {
    this.referentielType = localStorage.getItem('referentielType')!;
    this.referentielType = JSON.parse(this.referentielType);
  }

  // getAllPrograms(pageOptions: any) {
  //   setTimeout(() => {
  //     this.datasource = this.data
  //     this.loading = false
  //   }, 500);
  // }
  getAllProgram(pageOptions: any) {
    this.loading = true;
    // pageOptions.referentielType = this.referentielType.name;
    this.geographicalLocationService.readgeographicalLocations(pageOptions).subscribe({
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
    //this.getAllPrograms(this.pageOptions);
    this.getAllProgram(this.pageOptions);
  }
}
