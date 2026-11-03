import { MediathequeService } from '@/app/services/mediatheque/mediatheque.service';
import { Alertes } from '@/app/util/alerte';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, Input, OnInit, TemplateRef} from '@angular/core';
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
import {NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';
import { RoutingAvancementProjetComponent } from '../../../routimg-projet/routing-avancement-projet/routing-avancement-projet.component';
import { FormRisqueProjetComponent } from '../../avanc-risque-projet/form-risque-projet/form-risque-projet.component';
import { ReadImageProjetComponent } from './read-image-projet/read-image-projet.component';
import { FormImageProjetComponent } from './form-image-projet/form-image-projet.component';


@Component({
  selector: 'app-image-media-projet',
  templateUrl: './image-media-projet.component.html',
  styleUrls: ['./image-media-projet.component.scss'],
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
    ReadImageProjetComponent,
    FormImageProjetComponent
   ]
})
export class ImageMediaProjetComponent implements OnInit {

  displayedColumns: string[] = [
    'libelle',
    'date',
    'visualiser',
    'actions'
  ];

  loadingIndicator = true;

  @Input() projectId: any;
  @Input() managementUnitId:any
  editImageToUpdate: any;
  pageOptions: any = { page: 0, size: 10 };
  datasource: any;
  basicModalCloseResult!: string;

  imageId: any;

  url: any;
  // read = Authority.READ_IMAGE;
  // add = Authority.ADD_IMAGE;
  // edit = Authority.EDIT_IMAGE;
  // deletes =Authority.DELETE_IMAGE;

  // readVideo = Authority.READ_VIDEO;
  // addVideo  = Authority.ADD_VIDEO;
  // editVideo  = Authority.EDIT_VIDEO;
  // deleteVideos = Authority.DELETE_VIDEO;




  constructor(
    private mediathequeService: MediathequeService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.projectId = localStorage.getItem('managementUnitId')
    this.getAllImages();

  }

  getAllImages() {
    this.loadingIndicator = true;
    this.pageOptions.projectId = this.projectId;
    this.pageOptions.managementUnitId =this.managementUnitId;
    this.pageOptions.mediathequeType = "IMAGE"
    this.mediathequeService.readMediathequeOfProjects(this.pageOptions).subscribe({
      next: (value) => {
        this.datasource = value;
        this.loadingIndicator = false;
      },
      error: value => {
        this.loadingIndicator = true;
      },
      complete: () => {
        this.loadingIndicator = false;
      }
    });
  }

  openImage(content: TemplateRef<any>, image: any) {
    // console.log(image);

    this.imageId = image.id;

    this.modalService
      .open(content, { size: 'md' })
      .result.then((result) => {
      this.basicModalCloseResult = 'Modal closed' + result;
    })
      .catch((res) => { });
  }

  openBasicModal(content: TemplateRef<any>, image?: any) {
    this.editImageToUpdate = image;
    this.modalService
      .open(content, { size: 'lg' })
      .result.then((result) => {
      this.basicModalCloseResult = 'Modal closed' + result;
    })
      .catch((res) => { });
  }
  close(event: any) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllImages();
    }
  }

  deleteImage(id: any) {
    Alertes.confirmAction(
      'Suppression',
      'Voulez-vous vraiment executer cette action',
      () => {
        this.mediathequeService.deleteMediatheques(id).subscribe((data) => {
          Alertes.alerteAddSuccess('Supprimer avec succes');
          this.getAllImages();
        });
      }
    );
  }

  doSearchImage(data?: any) {
    this.pageOptions = data;
    this.pageOptions.size = 20;
    this.pageOptions.page = 0;
    this.getAllImages();
  }

  paginate($event: any) {
    this.pageOptions.page = $event - 1;
    this.getAllImages();
  }
}
