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
import { TypedvaluationService } from '@/app/services/typedvaluation/typedvaluation.service';

@Component({
  selector: 'app-form-typedvaluation',
  templateUrl: './form-typedvaluation.component.html',
  styleUrls: ['./form-typedvaluation.component.scss'],
     standalone : true,
  imports : [
    CommonModule,
    // SpinnerComponent,
    MaterialModule,
    SharedModule,
    NgbPaginationModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbNavModule,
    // FormRegionComponent,
    // FormSecteuractiviteComponent,

   
  ],
})
export class FormTypedvaluationComponent implements OnInit {

  form!: FormGroup;
  @Input() isSearch!: boolean;
  @Input() typedvaluationToUpdate: any;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private typedvaluationService: TypedvaluationService,
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
   if (this.typedvaluationToUpdate !== undefined) {
        this.form.get('code')?.setValue(this.typedvaluationToUpdate?.code);
        this.form.get('libelle')?.setValue(this.typedvaluationToUpdate?.libelle);
    }
 }
  save() {
    if (this.form.valid) {
      const formValue = this.form.value;
      if (this.typedvaluationToUpdate) {
        this.update(formValue);
      } else {
        this.create(formValue);
      }
    } else {
      Alertes.errorPopPup('Formulaire non valide','Veuillez remplir tous les champs marqués d\'un Astérix rouge')
    }
  }

  create(data: any) {
    this.typedvaluationService.createTypedvaluation(data).subscribe({
      next: response => Alertes.alerteAddSuccess(),
      error: err => Alertes.alerteAddDanger(),
      complete: () => this.close()
    });
  }

  update(data: any) {
    this.typedvaluationService.updateTypedvaluation(this.typedvaluationToUpdate?.id,data).subscribe({
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
