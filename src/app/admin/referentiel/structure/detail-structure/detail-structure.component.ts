import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { FormRegionComponent } from '../../region/form-region/form-region.component';
import { FormSecteuractiviteComponent } from '../../secteuractivite/form-secteuractivite/form-secteuractivite.component';

@Component({
  selector: 'app-detail-structure',
  templateUrl: './detail-structure.component.html',
  styleUrls: ['./detail-structure.component.scss'],
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
    FormRegionComponent,
    FormSecteuractiviteComponent,

   
  ],
})
export class DetailStructureComponent implements OnInit {
  @Input() structureToDetail:any;
  structure: any;

  constructor(private router: Router,
    private modalService: NgbModal,
    ) { }
  
    ngOnInit(): void {
      this.structure =localStorage.getItem('structure');
      console.log('structures:',this.structureToDetail)
     }
     close(){
       this.modalService.dismissAll();
   
     }

}
