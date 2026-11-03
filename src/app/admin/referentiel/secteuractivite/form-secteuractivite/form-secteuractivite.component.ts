import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Alertes } from 'src/app/util/alerte';
import {Helper} from "src/app/util/helper";
import { SecteuractiviteService } from 'src/app/services/secteuractivite/secteuractivite.service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { FormRegionComponent } from '../../region/form-region/form-region.component';

@Component({
  selector: 'app-form-secteuractivite',
  templateUrl: './form-secteuractivite.component.html',
  styleUrls: ['./form-secteuractivite.component.scss'],
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
export class FormSecteuractiviteComponent implements OnInit {

  form!: FormGroup;
  @Input() isSearch!: boolean;
  @Input() secteuractiviteToUpdate: any;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private secteuractiviteService: SecteuractiviteService,
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
   if (this.secteuractiviteToUpdate !== undefined) {
        this.form.get('code')?.setValue(this.secteuractiviteToUpdate?.code);
        this.form.get('libelle')?.setValue(this.secteuractiviteToUpdate?.libelle);
    }
 }
  save() {
    if (this.form.valid) {
      const formValue = this.form.value;
      if (this.secteuractiviteToUpdate) {
        this.update(formValue);
      } else {
        this.create(formValue);
      }
    } else {
      Alertes.errorPopPup('Formulaire non valide','Veuillez remplir tous les champs marqués d\'un Astérix rouge')
    }
  }

  create(data: any) {
    this.secteuractiviteService.createSecteuractivite(data).subscribe({
      next: response => Alertes.alerteAddSuccess(),
      error: err => Alertes.alerteAddDanger(),
      complete: () => this.close()
    });
  }

  update(data: any) {
    this.secteuractiviteService.updateSecteuractivite(this.secteuractiviteToUpdate?.id,data).subscribe({
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
