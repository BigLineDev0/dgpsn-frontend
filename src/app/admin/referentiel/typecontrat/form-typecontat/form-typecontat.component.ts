import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbAccordionModule, NgbTooltipModule, NgbNavModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'primeng/api';
import { FormRegionComponent } from '../../region/form-region/form-region.component';
import { FormSecteuractiviteComponent } from '../../secteuractivite/form-secteuractivite/form-secteuractivite.component';
import { TypecontratService } from '@/app/services/typecontrat/typecontrat.service';
import { Alertes } from '@/app/util/alerte';

@Component({
  selector: 'app-form-typecontat',
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

   
  ],  templateUrl: './form-typecontat.component.html',
  styleUrl: './form-typecontat.component.scss'
})
export class FormTypecontatComponent {

  form!: FormGroup;
  @Input() isSearch!: boolean;
  @Input() typecontratToUpdate: any;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private typecontratService: TypecontratService,
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
   if (this.typecontratToUpdate !== undefined) {
        this.form.get('code')?.setValue(this.typecontratToUpdate?.code);
        this.form.get('libelle')?.setValue(this.typecontratToUpdate?.libelle);
    }
 }
  save() {
    if (this.form.valid) {
      const formValue = this.form.value;
      if (this.typecontratToUpdate) {
        this.update(formValue);
      } else {
        this.create(formValue);
      }
    } else {
      Alertes.errorPopPup('Formulaire non valide','Veuillez remplir tous les champs marqués d\'un Astérix rouge')
    }
  }

  create(data: any) {
    this.typecontratService.createTypecontrat(data).subscribe({
      next: response => Alertes.alerteAddSuccess(),
      error: err => Alertes.alerteAddDanger(),
      complete: () => this.close()
    });
  }

  update(data: any) {
    this.typecontratService.updateTypecontrat(this.typecontratToUpdate?.id,data).subscribe({
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
