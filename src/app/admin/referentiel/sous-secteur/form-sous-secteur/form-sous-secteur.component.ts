import { LabelService } from '@/app/services/labelService/label-service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import {SubSectorService} from 'src/app/services/sub-sector/sub-sector.service';
import {Alertes} from 'src/app/util/alerte';
import { FormRegionComponent } from '../../region/form-region/form-region.component';
import { FormSecteuractiviteComponent } from '../../secteuractivite/form-secteuractivite/form-secteuractivite.component';

@Component({
  selector: 'app-form-sous-secteur',
  templateUrl: './form-sous-secteur.component.html',
  styleUrls: ['./form-sous-secteur.component.scss'],
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

   
  ],
})
export class FormSousSecteurComponent {

  form!: FormGroup
  @Input() isSearch: any;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  @Input() sousSecteurToUpdate: any;
  @Input() referentielType: any;

  sector: any;

  constructor(private readonly subSectorService: SubSectorService,
              private readonly modalService: NgbModal,
              private readonly labelService: LabelService,
  ) {
  }

  ngOnInit(): void {
    this.getSecteur()
    this.form = new FormGroup(
      {
        code: new FormControl("", Validators.required),
        libelle: new FormControl("", Validators.required),
        sectorId: new FormControl(null),
      }
    );
    this.loadFileds()
  }

  loadFileds() {
    if (this.sousSecteurToUpdate !== undefined) {
      this.form.get('code')?.setValue(this.sousSecteurToUpdate.code);
      this.form.get('libelle')?.setValue(this.sousSecteurToUpdate.libelle);
    }
  }

  save() {
    if (this.sousSecteurToUpdate === undefined) {
      this.create()
    } else {
      this.update()
    }
  }

  create() {
    let sousSecteur = this.form.value;
    // this.sector.referentielType = this.referentielType.name;
    console.log("sousSecteur ", sousSecteur);
    this.subSectorService.createSubsector(sousSecteur).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess('Enregistrement reussi');
        this.emitSubmit()
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.error.message)
      }
    })
  }

  update() {
    let sousSecteur = this.form.value;
    sousSecteur.referentielType = this.referentielType.name;
    this.subSectorService.updateSubsector(this.sousSecteurToUpdate.id, sousSecteur).subscribe({
      next: (data) => {
        Alertes.alerteAddSuccess('Modification reussi');
        this.emitSubmit()
      },
      error: (error) => {
        Alertes.alerteAddDanger(error.error.message)
      }
    })
  }

  getSecteur() {
    let req = {page: 0, size: 20, referentielType: 'SECTEUR'}
    this.labelService.readLabels(req).subscribe({
      next: response => {
        this.sector = response.content;
      },
      error: response => {
      },

    })
  }

  close() {
    this.modalService.dismissAll();

  }

  emitSubmit() {
    this.submit.emit(true);
  }

  doSearch() {
    this.search.emit(this.form.value)
    this.close();
  }
}

