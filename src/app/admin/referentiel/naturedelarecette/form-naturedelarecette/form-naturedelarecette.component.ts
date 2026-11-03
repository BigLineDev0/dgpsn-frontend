import { FormejuridiqueService } from '@/app/services/formejuridique/formejuridique.service';
import { NaturedelarecetteService } from '@/app/services/naturedelarecette/naturedelarecette.service';
import { MaterialModule } from '@/app/util/material/material.module';
import { SpinnerComponent } from '@/app/util/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAccordionModule, NgbModal, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HasAnyAuthorityDirective } from '@views/has-any-authority/has-any-authority.module';
import { SharedModule } from 'primeng/api';
import { Alertes } from 'src/app/util/alerte';
@Component({
  selector: 'app-form-naturedelarecette',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    MaterialModule,
    SharedModule,
    NgbPaginationModule,
    NgbAccordionModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    HasAnyAuthorityDirective,
    NgbNavModule,
  ],
  templateUrl: './form-naturedelarecette.component.html',
  styleUrls: ['./form-naturedelarecette.component.scss']
})
export class FormNaturedelarecetteComponent implements OnInit {

  form!: FormGroup;
  @Input() isSearch!: boolean;
  @Input() naturedelarecetteToUpdate: any;
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private naturedelarecetteService: NaturedelarecetteService,
  ) { }

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
    if (this.naturedelarecetteToUpdate !== undefined) {
      this.form.get('code')?.setValue(this.naturedelarecetteToUpdate?.code);
      this.form.get('libelle')?.setValue(this.naturedelarecetteToUpdate?.libelle);
    }
  }
  save() {
    if (this.form.valid) {
      const formValue = this.form.value;
      if (this.naturedelarecetteToUpdate) {
        this.update(formValue);
      } else {
        this.create(formValue);
      }
    } else {
      Alertes.errorPopPup('Formulaire non valide', 'Veuillez remplir tous les champs marqués d\'un Astérix rouge')
    }
  }

  create(data: any) {

    this.naturedelarecetteService.createNaturedelarecette(data).subscribe({
      next: response => Alertes.alerteAddSuccess(),
      error: err => Alertes.alerteAddDanger(),
      complete: () => this.close()
    });
  }

  update(data: any) {
    this.naturedelarecetteService.updateNaturedelarecette(this.naturedelarecetteToUpdate?.id, data).subscribe({
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
