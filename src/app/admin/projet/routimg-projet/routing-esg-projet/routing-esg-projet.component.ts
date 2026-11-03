import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
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
import {ActivatedRoute} from "@angular/router";
import {NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltip, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { FormStructureExecutionProjetComponent } from '../../parametrage-projet/param-structure-execution-projet/form-structure-execution-projet/form-structure-execution-projet.component';
import { RoutingConfigProjetComponent } from '../routing-config-projet/routing-config-projet.component';

@Component({
  selector: 'app-routing-esg-projet',
  templateUrl: './routing-esg-projet.component.html',
  styleUrls: ['./routing-esg-projet.component.scss'],
    standalone:true,
    imports:[
       CommonModule,
      NgbTooltipModule,
      NgbDropdownModule,
      MatIconModule,
      // FeatherIconModule,
      NgbTooltipModule,
      MatTableModule,
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
      RoutingConfigProjetComponent,
      SpinnerComponent,
      FormStructureExecutionProjetComponent
      
   
    ]
})
export class RoutingEsgProjetComponent implements OnInit {

  @Input() addButtontitle!: string;
  @Input() pageTitle!: string;

  constructor(private router: ActivatedRoute) {
  }


  ngOnInit() {
  }

  activeUrl(url: any, tooltip: NgbTooltip) {
    if ((url === this.router.snapshot.url[0].path + '/' + this.router.snapshot.url[1].path)) {
      tooltip.open();
      return 'text-orange';
    }
    return 'text-secondary';
  }

}
