import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Alertes } from 'src/app/util/alerte';
import { Helper } from 'src/app/util/helper';
import { RegionService } from 'src/app/services/region/region.service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { CreateOrUpdateNatureSpecifiqueComponent } from '../../natureSpecifique/create-or-update-nature-specifique/create-or-update-nature-specifique.component';
import { FormRegionComponent } from '../form-region/form-region.component';

@Component({
  selector: 'app-list-region',
  templateUrl: './list-region.component.html',
  styleUrls: ['./list-region.component.scss'],
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
    FormRegionComponent

   
  ],
})
export class ListRegionComponent implements OnInit {

  loadingIndicator = true;
  regionToUpdate : any;
  regionId : any;
  pageOptions: any = { page: 0, size: 10 };
  dataSource: any;
  metadata: any;
  displayedColumns: string[] = [
    'code',
    'libelle',
    'actions',
  ];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private regionService: RegionService
  ) { }

  ngOnInit() {
    this.getRegions();
  }

  getRegions(){
    this.loadingIndicator = true;
    const params = this.pageOptions;
    this.regionService.readRegions(params).subscribe({
      next: response => {
        this.dataSource = response?.payload;
        this.metadata = response?.metadata;
      },
      error: err => this.loadingIndicator = false,
      complete: () => this.loadingIndicator = false
    });
  }

  delete(regionId:any){
    Alertes.confirmAction(
      'Voulez-vous supprimé ?',
      'Cet element sera definitivement supprimé',
      () => {
        this.regionService.deleteRegion(regionId).subscribe({
      next: response => {
        Alertes.alerteDeleteSuccess()
      },
      error: err => Alertes.errorPopPup('Suppression échouée',err?.error?.message),
      complete: () => this.getRegions()
      });
    })

   }

  paginate($event: any){
    this.loadingIndicator = true;
     this.pageOptions.page = $event - 1;
      this.getRegions()
   }

  close(event: boolean){
    if (event) {
      this.modalService.dismissAll();
      this.getRegions()
    }
  }

  doSearch(data: any){
      this.pageOptions = data;
      this.pageOptions.page = 0;
      this.pageOptions.size = 20;
      this.getRegions()
      this.modalService.dismissAll();
   }

  openBasicModal(content: TemplateRef<any>, size?: any, region?: any) {
      this.regionToUpdate = region;
      this.regionId = region?.id;
      this.modalService.open(content, {size: size, backdrop: 'static'}).result.then((result) => {

      }).catch((res) => {
      });
   };

  openUrl(id: any, url: any) {
    if (id) {
      localStorage.setItem('idRegion', id);
    }
    this.router.navigateByUrl(url);
  }

}
