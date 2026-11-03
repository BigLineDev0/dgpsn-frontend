import { LabelService } from '@/app/services/labelService/label-service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SharedModule } from 'primeng/api';
import { Alertes } from 'src/app/util/alerte';
import { CreateOrUpdateCadrelogiqueComponent } from '../cadrelogiques/create-or-update-cadrelogique/create-or-update-cadrelogique.component';
import { RegionComponent } from '../cadrelogiques/region/region.component';
import { FormLabelComponent } from './form-label/form-label.component';

@Component({
  selector: 'app-config-label',
  templateUrl: './config-label.component.html',
  styleUrls: ['./config-label.component.scss'],
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
    NgbNavModule,
    FormLabelComponent
   
  ],
})
export class ConfigLabelComponent implements OnInit {

  referentielType: any;

  displayedColumns: string[] = [
    'code',
    'libelle',
    'actions'
  ];

  pageOptions: any = {
    page: 0,
    size: 200
  }

  datasource: any;

  loading = true;

  labelToUpdate: any;

  constructor(
    private modalService: NgbModal,
    private labelService: LabelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getReferentielType();
    this.getAllLabels(this.pageOptions);
  }
  
  getReferentielType() {
    this.referentielType = localStorage.getItem('referentielType')!;
    this.referentielType = JSON.parse(this.referentielType);
  }

  getAllLabels(pageOptions: any) {
    this.loading = true;
    pageOptions.referentielType = this.referentielType.name;
    this.labelService.readLabels(pageOptions).subscribe({
      next: response => {
        this.datasource = response;
        this.loading = false;
      },
      error: response => {},
      complete: () => this.loading = false 
    })
  }

  paginate(event: any) {
    this.pageOptions.page = event - 1;
    this.getAllLabels(this.pageOptions);
  }

  openDialog(content: TemplateRef<any>, modalSize: any, label?: any) {
    this.labelToUpdate = label;

    this.modalService.open(content, {size: modalSize, backdrop: 'static'}).result.then((result) => {

    }).catch((res) => {});
  }

  deleteLabel(labelId: any) {
    Alertes.confirmAction('Etes-vous sûr de vouloire supprimer ?',
      '',
      () =>  { 
        this.labelService.deleteLabel(labelId).subscribe({
          next: response => {},
          error: response => {},
          complete: () => {
            this.getAllLabels(this.pageOptions);
          }
        });
      }
    )
  }

  close() {
    this.modalService.dismissAll();
    this.getAllLabels(this.pageOptions);
  }
}
