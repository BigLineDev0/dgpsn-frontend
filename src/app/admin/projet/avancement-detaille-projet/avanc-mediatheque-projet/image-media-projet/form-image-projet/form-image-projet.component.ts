import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbAccordionModule, NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule, NgbTimepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { MediathequeService } from '@/app/services/mediatheque/mediatheque.service';
import { Alertes } from '@/app/util/alerte';
import { Helper } from '@/app/util/helper';
import { FormPlanPassationProjetComponent } from '@/app/admin/projet/appel-offre-projet/plan-passation/form-plan-passation-projet/form-plan-passation-projet.component';
import { RoutingAppelOffreProjetComponent } from '@/app/admin/projet/routimg-projet/routing-appel-offre-projet/routing-appel-offre-projet.component';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
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
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { ListboxModule } from 'primeng/listbox';


@Component({
  selector: 'app-form-image-projet',
  templateUrl: './form-image-projet.component.html',
  styleUrls: ['./form-image-projet.component.scss'],
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
export class FormImageProjetComponent implements OnInit {
  @Output() submit: EventEmitter<string> = new EventEmitter();
  @Output() search: EventEmitter<string> = new EventEmitter();
  form!: any;
  @Input() isSearch!: boolean;
  @Input() updateImage: any;

  projetId: any;

  file!: File;


  constructor(
    private mediathequeService: MediathequeService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      libelle: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      src: new FormControl(''),
    });

    this.getProjetId();
    this.readfile();
  }
  readfile() {
    if (this.updateImage !== undefined) {
      this.form.get('libelle')?.setValue(this.updateImage.libelle);
      this.form.get('date')?.setValue(Helper.editDate(this.updateImage.date));
      this.form.get('src')?.setValue(this.updateImage.src);
    }
  }
  getProjetId() {
    this.projetId = localStorage.getItem('projetId')!;
  }
  save() {
    let mediatheque = this.form.value;
    mediatheque.mediathequeType = 'IMAGE';
    // mediatheque.src = '';
    // mediatheque.date = Helper.getDateFormatter(this.form.value.date);
    mediatheque.projetId = +this.projetId!;
    if (this.form.valid) {
      if (this.updateImage === undefined) {
        this.create(mediatheque);
      } else {
        this.update(mediatheque);
      }
    }
  }
  create(mediatheque: any) {
    this.mediathequeService.addMediathequeToProject(mediatheque, this.file).subscribe({
        next: (data) => {
          Alertes.alerteAddSuccess('Image');
          this.close();
        },
        error: (error) => {
          // console.log("error", error)
          Alertes.alerteAddDanger(error.error.message);
        },
      });
  }
  update(mediatheque: any) {
    console.log("medatheque ", mediatheque)
    this.mediathequeService.updateMediatheque(this.updateImage.id, mediatheque, this.file).subscribe({
        next: (data) => {
          Alertes.alerteUpdateSuccess('Image');
          this.close();
        },
        error: (error) => {
          // console.log("error", error)
          Alertes.alerteAddDanger(error.error.message);
        },
      });
  }

  fileChange(event: any) {

    this.file = event.target.files;



  }
  doSearch() {
    let image = this.form.value;
    this.search.emit(image);
  }
  close() {
    this.submit.emit('img');
  }
}
