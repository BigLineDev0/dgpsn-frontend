
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltip, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { SourceDeDonneesComponent } from '../budget-global/source-de-donnees/source-de-donnees.component';
import { FormMobilisationComponent } from '../mobilisation-financement/form-mobilisation/form-mobilisation.component';

@Component({
  selector: 'app-routing-financement',
  templateUrl: './routing-financement.component.html',
  styleUrls: ['./routing-financement.component.scss'],
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
    NgbTimepickerModule,
    NgbPopoverModule,
    NgbDatepickerModule,
    MatCheckboxModule,
    MatRippleModule,
    HasAnyAuthorityDirective,
    MatTreeModule,
    MatListModule,
    MatTooltipModule,
    MatButtonModule,


  ]
})
export class RoutingFinancementComponent {
  @Input() addButtontitle!: string;
  @Input() pageTitle!:string;
  @Output() submit: EventEmitter<any> = new EventEmitter();

 
  constructor(private router:ActivatedRoute){

  }
  emitSubmitEvent() {
    this.submit.emit();
  }

  activeUrl(url: any, tooltip: NgbTooltip) {
    if((url === this.router.snapshot.url[0].path) || (url === 'add-button')) {
      tooltip.open();
      return 'text-orange';
    }
    return 'text-secondary';
  }
}
