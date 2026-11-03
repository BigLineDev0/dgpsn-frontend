import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { Alertes } from 'src/app/util/alerte';
import {Helper} from "src/app/util/helper";
import { FormRegionComponent } from '../../region/form-region/form-region.component';
import { FormSecteuractiviteComponent } from '../../secteuractivite/form-secteuractivite/form-secteuractivite.component';
import { TypereunionService } from '@/app/services/typereunion/typereunion.service';


@Component({
  selector: 'app-form-typereunion',
  templateUrl: './form-typereunion.component.html',
  styleUrls: ['./form-typereunion.component.scss'],
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
export class FormTypereunionComponent implements OnInit {

  form!: FormGroup;
  @Input() isSearch!: boolean;
  @Input() typereunionToUpdate: any;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private typereunionService: TypereunionService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      code: new FormControl(null, []),
      libelle: new FormControl(null, []),
    });
    this.preloadField();
  }
  preloadField() {
   if (this.typereunionToUpdate !== undefined) {
        this.form.get('code')?.setValue(this.typereunionToUpdate?.code);
        this.form.get('libelle')?.setValue(this.typereunionToUpdate?.libelle);
    }
 }
  save() {
    if (this.form.valid) {
      const formValue = this.form.value;
      if (this.typereunionToUpdate) {
        this.update(formValue);
      } else {
        this.create(formValue);
      }
    } else {
      Alertes.errorPopPup('Formulaire non valide','Veuillez remplir tous les champs marqués d\'un Astérix rouge')
    }
  }

  create(data: any) {
    this.typereunionService.createTypereunion(data).subscribe({
      next: response => Alertes.alerteAddSuccess(),
      error: err => Alertes.alerteAddDanger(),
      complete: () => this.close()
    });
  }

  update(data: any) {
    this.typereunionService.updateTypereunion(this.typereunionToUpdate?.id,data).subscribe({
      next: response => Alertes.alerteUpdateSuccess(),
      error: err => Alertes.alerteUpdateDanger(),
      complete: () => this.close()
    });
  }

  close() {
    this.submit.emit(true);
  }

  doSearch() {
    this.search.emit(this.form.value);
  }

}
