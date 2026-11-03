import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
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
import { NgbTooltipModule, NgbDropdownModule, NgbPaginationModule, NgbAccordionModule, NgbNavModule, NgbProgressbarModule, NgbCarouselModule, NgbTimepickerModule, NgbPopoverModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { RoutingAppelOffreProjetComponent } from '../../routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';
import { RoutingAvancementProjetComponent } from '../../routimg-projet/routing-avancement-projet/routing-avancement-projet.component';
import { ImageMediaProjetComponent } from './image-media-projet/image-media-projet.component';
import { VideoMediaProjetComponent } from './video-media-projet/video-media-projet.component';

@Component({
  selector: 'app-avanc-mediatheque-projet',
  templateUrl: './avanc-mediatheque-projet.component.html',
  styleUrls: ['./avanc-mediatheque-projet.component.scss'],
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
    RoutingAvancementProjetComponent,
    ImageMediaProjetComponent,
    VideoMediaProjetComponent
   ]
})
export class AvancMediathequeProjetComponent implements OnInit{

  libelle:any;

  constructor() {
  }

  ngOnInit() {
    this.libelle = localStorage.getItem('projetLibelle');
  }
}
