import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Alertes } from 'src/app/util/alerte';
import {Helper} from "src/app/util/helper";
import { RegionService } from 'src/app/services/region/region.service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { CreateOrUpdateNatureSpecifiqueComponent } from '../../natureSpecifique/create-or-update-nature-specifique/create-or-update-nature-specifique.component';

@Component({
  selector: 'app-form-region',
  templateUrl: './form-region.component.html',
  styleUrls: ['./form-region.component.scss'],
  standalone : true,
  imports : [
    CommonModule,
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
export class FormRegionComponent implements OnInit {

  form!: FormGroup;
  @Input() isSearch!: boolean;
  @Input() regionToUpdate: any;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private regionService: RegionService,
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
   if (this.regionToUpdate !== undefined) {
        this.form.get('code')?.setValue(this.regionToUpdate?.code);
        this.form.get('libelle')?.setValue(this.regionToUpdate?.libelle);
    }
 }
  save() {
    if (this.form.valid) {
      const formValue = this.form.value;
      if (this.regionToUpdate) {
        this.update(formValue);
      } else {
        this.create(formValue);
      }
    } else {
      Alertes.errorPopPup('Formulaire non valide','Veuillez remplir tous les champs marqués d\'un Astérix rouge')
    }
  }

  create(data: any) {
    this.regionService.createRegion(data).subscribe({
      next: response => Alertes.alerteAddSuccess(),
      error: err => Alertes.alerteAddDanger(),
      complete: () => this.close()
    });
  }

  update(data: any) {
    this.regionService.updateRegion(this.regionToUpdate?.id,data).subscribe({
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
