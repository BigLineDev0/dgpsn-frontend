import { Component, Input, OnInit } from '@angular/core';
import { NgbAccordionModule, NgbNavModule, NgbPaginationModule, NgbTooltip, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { FormRegionComponent } from '../form-region/form-region.component';

@Component({
  selector: 'app-onglet-suivi-region',
  templateUrl: './onglet-suivi-region.component.html',
  styleUrls: ['./onglet-suivi-region.component.scss'],
    standalone : true,
  imports : [
    CommonModule,
    MaterialModule,
    SharedModule,
    NgbPaginationModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbNavModule,
   
  ],
})
export class OngletSuiviRegionComponent implements OnInit {

  @Input() addButtontitle!: string;
  @Input() pageTitle!: string;

  constructor(private router: ActivatedRoute) {
  }

    ngOnInit() {
  }

  activeUrl(url: any, tooltip: NgbTooltip) {
  if((url === this.router.snapshot.url[0].path)) {    tooltip.open();
    return 'text-orange';
   }
   return 'text-secondary';
  }
}
