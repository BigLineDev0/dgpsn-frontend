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
  selector: 'app-form-video-projet',
  templateUrl: './form-video-projet.component.html',
  styleUrls: ['./form-video-projet.component.scss'],
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
    RoutingAppelOffreProjetComponent,
    SpinnerComponent,
    FormPlanPassationProjetComponent,

  ]
})
export class FormVideoProjetComponent implements OnInit {
  @Output() submit: EventEmitter<string> = new EventEmitter();
  @Output() search: EventEmitter<string> = new EventEmitter();
  form!: any;
  @Input() updateVideo: any;
  @Input() isSearch!: boolean;
  lien: any;
  projetId: any;

  constructor(
    private mediathequeService: MediathequeService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      libelle: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      src: new FormControl('', Validators.required),
    });
    this.getProjetId();
    this.readfiles();
  }

  readfiles() {
    console.log('boom', this.updateVideo);
    if (this.updateVideo !== undefined) {
      this.form.get('libelle')?.setValue(this.updateVideo.libelle);
      this.form.get('date')?.setValue(Helper.editDate(this.updateVideo.date));
      this.form.get('src')?.setValue(this.updateVideo.src);
    }
  }
  getProjetId() {
    this.projetId = localStorage.getItem('projetId')!;
  }

  save() {
    let mediatheque = this.form.value;
    mediatheque.mediathequeType = 'VIDEO';
    this.Video(mediatheque.src);
    mediatheque.src = this.lien;
    mediatheque.projetId = +this.projetId!;
    if (this.form.valid) {
      if (this.updateVideo === undefined) {
        this.create(mediatheque);
      } else {
        this.update(this.updateVideo.id, mediatheque);
      }
    }
  }
  create(mediatheque: any) {
    this.mediathequeService.addMediathequeToProject(mediatheque).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess('Vidéo');
        this.close();
      },
      error: (error) => {
        // console.log("error", error)
        Alertes.alerteAddDanger(error.error.message);
      },
    });
  }
  update(mediathequeId: any, mediatheque: any) {
    this.mediathequeService.updateMediatheque(mediathequeId, mediatheque).subscribe({
        next: (data) => {
          Alertes.alerteUpdateSuccess('Vidéo');
          this.close();
        },
        error: (error) => {
          // console.log("error", error)
          Alertes.alerteUpdateDanger(error.error.message);
        },
      });
  }

  close() {
    this.submit.emit('vid');
  }

  Video(url: any) {
    console.log('url :', url);
    console.log('url lenght :', url.length);
    if (url.length == 43) {
      let videoId = url.split('=').pop();
      this.lien = 'https://www.youtube.com/embed/' + videoId;
      console.log('lien to save',this.lien);
    } else if (url.length == 28) {
      let videoId = url.split('/').pop();
      this.lien = 'https://www.youtube.com/embed/' + videoId;
      console.log('lien to save',this.lien);
    }else{
      this.lien = url;
    }
  }

  doSearch() {
    let video = this.form.value;

    this.search.emit(video);
  }
}
