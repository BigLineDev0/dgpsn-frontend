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
import { RisqueService } from '@/app/services/risque/risque.service';


@Component({
  selector: 'app-form-risque',
  templateUrl: './form-risque.component.html',
  styleUrls: ['./form-risque.component.scss'],
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
    FormRegionComponent

   
  ],
})
export class FormRisqueComponent implements OnInit {

  form!: FormGroup;
  @Input() isSearch!: boolean;
  @Input() risqueToUpdate: any;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private risqueService: RisqueService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      code: new FormControl(null, []),
      libelle: new FormControl(null, [Validators.required]),
    });
    this.preloadField();
  }
  preloadField() {
   if (this.risqueToUpdate !== undefined) {
        this.form.get('code')?.setValue(this.risqueToUpdate?.code);
        this.form.get('libelle')?.setValue(this.risqueToUpdate?.libelle);
    }
 }
  save() {
    if (this.form.valid) {
      const formValue = this.form.value;
      if (this.risqueToUpdate) {
        this.update(formValue);
      } else {
        this.create(formValue);
      }
    } else {
      Alertes.errorPopPup('Formulaire non valide','Veuillez remplir tous les champs marqués d\'un Astérix rouge')
    }
  }

  create(data: any) {
    this.risqueService.createRisque(data).subscribe({
      next: response => Alertes.alerteAddSuccess(),
      error: err => Alertes.alerteAddDanger(),
      complete: () => this.close()
    });
  }

  update(data: any) {
    this.risqueService.updateRisque(this.risqueToUpdate?.id,data).subscribe({
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
