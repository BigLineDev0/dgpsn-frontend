import { FormPlanPassationProjetComponent } from '@/app/admin/projet/appel-offre-projet/plan-passation/form-plan-passation-projet/form-plan-passation-projet.component';
import { RoutingAppelOffreProjetComponent } from '@/app/admin/projet/routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';
import { MediathequeService } from '@/app/services/mediatheque/mediatheque.service';
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
import { NgbTooltipModule, NgbDropdownModule, NgbPaginationModule, NgbAccordionModule, NgbNavModule, NgbProgressbarModule, NgbCarouselModule, NgbTimepickerModule, NgbPopoverModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';


@Component({
  selector: 'app-read-image-projet',
  templateUrl: './read-image-projet.component.html',
  styleUrls: ['./read-image-projet.component.scss'],
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
  ]
})
export class ReadImageProjetComponent implements OnInit {

  @Input() imageId: any;
  @Input() imageUrl: any;
  dataLocalUrl: any;

  constructor(private mediathequeService: MediathequeService) { }

  ngOnInit(): void {
    console.log("imageUrl :",this.imageUrl);
    if (this.imageId){
      this.getImage();
    }
  }

  getImage() {
    this.mediathequeService.readFile(this.imageId).subscribe(data=>{
      var file = new Blob([data], {type: 'image/png'});
      this.dataLocalUrl = URL.createObjectURL(file);
      console.log("dataLocalUrl :",this.dataLocalUrl)
    })
  }





}
